import { useState, useEffect, useCallback, forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void;
  language?: 'ru' | 'pl' | 'uk' | 'en';
}

const SimpleCaptcha = forwardRef<HTMLDivElement, SimpleCaptchaProps>(
  ({ onVerify, language = 'ru' }, ref) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const labels = {
      ru: { placeholder: 'Ответ', verified: 'Проверено ✓', hint: 'Решите пример' },
      pl: { placeholder: 'Odpowiedź', verified: 'Zweryfikowano ✓', hint: 'Rozwiąż przykład' },
      uk: { placeholder: 'Відповідь', verified: 'Перевірено ✓', hint: 'Розв\'яжіть приклад' },
      en: { placeholder: 'Answer', verified: 'Verified ✓', hint: 'Solve the equation' },
    };

    const currentLabels = labels[language] || labels.ru;

    const generateNewProblem = useCallback(() => {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      setNum1(a);
      setNum2(b);
      setUserAnswer('');
      setIsVerified(false);
      onVerify(false);
    }, [onVerify]);

    useEffect(() => {
      generateNewProblem();
    }, [generateNewProblem]);

    const handleAnswerChange = (value: string) => {
      setUserAnswer(value);
      const answer = parseInt(value, 10);
      const isCorrect = answer === num1 + num2;
      setIsVerified(isCorrect);
      onVerify(isCorrect);
    };

    return (
      <div ref={ref} className="space-y-2">
        <label className="text-sm font-medium text-foreground">{currentLabels.hint}</label>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg font-mono text-lg">
            <span>{num1}</span>
            <span>+</span>
            <span>{num2}</span>
            <span>=</span>
          </div>
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder={currentLabels.placeholder}
            className={`w-24 bg-card border-border ${isVerified ? 'border-fresh ring-1 ring-fresh' : ''}`}
            disabled={isVerified}
          />
          {isVerified && (
            <span className="text-fresh text-sm font-medium">{currentLabels.verified}</span>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={generateNewProblem}
            className="h-10 w-10"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
);

SimpleCaptcha.displayName = 'SimpleCaptcha';

export default SimpleCaptcha;
