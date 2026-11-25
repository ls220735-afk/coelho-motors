/**
 * ============================================================================
 * DEPOIMENTOS DE CLIENTES — COELHO MOTORS
 * ============================================================================
 * Edite os nomes, veículos adquiridos e relatos reais abaixo conforme novos
 * clientes forem atendidos na loja em Marília/SP.
 */

export interface Testimonial {
  id: string;
  customerName: string;
  city: string;
  vehiclePurchased: string;
  dealType: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'dep-1',
    customerName: 'Rafael Henrique Mendonça',
    city: 'Marília/SP',
    vehiclePurchased: 'Toyota Corolla XEi',
    dealType: 'Compra com troca',
    quote:
      'Fui muito bem atendido pelo Thiago desde o primeiro contato no WhatsApp. Avaliaram meu carro antigo com transparência, aprovaram a diferença no mesmo dia e saí com o Corolla revisado e laudo em mãos.',
  },
  {
    id: 'dep-2',
    customerName: 'Camila Ferreira Santos',
    city: 'Garça/SP',
    vehiclePurchased: 'Hyundai HB20 Comfort Plus',
    dealType: 'Entrada em 18x no cartão',
    quote:
      'O grande diferencial foi conseguir parcelar a entrada no cartão sem comprometer meu orçamento. A equipe explicou cada taxa do financiamento com clareza e entregou o carro impecável.',
  },
  {
    id: 'dep-3',
    customerName: 'Lucas Eduardo Almeida',
    city: 'Marília/SP',
    vehiclePurchased: 'Volkswagen Polo 1.0 TSI',
    dealType: 'Financiamento aprovado',
    quote:
      'Já conhecia o trabalho da Coelho Motors pelo Instagram e pessoalmente superou a expectativa. Carro exatamente como nas fotos, documentação rápida e zero dor de cabeça.',
  },
];
