import React from 'react';
import { PatientData, Gender } from '../types';
import { User, Activity, Droplets, Brain } from 'lucide-react';

interface Props {
  data: PatientData;
  onChange: (field: keyof PatientData, value: any) => void;
}

const PatientForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    onChange(name as keyof PatientData, parsedValue);
  };

  const inputClass = "w-full px-4 py-2 rounded-lg bg-white border-2 border-slate-200 focus:border-blue-600 focus:ring-0 outline-none transition font-medium text-slate-800";
  const labelClass = "block text-sm font-bold text-slate-700 mb-1.5";

  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 space-y-8">
      <div>
        <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2 border-b-2 border-blue-50 pb-4 mb-6">
          <User className="w-6 h-6 text-blue-600" />
          Patient Demographics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className={labelClass}>Age (years)</label>
            <input
              type="number"
              name="age"
              value={data.age || ''}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={data.weight || ''}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Gender</label>
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value={Gender.Male}>Male</option>
              <option value={Gender.Female}>Female</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2 mb-6 border-b-2 border-blue-50 pb-4">
          <Activity className="w-6 h-6 text-purple-600" />
          Clinical Parameters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Renal & Hepatic Group */}
          <div className="space-y-5 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h3 className="text-xs font-black uppercase text-blue-500 tracking-wider flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div> Organ Function
            </h3>
            <div>
              <label className={labelClass}>Serum Creatinine (mg/dL)</label>
              <input type="number" step="0.1" name="scr" value={data.scr || ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Total Bilirubin (mg/dL)</label>
              <input type="number" step="0.1" name="bilirubin" value={data.bilirubin || ''} onChange={handleChange} className={inputClass} />
            </div>
             <div>
              <label className={labelClass}>Albumin (g/dL)</label>
              <input type="number" step="0.1" name="albumin" value={data.albumin || ''} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          {/* Electrolytes & Coag Group */}
          <div className="space-y-5 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h3 className="text-xs font-black uppercase text-purple-500 tracking-wider flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div> Labs
            </h3>
            <div>
              <label className={labelClass}>INR</label>
              <input type="number" step="0.1" name="inr" value={data.inr || ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Sodium (Na+) mEq/L</label>
              <input type="number" step="1" name="sodium" value={data.sodium || ''} onChange={handleChange} className={inputClass} placeholder="e.g. 140" />
            </div>
            <div>
              <label className={labelClass}>Potassium (K+) mEq/L</label>
              <input type="number" step="0.1" name="potassium" value={data.potassium || ''} onChange={handleChange} className={inputClass} placeholder="e.g. 4.0" />
            </div>
          </div>

          {/* Clinical State Group */}
          <div className="space-y-5 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-500"></div> Clinical Signs
            </h3>
            <div>
              <label className={`${labelClass} flex items-center gap-1`}>
                <Droplets className="w-4 h-4 text-sky-500" /> Ascites
              </label>
              <select name="ascites" value={data.ascites} onChange={handleChange} className={inputClass}>
                <option value="None">Absent</option>
                <option value="Mild">Mild</option>
                <option value="Moderate/Severe">Moderate/Severe</option>
              </select>
            </div>
            <div>
              <label className={`${labelClass} flex items-center gap-1`}>
                <Brain className="w-4 h-4 text-pink-500" /> Encephalopathy
              </label>
               <select name="encephalopathy" value={data.encephalopathy} onChange={handleChange} className={inputClass}>
                <option value="None">None</option>
                <option value="Grade 1-2">Grade 1-2</option>
                <option value="Grade 3-4">Grade 3-4</option>
              </select>
            </div>
          </div>
        </div>
      </div>
       <div>
          <label className={labelClass}>History of Diseases / Medications</label>
          <textarea
            name="history"
            value={data.history}
            onChange={handleChange}
            className={`${inputClass} h-24 resize-none`}
            placeholder="e.g. Hypertension, Type 2 Diabetes, currently on Metformin..."
          />
        </div>
    </div>
  );
};

export default PatientForm;