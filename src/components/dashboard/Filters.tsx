import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Warehouse, ProductFilters } from '@/types';
import { Search } from 'lucide-react';

interface FiltersProps {
  filters: ProductFilters;
  warehouses: Warehouse[];
  onFiltersChange: (filters: ProductFilters) => void;
  loading?: boolean;
}

export const Filters = ({ filters, warehouses, onFiltersChange, loading }: FiltersProps) => {
  const statusOptions = ['All', 'Healthy', 'Low', 'Critical'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg border">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, SKU, or ID..."
          value={filters.search || ''}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10 text-sm"
          disabled={loading}
        />
      </div>
      
      <Select
        value={filters.warehouseId || 'all'}
        onValueChange={(value) => onFiltersChange({ ...filters, warehouseId: value === 'all' ? undefined : value })}
        disabled={loading}
      >
        <SelectTrigger className="w-full sm:w-[180px] text-sm">
          <SelectValue placeholder="All Warehouses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Warehouses</SelectItem>
          {warehouses.map((warehouse) => (
            <SelectItem key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select
        value={filters.status || 'All'}
        onValueChange={(value) => onFiltersChange({ ...filters, status: value === 'All' ? undefined : value })}
        disabled={loading}
      >
        <SelectTrigger className="w-full sm:w-[140px] text-sm">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};