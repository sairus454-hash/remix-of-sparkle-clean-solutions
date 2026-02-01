import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, CalendarX, CalendarCheck, Trash2, Plus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface BookingDate {
  id: string;
  date: string;
  is_busy: boolean;
  note: string | null;
  created_at: string;
}

const BookingDatesManager = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [dates, setDates] = useState<BookingDate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [note, setNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      const { data, error } = await supabase
        .from('booking_dates')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setDates(data || []);
    } catch (error) {
      console.error('Error fetching dates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBusyDate = async () => {
    if (!selectedDate) return;

    setIsAdding(true);
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('booking_dates')
        .insert({
          date: dateStr,
          is_busy: true,
          note: note || null,
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: t.admin.loginError,
            description: 'Эта дата уже добавлена',
            variant: 'destructive',
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: t.admin.saved,
          description: 'Занятая дата добавлена',
        });
        setSelectedDate(undefined);
        setNote('');
        fetchDates();
      }
    } catch (error) {
      console.error('Error adding date:', error);
      toast({
        title: t.admin.loginError,
        description: 'Не удалось добавить дату',
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteDate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('booking_dates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDates(dates.filter(d => d.id !== id));
      toast({
        title: t.admin.saved,
        description: 'Дата удалена',
      });
    } catch (error) {
      console.error('Error deleting date:', error);
      toast({
        title: t.admin.loginError,
        description: 'Не удалось удалить дату',
        variant: 'destructive',
      });
    }
  };

  const busyDateObjects = dates.map(d => new Date(d.date + 'T00:00:00'));

  const isBusyDate = (date: Date) => {
    return busyDateObjects.some(
      (busyDate) =>
        busyDate.getDate() === date.getDate() &&
        busyDate.getMonth() === date.getMonth() &&
        busyDate.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar for adding dates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarX className="w-5 h-5" />
            {t.admin.addBusyDate}
          </CardTitle>
          <CardDescription>
            {t.admin.selectDateToBlock}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mx-auto"
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
            modifiers={{
              busy: isBusyDate,
            }}
            modifiersClassNames={{
              busy: 'bg-destructive/20 text-destructive',
            }}
          />

          {selectedDate && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <CalendarCheck className="w-4 h-4 text-primary" />
                <span>{t.booking.selected}: {selectedDate.toLocaleDateString()}</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="note">{t.admin.note}</Label>
                <Input
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t.admin.notePlaceholder}
                />
              </div>

              <Button 
                onClick={handleAddBusyDate} 
                disabled={isAdding || isBusyDate(selectedDate)}
                className="w-full"
              >
                {isAdding ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                {isBusyDate(selectedDate) ? t.admin.dateAlreadyBlocked : t.admin.addBusyDate}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* List of busy dates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarX className="w-5 h-5" />
            {t.admin.busyDates}
          </CardTitle>
          <CardDescription>
            {t.admin.busyDatesDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : dates.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {t.admin.noBusyDates}
            </p>
          ) : (
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.admin.date}</TableHead>
                    <TableHead>{t.admin.note}</TableHead>
                    <TableHead>{t.admin.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dates.map((date) => (
                    <TableRow key={date.id}>
                      <TableCell className="font-medium">
                        {new Date(date.date + 'T00:00:00').toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {date.note || '—'}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {t.admin.deleteDate}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {t.admin.confirmDeleteDate}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                {t.admin.cancel}
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteDate(date.id)}
                              >
                                {t.admin.delete}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingDatesManager;
