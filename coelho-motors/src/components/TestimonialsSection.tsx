import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

export function TestimonialsSection() {
  return (
    <section
      aria-label="Depoimentos de clientes"
      className="border-t border-white/10 bg-[#0D0D0F] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F87171]">
            Quem comprou recomenda
          </p>
          <h2
            className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
            style={{ textWrap: 'balance' }}
          >
            Histórias de clientes satisfeitos
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Transparência na avaliação e agilidade na entrega fazem parte da
            experiência de quem fecha negócio na Coelho Motors.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#141418] p-6 sm:p-7"
            >
              <div>
                <Quote
                  className="h-6 w-6 text-[#D9252A]"
                  aria-hidden="true"
                />
                <blockquote className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-200">
                  “{item.quote}”
                </blockquote>
              </div>

              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <div className="font-display text-sm font-bold text-white">
                  {item.customerName}
                </div>
                <div className="mt-0.5 text-xs text-zinc-400">
                  {item.vehiclePurchased} · {item.dealType} · {item.city}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
