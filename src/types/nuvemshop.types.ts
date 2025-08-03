export interface NuvemshopCategory {
  id: number;
  name: { pt?: string; [key: string]: string | undefined } | string;
  description?: { pt?: string; [key: string]: string | undefined } | string;
  handle?: { pt?: string; [key: string]: string | undefined } | string;
  parent: number | null;
  subcategories?: number[];
  created_at?: string;
  updated_at?: string;
}

export interface NuvemshopProduct {
  id: number;
  name: { pt?: string; [key: string]: string | undefined };
  description?: { pt?: string; [key: string]: string | undefined };
  handle?: { pt?: string; [key: string]: string | undefined };
  images: Array<{ 
    id: number;
    src: string;
    position: number;
    product_id: number;
  }>;
  variants: Array<{
    id: number;
    price: string;
    compare_at_price?: string;
    stock?: number;
    sku?: string;
    barcode?: string;
    weight?: string;
  }>;
  categories?: number[];
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface NuvemshopStore {
  id: number;
  name: { pt?: string; [key: string]: string | undefined };
  email: string;
  original_domain: string;
  plan_name: string;
  country: string;
  business_id?: string;
  created_at?: string;
  updated_at?: string;
}