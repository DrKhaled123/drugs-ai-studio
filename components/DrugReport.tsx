import React from 'react';
import { Drug, CalculationResult } from '../types';
import { AlertTriangle, ShieldAlert, Pill, Trash2, FileText, CheckCircle2, AlertOctagon, Activity } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Props {
  drugs: Drug[];
  results: CalculationResult;
  onRemove: (id: string) => void;
  patientName: string;
}

const DrugReport: React.FC<Props> = ({ drugs, results, onRemove, patientName }) => {
  
  const getRenalRec = (drug: Drug): { msg: string; flag: boolean } => {
    const rule = drug.renalRules.find(r => 
      (r.minCrCl === undefined || results.crCl >= r.minCrCl) && results.crCl <= r.maxCrCl
    );
    if (rule) return { msg: `${rule.type.toUpperCase()}: ${rule.adjustment} (CrCl < ${rule.maxCrCl})`, flag: true };
    return { msg: 'No renal adjustment needed.', flag: false };
  };

  const getHepaticRec = (drug: Drug): { msg: string; flag: boolean } => {
    const rule = drug.hepaticRules.find(r => r.classes.includes(results.childPughClass));
    if (rule) return { msg: `${rule.type.toUpperCase()}: ${rule.adjustment} (Child-Pugh ${results.childPughClass})`, flag: true };
    return { msg: 'No hepatic adjustment needed.', flag: false };
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235); // Blue-600
    doc.text('MediGuard Clinical Report', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

    // Patient Info
    doc.setFillColor(241, 245, 249);
    doc.rect(14, 35, 182, 20, 'F');
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Patient: ${patientName}`, 20, 42);
    doc.text(`CrCl: ${results.crCl} mL/min  |  Child-Pugh: Class ${results.childPughClass} (Score ${results.childPughScore})`, 20, 50);

    // Drug Table
    const tableData = drugs.map(drug => {
      const renal = getRenalRec(drug);
      const hepatic = getHepaticRec(drug);
      return [
        drug.genericName,
        drug.normalDose,
        renal.flag ? `[ALERT] ${renal.msg}` : 'None',
        hepatic.flag ? `[ALERT] ${hepatic.msg}` : 'None'
      ];
    });

    autoTable(doc, {
      startY: 65,
      head: [['Drug', 'Normal Dose', 'Renal Rec', 'Hepatic Rec']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235], fontSize: 10, fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 4, overflow: 'linebreak' },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 40 },
        2: { textColor: [220, 38, 38] }, // Red for renal alerts
        3: { textColor: [234, 88, 12] }  // Orange for hepatic alerts
      }
    });

    doc.save(`Clinical_Report_${patientName || 'Patient'}.pdf`);
  };

  if (drugs.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center shadow-inner mb-6">
            <Pill className="w-10 h-10 text-blue-400" />
        </div>
        <h3 className="text-slate-900 font-bold text-xl mb-2">No Drugs Selected</h3>
        <p className="text-slate-500 max-w-sm mx-auto">Use the database to select drugs. The system will automatically check for Renal and Hepatic adjustments.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Therapeutic Analysis
        </h2>
        <button 
          onClick={generatePDF}
          className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-slate-200 transition transform hover:-translate-y-0.5"
        >
          Export PDF Report
        </button>
      </div>

      <div className="space-y-4">
        {drugs.map(drug => {
            const renal = getRenalRec(drug);
            const hepatic = getHepaticRec(drug);
            const hasRenalIssue = renal.flag;
            const hasHepaticIssue = hepatic.flag;
            const isSafe = !hasRenalIssue && !hasHepaticIssue;

            return (
            <div key={drug.id} className={`bg-white rounded-xl shadow-md border-l-8 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                !isSafe ? 'border-l-red-500 border-t border-r border-b border-red-100' : 'border-l-green-500 border-t border-r border-b border-slate-100'
            }`}>
                <div className={`px-6 py-4 flex justify-between items-start ${
                    !isSafe ? 'bg-red-50/50' : 'bg-green-50/50'
                }`}>
                    <div className="flex items-start gap-4">
                        <div className={`mt-1 p-2 rounded-full shadow-sm ${!isSafe ? 'bg-white text-red-600 ring-2 ring-red-100' : 'bg-white text-green-600 ring-2 ring-green-100'}`}>
                            {isSafe ? <CheckCircle2 className="w-6 h-6"/> : <AlertOctagon className="w-6 h-6"/>}
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-slate-800">{drug.genericName}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-500">
                                    {drug.brandNamesEU[0]}
                                </span>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-500">
                                    {drug.brandNamesArab[0]}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => onRemove(drug.id)} className="text-slate-400 hover:text-red-600 hover:bg-red-100 p-2 rounded-full transition">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            Standard Dose
                        </span>
                        <div className="text-sm font-medium text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 h-full">
                            {drug.normalDose}
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Activity className="w-3 h-3" /> Renal Adjustment
                        </span>
                        <div className={`p-4 rounded-xl border h-full flex items-center ${
                            hasRenalIssue 
                                ? 'bg-red-600 text-white shadow-md shadow-red-200 border-red-700' 
                                : 'bg-slate-50 border-slate-100 text-slate-400'
                        }`}>
                           {hasRenalIssue ? (
                               <div className="flex gap-3 items-center">
                                   <AlertTriangle className="w-8 h-8 flex-shrink-0 animate-pulse" />
                                   <span className="text-sm font-bold leading-tight">{renal.msg}</span>
                               </div>
                           ) : (
                               <span className="text-xs font-medium">Safe: {renal.msg}</span>
                           )}
                        </div>
                    </div>

                    <div className="space-y-2">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                             <ShieldAlert className="w-3 h-3" /> Hepatic Adjustment
                         </span>
                         <div className={`p-4 rounded-xl border h-full flex items-center ${
                            hasHepaticIssue 
                                ? 'bg-orange-500 text-white shadow-md shadow-orange-200 border-orange-600' 
                                : 'bg-slate-50 border-slate-100 text-slate-400'
                        }`}>
                            {hasHepaticIssue ? (
                               <div className="flex gap-3 items-center">
                                   <ShieldAlert className="w-8 h-8 flex-shrink-0" />
                                   <span className="text-sm font-bold leading-tight">{hepatic.msg}</span>
                               </div>
                           ) : (
                               <span className="text-xs font-medium">Safe: {hepatic.msg}</span>
                           )}
                        </div>
                    </div>
                </div>
                
                {/* Warnings Footer */}
                {(drug.contraindications.length > 0 || drug.interactions.length > 0) && (
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-sm text-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {drug.contraindications.length > 0 && (
                            <div>
                                <span className="font-black text-red-800 uppercase text-xs tracking-wider block mb-1">Contraindications</span>
                                {drug.contraindications.join(', ')}
                            </div>
                        )}
                         {drug.interactions.length > 0 && (
                            <div>
                                <span className="font-black text-indigo-800 uppercase text-xs tracking-wider block mb-1">Major Interactions</span>
                                {drug.interactions.join(', ')}
                            </div>
                        )}
                    </div>
                )}
            </div>
            );
        })}
      </div>
    </div>
  );
};

export default DrugReport;