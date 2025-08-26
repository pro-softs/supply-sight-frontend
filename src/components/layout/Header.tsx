import { Button } from '@/components/ui/button';

interface HeaderProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

export const Header = ({ dateRange, onDateRangeChange }: HeaderProps) => {
  const dateRanges = ['7d', '14d', '30d'];

  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold text-gray-900">SupplySight</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {dateRanges.map((range) => (
            <Button
              key={range}
              variant={dateRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => onDateRangeChange(range)}
              className="text-xs font-medium"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
};