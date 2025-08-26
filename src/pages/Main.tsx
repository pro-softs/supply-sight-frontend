import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { KPICards } from "@/components/dashboard/KPICards";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { Filters } from "@/components/dashboard/Filters";
import { ProductsTable } from "@/components/dashboard/ProductsTable";
import { ProductDrawer } from "@/components/dashboard/ProductDrawer";
import { Product, KPIData, Warehouse, ProductFilters } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  useQuery,
  useLazyQuery,
  useMutation,
} from "@apollo/client/react";
import {
  GET_KPIS,
  GET_WAREHOUSES,
  GET_PRODUCTS,
  UPDATE_DEMAND,
  TRANSFER_STOCK,
} from "@/lib/apollo";
import { CombinedGraphQLErrors } from "@apollo/client";

function MainPage() {
  const [dateRange, setDateRange] = useState("7d");
  const [kpiData, setKpiData] = useState<KPIData[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters, setFilters] = useState<ProductFilters>({});
  const { toast } = useToast();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const {
    data: kpiResp,
    loading: kpiLoading,
  } = useQuery<{ kpis: KPIData[] }>(GET_KPIS, {
    variables: { range: dateRange },
  });

  const {
    data: warehousesResp,
    loading: whLoading,
  } = useQuery<{ warehouses: Warehouse[] }>(GET_WAREHOUSES);

  const [
    fetchProducts,
    { data: productsResp, loading: prodLoading },
  ] = useLazyQuery<{ products: { items: Product[]; total: number } }>(
    GET_PRODUCTS
  );

  const [updateDemandMutation] = useMutation(UPDATE_DEMAND);
  const [transferStockMutation] = useMutation(TRANSFER_STOCK);

  useEffect(() => {
    fetchProducts({
      variables: {
        filters,
        pagination: { page: currentPage, limit: itemsPerPage },
      },
    });
  }, [filters, currentPage]);

  useEffect(() => {
    if (productsResp?.products) {
      setProducts(productsResp.products.items);
      setTotalProducts(productsResp.products.total);
    }
  }, [productsResp]);

  useEffect(() => {
    if (kpiResp?.kpis) setKpiData(kpiResp.kpis);
  }, [kpiResp]);

  useEffect(() => {
    if (warehousesResp?.warehouses) setWarehouses(warehousesResp.warehouses);
  }, [warehousesResp]);

  const handleUpdateDemand = async (productId: string, demand: number) => {
    try {
      await updateDemandMutation({ variables: { productId, demand } });
      toast({
        title: "Demand updated",
        description: "Product demand updated.",
      });
      fetchProducts({
        variables: {
          filters,
          pagination: { page: currentPage, limit: itemsPerPage },
        },
      });
      setSelectedProduct(null);
    } catch (err) {
      toast({
        title: err,
        description: "Try again.",
        variant: "destructive",
      });
    }
  };

  const handleTransferStock = async (
    productId: string,
    fromWarehouse: string,
    toWarehouse: string,
    quantity: number
  ) => {
    try {
      await transferStockMutation({
        variables: { productId, fromWarehouse, toWarehouse, quantity },
      });
      toast({
        title: "Stock transferred",
        description: "Stock successfully moved.",
      });
      fetchProducts({
        variables: {
          filters,
          pagination: { page: currentPage, limit: itemsPerPage },
        },
      });
      setSelectedProduct(null);
    } catch (err) {
      toast({
        title: "Error transferring stock",
        description: "Try again.",
        variant: "destructive",
      });
    }
  };

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <Header dateRange={dateRange} onDateRangeChange={setDateRange} />

        <main className="container mx-auto px-6 py-6 space-y-6">
          <KPICards data={kpiData} loading={kpiLoading} />

          <TrendChart data={kpiData} loading={kpiLoading} />

          <Filters
            filters={filters}
            warehouses={warehouses}
            onFiltersChange={handleFiltersChange}
            loading={whLoading}
          />

          <ProductsTable
            products={products}
            loading={prodLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onProductClick={setSelectedProduct}
          />

          <ProductDrawer
            product={selectedProduct}
            warehouses={warehouses}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onUpdateDemand={handleUpdateDemand}
            onTransferStock={handleTransferStock}
            loading={whLoading}
          />
        </main>

        <Toaster />
      </div>
  );
}

export default MainPage;
