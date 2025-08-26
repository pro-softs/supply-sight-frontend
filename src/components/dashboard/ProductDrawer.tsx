import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Product, Warehouse } from '@/types';
import { Package, Building2, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface ProductDrawerProps {
  product: Product | null;
  warehouses: Warehouse[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateDemand: (productId: string, demand: number) => Promise<void>;
  onTransferStock: (productId: string, fromWarehouse: string, toWarehouse: string, quantity: number) => Promise<void>;
  loading: boolean;
}

export const ProductDrawer = ({ 
  product, 
  warehouses, 
  isOpen, 
  onClose, 
  onUpdateDemand, 
  onTransferStock, 
  loading 
}: ProductDrawerProps) => {
  const [newDemand, setNewDemand] = useState('');
  const [transferQuantity, setTransferQuantity] = useState('');
  const [targetWarehouse, setTargetWarehouse] = useState('');

  if (!product) return null;

  const handleUpdateDemand = async () => {
    const demand = parseInt(newDemand);
    if (isNaN(demand) || demand < 0) return;
    
    await onUpdateDemand(product.id, demand);
    setNewDemand('');
  };

  const handleTransferStock = async () => {
    const quantity = parseInt(transferQuantity);
    if (isNaN(quantity) || quantity < 0 || !targetWarehouse) return;
    
    await onTransferStock(product.id, product.warehouse.id, targetWarehouse, quantity);
    setTransferQuantity('');
    setTargetWarehouse('');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      healthy: 'text-green-600',
      low: 'text-yellow-600',
      critical: 'text-red-600',
    };
    return colors[status as keyof typeof colors] || 'text-gray-600';
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      healthy: 'bg-green-50 text-green-700 border-green-200',
      low: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      critical: 'bg-red-50 text-red-700 border-red-200',
    };

    const emoji = status === 'healthy' ? '🟢' : status === 'low' ? '🟡' : '🔴';

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {emoji} {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-lg font-semibold">{product.name}</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            SKU: {product.sku}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Product Details */}
          <Card className="border-0 shadow-sm bg-gray-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                {getStatusBadge(product.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Warehouse</span>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Building2 className="h-3 w-3" />
                  {product.warehouse.name}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Stock</span>
                <div className="flex items-center gap-1 text-sm font-semibold">
                  <TrendingUp className="h-3 w-3 text-blue-600" />
                  {product.stock.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Demand</span>
                <div className="flex items-center gap-1 text-sm font-semibold">
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  {product.demand.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Update Demand Form */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Update Demand</CardTitle>
              <CardDescription className="text-xs">
                Adjust the demand forecast for this product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newDemand" className="text-xs font-medium">
                  New Demand
                </Label>
                <Input
                  id="newDemand"
                  type="number"
                  min="0"
                  placeholder={product.demand.toString()}
                  value={newDemand}
                  onChange={(e) => setNewDemand(e.target.value)}
                  className="text-sm"
                />
              </div>
              <Button 
                onClick={handleUpdateDemand}
                disabled={loading || !newDemand || parseInt(newDemand) < 0}
                size="sm"
                className="w-full text-xs"
              >
                {loading ? 'Updating...' : 'Update Demand'}
              </Button>
            </CardContent>
          </Card>

          <Separator />

          {/* Transfer Stock Form */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Transfer Stock</CardTitle>
              <CardDescription className="text-xs">
                Move stock from {product.warehouse.name} to another warehouse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transferQuantity" className="text-xs font-medium">
                  Quantity to Transfer
                </Label>
                <Input
                  id="transferQuantity"
                  type="number"
                  min="0"
                  max={product.stock}
                  placeholder="0"
                  value={transferQuantity}
                  onChange={(e) => setTransferQuantity(e.target.value)}
                  className="text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetWarehouse" className="text-xs font-medium">
                  Target Warehouse
                </Label>
                <Select value={targetWarehouse} onValueChange={setTargetWarehouse}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses
                      .filter(w => w.id !== product.warehouse.id)
                      .map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleTransferStock}
                disabled={loading || !transferQuantity || !targetWarehouse || parseInt(transferQuantity) > product.stock}
                size="sm"
                className="w-full text-xs"
              >
                {loading ? 'Transferring...' : 'Transfer Stock'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};