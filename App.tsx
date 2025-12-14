import React, { useState, useEffect } from 'react';
import { PatientData, Gender, CalculationResult, ChildPughClass, Drug } from './types';
import { calculateCrCl, calculateChildPugh, calculateBMI } from './utils/calculators';
import PatientForm from './components/PatientForm';
import CalculatorResults from './components/CalculatorResults';
import DrugSelector from './components/DrugSelector';
import DrugReport from './components/DrugReport';
import ProtocolViewer from './components/ProtocolViewer';
import ToolsPanel from './components/ToolsPanel';
import { LayoutDashboard, FlaskConical, Stethoscope, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'protocols'>('dashboard');
  
  const [patient, setPatient] = useState<PatientData>({
    name: '',
    age: 0,
    weight: 0,
    gender: Gender.Male,
    scr: 0,
    bilirubin: 0,
    albumin: 0,
    inr: 0,
    sodium: 0,
    potassium: 0,
    ascites: 'None',
    encephalopathy: 'None',
    history: ''
  });

  const [results, setResults] = useState<CalculationResult>({
    crCl: 0,
    childPughScore: 0,
    childPughClass: ChildPughClass.A,
    bmi: 0
  });

  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);

  // Real-time calculation effect
  useEffect(() => {
    const crCl = calculateCrCl(patient.age, patient.weight, patient.scr, patient.gender);
    const cp = calculateChildPugh(
      patient.bilirubin,
      patient.albumin,
      patient.inr,
      patient.ascites,
      patient.encephalopathy
    );
    const bmi = calculateBMI(patient.weight);

    setResults({
      crCl,
      childPughScore: cp.score,
      childPughClass: cp.class,
      bmi
    });
  }, [patient]);

  const handlePatientChange = (field: keyof PatientData, value: any) => {
    setPatient(prev => ({ ...prev, [field]: value }));
  };

  const addDrug = (drug: Drug) => {
    if (!selectedDrugs.find(d => d.id === drug.id)) {
      setSelectedDrugs(prev => [...prev, drug]);
    }
  };

  const removeDrug = (id: string) => {
    setSelectedDrugs(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-slate-50 text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-[#0f172a] text-white flex-shrink-0 flex flex-col shadow-2xl z-20">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-2xl font-bold flex items-center gap-3 text-white tracking-tight">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-blue-500/30">
                <Stethoscope className="w-6 h-6 text-white" />
            </div>
            MediGuard
          </h1>
          <p className="text-xs text-blue-200 mt-2 font-medium opacity-80">Advanced Clinical Decision Support</p>
        </div>
        
        <nav className="p-4 space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 group ${activeTab === 'dashboard' ? 'bg-blue-600 shadow-lg shadow-blue-900/50 text-white' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-white' : 'text-blue-400 group-hover:text-white'}`} />
            <span className="font-semibold">Clinical Dashboard</span>
          </button>
          
          <button 
             onClick={() => setActiveTab('protocols')}
             className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 group ${activeTab === 'protocols' ? 'bg-purple-600 shadow-lg shadow-purple-900/50 text-white' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <FlaskConical className={`w-5 h-5 ${activeTab === 'protocols' ? 'text-white' : 'text-purple-400 group-hover:text-white'}`} />
             <span className="font-semibold">Protocols & Tools</span>
          </button>
        </nav>

        <div className="p-6 bg-[#020617]">
             <div className="text-xs text-slate-500 text-center">v2.1.0 • Evidence Based</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen bg-slate-50">
        {activeTab === 'dashboard' ? (
          <div className="max-w-[1600px] mx-auto space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Left Column: Input & Analysis (8 cols) */}
              <div className="xl:col-span-8 space-y-8">
                <PatientForm data={patient} onChange={handlePatientChange} />
                <ToolsPanel patient={patient} />
                <DrugReport 
                  drugs={selectedDrugs} 
                  results={results} 
                  onRemove={removeDrug} 
                  patientName={patient.name}
                />
              </div>

              {/* Right Column: Results & Tools (4 cols) */}
              <div className="xl:col-span-4 space-y-8">
                <div className="sticky top-8 space-y-8">
                    <CalculatorResults results={results} />
                    <DrugSelector onSelect={addDrug} selectedDrugs={selectedDrugs} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto py-8">
             <div className="flex items-center justify-between mb-8">
                 <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Clinical Reference Protocols</h2>
                 <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Updated 2025</span>
             </div>
             
             <ProtocolViewer />
             
             <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 shadow-inner">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    Medical Disclaimer
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    This application is a support tool for qualified healthcare professionals. 
                    Dosages and protocols should be verified against institutional guidelines and the specific clinical context of the patient.
                </p>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;