import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingCalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date | undefined) => void;
}

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const BookingCalendar = ({ selectedDate, onDateSelect }: BookingCalendarProps) => {
  const { t } = useLanguage();
  const [doubleClickedDate, setDoubleClickedDate] = useState<Date | null>(null);
  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const [lastClickedDate, setLastClickedDate] = useState<Date | null>(null);

  // Generate busy dates (example: some random dates in the next 2 months)
  const today = new Date();
  const busyDates: Date[] = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15),
    new Date(today.getFullYear(), today.getMonth() + 1, 3),
    new Date(today.getFullYear(), today.getMonth() + 1, 7),
    new Date(today.getFullYear(), today.getMonth() + 1, 14),
  ];

  const isBusyDate = (date: Date) => {
    return busyDates.some(
      (busyDate) =>
        busyDate.getDate() === date.getDate() &&
        busyDate.getMonth() === date.getMonth() &&
        busyDate.getFullYear() === date.getFullYear()
    );
  };

  const isPastDate = (date: Date) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return date < todayStart;
  };

  const handleDayClick = (date: Date) => {
    const now = Date.now();
    const doubleClickThreshold = 300; // ms

    if (lastClickedDate && isSameDay(lastClickedDate, date) && now - lastClickTime < doubleClickThreshold) {
      // Double click detected
      if (doubleClickedDate && isSameDay(doubleClickedDate, date)) {
        setDoubleClickedDate(null); // Toggle off
      } else {
        setDoubleClickedDate(date);
      }
    }

    setLastClickTime(now);
    setLastClickedDate(date);
  };

  return (
    <Card className="shadow-card animate-fade-up">
      <CardHeader className="border-b border-border">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            <CalendarCheck
              className="w-6 h-6 text-primary-foreground"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            />
          </div>
          <CardTitle className="font-serif text-xl">{t.booking.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          onDayClick={handleDayClick}
          disabled={(date) => isPastDate(date) || isBusyDate(date)}
          className={cn('p-3 pointer-events-auto mx-auto')}
          modifiers={{
            busy: (date) => isBusyDate(date) && !isPastDate(date),
            available: (date) => !isBusyDate(date) && !isPastDate(date),
            doubleClicked: (date) => doubleClickedDate !== null && isSameDay(doubleClickedDate, date),
          }}
          modifiersClassNames={{
            busy: 'bg-destructive/20 text-destructive line-through',
            available: 'bg-fresh/20 text-fresh-foreground hover:bg-fresh/40',
            doubleClicked: 'bg-red-500 text-white shadow-[0_0_15px_5px_rgba(239,68,68,0.6)] animate-pulse',
          }}
        />

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-fresh/30" />
            <span className="text-sm text-muted-foreground">{t.booking.available}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-destructive/30" />
            <span className="text-sm text-muted-foreground">{t.booking.busy}</span>
          </div>
        </div>

        {/* Selected date info */}
        {selectedDate && (
          <div className="mt-4 p-4 rounded-xl bg-fresh/10 border border-fresh/30">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-fresh" />
              <span className="font-medium text-foreground">
                {t.booking.selected}: {selectedDate.toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{t.booking.contactUs}</p>
          </div>
        )}

        <p className="text-sm text-muted-foreground mt-4 text-center">
          {t.booking.note}
        </p>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
