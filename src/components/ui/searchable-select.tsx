import * as React from "react";
import { Check, ChevronsUpDown, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  allowCustom?: boolean;
  customLabel?: string;
  disabled?: boolean;
  disabledMessage?: string;
}

export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className,
  allowCustom = false,
  customLabel = "Enter custom value",
  disabled = false,
  disabledMessage,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [showCustomInput, setShowCustomInput] = React.useState(false);
  const [customValue, setCustomValue] = React.useState("");

  const isCustomValue = value && !options.includes(value);

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onValueChange(customValue.trim());
      setCustomValue("");
      setShowCustomInput(false);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) {
        setShowCustomInput(false);
        setCustomValue("");
      }
    }}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between bg-card border-border h-11 sm:h-10 text-base sm:text-sm font-normal",
            !value && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed bg-muted",
            className
          )}
        >
          {disabled && disabledMessage ? disabledMessage : (value || placeholder)}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-popover border-border" align="start">
        {showCustomInput ? (
          <div className="p-3 space-y-3">
            <Input
              placeholder={customLabel}
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCustomSubmit();
                }
              }}
              autoFocus
              className="h-10"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowCustomInput(false)}
                className="flex-1"
              >
                ← Назад
              </Button>
              <Button
                size="sm"
                onClick={handleCustomSubmit}
                disabled={!customValue.trim()}
                className="flex-1"
              >
                OK
              </Button>
            </div>
          </div>
        ) : (
          <Command className="bg-popover">
            <CommandInput placeholder={searchPlaceholder} className="h-10" />
            {/* Custom input option - always visible under search */}
            {allowCustom && (
              <div className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setShowCustomInput(true)}
                  className="w-full flex items-center gap-2 px-3 py-3 sm:py-2.5 text-sm text-primary hover:bg-accent transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span className="font-medium">{customLabel}</span>
                </button>
              </div>
            )}
            <CommandList className="max-h-60">
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="py-3 sm:py-2"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}
