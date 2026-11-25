/**
 * ============================================================================
 * CONFIGURAÇÃO DO ESTOQUE VIA GOOGLE SHEETS (CSV) — COELHO MOTORS
 * ============================================================================
 * Cole abaixo o link da sua planilha do Google Sheets publicada como CSV.
 *
 * Colunas esperadas na primeira linha da planilha:
 * id, marca, modelo, ano, km, cambio, combustivel, preco, foto1, foto2, foto3, foto4, destaque, vendido
 *
 * Valores especiais:
 * - destaque = SIM  -> exibe o veículo no topo do estoque
 * - vendido  = SIM  -> exibe a etiqueta "Vendido" no card do veículo
 * - preco           -> pode preencher como 68990, 68.990 ou R$ 68.990,00
 */
export const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/COLE_AQUI_O_LINK_DA_PLANILHA_PUBLICADA/pub?output=csv';

export interface VehicleGalleryItem {
  url: string;
  label: string;
  objectPosition?: string;
  zoomClass?: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  yearNumeric: number;
  km: number;
  transmission: string;
  fuel: string;
  price: number;
  featured: boolean;
  sold: boolean;
  image: string;
  gallery: VehicleGalleryItem[];
}

/**
 * Lista reserva com 6 veículos de exemplo.
 * Exibida automaticamente caso o link da planilha ainda não tenha sido
 * configurado ou se houver falha momentânea de conexão.
 */
export const FALLBACK_VEHICLES: Vehicle[] = [
  {
    id: 'vw-polo-comfortline-2024',
    brand: 'Volkswagen',
    model: 'Polo Comfortline 1.0 TSI',
    year: '2023/2024',
    yearNumeric: 2024,
    km: 28900,
    transmission: 'Automático',
    fuel: 'Flex',
    price: 89990,
    featured: true,
    sold: false,
    image: '/src/assets/images/car_vw_polo_tsi_1795614544332.jpg',
    gallery: [
      {
        url: '/src/assets/images/car_vw_polo_tsi_1795614544332.jpg',
        label: 'Foto 1',
      },
      {
        url: '/src/assets/images/car_vw_polo_tsi_1795614544332.jpg',
        label: 'Foto 2 · Frente',
        objectPosition: '28% 58%',
        zoomClass: 'scale-125',
      },
      {
        url: '/src/assets/images/car_vw_polo_tsi_1795614544332.jpg',
        label: 'Foto 3 · Lateral',
        objectPosition: '62% 58%',
        zoomClass: 'scale-125',
      },
    ],
  },
  {
    id: 'toyota-corolla-xei-2021',
    brand: 'Toyota',
    model: 'Corolla XEi 2.0',
    year: '2021/2021',
    yearNumeric: 2021,
    km: 52400,
    transmission: 'CVT',
    fuel: 'Flex',
    price: 118900,
    featured: true,
    sold: false,
    image: '/src/assets/images/car_toyota_corolla_1795614544517.jpg',
    gallery: [
      {
        url: '/src/assets/images/car_toyota_corolla_1795614544517.jpg',
        label: 'Foto 1',
      },
      {
        url: '/src/assets/images/car_toyota_corolla_1795614544517.jpg',
        label: 'Foto 2 · Dianteira',
        objectPosition: '26% 58%',
        zoomClass: 'scale-125',
      },
      {
        url: '/src/assets/images/car_toyota_corolla_1795614544517.jpg',
        label: 'Foto 3 · Rodas',
        objectPosition: '66% 58%',
        zoomClass: 'scale-125',
      },
    ],
  },
  {
    id: 'hyundai-hb20-comfort-2023',
    brand: 'Hyundai',
    model: 'HB20 Comfort Plus 1.0',
    year: '2022/2023',
    yearNumeric: 2023,
    km: 31200,
    transmission: 'Manual',
    fuel: 'Flex',
    price: 72900,
    featured: false,
    sold: false,
    image: '/src/assets/images/car_hyundai_hb20_1795614544271.jpg',
    gallery: [
      {
        url: '/src/assets/images/car_hyundai_hb20_1795614544271.jpg',
        label: 'Foto 1',
      },
      {
        url: '/src/assets/images/car_hyundai_hb20_1795614544271.jpg',
        label: 'Foto 2 · Frente',
        objectPosition: '25% 60%',
        zoomClass: 'scale-125',
      },
    ],
  },
  {
    id: 'honda-civic-touring-2020',
    brand: 'Honda',
    model: 'Civic Touring 1.5 Turbo',
    year: '2020/2020',
    yearNumeric: 2020,
    km: 58700,
    transmission: 'CVT',
    fuel: 'Gasolina',
    price: 132900,
    featured: false,
    sold: false,
    image: '/src/assets/images/car_honda_civic_1795614545829.jpg',
    gallery: [
      {
        url: '/src/assets/images/car_honda_civic_1795614545829.jpg',
        label: 'Foto 1',
      },
      {
        url: '/src/assets/images/car_honda_civic_1795614545829.jpg',
        label: 'Foto 2 · Frente',
        objectPosition: '70% 56%',
        zoomClass: 'scale-125',
      },
    ],
  },
  {
    id: 'fiat-argo-drive-2022',
    brand: 'Fiat',
    model: 'Argo Drive 1.0',
    year: '2021/2022',
    yearNumeric: 2022,
    km: 39800,
    transmission: 'Manual',
    fuel: 'Flex',
    price: 63900,
    featured: false,
    sold: false,
    image: '/src/assets/images/car_fiat_argo_1795614546506.jpg',
    gallery: [
      {
        url: '/src/assets/images/car_fiat_argo_1795614546506.jpg',
        label: 'Foto 1',
      },
    ],
  },
  {
    id: 'jeep-compass-longitude-2022',
    brand: 'Jeep',
    model: 'Compass Longitude 1.3 T270',
    year: '2022/2022',
    yearNumeric: 2022,
    km: 41500,
    transmission: 'Automático',
    fuel: 'Flex',
    price: 138900,
    featured: false,
    sold: true,
    image: '/src/assets/images/car_jeep_compass_1795614546664.jpg',
    gallery: [
      {
        url: '/src/assets/images/car_jeep_compass_1795614546664.jpg',
        label: 'Foto 1',
      },
    ],
  },
];

// ============================================================================
// FUNÇÕES DE CONVERSÃO DO CSV DO GOOGLE SHEETS
// ============================================================================

function normalizeHeader(header: string): string {
  return header
    .replace(/^\uFEFF/, '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');
}

function isTruthyFlag(value?: string): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return ['sim', 's', 'yes', 'true', '1', 'x'].includes(normalized);
}

function parseBRLPrice(raw?: string): number {
  if (!raw) return 0;
  const cleaned = raw.replace(/[^\d.,]/g, '').trim();
  if (!cleaned) return 0;

  if (cleaned.includes(',')) {
    const normalized = cleaned.replace(/\./g, '').replace(',', '.');
    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? Math.round(parsed) : 0;
  }

  // Trata formato brasileiro sem centavos (ex: "68.990" ou "118.900")
  if (/^\d{1,3}(\.\d{3})+$/.test(cleaned)) {
    const parsed = Number.parseInt(cleaned.replace(/\./g, ''), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? Math.round(parsed) : 0;
}

function parseKilometers(raw?: string): number {
  if (!raw) return 0;
  const digits = raw.replace(/\D/g, '');
  if (!digits) return 0;
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractNumericYear(raw?: string): number {
  if (!raw) return new Date().getFullYear();
  const matches = raw.match(/\d{4}/g);
  if (!matches || matches.length === 0) return new Date().getFullYear();
  const last = Number.parseInt(matches[matches.length - 1], 10);
  return Number.isFinite(last) ? last : new Date().getFullYear();
}

/**
 * Faz o parse completo de um texto CSV (respeitando aspas, vírgulas internas e quebras de linha).
 */
function parseCsvRows(csvText: string): string[][] {
  const cleanText = csvText.replace(/^\uFEFF/, '').trim();
  if (!cleanText) return [];

  // Detecta se o arquivo veio separado por ponto e vírgula ou vírgula
  const firstLine = cleanText.split(/\r?\n/)[0] ?? '';
  const commaCount = (firstLine.match(/,/g) ?? []).length;
  const semicolonCount = (firstLine.match(/;/g) ?? []).length;
  const delimiter = semicolonCount > commaCount ? ';' : ',';

  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let i = 0; i < cleanText.length; i += 1) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentValue += '"';
        i += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === delimiter && !insideQuotes) {
      currentRow.push(currentValue.trim());
      currentValue = '';
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i += 1;
      }
      currentRow.push(currentValue.trim());
      if (currentRow.some((cell) => cell !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentValue = '';
    } else {
      currentValue += char;
    }
  }

  currentRow.push(currentValue.trim());
  if (currentRow.some((cell) => cell !== '')) {
    rows.push(currentRow);
  }

  return rows;
}

/**
 * Converte o texto CSV da planilha do Google Sheets em uma lista tipada de veículos.
 * Colunas: id, marca, modelo, ano, km, cambio, combustivel, preco, foto1, foto2, foto3, foto4, destaque, vendido
 */
export function parseVehiclesCsv(csvText: string): Vehicle[] {
  // Se o servidor retornou uma página HTML de erro/login em vez de CSV, aborta para acionar o fallback
  if (/<!doctype html|<html/i.test(csvText.slice(0, 300))) {
    throw new Error('O link informado não retornou um CSV válido.');
  }

  const rows = parseCsvRows(csvText);
  if (rows.length < 2) {
    throw new Error('Planilha sem registros de veículos.');
  }

  const headers = rows[0].map(normalizeHeader);
  const getColIndex = (colName: string) => headers.indexOf(colName);

  const idx = {
    id: getColIndex('id'),
    marca: getColIndex('marca'),
    modelo: getColIndex('modelo'),
    ano: getColIndex('ano'),
    km: getColIndex('km'),
    cambio: getColIndex('cambio'),
    combustivel: getColIndex('combustivel'),
    preco: getColIndex('preco'),
    foto1: getColIndex('foto1'),
    foto2: getColIndex('foto2'),
    foto3: getColIndex('foto3'),
    foto4: getColIndex('foto4'),
    destaque: getColIndex('destaque'),
    vendido: getColIndex('vendido'),
  };

  if (idx.marca === -1 || idx.modelo === -1 || idx.preco === -1) {
    throw new Error(
      'Colunas obrigatórias (marca, modelo, preco) não encontradas no CSV.'
    );
  }

  const getVal = (row: string[], index: number) =>
    index >= 0 && index < row.length ? row[index].trim() : '';

  const parsedVehicles: Vehicle[] = [];

  for (let rowIndex = 1; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex];
    const brand = getVal(row, idx.marca);
    const model = getVal(row, idx.modelo);
    const price = parseBRLPrice(getVal(row, idx.preco));

    if (!brand && !model) continue;

    const rawId = getVal(row, idx.id);
    const yearRaw = getVal(row, idx.ano) || String(new Date().getFullYear());
    const km = parseKilometers(getVal(row, idx.km));
    const transmission = getVal(row, idx.cambio) || 'Não informado';
    const fuel = getVal(row, idx.combustivel) || 'Flex';
    const featured = isTruthyFlag(getVal(row, idx.destaque));
    const sold = isTruthyFlag(getVal(row, idx.vendido));

    const photoUrls = [
      getVal(row, idx.foto1),
      getVal(row, idx.foto2),
      getVal(row, idx.foto3),
      getVal(row, idx.foto4),
    ].filter((url) => url.length > 0);

    const gallery: VehicleGalleryItem[] = photoUrls.map((url, photoIdx) => ({
      url,
      label: `Foto ${photoIdx + 1}`,
    }));

    parsedVehicles.push({
      id: rawId || `veiculo-${rowIndex}`,
      brand: brand || 'Multimarcas',
      model: model || 'Veículo',
      year: yearRaw,
      yearNumeric: extractNumericYear(yearRaw),
      km,
      transmission,
      fuel,
      price,
      featured,
      sold,
      image: photoUrls[0] ?? '',
      gallery,
    });
  }

  if (parsedVehicles.length === 0) {
    throw new Error('Nenhum veículo válido encontrado na planilha.');
  }

  // Ordena veículos com destaque = SIM para o topo do estoque
  return parsedVehicles.sort((a, b) => Number(b.featured) - Number(a.featured));
}
