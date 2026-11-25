import { useEffect, useState } from 'react';
import {
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MessageCircle,
  X,
} from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import {
  buildWhatsAppUrl,
  formatCurrencyBRL,
  formatMileage,
} from '../config/dealership';

interface VehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onSimulateFinancing: (vehicle: Vehicle) => void;
}

const STANDARD_GUARANTEES = [
  'Veículo revisado com procedência garantida',
  'Entrada facilitada em até 18x no cartão de crédito',
  'Aceitamos seu carro usado na troca',
  'Financiamento rápido com os principais bancos',
];

export function VehicleModal({
  vehicle,
  onClose,
  onSimulateFinancing,
}: VehicleModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setImageError(false);
  }, [vehicle?.id]);

  useEffect(() => {
    if (!vehicle) return;

    const totalPhotos = Math.max(vehicle.gallery.length, 1);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && vehicle.gallery.length > 1) {
        setActiveIndex((prev) => (prev + 1) % totalPhotos);
        setImageError(false);
      } else if (e.key === 'ArrowLeft' && vehicle.gallery.length > 1) {
        setActiveIndex((prev) => (prev === 0 ? totalPhotos - 1 : prev - 1));
        setImageError(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  const activePhoto = vehicle.gallery[activeIndex] ?? vehicle.gallery[0];
  const formattedPrice = formatCurrencyBRL(vehicle.price);

  const whatsappUrl = buildWhatsAppUrl(
    vehicle.sold
      ? `Olá! Vi o ${vehicle.brand} ${vehicle.model} (${vehicle.year}) marcado como vendido no site da Coelho Motors. Gostaria de ver opções parecidas.`
      : `Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} (${vehicle.year}) anunciado por ${formattedPrice} no site da Coelho Motors.`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-vehicle-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 p-0 sm:p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-white/15 bg-[#141418] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho fixo do Modal */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-[#141418]/95 px-5 py-4 backdrop-blur-md sm:px-7">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F87171]">
              {vehicle.brand} · {vehicle.year}
              {vehicle.sold ? ' · Vendido' : vehicle.featured ? ' · Destaque' : ''}
            </p>
            <h3
              id="modal-vehicle-title"
              className="truncate font-display text-lg sm:text-2xl font-extrabold text-white"
            >
              {vehicle.model}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes do veículo"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#1B1B21] text-zinc-200 transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9252A]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="grid grid-cols-1 gap-6 p-5 sm:p-7 lg:grid-cols-12 lg:gap-8">
          {/* Galeria de Fotos */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0F]">
              {activePhoto && !imageError ? (
                <img
                  src={activePhoto.url}
                  alt={`${vehicle.brand} ${vehicle.model} - ${activePhoto.label}`}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  style={{
                    objectPosition: activePhoto.objectPosition ?? 'center center',
                  }}
                  className={`h-full w-full object-cover transition-transform duration-300 ${
                    activePhoto.zoomClass ?? ''
                  }`}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-zinc-400">
                  <Car className="h-12 w-12 text-zinc-600" aria-hidden="true" />
                  <span className="text-sm font-medium">
                    {vehicle.brand} {vehicle.model}
                  </span>
                </div>
              )}

              {vehicle.sold && (
                <div className="absolute top-3 left-3 rounded-lg border border-white/20 bg-[#0D0D0F]/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Vendido
                </div>
              )}

              {vehicle.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setImageError(false);
                      setActiveIndex((prev) =>
                        prev === 0 ? vehicle.gallery.length - 1 : prev - 1
                      );
                    }}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0D0D0F]/80 text-white backdrop-blur-sm transition-colors hover:bg-[#D9252A]"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setImageError(false);
                      setActiveIndex(
                        (prev) => (prev + 1) % vehicle.gallery.length
                      );
                    }}
                    aria-label="Próxima foto"
                    className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0D0D0F]/80 text-white backdrop-blur-sm transition-colors hover:bg-[#D9252A]"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}

              {vehicle.gallery.length > 0 && activePhoto && (
                <div className="absolute bottom-3 left-3 rounded-lg bg-[#0D0D0F]/80 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur-sm">
                  {activePhoto.label} ·{' '}
                  <span className="tabular-nums">
                    {activeIndex + 1}/{vehicle.gallery.length}
                  </span>
                </div>
              )}
            </div>

            {/* Miniaturas da Galeria */}
            {vehicle.gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {vehicle.gallery.map((photo, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={`${photo.url}-${index}`}
                      type="button"
                      onClick={() => {
                        setImageError(false);
                        setActiveIndex(index);
                      }}
                      className={`group relative aspect-[4/3] overflow-hidden rounded-xl border transition-all ${
                        isActive
                          ? 'border-[#D9252A] ring-2 ring-[#D9252A]/40'
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.label}
                        referrerPolicy="no-referrer"
                        style={{
                          objectPosition:
                            photo.objectPosition ?? 'center center',
                        }}
                        className={`h-full w-full object-cover ${
                          photo.zoomClass ?? ''
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Ficha Técnica e Ações */}
          <div className="flex flex-col lg:col-span-5">
            <div className="border-b border-white/10 pb-5">
              <span className="text-xs uppercase tracking-wider text-zinc-400">
                {vehicle.sold ? 'Veículo já negociado' : 'Valor do veículo'}
              </span>
              <div
                className={`mt-1 font-display text-3xl sm:text-4xl font-extrabold tabular-nums ${
                  vehicle.sold ? 'text-zinc-400 line-through' : 'text-white'
                }`}
              >
                {formattedPrice}
              </div>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#F87171]">
                <CreditCard className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Entrada facilitada em até 18x no cartão</span>
              </p>
            </div>

            {/* Grade de especificações */}
            <dl className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-[#0D0D0F] p-4 text-sm">
              <div>
                <dt className="text-xs text-zinc-500">Marca</dt>
                <dd className="font-semibold text-white">{vehicle.brand}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Ano</dt>
                <dd className="font-semibold text-white tabular-nums">
                  {vehicle.year}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Quilometragem</dt>
                <dd className="font-semibold text-white tabular-nums">
                  {formatMileage(vehicle.km)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Câmbio</dt>
                <dd className="font-semibold text-white">
                  {vehicle.transmission}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Combustível</dt>
                <dd className="font-semibold text-white">{vehicle.fuel}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Disponibilidade</dt>
                <dd className="font-semibold text-white">
                  {vehicle.sold ? 'Vendido' : 'Pronta entrega'}
                </dd>
              </div>
            </dl>

            {/* Condições Coelho Motors */}
            <div className="mt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Condições Coelho Motors
              </h4>
              <ul className="mt-2.5 space-y-2">
                {STANDARD_GUARANTEES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-zinc-200"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#D9252A]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botões de Conversão */}
            <div className="mt-7 flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#D9252A] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#B81D22]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {vehicle.sold
                    ? 'Consultar modelo similar no WhatsApp'
                    : 'Tenho interesse neste carro'}
                </span>
              </a>

              <button
                type="button"
                onClick={() => onSimulateFinancing(vehicle)}
                className="flex min-h-[48px] w-full items-center justify-center rounded-full border border-white/20 bg-[#1B1B21] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
              >
                Simular financiamento ou troca
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
