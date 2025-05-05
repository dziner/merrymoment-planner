import { useQuery, useQueryClient } from '@tanstack/react-query';

// Types for our dynamic data
export interface PackageData {
  id: string;
  title: string;
  englishTitle: string;
  weekdayPrice: number;
  weekendPrice: number;
  features: { text: string }[];
}

export interface OptionData {
  id: number;
  title: string;
  price: number;
  hasQuantity?: boolean;
  hasNestedOptions?: boolean;
  optionsType?: 'album' | 'frame';
}

export interface SizeOption {
  id: string;
  title: string;
  price: number;
}

// Default data as fallback
const defaultPackages: Record<string, PackageData> = {
  merryBasic: {
    id: "merryBasic",
    title: "메리 베이직",
    englishTitle: "merry.Basic",
    weekdayPrice: 590000,
    weekendPrice: 640000,
    features: [
      { text: "60분 촬영" },
      { text: "10장 보정본 제공" },
      { text: "모든 원본 사진 (ZIP)" },
      { text: "기본 화관 포함" },
      { text: "모바일 갤러리 포함" },
    ],
  },
  momentPremium: {
    id: "merryPremium",
    title: "메리 프리미엄",
    englishTitle: "merry.Premium",
    weekdayPrice: 790000,
    weekendPrice: 850000,
    features: [
      { text: "90분 촬영" },
      { text: "20장 보정본 제공" },
      { text: "프리미엄 액자 1개 포함" },
      { text: "모든 원본 사진 (ZIP)" },
      { text: "기본 화관 포함" },
      { text: "모바일 갤러리 포함" },
    ],
  }
};

const defaultOptions: OptionData[] = [
  { id: 1, title: "보정본 5장 추가", price: 70000 },
  { id: 2, title: "보정본 10장 추가", price: 120000 },
  { id: 3, title: "추가 인원", price: 50000, hasQuantity: true },
  { id: 4, title: "쌍둥이 촬영", price: 60000 },
  { id: 5, title: "백일/돌상 세팅", price: 100000 },
  { id: 6, title: "생화 화관", price: 50000 },
  { id: 7, title: "하드커버 앨범", price: 120000, hasNestedOptions: true, optionsType: 'album', hasQuantity: true },
  { id: 8, title: "프리미엄 액자", price: 90000, hasNestedOptions: true, optionsType: 'frame', hasQuantity: true },
];

const defaultAlbumOptions: SizeOption[] = [
  { id: 'album-8x11', title: '8x11 사이즈', price: 0 },
  { id: 'album-11x14', title: '11x14 사이즈', price: 30000 },
  { id: 'album-mini', title: '미니앨범', price: -20000 }
];

const defaultFrameOptions: SizeOption[] = [
  { id: 'frame-4x6', title: '4x6 사이즈', price: 0 },
  { id: 'frame-5x7', title: '5x7 사이즈', price: 20000 }
];

// Function to fetch data from Google Sheets using their public API
// Note: The sheet must be published to the web and accessible via CSV
const fetchFromGoogleSheets = async (sheetId: string, sheetName: string) => {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
    const response = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    throw error;
  }
};

// Improved CSV parser
const parseCSV = (csv: string) => {
  const lines = csv.split('\n');
  if (lines.length <= 1) {
    console.error('CSV data is empty or invalid');
    return [];
  }

  // Clean quotes from headers and get them
  const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim());
  
  return lines.slice(1).map(line => {
    // Handle commas within quoted values properly
    const values: string[] = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.replace(/"/g, '').trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    
    // Add the last value
    values.push(currentValue.replace(/"/g, '').trim());
    
    const obj: Record<string, any> = {};
    headers.forEach((header, index) => {
      if (index < values.length) {
        obj[header] = values[index];
      } else {
        obj[header] = '';
      }
    });
    
    return obj;
  }).filter(item => Object.values(item).some(val => val !== ''));  // Filter out empty rows
};

// Function to transform raw data from sheets to our app's format
const transformPackageData = (rawData: any[]): Record<string, PackageData> => {
  const packages: Record<string, PackageData> = {};
  
  rawData.forEach(item => {
    if (!item.id) return;
    
    // Parse features from comma-separated string
    let features: { text: string }[] = [];
    if (typeof item.features === 'string' && item.features.trim() !== '') {
      features = item.features.split(',').map((text: string) => ({ text: text.trim() }));
    }
    
    // Clean price values (remove commas, convert to number)
    const weekdayPrice = Number(String(item.weekdayPrice).replace(/,/g, '')) || 0;
    const weekendPrice = Number(String(item.weekendPrice).replace(/,/g, '')) || 0;
    
    packages[item.id] = {
      id: item.id,
      title: item.title || '',
      englishTitle: item.englishTitle || '',
      weekdayPrice: weekdayPrice,
      weekendPrice: weekendPrice,
      features: features,
    };
  });
  
  return packages;
};

const transformOptionData = (rawData: any[]): OptionData[] => {
  return rawData.map(item => {
    // Handle the uppercase "TRUE"/"FALSE" conversion to boolean
    const hasQuantity = item.hasQuantity === 'TRUE' || item.hasQuantity === 'true' || item.hasQuantity === true;
    const hasNestedOptions = item.hasNestedOptions === 'TRUE' || item.hasNestedOptions === 'true' || item.hasNestedOptions === true;
    
    return {
      id: Number(item.id) || 0,
      title: item.title || '',
      price: Number(String(item.price).replace(/,/g, '')) || 0,
      hasQuantity: hasQuantity,
      hasNestedOptions: hasNestedOptions,
      optionsType: (item.optionsType === 'album' || item.optionsType === 'frame') ? item.optionsType : undefined,
    };
  });
};

const transformSizeOptions = (rawData: any[]): SizeOption[] => {
  return rawData.map(item => ({
    id: item.id || '',
    title: item.title || '',
    price: Number(String(item.price).replace(/,/g, '')) || 0
  }));
};

// Google Sheets IDs and sheet names
const SHEET_ID = '1GqfPV6RxQWyR-FHBd4ErTnhsHqujTAtDC9CE6wkRPOg';
const PACKAGES_SHEET_NAME = 'Packages';
const OPTIONS_SHEET_NAME = 'Options';
const ALBUM_SIZES_SHEET_NAME = 'AlbumSizes';
const FRAME_SIZES_SHEET_NAME = 'FrameSizes';

// Custom hooks for fetching the data
export function usePackages() {
  return useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      try {
        const rawData = await fetchFromGoogleSheets(SHEET_ID, PACKAGES_SHEET_NAME);
        console.log('Raw Package Data:', rawData);
        return transformPackageData(rawData);
      } catch (error) {
        console.error('Error fetching package data:', error);
        return defaultPackages;
      }
    },
    initialData: defaultPackages,
    staleTime: 0, // Always fetch on mount
    refetchOnMount: true,
  });
}

export function useOptions() {
  return useQuery({
    queryKey: ['options'],
    queryFn: async () => {
      try {
        const rawData = await fetchFromGoogleSheets(SHEET_ID, OPTIONS_SHEET_NAME);
        console.log('Raw Options Data:', rawData);
        return transformOptionData(rawData);
      } catch (error) {
        console.error('Error fetching option data:', error);
        return defaultOptions;
      }
    },
    initialData: defaultOptions,
    staleTime: 0, // Always fetch on mount
    refetchOnMount: true,
  });
}

export function useAlbumSizes() {
  return useQuery({
    queryKey: ['albumSizes'],
    queryFn: async () => {
      try {
        const rawData = await fetchFromGoogleSheets(SHEET_ID, ALBUM_SIZES_SHEET_NAME);
        console.log('Raw Album Sizes Data:', rawData);
        return transformSizeOptions(rawData);
      } catch (error) {
        console.error('Error fetching album sizes:', error);
        return defaultAlbumOptions;
      }
    },
    initialData: defaultAlbumOptions,
    staleTime: 0, // Always fetch on mount
    refetchOnMount: true,
  });
}

export function useFrameSizes() {
  return useQuery({
    queryKey: ['frameSizes'],
    queryFn: async () => {
      try {
        const rawData = await fetchFromGoogleSheets(SHEET_ID, FRAME_SIZES_SHEET_NAME);
        console.log('Raw Frame Sizes Data:', rawData);
        return transformSizeOptions(rawData);
      } catch (error) {
        console.error('Error fetching frame sizes:', error);
        return defaultFrameOptions;
      }
    },
    initialData: defaultFrameOptions,
    staleTime: 0, // Always fetch on mount
    refetchOnMount: true,
  });
}
