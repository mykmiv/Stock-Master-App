import { useState } from 'react';
import { Check, ChevronsUpDown, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { mockStocks, formatCurrency } from '@/data/mockStocks';

interface StockComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function StockCombobox({ value, onValueChange }: StockComboboxProps) {
  const [open, setOpen] = useState(false);
  
  const selectedStock = mockStocks.find(stock => stock.symbol === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-12 justify-between font-normal"
        >
          {selectedStock ? (
            <div className="flex items-center gap-2">
              <span className="font-mono font-semibold">{selectedStock.symbol}</span>
              <span className="text-muted-foreground">{selectedStock.name}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">Search stocks...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search by symbol or name..." />
          <CommandList>
            <CommandEmpty>No stock found.</CommandEmpty>
            <CommandGroup>
              {mockStocks.map((stock) => (
                <CommandItem
                  key={stock.symbol}
                  value={`${stock.symbol} ${stock.name}`}
                  onSelect={() => {
                    onValueChange(stock.symbol);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between py-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value === stock.symbol ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="font-mono font-semibold">{stock.symbol}</span>
                      <span className="text-xs text-muted-foreground">{stock.name}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">{formatCurrency(stock.price)}</span>
                    <span className={cn(
                      "flex items-center gap-0.5 text-xs font-medium",
                      stock.change >= 0 ? "text-emerald-600" : "text-red-600"
                    )}>
                      {stock.change >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
