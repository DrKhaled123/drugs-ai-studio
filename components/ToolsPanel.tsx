import React, { useState } from 'react';
import { PatientData } from '../types';
import { 
    calculateFluidMaintenance, 
    calculateShockFluidBolus, 
    calculateShockVasopressor,
    calculateHypernatremiaCorrection,
    calculateSodiumDeficit
} from '../utils/calculators';
import { Droplets, Zap, Activity, AlertCircle, Info, ChevronDown, ChevronUp, Syringe, ShieldAlert, HeartPulse, Brain, Scale } from 'lucide-react';

interface Props {
    patient: PatientData;
}

const ToolsPanel: React.FC<Props> = ({ patient }) => {
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    const toggleCard = (id: string) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    const hyperData = calculateHypernatremiaCorrection(patient.weight, patient.sodium, patient.gender);
    const sodiumDeficit = calculateSodiumDeficit(patient.weight, patient.sodium, patient.gender);

    // Norepinephrine Monograph Component
    const NorepinephrineGuide = () => (
        <div className="mt-4 bg-white rounded-lg border border-slate-200 p-4 text-left space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Syringe className="w-5 h-5 text-indigo-600" />
                <h4 className="font-bold text-indigo-900">Norepinephrine Clinical Guide</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                    <span className="font-bold text-slate-700 block">Indications (Evidence Based)</span>
                    <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                        <li>First-line vasopressor for Septic Shock (Surviving Sepsis 2021).</li>
                        <li>Cardiogenic Shock (with care).</li>
                        <li>Target MAP ≥ 65 mmHg.</li>
                    </ul>
                </div>
                
                <div className="space-y-1">
                     <span className="font-bold text-slate-700 block">Dosing & Administration</span>
                     <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                        <li>Start: 0.05 - 0.1 mcg/kg/min.</li>
                        <li>Titrate q5-10min. Usual Max: 1-2 mcg/kg/min.</li>
                        <li>Central Line preferred (Risk of necrosis).</li>
                    </ul>
                </div>
            </div>

            <div className="bg-red-50 p-3 rounded-md border border-red-100">
                 <div className="flex items-center gap-2 mb-1">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span className="font-bold text-red-700 text-xs uppercase">Risk Management</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                    <div>
                        <span className="font-semibold text-slate-900">Side Effects:</span> Arrhythmias, Bradycardia (reflex), Peripheral ischemia, Anxiety.
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900">Interactions:</span> 
                        <span className="block">MAOIs/TCAs (Severe Hypertension)</span>
                        <span className="block">Beta-blockers (Unopposed alpha effect)</span>
                    </div>
                 </div>
            </div>
        </div>
    );

    // Education Cards for Methodology
    const CrClEducation = () => (
        <div className="mt-4 bg-slate-50 rounded-lg p-3 text-xs text-slate-600 space-y-2 border border-slate-200">
            <div className="font-bold text-slate-800">Cockcroft-Gault Equation (Standard for Drug Dosing)</div>
            <p>CrCl = [(140 - Age) × Wt (kg)] / (72 × SCr)</p>
            <p className="italic">*Multiply by 0.85 for females.</p>
            <div className="mt-2 font-bold text-slate-800">Jelliffe Equation</div>
            <p>Used for unstable renal function. Not currently implemented in this calculator.</p>
        </div>
    );

    const ChildPughEducation = () => (
        <div className="mt-4 bg-slate-50 rounded-lg p-3 text-xs text-slate-600 space-y-2 border border-slate-200">
             <div className="font-bold text-slate-800">Parameters Scored (1-3 points each):</div>
             <ul className="list-disc pl-4 space-y-1">
                 <li>Total Bilirubin</li>
                 <li>Serum Albumin</li>
                 <li>INR</li>
                 <li>Ascites (None, Mild, Mod/Sev)</li>
                 <li>Encephalopathy (None, Gr 1-2, Gr 3-4)</li>
             </ul>
             <div className="mt-2">
                 <span className="font-bold">Class A:</span> 5-6 pts (Compensated)<br/>
                 <span className="font-bold">Class B:</span> 7-9 pts (Significant)<br/>
                 <span className="font-bold">Class C:</span> 10-15 pts (Decompensated)
             </div>
        </div>
    );

    const Card = ({ id, title, icon: Icon, children, colorClass, details, showNorEpi, educationContent }: any) => {
        const isExpanded = expandedCard === id;
        
        return (
            <button 
                onClick={() => toggleCard(id)}
                className={`w-full text-left bg-white p-5 rounded-xl border shadow-sm relative overflow-hidden transition-all duration-300 group
                ${isExpanded ? 'ring-2 ring-offset-2 ring-blue-500 border-blue-200 lg:col-span-2 row-span-2' : 'border-slate-200 hover:shadow-md hover:border-blue-300'}
                `}
            >
                <div className={`absolute top-0 right-0 p-3 opacity-10 transition ${colorClass} ${isExpanded ? 'scale-150 opacity-10' : 'group-hover:scale-110 group-hover:opacity-20'}`}>
                    <Icon className="w-16 h-16" />
                </div>
                
                <div className="flex justify-between items-start mb-3 relative z-10">
                    <div className={`flex items-center gap-2 ${colorClass} brightness-75`}>
                        <Icon className="w-5 h-5" />
                        <h3 className="font-bold text-sm uppercase tracking-wide">{title}</h3>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>

                <div className="relative z-10 space-y-2">
                    {children}
                </div>

                {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 relative z-10 animate-in fade-in">
                        {details && (
                             <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 font-mono mb-2">
                                <span className="font-bold text-slate-400 block mb-1 uppercase tracking-wider">Methodology / Formula</span>
                                {details}
                            </div>
                        )}
                        {showNorEpi && <NorepinephrineGuide />}
                        {educationContent}
                    </div>
                )}
                
                {!isExpanded && <div className="mt-2 text-[10px] text-slate-400 font-medium uppercase tracking-widest text-center">Click to Expand</div>}
            </button>
        );
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                Resuscitation & Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
                
                {/* 1. General Fluids */}
                <Card 
                    id="fluids"
                    title="Maintenance Fluids" 
                    icon={Droplets} 
                    colorClass="text-blue-600"
                    details={
                        <>
                            Holiday-Segar Method:<br/>
                            100mL/kg for first 10kg<br/>
                            + 50mL/kg for next 10kg<br/>
                            + 20mL/kg for remaining weight
                        </>
                    }
                >
                    <div>
                        <div className="text-2xl font-black text-slate-800">
                            {patient.weight ? calculateFluidMaintenance(patient.weight) : '--'}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Daily Requirement</p>
                    </div>
                </Card>

                {/* 2. Shock Management */}
                <Card 
                    id="shock"
                    title="Septic Shock Protocol" 
                    icon={HeartPulse} 
                    colorClass="text-red-600"
                    showNorEpi={true}
                    details={
                        <>
                            <strong>Fluid Bolus:</strong> 30 mL/kg Crystalloid (within 3h).<br/>
                            <strong>Vasopressor:</strong> Norepinephrine 0.05-3.3 mcg/kg/min.<br/>
                            Weight-based dosing.
                        </>
                    }
                >
                    <div className="space-y-2">
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase">Fluid Bolus (3hr)</span>
                            <div className="text-xl font-bold text-slate-800">
                                {patient.weight ? calculateShockFluidBolus(patient.weight) : '--'}
                            </div>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase">Norepinephrine Range</span>
                            <div className="text-md font-bold text-slate-800 bg-red-50 px-2 py-1 rounded inline-block text-red-700">
                                {patient.weight ? calculateShockVasopressor(patient.weight) : '--'}
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 5. CrCl Info */}
                <Card 
                    id="crcl_info"
                    title="CrCl Methodology"
                    icon={Scale}
                    colorClass="text-teal-600"
                    educationContent={<CrClEducation />}
                >
                    <div className="text-sm font-medium text-slate-600">
                        Cockcroft-Gault Formula guide.
                    </div>
                </Card>

                 {/* 6. Liver Info */}
                <Card 
                    id="liver_info"
                    title="Child-Pugh Scoring"
                    icon={Brain}
                    colorClass="text-indigo-600"
                    educationContent={<ChildPughEducation />}
                >
                    <div className="text-sm font-medium text-slate-600">
                        Scoring parameters guide.
                    </div>
                </Card>

                {/* 3. Hypernatremia Manager */}
                <Card 
                    id="hypernatremia"
                    title="Hypernatremia (>145)" 
                    icon={Activity} 
                    colorClass="text-orange-600"
                    details={
                        <>
                            <strong>Water Deficit (L):</strong><br/>
                            TBW × ((Serum Na / 140) - 1)<br/>
                            TBW = Weight × (0.6 Male / 0.5 Female)
                        </>
                    }
                >
                     <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">Free Water Deficit</span>
                        <div className="text-xl font-bold text-slate-800">
                             {patient.weight && patient.sodium > 145 ? hyperData.deficit : 'N/A'}
                        </div>
                    </div>
                    {patient.weight && patient.sodium > 145 && (
                        <div className="p-2 bg-orange-50 rounded border border-orange-100 mt-2">
                            <span className="text-xs font-bold text-orange-800 uppercase block">Correction Rate (D5W)</span>
                            <div className="text-sm font-bold text-orange-900">
                                {hyperData.rate}
                            </div>
                            <p className="text-[10px] text-orange-700 mt-1">Goal: Lower Na max 10 mEq/L/day</p>
                        </div>
                    )}
                </Card>

                 {/* 4. Hyponatremia Manager */}
                 <Card 
                    id="hyponatremia"
                    title="Hyponatremia (<135)" 
                    icon={AlertCircle} 
                    colorClass="text-purple-600"
                    details={
                        <>
                            <strong>Sodium Deficit (mEq):</strong><br/>
                            TBW × (Target Na - Serum Na)<br/>
                            Target usually 135 mEq/L
                        </>
                    }
                >
                     <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">Na Deficit (Target 135)</span>
                        <div className="text-xl font-bold text-slate-800">
                             {patient.weight && patient.sodium < 135 && patient.sodium > 0 ? sodiumDeficit : 'N/A'}
                        </div>
                    </div>
                     {patient.weight && patient.sodium < 135 && patient.sodium > 0 && (
                        <div className="p-2 bg-purple-50 rounded border border-purple-100 mt-2">
                            <p className="text-[10px] text-purple-700 font-bold">
                                ⚠ Max Correction: <br/> 8-10 mEq/L in 24h
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ToolsPanel;