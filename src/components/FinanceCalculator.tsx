import { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

interface FinanceCalculatorProps {
  carPrice: number;
}

export default function FinanceCalculator({ carPrice }: FinanceCalculatorProps) {
  const [downPayment, setDownPayment] = useState(carPrice * 0.2);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(4.5);

  const loanAmount = carPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
  const totalPayment = monthlyPayment * loanTerm + downPayment;
  const totalInterest = totalPayment - carPrice;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center space-x-2 px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
          <Calculator className="w-5 h-5" />
          <span>Finance Calculator</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Finance Calculator</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-blue-100">Estimated Monthly Payment</span>
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="text-4xl">
              ${isNaN(monthlyPayment) ? '0' : monthlyPayment.toFixed(2)}
            </div>
            <p className="text-blue-100 text-sm mt-2">per month for {loanTerm} months</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Down Payment</Label>
                <span className="text-gray-600 dark:text-gray-400">
                  ${downPayment.toLocaleString()}
                </span>
              </div>
              <Slider
                value={[downPayment]}
                onValueChange={([value]) => setDownPayment(value)}
                min={0}
                max={carPrice}
                step={1000}
                className="mb-2"
              />
              <Input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                min={0}
                max={carPrice}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Loan Term (months)</Label>
                <span className="text-gray-600 dark:text-gray-400">{loanTerm} months</span>
              </div>
              <Slider
                value={[loanTerm]}
                onValueChange={([value]) => setLoanTerm(value)}
                min={12}
                max={84}
                step={12}
                className="mb-2"
              />
              <div className="flex gap-2">
                {[36, 48, 60, 72, 84].map((term) => (
                  <button
                    key={term}
                    onClick={() => setLoanTerm(term)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      loanTerm === term
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {term}mo
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Interest Rate (%)</Label>
                <span className="text-gray-600 dark:text-gray-400">{interestRate}%</span>
              </div>
              <Slider
                value={[interestRate]}
                onValueChange={([value]) => setInterestRate(value)}
                min={0}
                max={15}
                step={0.1}
                className="mb-2"
              />
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={0}
                max={15}
                step={0.1}
              />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Car Price</span>
              <span className="text-gray-900 dark:text-white">
                ${carPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Down Payment</span>
              <span className="text-gray-900 dark:text-white">
                ${downPayment.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Loan Amount</span>
              <span className="text-gray-900 dark:text-white">
                ${loanAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Total Interest</span>
              <span className="text-gray-900 dark:text-white">
                ${isNaN(totalInterest) ? '0' : totalInterest.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-white">Total Payment</span>
              <span className="text-gray-900 dark:text-white">
                ${isNaN(totalPayment) ? '0' : totalPayment.toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            * This is an estimate. Actual rates and terms may vary.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
