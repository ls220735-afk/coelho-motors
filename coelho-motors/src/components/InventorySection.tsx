import { useMemo, useState } from 'react';
import { Info, RefreshCw, RotateCcw, Search } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { buildWhatsAppUrl } from '../config/dealership';
import { VehicleCard } from './VehicleCard';

interface InventorySectionProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  isFallback: boolean;
  errorMessage: string | null;
  onReload: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

type PriceRangeKey = 'all' | 'up-to-80' | '80-to-120' | 'above-120';

function InventorySkeletonGrid() {
  return (
    <div
      aria-label="Carregando veículos do estoque"
      className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#141418]"
        >
          <div className="aspect-[4/3] w-full animate-pulse bg-[#1E1E26]" />
          <div className="p-5 sm:p-6">
            <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
            <div className="mt-2.5 h-5 w-3/4 animate-pulse rounded bg-white/10" />
            <div className="mt-4 grid grid-cols-2 gap-3 border-y border-white/10 py-3.5">
              <div className="h-8 animate-pulse rounded bg-white/5" />
              <div className="h-8 animate-pulse rounded bg-white/5" />
              <div className="h-8 animate-pulse rounded bg-white/5" />
              <div className="h-8 animate-pulse rounded bg-white/5" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
              <div className="h-7 w-28 animate-pulse rounded bg-white/10" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="h-11 animate-pulse rounded-full bg-white/10" />
              <div className="h-11 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function InventorySection({
  vehicles,
  isLoading,
  isFallback,
  errorMessage,
  onReload,
  onSelectVehicle,
}: InventorySectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<PriceRangeKey>('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const brands = useMemo(() => {
    return Array.from(new Set(vehicles.map((v) => v.brand))).sort((a, b) =>
      a.localeCompare(b, 'pt-BR')
    );
  }, [vehicles]);

  const years = useMemo(() => {
    return Array.from(new Set(vehicles.map((v) => v.yearNumeric))).sort(
      (a, b) => b - a
    );
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const list = vehicles.filter((vehicle) => {
      if (query) {
        const haystack =
          `${vehicle.brand} ${vehicle.model} ${vehicle.year} ${vehicle.transmission} ${vehicle.fuel}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      if (selectedBrand !== 'all' && vehicle.brand !== selectedBrand) {
        return false;
      }

      if (selectedYear !== 'all' && String(vehicle.yearNumeric) !== selectedYear) {
        return false;
      }

      if (selectedPriceRange === 'up-to-80' && vehicle.price > 80000) {
        return false;
      }
      if (
        selectedPriceRange === '80-to-120' &&
        (vehicle.price <= 80000 || vehicle.price > 120000)
      ) {
        return false;
      }
      if (selectedPriceRange === 'above-120' && vehicle.price <= 120000) {
        return false;
      }

      return true;
    });

    // Garante que veículos com destaque = SIM apareçam sempre na parte de cima do estoque
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [vehicles, searchTerm, selectedBrand, selectedPriceRange, selectedYear]);

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedBrand !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedYear !== 'all';

  function resetFilters() {
    setSearchTerm('');
    setSelectedBrand('all');
    setSelectedPriceRange('all');
    setSelectedYear('all');
  }

  const fallbackWhatsappUrl = buildWhatsAppUrl(
    'Olá! Gostaria de receber a lista atualizada de veículos disponíveis na Coelho Motors.'
  );

  return (
    <section
      id="estoque"
      className="scroll-mt-20 bg-[#0D0D0F] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F87171]">
              Estoque atualizado
            </p>
            <h2
              className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Veículos disponíveis em Marília
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-zinc-400">
              Todos os carros contam com perícia cautelar aprovada e condição de{' '}
              <span className="text-zinc-200 font-medium">
                entrada em até 18x no cartão
              </span>
              .
            </p>
          </div>

          {!isLoading && (
            <div className="text-sm text-zinc-400 tabular-nums shrink-0">
              Exibindo{' '}
              <span className="font-semibold text-white">
                {filteredVehicles.length}
              </span>{' '}
              de{' '}
              <span className="font-semibold text-white">{vehicles.length}</span>{' '}
              veículos
            </div>
          )}
        </div>

        {/* Aviso amigável quando estiver exibindo a lista reserva */}
        {!isLoading && isFallback && errorMessage && (
          <div
            role="status"
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                aria-hidden="true"
              />
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={onReload}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-white/20 bg-[#0D0D0F] px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-white/40"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Tentar novamente</span>
              </button>
              <a
                href={fallbackWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center rounded-full bg-[#D9252A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B81D22]"
              >
                Consultar no WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Barra de Busca e Filtros */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#141418] p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
            <div className="relative lg:col-span-5">
              <label htmlFor="busca-veiculos" className="sr-only">
                Buscar por modelo ou marca
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                aria-hidden="true"
              />
              <input
                id="busca-veiculos"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar modelo ou marca (ex: Polo, Corolla)..."
                className="min-h-[46px] w-full rounded-xl border border-white/10 bg-[#0D0D0F] pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 transition-colors focus:border-[#D9252A] focus:outline-none"
              />
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="filtro-marca" className="sr-only">
                Filtrar por marca
              </label>
              <select
                id="filtro-marca"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                disabled={isLoading}
                className="min-h-[46px] w-full rounded-xl border border-white/10 bg-[#0D0D0F] px-3.5 text-sm text-white transition-colors focus:border-[#D9252A] focus:outline-none disabled:opacity-60"
              >
                <option value="all">Todas as marcas</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-3">
              <label htmlFor="filtro-preco" className="sr-only">
                Filtrar por faixa de preço
              </label>
              <select
                id="filtro-preco"
                value={selectedPriceRange}
                onChange={(e) =>
                  setSelectedPriceRange(e.target.value as PriceRangeKey)
                }
                disabled={isLoading}
                className="min-h-[46px] w-full rounded-xl border border-white/10 bg-[#0D0D0F] px-3.5 text-sm text-white transition-colors focus:border-[#D9252A] focus:outline-none disabled:opacity-60"
              >
                <option value="all">Qualquer valor</option>
                <option value="up-to-80">Até R$ 80.000</option>
                <option value="80-to-120">R$ 80.000 a R$ 120.000</option>
                <option value="above-120">Acima de R$ 120.000</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="filtro-ano" className="sr-only">
                Filtrar por ano
              </label>
              <select
                id="filtro-ano"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                disabled={isLoading}
                className="min-h-[46px] w-full rounded-xl border border-white/10 bg-[#0D0D0F] px-3.5 text-sm text-white transition-colors focus:border-[#D9252A] focus:outline-none disabled:opacity-60"
              >
                <option value="all">Todos os anos</option>
                {years.map((year) => (
                  <option key={year} value={String(year)}>
                    Ano {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-3 flex justify-end border-t border-white/5 pt-3">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Limpar filtros</span>
              </button>
            </div>
          )}
        </div>

        {/* Estado de Carregamento (Skeleton), Grid de Veículos ou Vazio */}
        {isLoading ? (
          <InventorySkeletonGrid />
        ) : filteredVehicles.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={onSelectVehicle}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#141418] px-6 py-14 text-center">
            <h3 className="font-display text-xl font-bold text-white">
              Nenhum veículo encontrado com esses filtros
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
              Tente limpar os filtros atuais ou fale diretamente com nossa equipe
              no WhatsApp para consultar veículos que acabaram de entrar em
              estoque.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#D9252A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B81D22]"
            >
              Ver todo o estoque
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
