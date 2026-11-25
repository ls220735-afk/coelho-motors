import { useCallback, useEffect, useState } from 'react';
import {
  FALLBACK_VEHICLES,
  SHEET_CSV_URL,
  Vehicle,
  parseVehiclesCsv,
} from '../data/vehicles';

interface UseVehiclesResult {
  vehicles: Vehicle[];
  isLoading: boolean;
  isFallback: boolean;
  errorMessage: string | null;
  reload: () => void;
}

export function useVehicles(): UseVehiclesResult {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const reload = useCallback(() => {
    setReloadTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 7000);

    async function loadVehiclesFromSheet() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch(SHEET_CSV_URL, {
          method: 'GET',
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status} ao buscar planilha.`);
        }

        const csvText = await response.text();
        const parsed = parseVehiclesCsv(csvText);

        setVehicles(parsed);
        setIsFallback(false);
      } catch (err) {
        if (controller.signal.aborted && err instanceof DOMException && err.name === 'AbortError') {
          // Pode ser timeout ou unmount; se não desmontou, ativa fallback amigável
        }
        setVehicles(FALLBACK_VEHICLES);
        setIsFallback(true);
        setErrorMessage(
          'Não foi possível carregar o estoque atualizado no momento. Exibindo uma seleção reserva de veículos disponíveis — fale conosco no WhatsApp para confirmar o pátio completo de hoje.'
        );
      } finally {
        window.clearTimeout(timeoutId);
        setIsLoading(false);
      }
    }

    loadVehiclesFromSheet();

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [reloadTrigger]);

  return {
    vehicles,
    isLoading,
    isFallback,
    errorMessage,
    reload,
  };
}
