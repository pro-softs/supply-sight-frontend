import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KPIData } from '@/types';
import { TrendingUp, Package, Target } from 'lucide-react';

interface KPICardsProps {
  data: KPIData[];
  loading: boolean;
}

export const KPICards = ({ data, loading }: KPICardsProps) => {
  const totalStock = data.reduce((sum, item) => sum + item.stock, 0);
  const totalDemand = data.reduce((sum, item) => sum + item.demand, 0);
  const fillRate = totalDemand > 0 ? ((Math.min(totalStock, totalDemand) / totalDemand) * 100) : 0;

  const kpis = [
    {
      title: 'Total Stock',
      value: loading ? '—' : totalStock.toLocaleString(),
      icon: Package,
      change: '+2.5%',
    },
    {
      title: 'Total Demand',
      value: loading ? '—' : totalDemand.toLocaleString(),
      icon: Target,
      change: '+1.8%',
    },
    {
      title: 'Fill Rate',
      value: loading ? '—' : `${fillRate.toFixed(1)}%`,
      icon: TrendingUp,
      change: '+0.3%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{kpi.change}</span> from last period
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};