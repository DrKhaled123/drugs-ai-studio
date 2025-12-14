import React, { useState } from 'react';
import { ProtocolSection } from '../types';
import { ChevronDown, ChevronRight, TestTube, Zap, Stethoscope, AlertTriangle, Info, CheckCircle2, XCircle, Pill } from 'lucide-react';

const ELECTROLYTE_DATA: ProtocolSection[] = [
    {
        title: '💧 Fluid Balance Calculations',
        color: 'border-blue-600 text-blue-900',
        content: (
            <div className="space-y-4 text-slate-800">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-2 border-b border-blue-100 pb-1">1. Maintenance Fluid (4-2-1 Rule)</h4>
                    <p className="text-sm mb-2">Estimates fluid required to maintain metabolic function at rest.</p>
                    <ul className="text-sm list-disc pl-4 space-y-1 mb-2">
                        <li><strong>0–10 kg:</strong> 4 mL/kg/hr</li>
                        <li><strong>10–20 kg:</strong> 40 mL + 2 mL/kg/hr (for every kg &gt; 10)</li>
                        <li><strong>&gt;20 kg:</strong> 60 mL + 1 mL/kg/hr (for every kg &gt; 20)</li>
                    </ul>
                    <div className="bg-blue-50 p-2 rounded text-sm font-semibold text-blue-800 border border-blue-100">
                        Quick Adult Shortcut (&gt;20kg): Weight (kg) + 40 = mL/hr
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-2 border-b border-purple-100 pb-1">2. Fluid Deficit (Dehydration)</h4>
                    <p className="text-sm mb-2 font-medium"><strong>Formula:</strong> Deficit (L) = Weight (kg) × (% Dehydration / 100)</p>
                    <table className="w-full text-sm border-collapse border border-slate-300 mt-3 shadow-sm">
                        <thead className="bg-purple-100 text-purple-900">
                            <tr>
                                <th className="p-3 border border-slate-300 text-left font-bold">Severity</th>
                                <th className="p-3 border border-slate-300 text-left font-bold">Signs</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <tr>
                                <td className="p-3 border border-slate-300 font-bold text-purple-900">Mild (3-5%)</td>
                                <td className="p-3 border border-slate-300 text-purple-800">Mucosa slightly dry</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-300 font-bold text-purple-900">Moderate (6-9%)</td>
                                <td className="p-3 border border-slate-300 text-purple-800">Tachycardia, sunken eyes, delayed refill</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-300 font-bold text-purple-900">Severe (&gt;10%)</td>
                                <td className="p-3 border border-slate-300 text-purple-800">Hypotension, cool extremities (Shock)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    },
    {
        title: '⚡ Sodium (Na+) Management',
        color: 'border-yellow-600 text-yellow-900',
        content: (
            <div className="space-y-4 text-slate-800">
                <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-red-900 text-sm font-bold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0"/>
                    <span>CRITICAL: Max correction 8 mEq/L per 24h to prevent ODS / Cerebral Edema.</span>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-2">Adrogue-Madias Formula (Change per Liter)</h4>
                    <div className="bg-purple-50 p-3 rounded text-center font-mono text-sm mb-3 border border-purple-100 font-bold text-purple-900">
                        Change in Na = (Infusate Na - Serum Na) / (TBW + 1)
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-slate-50 border border-slate-200 rounded"><strong>TBW Estimates:</strong><br/>Men: 0.6 × Wt<br/>Women/Elderly: 0.5 × Wt</div>
                        <div className="p-2 bg-slate-50 border border-slate-200 rounded"><strong>Infusate Na Content:</strong><br/>3% Saline: 513 mEq/L<br/>NS (0.9%): 154 mEq/L<br/>LR: 130 mEq/L<br/>0.45% NS: 77 mEq/L</div>
                    </div>
                </div>

                <table className="w-full text-sm border-collapse border border-slate-300 shadow-sm">
                    <thead className="bg-yellow-50 text-purple-900">
                        <tr>
                            <th className="p-3 border border-slate-300 text-left font-bold">Condition</th>
                            <th className="p-3 border border-slate-300 text-left font-bold">Management</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr>
                            <td className="p-3 border border-slate-300 align-top">
                                <strong className="text-purple-900 text-base block mb-1">Hyponatremia</strong> <span className="text-xs font-mono bg-purple-100 text-purple-800 px-1 rounded">&lt;135</span><br/>
                                <span className="text-xs text-red-700 font-bold mt-1 inline-block">Risk: Cerebral Edema</span>
                            </td>
                            <td className="p-3 border border-slate-300 align-top">
                                <ul className="list-disc pl-4 space-y-1 text-purple-800">
                                    <li><strong>Hypovolemic:</strong> 0.9% NaCl</li>
                                    <li><strong>Euvolemic (SIADH):</strong> Fluid restrict</li>
                                    <li><strong>Severe (Seizures):</strong> 3% Hypertonic Saline bolus</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 border border-slate-300 align-top">
                                <strong className="text-purple-900 text-base block mb-1">Hypernatremia</strong> <span className="text-xs font-mono bg-purple-100 text-purple-800 px-1 rounded">&gt;145</span><br/>
                                <span className="text-xs text-red-700 font-bold mt-1 inline-block">Risk: Brain Hemorrhage</span>
                            </td>
                            <td className="p-3 border border-slate-300 align-top text-purple-800">
                                <strong>Free Water Deficit:</strong> TBW × ((Na/140) - 1)<br/>
                                Give D5W or oral water. Max drop 0.5 mEq/L/hr.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        title: '🍌 Potassium (K+) Management',
        color: 'border-orange-600 text-orange-900',
        content: (
            <div className="space-y-4 text-slate-800">
                <table className="w-full text-sm border-collapse border border-slate-300 shadow-sm">
                    <thead className="bg-orange-50 text-purple-900">
                        <tr>
                            <th className="p-3 border border-orange-200 text-left font-bold">Level</th>
                            <th className="p-3 border border-orange-200 text-left font-bold">Protocol</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr>
                            <td className="p-3 border border-slate-300 align-top">
                                <strong className="text-purple-900 block">Hypokalemia</strong>
                                <span className="text-xs font-mono bg-purple-100 text-purple-800 px-1 rounded">&lt;3.5</span><br/>
                                <span className="text-xs text-red-700 font-bold mt-1 inline-block">Risk: Arrhythmia</span>
                            </td>
                            <td className="p-3 border border-slate-300 align-top text-purple-800">
                                1. <strong>Oral KCl:</strong> Preferred for mild-mod.<br/>
                                2. <strong>IV KCl:</strong> For severe (&lt;2.5). Max rate 10 mEq/hr peripheral. Never IV push.<br/>
                                <em className="text-xs text-slate-500 mt-1 block">Note: Check Mg++ levels.</em>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 border border-slate-300 align-top">
                                <strong className="text-purple-900 block">Hyperkalemia</strong>
                                <span className="text-xs font-mono bg-purple-100 text-purple-800 px-1 rounded">&gt;5.0</span><br/>
                                <span className="text-xs text-red-700 font-bold mt-1 inline-block">Risk: Cardiac Arrest</span>
                            </td>
                            <td className="p-3 border border-slate-300 align-top text-purple-800">
                                1. <strong>Stabilize:</strong> Ca Gluconate IV.<br/>
                                2. <strong>Shift:</strong> Insulin 10U + D50W.<br/>
                                3. <strong>Remove:</strong> Lasix, Kayexalate, Dialysis.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        title: '🦴 Calcium, Magnesium, Phosphate',
        color: 'border-slate-600 text-slate-900',
        content: (
            <div className="space-y-6 text-slate-800">
                {/* Magnesium */}
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-900 border-b border-slate-200 mb-2 pb-1">Magnesium (Mg++) Normal: 1.5-2.5</h4>
                    <ul className="text-sm list-disc pl-4 space-y-2">
                        <li><strong>Hypo (&lt;1.5):</strong> <span className="text-red-700 font-bold text-xs">Torsades Risk.</span> IV Mag Sulfate 1-2g over 1h.</li>
                        <li><strong>Hyper (&gt;2.5):</strong> Loss of reflexes. Calcium Gluconate to reverse neuromuscular effects.</li>
                    </ul>
                </div>
                
                {/* Calcium */}
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-900 border-b border-slate-200 mb-2 pb-1">Calcium (Ca++) Normal: 8.5-10.5</h4>
                    <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-700 mb-2 border border-slate-100">Corrected Ca = Measured Ca + 0.8 × (4.0 - Albumin)</div>
                    <ul className="text-sm list-disc pl-4 space-y-2">
                        <li><strong>Hypo (&lt;8.5):</strong> Tetany. IV Ca Gluconate. Correct Mg first.</li>
                        <li><strong>Hyper (&gt;10.5):</strong> Stones, confusion. Fluids (NS) + Lasix. Bisphosphonates.</li>
                    </ul>
                </div>

                {/* Phosphate */}
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-900 border-b border-slate-200 mb-2 pb-1">Phosphate (PO4) Normal: 2.5-4.5</h4>
                    <ul className="text-sm list-disc pl-4 space-y-2">
                        <li><strong>Hypo (&lt;2.5):</strong> Resp failure. Oral/IV Phosphate.</li>
                        <li><strong>Hyper (&gt;4.5):</strong> Binders (Sevelamer). Low phos diet.</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        title: '🍬 ICU Glycemic Control',
        color: 'border-teal-600 text-teal-900',
        content: (
            <div className="space-y-4 text-slate-800">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-teal-50 p-3 rounded border border-teal-200">
                        <strong className="block text-teal-900 mb-1">Targets</strong>
                        <ul className="text-sm list-disc pl-4">
                            <li><strong>Goal:</strong> 140-180 mg/dL</li>
                            <li><strong>Initiate Insulin:</strong> If &ge; 180 mg/dL x2</li>
                            <li><strong>Avoid:</strong> &lt; 140 mg/dL (Hypo risk)</li>
                        </ul>
                    </div>
                     <div className="bg-red-50 p-3 rounded border border-red-200">
                        <strong className="block text-red-900 mb-1">Hypoglycemia</strong>
                        <ul className="text-sm list-disc pl-4">
                            <li><strong>Define:</strong> &lt; 70 mg/dL</li>
                            <li><strong>Action:</strong> Stop insulin. D50W IV push. Retest q15min.</li>
                        </ul>
                    </div>
                </div>
                <div className="text-sm">
                    <strong>Protocol:</strong> Use IV Insulin infusion for critically ill (rapid on/off). Transition to SubQ basal-bolus when stable.
                </div>
            </div>
        )
    },
    {
        title: '📝 Full Sheet Treatment Strategy',
        color: 'border-indigo-600 text-indigo-900',
        content: (
            <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm text-slate-800 space-y-3">
                <p><strong>1. Stop Offending Agents:</strong> Discontinue meds causing imbalance (e.g., diuretics).</p>
                <p><strong>2. Specific Order:</strong> Prescribe exact fluid and rate based on calculation.</p>
                <p><strong>3. Emergency Rescue:</strong> Order PRN meds (e.g., Ca Gluconate for hyperkalemia, 3% Saline for seizures).</p>
                <div className="pl-2">
                    <strong>4. Monitoring:</strong>
                    <ul className="list-disc pl-5 mt-1 text-slate-700">
                        <li><strong>Labs:</strong> q2-4h for severe, q6h for stable.</li>
                        <li><strong>Cardiac:</strong> ECG for K/Mg/Ca imbalances.</li>
                        <li><strong>I/O:</strong> Strict output tracking.</li>
                    </ul>
                </div>
                <p><strong>5. Contingency:</strong> "If Na rises &gt;8 in 24h, hold fluids and notify MD."</p>
            </div>
        )
    }
];

const DENTAL_DATA: ProtocolSection[] = [
    {
        title: 'Antibiotics (Systemic) | المضادات الحيوية',
        color: 'border-cyan-600 text-cyan-900',
        content: (
            <div className="space-y-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-900 shadow-sm">
                    <strong>Principle:</strong> Antibiotics are adjuncts to surgical drainage in odontogenic infections. Duration: 3-5 days post-surgery or until symptoms resolve.
                </div>
    
                {/* 1. BETA-LACTAMS */}
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3 border-b border-slate-300 pb-1">1. BETA-LACTAMS & CARBAPENEMS</h3>
                    
                    {/* AUGMENTIN */}
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                        <h4 className="font-bold text-blue-800 text-base mb-2">AUGMENTIN (Amoxicillin/Clavulanate)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-800">
                            <ul className="list-disc pl-4 space-y-1">
                                <li><strong>Generic:</strong> Amoxicillin 875mg + Clavulanic acid 125mg</li>
                                <li><strong>Adult dose:</strong> 875/125 mg PO q12h OR 500/125 mg PO q8h</li>
                                <li><strong>Indications:</strong> First-line for odontogenic infections</li>
                            </ul>
                            <div>
                                <strong className="block text-purple-900 mb-2 font-bold">Renal Adjustment:</strong>
                                <table className="w-full text-xs border-collapse border border-slate-300">
                                    <thead className="bg-purple-100">
                                        <tr>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">CrCl (mL/min)</th>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">Dose</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">>30</td><td className="p-2 border border-slate-300 text-purple-800">Standard</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">10-30</td><td className="p-2 border border-slate-300 text-purple-800">500/125 mg q12h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">&lt;10</td><td className="p-2 border border-slate-300 text-purple-800">250/125 mg q12h</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* UNASYN */}
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                        <h4 className="font-bold text-blue-800 text-base mb-2">UNASYN (Ampicillin/Sulbactam)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-800">
                            <ul className="list-disc pl-4 space-y-1">
                                <li><strong>Dose:</strong> 1.5 - 3 g IV q6h.</li>
                                <li><strong>Alert:</strong> High Na load. Heart Failure risk.</li>
                            </ul>
                            <div>
                                <strong className="block text-purple-900 mb-2 font-bold">Renal Adjustment:</strong>
                                <table className="w-full text-xs border-collapse border border-slate-300">
                                    <thead className="bg-purple-100">
                                        <tr>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">CrCl (mL/min)</th>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">Interval</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">≥30</td><td className="p-2 border border-slate-300 text-purple-800">q6-8h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">15-29</td><td className="p-2 border border-slate-300 text-purple-800">q12h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">5-14</td><td className="p-2 border border-slate-300 text-purple-800">q24h</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    
                    {/* CEFTRIAXONE */}
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                        <h4 className="font-bold text-blue-800 text-base mb-2">CEFTRIAXONE (Rocephin)</h4>
                        <ul className="text-sm text-slate-800 list-disc pl-4 space-y-1 mb-2">
                             <li><strong>Dose:</strong> 1-2g IV/IM q24h.</li>
                             <li><strong>Renal/Hepatic:</strong> No adjustment generally needed.</li>
                             <li><strong>Contraindication:</strong> <strong>Calcium IV</strong> co-administration (Fatal precipitates).</li>
                        </ul>
                    </div>
    
                    {/* CEFEPIME */}
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                        <h4 className="font-bold text-blue-800 text-base mb-2">CEFEPIME (Maxipime)</h4>
                        <div className="text-sm text-slate-800">
                             <p className="mb-2"><strong>Dose:</strong> 2g IV q8h (Severe/Febrile Neutropenia).</p>
                             <div className="mb-2">
                                <strong className="block text-purple-900 text-xs mb-1 font-bold">Renal Adjustment:</strong>
                                <table className="w-full text-xs border-collapse border border-slate-300">
                                    <thead className="bg-purple-100">
                                        <tr>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">CrCl</th>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">Dose</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">>60</td><td className="p-2 border border-slate-300 text-purple-800">2g q8h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">30-60</td><td className="p-2 border border-slate-300 text-purple-800">2g q12h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">11-29</td><td className="p-2 border border-slate-300 text-purple-800">2g q24h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">&lt;11</td><td className="p-2 border border-slate-300 text-purple-800">1g q24h</td></tr>
                                    </tbody>
                                </table>
                             </div>
                             <p className="text-red-700 font-bold text-xs bg-red-50 p-2 rounded border border-red-100 flex items-center gap-1">
                                <AlertTriangle className="w-4 h-4"/> Neurotoxicity risk if not adjusted.
                             </p>
                        </div>
                    </div>

                    {/* MEROPENEM */}
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                        <h4 className="font-bold text-blue-800 text-base mb-2">MEROPENEM (Merrem)</h4>
                        <div className="text-sm text-slate-800 space-y-2">
                            <p><strong>Dose:</strong> 1g IV q8h.</p>
                            <div>
                                <strong className="block text-purple-900 text-xs mb-1 font-bold">Renal Adjustment:</strong>
                                <table className="w-full text-xs border-collapse border border-slate-300">
                                    <thead className="bg-purple-100">
                                        <tr>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">CrCl</th>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">Dose</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">26-50</td><td className="p-2 border border-slate-300 text-purple-800">1g q12h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">10-25</td><td className="p-2 border border-slate-300 text-purple-800">500mg q12h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">&lt;10</td><td className="p-2 border border-slate-300 text-purple-800">500mg q24h</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-xs text-red-900 font-bold bg-red-50 p-2 rounded border border-red-100">
                                 Interaction: Valproic Acid (Seizure Risk).
                            </div>
                        </div>
                     </div>

                    {/* IMIPENEM */}
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                        <h4 className="font-bold text-blue-800 text-base mb-2">IMIPENEM/CILASTATIN (Primaxin)</h4>
                        <div className="text-sm text-slate-800 space-y-2">
                            <p><strong>Dose:</strong> 500mg IV q6h (Max 4g/day).</p>
                            <div>
                                <strong className="block text-purple-900 text-xs mb-1 font-bold">Renal Adjustment:</strong>
                                <table className="w-full text-xs border-collapse border border-slate-300">
                                    <thead className="bg-purple-100">
                                        <tr>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">CrCl</th>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">Dose</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">41-70</td><td className="p-2 border border-slate-300 text-purple-800">500mg q8h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">21-40</td><td className="p-2 border border-slate-300 text-purple-800">250mg q6h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">6-20</td><td className="p-2 border border-slate-300 text-purple-800">250mg q12h</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-red-700 bg-red-50 p-2 rounded border border-red-100 font-bold">⚠️ Higher Seizure Risk than Meropenem.</p>
                        </div>
                     </div>
                </div>
    
                {/* 2. FLUOROQUINOLONES */}
                <div>
                     <h3 className="font-bold text-slate-900 text-lg mb-3 border-b border-slate-300 pb-1">2. FLUOROQUINOLONES</h3>
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-blue-800 text-base mb-2">LEVOFLOXACIN (Levaquin)</h4>
                        <div className="text-sm text-slate-800 space-y-2">
                            <p><strong>Dose:</strong> 750mg q24h.</p>
                            <div>
                                <strong className="block text-purple-900 text-xs mb-1 font-bold">Renal Adjustment:</strong>
                                <table className="w-full text-xs border-collapse border border-slate-300">
                                    <thead className="bg-purple-100">
                                        <tr>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">CrCl</th>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">Dose</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">20-49</td><td className="p-2 border border-slate-300 text-purple-800">750mg q48h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">10-19</td><td className="p-2 border border-slate-300 text-purple-800">750mg q48h (Initial) → 500mg q48h</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-red-50 text-red-900 p-2 rounded border border-red-200 text-xs font-medium">
                                <strong>WARNINGS:</strong> Tendon rupture, QT Prolongation, Neuropathy.
                            </div>
                        </div>
                     </div>
                </div>
    
                 {/* 3. GLYCOPEPTIDES */}
                 <div>
                     <h3 className="font-bold text-slate-900 text-lg mb-3 border-b border-slate-300 pb-1">3. GLYCOPEPTIDES</h3>
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-blue-800 text-base mb-2">TEICOPLANIN (Targocid)</h4>
                        <div className="text-sm text-slate-800 space-y-2">
                             <p><strong>Dose:</strong> 400mg q24h (after loading).</p>
                             <div>
                                <table className="w-full text-xs border-collapse border border-slate-300">
                                    <thead className="bg-purple-100">
                                        <tr>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">CrCl</th>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">Dose</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">40-60</td><td className="p-2 border border-slate-300 text-purple-800">q48h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">&lt;40</td><td className="p-2 border border-slate-300 text-purple-800">q72h</td></tr>
                                    </tbody>
                                </table>
                             </div>
                        </div>
                     </div>
                </div>
    
                {/* 4. OXAZOLIDINONES */}
                 <div>
                     <h3 className="font-bold text-slate-900 text-lg mb-3 border-b border-slate-300 pb-1">4. OXAZOLIDINONES</h3>
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-blue-800 text-base mb-2">LINEZOLID (Zyvox)</h4>
                        <div className="text-sm text-slate-800 space-y-2">
                             <p><strong>Dose:</strong> 600mg q12h. No renal adjustment.</p>
                             <div className="bg-red-50 border-red-200 border p-2 rounded text-xs text-red-900 font-medium">
                                <strong>CRITICAL:</strong> Bone marrow suppression (Plts &lt;150k). Serotonin Syndrome.
                             </div>
                        </div>
                     </div>
                </div>
    
                {/* 5. AMINOGLYCOSIDES */}
                 <div>
                     <h3 className="font-bold text-slate-900 text-lg mb-3 border-b border-slate-300 pb-1">5. AMINOGLYCOSIDES</h3>
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-blue-800 text-base mb-2">AMIKACIN</h4>
                        <div className="text-sm text-slate-800 space-y-2">
                            <p><strong>Dose:</strong> 15 mg/kg q24h. Monitor Levels.</p>
                            <div>
                                <table className="w-full text-xs border-collapse border border-slate-300">
                                    <thead className="bg-purple-100">
                                        <tr>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">CrCl</th>
                                            <th className="p-2 border border-slate-300 text-left font-bold text-purple-900">Dose</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">21-50</td><td className="p-2 border border-slate-300 text-purple-800">10mg/kg q24h</td></tr>
                                        <tr><td className="p-2 border border-slate-300 font-medium text-purple-900">&lt;20</td><td className="p-2 border border-slate-300 text-purple-800">Dose by levels</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="font-bold text-red-700 text-xs mt-2">Nephrotoxic & Ototoxic.</p>
                        </div>
                     </div>
                </div>
    
                 {/* 6. METRONIDAZOLE */}
                 <div>
                     <h3 className="font-bold text-slate-900 text-lg mb-3 border-b border-slate-300 pb-1">6. METRONIDAZOLE</h3>
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-blue-800 text-base mb-2">METRONIDAZOLE (Flagyl)</h4>
                        <div className="text-sm text-slate-800 space-y-2">
                            <p><strong>Dose:</strong> 500mg q8h. Hepatic Impairment: Reduce 50%.</p>
                            <div className="bg-red-50 border-red-200 border p-2 rounded text-xs text-red-900 font-bold">
                                ALCOHOL CONTRAINDICATED (Disulfiram reaction).
                            </div>
                        </div>
                     </div>
                </div>

                 {/* 8. ANTIFUNGALS */}
                 <div>
                     <h3 className="font-bold text-slate-900 text-lg mb-3 border-b border-slate-300 pb-1">7. ANTIFUNGALS</h3>
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-blue-800 text-base mb-2">FLUCONAZOLE</h4>
                        <div className="text-sm text-slate-800 space-y-2">
                            <p><strong>Dose:</strong> 100-400mg q24h. CrCl ≤50: 50% dose.</p>
                             <div className="bg-red-50 border-red-200 border p-2 rounded text-xs text-red-900">
                                 <strong>Interactions:</strong> Warfarin (↑ INR 2x), Phenytoin (↑ levels).
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        )
    },
    {
        title: 'Anticoagulants & Antiplatelets | مضادات التخثر',
        color: 'border-red-600 text-red-900',
        content: (
            <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-900 font-bold">
                    CRITICAL WARNING: NEVER stop anticoagulant therapy without medical consultation. Risk of thromboembolism > bleeding risk in most dental procedures.
                </div>

                {/* 1. WARFARIN */}
                <div>
                     <h3 className="font-bold text-slate-900 text-lg mb-3 border-b border-slate-300 pb-1">1. WARFARIN (Coumadin)</h3>
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-800">
                             <div>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li><strong>Target INR:</strong> 2.0-3.0 (Mechanical valves: 2.5-3.5).</li>
                                    <li><strong>Action:</strong> If INR &lt;3.5, most procedures can be done with local hemostasis.</li>
                                </ul>
                             </div>
                             <div className="bg-slate-50 p-2 rounded border border-slate-100 text-xs">
                                <strong>Interactions (↑ INR):</strong> Metronidazole (Avoid), Fluconazole, Erythromycin, NSAIDs.
                             </div>
                        </div>
                     </div>
                </div>

                {/* 2. DOACs */}
                <div>
                     <h3 className="font-bold text-slate-900 text-lg mb-3 border-b border-slate-300 pb-1">2. DIRECT ORAL ANTICOAGULANTS (DOACs)</h3>
                     
                     {/* RIVAROXABAN */}
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                        <h4 className="font-bold text-blue-800 text-base mb-2">RIVAROXABAN (Xarelto)</h4>
                        <div className="text-sm text-slate-800 space-y-2">
                             <p><strong>Dose:</strong> 20mg q24h. Indication: AFib, DVT/PE.</p>
                             <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                 <strong>Dental Management:</strong>
                                 <ul className="list-disc pl-4 mt-1">
                                     <li>Low Risk: Continue.</li>
                                     <li>High Risk: Stop 24h before (if normal kidneys). Resume 24h after.</li>
                                 </ul>
                             </div>
                        </div>
                     </div>

                     {/* APIXABAN */}
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-blue-800 text-base mb-2">APIXABAN (Eliquis)</h4>
                         <div className="text-sm text-slate-800 space-y-2">
                             <p><strong>Dose:</strong> 5mg BID. (2.5mg if Elderly/Low Wt/Renal).</p>
                             <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                 <strong>Dental Management:</strong>
                                 <ul className="list-disc pl-4 mt-1">
                                     <li>Low Risk: Continue.</li>
                                     <li>High Risk: Stop 24-48h before. Resume 24h after.</li>
                                 </ul>
                             </div>
                        </div>
                     </div>
                </div>
            </div>
        )
    },
    {
        title: 'Neuro & Anti-Epileptics | الأدوية العصبية',
        color: 'border-purple-600 text-purple-900',
        content: (
            <div className="space-y-6">
                {/* 1. PHENYTOIN */}
                <div>
                     <h3 className="font-bold text-slate-900 text-lg mb-3 border-b border-slate-300 pb-1">1. PHENYTOIN (Dilantin)</h3>
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                        <div className="text-sm text-slate-800 space-y-2">
                             <p><strong>Dental Side Effects:</strong> Gingival Hyperplasia (50%). Strict hygiene required.</p>
                             <div className="bg-slate-50 p-2 rounded border border-slate-200 text-xs">
                                <strong>Interactions:</strong>
                                <ul className="list-disc pl-4 mt-1">
                                    <li>Metronidazole & Fluconazole: ↑ Phenytoin toxicity.</li>
                                    <li>Warfarin: Effect unpredictable.</li>
                                </ul>
                             </div>
                             <p className="text-xs"><strong>Hepatic:</strong> Reduce dose 25-50% in impairment.</p>
                        </div>
                     </div>
                </div>

                {/* 2. CARBAMAZEPINE */}
                 <div>
                     <h3 className="font-bold text-slate-900 text-lg mb-3 border-b border-slate-300 pb-1">2. CARBAMAZEPINE (Tegretol)</h3>
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                        <div className="text-sm text-slate-800 space-y-2">
                             <p><strong>Alerts:</strong> Hyponatremia (SIADH), Agranulocytosis.</p>
                             <p><strong>Dental:</strong> Erythromycin/Clarithromycin significantly increase Carbamazepine levels (Toxicity).</p>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
];

const PHARMA_DATA = DENTAL_DATA;

const ProtocolViewer = () => {
    const [category, setCategory] = useState<'electrolyte' | 'dental' | 'pharma'>('electrolyte');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const data = category === 'electrolyte' ? ELECTROLYTE_DATA : (category === 'dental' ? DENTAL_DATA : PHARMA_DATA);

    return (
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden min-h-[600px] flex flex-col">
            {/* Header & Tabs */}
            <div className="bg-white border-b border-blue-100">
                 <div className="p-5 bg-gradient-to-r from-blue-50 to-white flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${
                        category === 'electrolyte' ? 'bg-blue-100 text-blue-600' : 
                        category === 'dental' ? 'bg-purple-100 text-purple-600' :
                        'bg-emerald-100 text-emerald-600'
                    }`}>
                        {category === 'electrolyte' && <TestTube className="w-5 h-5" />}
                        {category === 'dental' && <Stethoscope className="w-5 h-5" />}
                        {category === 'pharma' && <Pill className="w-5 h-5" />}
                    </div>
                    <h3 className="font-bold text-blue-900 text-lg">Clinical Protocols (2025)</h3>
                </div>
                
                <div className="flex text-sm font-semibold overflow-x-auto">
                    <button 
                        onClick={() => { setCategory('electrolyte'); setOpenIndex(0); }}
                        className={`flex-1 py-3 px-4 whitespace-nowrap text-center transition-colors border-b-2 ${category === 'electrolyte' ? 'border-blue-500 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
                    >
                        Electrolytes
                    </button>
                    <button 
                        onClick={() => { setCategory('dental'); setOpenIndex(0); }}
                        className={`flex-1 py-3 px-4 whitespace-nowrap text-center transition-colors border-b-2 ${category === 'dental' ? 'border-purple-500 text-purple-700 bg-purple-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
                    >
                        Dental Care
                    </button>
                    <button 
                        onClick={() => { setCategory('pharma'); setOpenIndex(0); }}
                        className={`flex-1 py-3 px-4 whitespace-nowrap text-center transition-colors border-b-2 ${category === 'pharma' ? 'border-emerald-500 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
                    >
                        Pharmacology & Dosing
                    </button>
                </div>
            </div>

            {/* Content List */}
            <div className="divide-y divide-slate-100 flex-1 bg-white">
                {data.map((item, idx) => (
                    <div key={idx} className="group">
                        <button 
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            className={`w-full flex items-center justify-between p-5 transition-all text-left ${openIndex === idx ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
                        >
                            <span className={`font-semibold text-md flex items-center gap-3 ${item.color || (item.critical ? 'text-red-700' : 'text-slate-800')}`}>
                                {category === 'electrolyte' && item.critical && <Zap className="w-4 h-4 text-red-500 fill-current shrink-0" />}
                                {item.title}
                            </span>
                            {openIndex === idx ? <ChevronDown className="w-5 h-5 text-blue-500 shrink-0"/> : <ChevronRight className="w-5 h-5 text-slate-400 shrink-0"/>}
                        </button>
                        
                        {openIndex === idx && (
                            <div className={`p-5 text-sm text-slate-800 leading-relaxed border-t border-slate-100 animate-in slide-in-from-top-1 bg-white ${item.color ? 'border-l-4 ' + item.color.split(' ')[0] : 'pl-12'}`}>
                                {typeof item.content === 'string' ? (
                                    <div className="whitespace-pre-line">{item.content}</div>
                                ) : (
                                    item.content
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProtocolViewer;