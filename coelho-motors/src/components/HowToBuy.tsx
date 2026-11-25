import { motion } from 'motion/react';

const STEPS = [
  {
    number: '01',
    title: 'Escolha o carro ideal',
    description:
      'Navegue pelo nosso estoque atualizado, confira as fotos e a ficha completa ou fale conosco para encontrar o modelo que cabe no seu perfil.',
  },
  {
    number: '02',
    title: 'Simule financiamento e entrada',
    description:
      'Fazemos a simulação na hora com as melhores financeiras do mercado e você ainda pode parcelar a entrada em até 18x no cartão.',
  },
  {
    number: '03',
    title: 'Avalie seu usado na troca',
    description:
      'Tem carro na troca? Nossa equipe realiza uma avaliação rápida, justa e sem burocracia para abater direto no valor da negociação.',
  },
  {
    number: '04',
    title: 'Aprove e retire seu veículo',
    description:
      'Com crédito aprovado e documentação encaminhada, você retira seu carro revisado e com procedência garantida na Rua Bahia, 650.',
  },
];

export function HowToBuy() {
  return (
    <section
      id="como-comprar"
      className="scroll-mt-20 border-t border-white/10 bg-[#141418] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F87171]">
            Processo simples e transparente
          </p>
          <h2
            className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
            style={{ textWrap: 'balance' }}
          >
            Como comprar seu carro na Coelho Motors
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Do primeiro contato no WhatsApp até a entrega das chaves, você acompanha
            cada etapa com atendimento direto e sem surpresas.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0D0D0F] p-6"
            >
              <div>
                <span className="font-mono text-2xl font-bold text-[#D9252A] tabular-nums">
                  {step.number}.
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
