/**
 * ============================================================================
 * CONFIGURAÇÕES DA LOJA — COELHO MOTORS
 * ============================================================================
 * Altere aqui os dados de contato, endereço, horário e links oficiais.
 * Todas as seções e botões de WhatsApp do site consomem este arquivo.
 */

export const DEALERSHIP_INFO = {
  name: 'Coelho Motors',
  owner: 'Thiago Coelho',
  slogan: 'Venda • Troca • Financiamento',
  highlight: 'Entrada em até 18x no cartão',
  logoPath: '/assets/aistudio/preview_40d825d5.webp',
  heroImagePath: '/src/assets/images/hero_coelho_showroom_1795614544231.jpg',

  // Número oficial do WhatsApp no formato internacional (55 + DDD + número)
  whatsappNumber: '5514998535800',
  phoneFormatted: '(14) 99853-5800',

  // Endereço e links externos
  addressLine1: 'Rua Bahia, 650',
  addressLine2: 'Marília/SP – CEP 17509-150',
  fullAddress: 'Rua Bahia, 650 – Marília/SP – CEP 17509-150',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Bahia+650+Marilia+SP+17509-150',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Rua%20Bahia%2C%20650%2C%20Mar%C3%ADlia%20-%20SP%2C%2017509-150&t=&z=16&ie=UTF8&iwloc=&output=embed',

  instagramHandle: '@ocoelhomotors',
  instagramUrl: 'https://www.instagram.com/ocoelhomotors',

  hoursWeekdays: 'Segunda a Sexta: 08h30 às 18h00',
  hoursSaturday: 'Sábado: 08h30 às 13h00',
} as const;

/**
 * Gera automaticamente o link wa.me com mensagem codificada em UTF-8.
 */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${DEALERSHIP_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Formata valores numéricos em Real Brasileiro (ex: R$ 75.990).
 */
export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formata quilometragem com separador de milhar (ex: 34.500 km).
 */
export function formatMileage(km: number): string {
  return `${new Intl.NumberFormat('pt-BR').format(km)} km`;
}
