import React from 'react';
import { CalculationResult, ChildPughClass } from '../types';
import { Activity, AlertTriangle, CheckCircle, Brain } from 'lucide-react';

interface Props {
  results: CalculationResult;
}

const CalculatorResults: React.FC<Props> = ({ results }) => {
  const getCrClColor = (val: number) => {
    if (val > 60) return 'text-green-700 bg-green-50 border-green-200 ring-green-100';
    if (val > 30) return 'text-yellow-700 bg-yellow-50 border-yellow-200 ring-yellow-100';
    return 'text-red-700 bg-red-50 border-red-200 ring-red-100';
  };

  const getChildPughColor = (cls: ChildPughClass) => {
    if (cls === ChildPughClass.A) return 'text-green-700 bg-green-50 border-green-200 ring-green-100';
    if (cls === ChildPughClass.B) return 'text-orange-700 bg-orange-50 border-orange-200 ring-orange-100';
    return 'text-red-700 bg-red-50 border-red-200 ring-red-100';
  };

  const Card = ({ colorClass, title, value, sub, icon: Icon, footer }: any) => (
      <div className={`p-5 rounded-xl border-2 ring-4 ring-opacity-50 flex flex-col justify-between h-full transition-all ${colorClass}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xs uppercase font-extrabold tracking-widest opacity-80 mb-1">{title}</h3>
            <div className="flex items-baseline gap-2">
              {value}
            </div>
            {sub && <div className="text-sm font-semibold opacity-90">{sub}</div>}
          </div>
          <Icon className="w-8 h-8 opacity-40" />
        </div>
        <div className="mt-4 pt-3 border-t border-black/5 text-xs font-medium opacity-75">
            {footer}
        </div>
      </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card 
        colorClass={getCrClColor(results.crCl)}
        title="Renal Function (CrCl)"
        value={<><span className="text-4xl font-black">{results.crCl}</span><span className="text-sm font-bold ml-1">mL/min</span></>}
        icon={Activity}
        footer="Cockcroft-Gault Equation"
      />

      <Card 
        colorClass={getChildPughColor(results.childPughClass)}
        title="Hepatic Function"
        value={<><span className="text-4xl font-black">{results.childPughScore}</span><span className="text-xl font-bold ml-2">Class {results.childPughClass}</span></>}
        icon={results.childPughClass === 'C' ? AlertTriangle : CheckCircle}
        footer="Child-Pugh Score System"
      />
    </div>
  );
};

export default CalculatorResults;