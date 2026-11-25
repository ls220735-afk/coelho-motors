import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, CreditCard, MessageCircle } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { buildWhatsAppUrl, formatCurrencyBRL } from '../config/dealership';

interface FinancingSectionProps {
  vehicles: Vehicle[];
  preselectedVehicleLabel?: string;
}

export function FinancingSection({
  vehicles,
  preselectedVehicleLabel = '',
}: FinancingSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interestCar, setInterestCar] = useState(preselectedVehicleLabel);
  const [tradeInCar, setTradeInCar] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedVehicleLabel) {
      setInterestCar(preselectedVehicleLabel);
    }
  }, [preselectedVehicleLabel]);

  function formatPhoneInput(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    const cleanName = name.trim();
    const phoneDigits = phone.replace(/\D/g, '');

    if (cleanName.length < 2) {
      setErrorMsg('Por favor, informe seu nome completo para simular.');
      return;
    }

    if (phoneDigits.length < 10) {
      setErrorMsg('Informe um telefone ou WhatsApp válido com DDD.');
      return;
    }

    const lines = [
      'Olá, Coelho Motors! Gostaria de simular financiamento / troca:',
      `• Nome: ${cleanName}`,
      `• Telefone/WhatsApp: ${phone}`,
      `• Carro de interesse: ${interestCar.trim() || 'Quero ajuda para escolher no estoque'}`,
      `• Carro para troca: ${tradeInCar.trim() || 'Não tenho carro para troca no momento'}`,
    ];

    if (notes.trim()) {
      lines.push(`• Observações / Entrada: ${notes.trim()}`);
    }

    const whatsappHref = buildWhatsAppUrl(lines.join('\n'));
    setSubmittedUrl(whatsappHref);

    // Abre o link via elemento <a> para compatibilidade em iframes e navegadores mobile
    const link = document.createElement('a');
    link.href = whatsappHref;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  }

  return (
    <section
      id="financiamento"
      className="scroll-mt-20 border-t border-white/10 bg-[#0D0D0F] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Coluna Esquerda: Argumento comercial e condições */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F87171]">
              Financiamento &amp; Troca
            </p>
            <h2
              className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Simule sua parcela ou avalie seu usado
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-300">
              Na Coelho Motors você não trava na entrada. Parcelamos a entrada do
              seu veículo em até{' '}
              <strong className="font-semibold text-white">
                18x no cartão de crédito
              </strong>{' '}
              e buscamos aprovação rápida com os principais bancos.
            </p>

            <div className="mt-8 space-y-5 border-t border-white/10 pt-6">
              <div>
                <h3 className="flex items-center gap-2 font-display text-base font-bold text-white">
                  <CreditCard
                    className="h-4 w-4 text-[#D9252A]"
                    aria-hidden="true"
                  />
                  <span>Entrada em até 18x no cartão</span>
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Combine cartão de crédito, seu carro atual na troca e saldo
                  financiado em até 60 meses.
                </p>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-white">
                  Troca com avaliação justa
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Aceitamos carros e motos seminovos na negociação, inclusive
                  com troco na troca quando necessário.
                </p>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-white">
                  Aprovação ágil pelo WhatsApp
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Envie seus dados ao lado e receba uma pré-análise personalizada
                  diretamente com nossa equipe em Marília.
                </p>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Simulação e Troca */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-white/10 bg-[#141418] p-6 sm:p-8"
            >
              <h3 className="font-display text-xl font-bold text-white">
                Enviar dados para simulação no WhatsApp
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                Preencha os campos abaixo. Ao enviar, sua mensagem já vai pronta
                para o atendimento da Coelho Motors.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="sim-nome"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                  >
                    Seu nome *
                  </label>
                  <input
                    id="sim-nome"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: João Pedro Silva"
                    className="mt-1.5 min-h-[48px] w-full rounded-xl border border-white/10 bg-[#0D0D0F] px-4 text-sm text-white placeholder:text-zinc-500 transition-colors focus:border-[#D9252A] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sim-telefone"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                  >
                    WhatsApp / Telefone *
                  </label>
                  <input
                    id="sim-telefone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                    placeholder="(14) 99999-9999"
                    className="mt-1.5 min-h-[48px] w-full rounded-xl border border-white/10 bg-[#0D0D0F] px-4 text-sm text-white tabular-nums placeholder:text-zinc-500 transition-colors focus:border-[#D9252A] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="sim-carro-interesse"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                  >
                    Carro de interesse
                  </label>
                  <input
                    id="sim-carro-interesse"
                    type="text"
                    list="lista-carros-interesse"
                    value={interestCar}
                    onChange={(e) => setInterestCar(e.target.value)}
                    placeholder="Selecione ou digite o modelo desejado"
                    className="mt-1.5 min-h-[48px] w-full rounded-xl border border-white/10 bg-[#0D0D0F] px-4 text-sm text-white placeholder:text-zinc-500 transition-colors focus:border-[#D9252A] focus:outline-none"
                  />
                  <datalist id="lista-carros-interesse">
                    {vehicles
                      .filter((v) => !v.sold)
                      .map((v) => (
                      <option
                        key={v.id}
                        value={`${v.brand} ${v.model} (${v.year}) - ${formatCurrencyBRL(
                          v.price
                        )}`}
                      />
                    ))}
                  </datalist>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="sim-carro-troca"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                  >
                    Tem carro para troca? (Opcional)
                  </label>
                  <input
                    id="sim-carro-troca"
                    type="text"
                    value={tradeInCar}
                    onChange={(e) => setTradeInCar(e.target.value)}
                    placeholder="Ex: Gol 1.6 2018 completo, 75.000 km"
                    className="mt-1.5 min-h-[48px] w-full rounded-xl border border-white/10 bg-[#0D0D0F] px-4 text-sm text-white placeholder:text-zinc-500 transition-colors focus:border-[#D9252A] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="sim-obs"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                  >
                    Valor de entrada ou observações (Opcional)
                  </label>
                  <textarea
                    id="sim-obs"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Quero simular R$ 15.000 de entrada em 18x no cartão..."
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0D0D0F] px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors focus:border-[#D9252A] focus:outline-none"
                  />
                </div>
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="mt-4 rounded-xl border border-[#D9252A]/50 bg-[#D9252A]/15 px-4 py-3 text-sm font-medium text-[#FCA5A5]"
                >
                  {errorMsg}
                </div>
              )}

              {submittedUrl && (
                <div
                  role="status"
                  className="mt-4 flex flex-col gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-3.5 text-sm text-emerald-200 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>
                      Simulação preparada! Caso o WhatsApp não tenha aberto,
                      clique ao lado.
                    </span>
                  </div>
                  <a
                    href={submittedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white underline underline-offset-4 shrink-0"
                  >
                    Abrir WhatsApp
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-[#D9252A] px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-colors duration-150 hover:bg-[#B81D22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Simular agora pelo WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
