import React, { useState } from 'react';
import { Drug } from '../types';
import { DRUG_DATABASE } from '../data/drugs';
import { Search, Plus } from 'lucide-react';

interface Props {
  onSelect: (drug: Drug) => void;
  selectedDrugs: Drug[];
}

const DrugSelector: React.FC<Props> = ({ onSelect, selectedDrugs }) => {
  const [search, setSearch] = useState('');

  const filteredDrugs = DRUG_DATABASE.filter(d => 
    d.genericName.toLowerCase().includes(search.toLowerCase()) ||
    d.brandNamesEU.some(b => b.toLowerCase().includes(search.toLowerCase())) ||
    d.brandNamesArab.some(b => b.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-100 flex flex-col h-[600px] overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50">
        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            Drug Database
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{filteredDrugs.length}</span>
        </h3>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition" />
          <input
            type="text"
            className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm transition"
            placeholder="Search generic or brand name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-white">
        {filteredDrugs.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-sm">
             <Search className="w-8 h-8 mb-2 opacity-20" />
             No drugs found
           </div>
        ) : (
          filteredDrugs.map(drug => {
             const isSelected = selectedDrugs.some(d => d.id === drug.id);
             return (
              <button
                key={drug.id}
                onClick={() => !isSelected && onSelect(drug)}
                disabled={isSelected}
                className={`w-full text-left p-4 rounded-lg transition-all border flex justify-between items-center group relative ${
                  isSelected 
                    ? 'bg-blue-50 border-blue-100 text-blue-800 opacity-60 cursor-default' 
                    : 'bg-white border-transparent hover:border-blue-100 hover:shadow-md hover:translate-x-1'
                }`}
              >
                <div>
                  <div className="font-bold text-sm text-slate-800">{drug.genericName}</div>
                  <div className="text-xs text-slate-500 mt-1 truncate max-w-[180px]">
                    {drug.brandNamesEU[0]}, {drug.brandNamesArab[0]}...
                  </div>
                </div>
                {!isSelected && (
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-5 h-5" />
                    </div>
                )}
              </button>
             )
          })
        )}
      </div>
    </div>
  );
};

export default DrugSelector;