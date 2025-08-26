import { useState, useEffect } from 'react';
import { Product, Warehouse, KPIData, ProductFilters, PaginationInput } from '@/types';

// Mock data
const mockWarehouses: Warehouse[] = [
  { id: '1', name: 'New York Hub' },
  { id: '2', name: 'Los Angeles Center' },
  { id: '3', name: 'Chicago Depot' },
  { id: '4', name: 'Houston Facility' },
];

const mockProducts: Product[] = [
  { id: '1', name: 'Wireless Headphones', sku: 'WH-001', warehouse: mockWarehouses[0], stock: 150, demand: 120, status: 'healthy' },
  { id: '2', name: 'Bluetooth Speaker', sku: 'BS-002', warehouse: mockWarehouses[1], stock: 80, demand: 100, status: 'critical' },
  { id: '3', name: 'USB-C Cable', sku: 'UC-003', warehouse: mockWarehouses[0], stock: 200, demand: 200, status: 'low' },
  { id: '4', name: 'Power Bank', sku: 'PB-004', warehouse: mockWarehouses[2], stock: 90, demand: 75, status: 'healthy' },
  { id: '5', name: 'Phone Case', sku: 'PC-005', warehouse: mockWarehouses[1], stock: 45, demand: 60, status: 'critical' },
  { id: '6', name: 'Screen Protector', sku: 'SP-006', warehouse: mockWarehouses[3], stock: 300, demand: 280, status: 'healthy' },
  { id: '7', name: 'Charging Dock', sku: 'CD-007', warehouse: mockWarehouses[2], stock: 25, demand: 40, status: 'critical' },
  { id: '8', name: 'Smart Watch', sku: 'SW-008', warehouse: mockWarehouses[0], stock: 70, demand: 70, status: 'low' },
  { id: '9', name: 'Tablet Stand', sku: 'TS-009', warehouse: mockWarehouses[3], stock: 110, demand: 95, status: 'healthy' },
  { id: '10', name: 'Wireless Mouse', sku: 'WM-010', warehouse: mockWarehouses[1], stock: 160, demand: 140, status: 'healthy' },
];

const generateKPIData = (range: string): KPIData[] => {
  const days = range === '7d' ? 7 : range === '14d' ? 14 : 30;
  const data: KPIData[] = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      stock: Math.floor(Math.random() * 200) + 800,
      demand: Math.floor(Math.random() * 180) + 750,
    });
  }
  
  return data;
};

export const useMockData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getKPIs = async (range: string): Promise<KPIData[]> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = generateKPIData(range);
      return data;
    } catch (err) {
      setError('Failed to fetch KPI data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getWarehouses = async (): Promise<Warehouse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockWarehouses;
    } catch (err) {
      setError('Failed to fetch warehouses');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async (filters: ProductFilters, pagination: PaginationInput) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      let filtered = [...mockProducts];
      
      // Apply filters
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.sku.toLowerCase().includes(searchLower) ||
          p.id.includes(searchLower)
        );
      }
      
      if (filters.warehouseId) {
        filtered = filtered.filter(p => p.warehouse.id === filters.warehouseId);
      }
      
      if (filters.status && filters.status !== 'All') {
        filtered = filtered.filter(p => p.status === filters.status.toLowerCase());
      }
      
      // Apply pagination
      const start = (pagination.page - 1) * pagination.limit;
      const end = start + pagination.limit;
      const items = filtered.slice(start, end);
      
      return {
        items,
        total: filtered.length,
        pageInfo: {
          hasNextPage: end < filtered.length,
          hasPreviousPage: pagination.page > 1,
        },
      };
    } catch (err) {
      setError('Failed to fetch products');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDemand = async (productId: string, demand: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // In real app, this would update the backend
      return { id: productId, demand };
    } catch (err) {
      setError('Failed to update demand');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const transferStock = async (productId: string, fromWarehouse: string, toWarehouse: string, quantity: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // In real app, this would update the backend
      return { id: productId, stock: quantity };
    } catch (err) {
      setError('Failed to transfer stock');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getKPIs,
    getWarehouses,
    getProducts,
    updateDemand,
    transferStock,
  };
};