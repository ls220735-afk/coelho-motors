import { useState } from 'react';
import { Car, Eye, MessageCircle } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import {
  buildWhatsAppUrl,
  formatCurrencyBRL,
  formatMileage,
} from '../config/dealership';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onSelect }: VehicleCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const formattedPrice = formatCurrencyBRL(vehicle.price);
  const whatsappUrl = buildWhatsAppUrl(
    vehicle.sold
      ? `Olá! Vi o ${vehicle.brand} ${vehicle.model} (${vehicle.year}) marcado como vendido no site da Coelho Motors. Vocês têm outro modelo parecido disponível?`
      : `Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} (${vehicle.year}) anunciado por ${formattedPrice} no site da Coelho Motors.`
  );

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-[#141418] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-15px_rgba(0,0,0,0.85)] ${
        vehicle.featured && !vehicle.sold
          ? 'border-[#D9252A]/45 hover:border-[#D9252A]/80'
          : 'border-white/10 hover:border-white/25'
      }`}
    >
      {/* Área da foto (4:3) com lazy loading e fallback elegante */}
      <button
        type="button"
        onClick={() => onSelect(vehicle)}
        aria-label={`Ver galeria e detalhes de ${vehicle.brand} ${vehicle.model}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#1B1B21] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D9252A]"
      >
        {!imageFailed && vehicle.image ? (
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${
              vehicle.sold ? 'opacity-65 grayscale-[35%]' : ''
            }`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_top,rgba(217,37,42,0.16),transparent_65%)] p-6 text-center">
            <Car className="h-10 w-10 text-zinc-500" aria-hidden="true" />
            <span className="text-sm font-semibold text-zinc-300">
              {vehicle.brand} {vehicle.model}
            </span>
          </div>
        )}

        {/* Etiqueta "Vendido" quando vendido = SIM */}
        {vehicle.sold && (
          <div className="absolute top-3 left-3 rounded-lg border border-white/20 bg-[#0D0D0F]/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-sm">
            Vendido
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141418]/80 to-transparent"
        />
      </button>

      {/* Conteúdo do Card */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Marca + status textual limpo */}
        <div className="flex items-center justify-between gap-2 text-xs font-medium text-zinc-400">
          <span className="uppercase tracking-wider text-zinc-300">
            {vehicle.brand}
          </span>
          {vehicle.sold ? (
            <span className="font-semibold uppercase tracking-wider text-zinc-300">
              Vendido
            </span>
          ) : vehicle.featured ? (
            <span className="font-semibold text-[#F87171]">Destaque</span>
          ) : null}
        </div>

        <h3 className="mt-1.5 font-display text-lg font-bold text-white leading-snug">
          <button
            type="button"
            onClick={() => onSelect(vehicle)}
            className="text-left transition-colors hover:text-[#F87171] focus-visible:outline-none focus-visible:underline"
          >
            {vehicle.model}
          </button>
        </h3>

        {/* Especificações técnicas */}
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-y border-white/10 py-3.5 text-xs sm:text-sm">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-zinc-500">
              Ano
            </span>
            <span className="font-medium text-zinc-200 tabular-nums">
              {vehicle.year}
            </span>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-zinc-500">
              Quilometragem
            </span>
            <span className="font-medium text-zinc-200 tabular-nums">
              {formatMileage(vehicle.km)}
            </span>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-zinc-500">
              Câmbio
            </span>
            <span className="font-medium text-zinc-200">
              {vehicle.transmission}
            </span>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-zinc-500">
              Combustível
            </span>
            <span className="font-medium text-zinc-200">{vehicle.fuel}</span>
          </div>
        </div>

        {/* Preço + Botões de Ação */}
        <div className="mt-4 flex flex-col gap-3 pt-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs text-zinc-400">
              {vehicle.sold ? 'Valor anunciado' : 'Valor à vista'}
            </span>
            <span
              className={`font-display text-2xl font-extrabold tabular-nums ${
                vehicle.sold ? 'text-zinc-400 line-through' : 'text-white'
              }`}
            >
              {formattedPrice}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[auto_1fr]">
            <button
              type="button"
              onClick={() => onSelect(vehicle)}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/15 bg-[#1B1B21] px-4 py-2.5 text-sm font-semibold text-zinc-100 whitespace-nowrap transition-colors duration-150 hover:border-white/30 hover:bg-[#23232B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Eye className="h-4 w-4 shrink-0 text-zinc-300" aria-hidden="true" />
              <span>Detalhes</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                vehicle.sold
                  ? 'bg-[#27272F] hover:bg-[#32323D]'
                  : 'bg-[#D9252A] hover:bg-[#B81D22]'
              }`}
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{vehicle.sold ? 'Consultar similar' : 'Tenho interesse'}</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
