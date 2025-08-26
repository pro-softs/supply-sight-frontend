import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { ChevronLeft, ChevronRight, Package, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductsTableProps {
  products: Product[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onProductClick: (product: Product) => void;
}

export const ProductsTable = ({ 
  products, 
  loading, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onProductClick 
}: ProductsTableProps) => {
  const getStatusBadge = (status: string, stock: number, demand: number) => {
    const variants = {
      healthy: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
      low: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
      critical: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
    };

    const emoji = status === 'healthy' ? '🟢' : status === 'low' ? '🟡' : '🔴';

    return (
      <Badge className={cn('text-xs font-medium px-2.5 py-1 transition-colors', variants[status as keyof typeof variants])}>
        {emoji} {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-12 text-center text-sm text-muted-foreground">
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-gray-50/50">
            <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider py-4 px-6">
              <div className="flex items-center gap-2">
                <Package className="h-3.5 w-3.5" />
                Product
              </div>
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider py-4 px-6">SKU</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider py-4 px-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5" />
                Warehouse
              </div>
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider py-4 px-6 text-right">Stock</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider py-4 px-6 text-right">Demand</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider py-4 px-6">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className={cn(
                'cursor-pointer hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0',
                product.status === 'critical' && 'bg-red-50/30 hover:bg-red-50/50'
              )}
              onClick={() => onProductClick(product)}
            >
              <TableCell className="font-semibold text-sm text-gray-900 py-4 px-6">
                <div className="flex flex-col">
                  <span>{product.name}</span>
                  <span className="text-xs text-gray-500 font-normal">ID: {product.id}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm font-mono text-gray-600 py-4 px-6 bg-gray-50/50">
                <span className="px-2 py-1 bg-white rounded border text-xs font-medium">
                  {product.sku}
                </span>
              </TableCell>
              <TableCell className="text-sm text-gray-700 py-4 px-6 font-medium">
                {product.warehouse.name}
              </TableCell>
              <TableCell className="text-right text-sm font-bold text-gray-900 py-4 px-6">
                <div className="flex flex-col items-end">
                  <span className="text-base">{product.stock.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 font-normal">units</span>
                </div>
              </TableCell>
              <TableCell className="text-right text-sm font-bold text-gray-900 py-4 px-6">
                <div className="flex flex-col items-end">
                  <span className="text-base">{product.demand.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 font-normal">units</span>
                </div>
              </TableCell>
              <TableCell className="py-4 px-6">
                {getStatusBadge(product.status, product.stock, product.demand)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50/30">
          <div className="text-sm text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-xs font-medium px-3 py-2 h-8"
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-xs font-medium px-3 py-2 h-8"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};