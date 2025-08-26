export interface Product {
  id: string;
  name: string;
  sku: string;
  warehouse: {
    id: string;
    name: string;
  };
  stock: number;
  demand: number;
  status: 'healthy' | 'low' | 'critical';
}

export interface Warehouse {
  id: string;
  name: string;
}

export interface KPIData {
  date: string;
  stock: number;
  demand: number;
}

export interface ProductFilters {
  search?: string;
  warehouseId?: string;
  status?: string;
}

export interface PaginationInput {
  page: number;
  limit: number;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}