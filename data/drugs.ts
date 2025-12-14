import { Drug, ChildPughClass } from '../types';

export const DRUG_DATABASE: Drug[] = [
  // --- ANALGESICS & ANESTHETICS ---
  {
    id: 'd1',
    genericName: 'Paracetamol (Acetaminophen)',
    brandNamesEU: ['Panadol', 'Tylenol', 'Dafalgan', 'Efferalgan'],
    brandNamesArab: ['Panadol', 'Adol', 'Febril', 'Tempra', 'Céphyl'],
    indication: 'Pain and fever relief',
    normalDose: '500mg-1000mg every 4-6 hours (Max 4g/day)',
    renalRules: [
        { maxCrCl: 50, minCrCl: 10, adjustment: 'Every 6 hours', type: 'interval' },
        { maxCrCl: 10, adjustment: 'Every 8 hours', type: 'interval' }
    ],
    hepaticRules: [
        { classes: [ChildPughClass.C], adjustment: 'Max 2g/day or Avoid (Glutathione depletion)', type: 'reduction' }
    ],
    contraindications: ['Severe active liver disease'],
    sideEffects: ['Hepatotoxicity (overdose)'],
    interactions: ['Warfarin', 'Alcohol', 'Isoniazid']
  },
  {
    id: 'd_morphine',
    genericName: 'Morphine',
    brandNamesEU: ['MST Continus', 'Sevredol', 'Oramorph', 'Kadian'],
    brandNamesArab: ['MST', 'Sevredol', 'M-Long', 'Morthal'],
    indication: 'Severe Pain',
    normalDose: '10-30mg every 4 hours',
    renalRules: [
        { maxCrCl: 50, adjustment: 'Reduce dose by 50-75% (Metabolite accumulation)', type: 'reduction' }
    ],
    hepaticRules: [
        { classes: [ChildPughClass.B, ChildPughClass.C], adjustment: 'Reduce dose by 50-75% (Low clearance)', type: 'reduction' }
    ],
    contraindications: ['Respiratory depression', 'Ileus'],
    sideEffects: ['Respiratory depression', 'Constipation', 'Sedation'],
    interactions: ['Benzodiazepines', 'Alcohol']
  },
  {
    id: 'd_lidocaine',
    genericName: 'Lidocaine (IV)',
    brandNamesEU: ['Xylocaine', 'Lignox', 'Versatis'],
    brandNamesArab: ['Xylocaine', 'Lignocain', 'Anesthaloc'],
    indication: 'Ventricular Arrhythmias',
    normalDose: 'Maintenance infusion 1-4 mg/min',
    renalRules: [],
    hepaticRules: [
       { classes: [ChildPughClass.C], adjustment: 'Reduce infusion rate by 50%', type: 'reduction' }
    ],
    contraindications: ['Heart block', 'Wolff-Parkinson-White'],
    sideEffects: ['CNS toxicity', 'Bradycardia'],
    interactions: ['Beta-blockers', 'Amiodarone']
  },

  // --- ANTI-INFECTIVES ---
  {
    id: 'd2',
    genericName: 'Amoxicillin',
    brandNamesEU: ['Amoxil', 'Augmentin (with Clav)'],
    brandNamesArab: ['Amoxil', 'Iramox', 'Hiconcil', 'Ospamox'],
    indication: 'Infections',
    normalDose: '250mg-500mg every 8 hours',
    renalRules: [
        { maxCrCl: 30, minCrCl: 10, adjustment: '250-500mg every 12 hours', type: 'interval' },
        { maxCrCl: 10, adjustment: '250-500mg every 24 hours', type: 'interval' }
    ],
    hepaticRules: [],
    contraindications: ['Penicillin allergy'],
    sideEffects: ['Diarrhea', 'Rash'],
    interactions: ['Allopurinol']
  },
  {
    id: 'd_unasyn',
    genericName: 'Ampicillin/Sulbactam',
    brandNamesEU: ['Unasyn'],
    brandNamesArab: ['Unasyn', 'Sulbin'],
    indication: 'Infections',
    normalDose: '1.5 - 3 g IV q6h',
    renalRules: [
        { maxCrCl: 29, minCrCl: 15, adjustment: '1.5-3 g every 12 hours', type: 'interval' },
        { maxCrCl: 14, adjustment: '1.5-3 g every 24 hours', type: 'interval' }
    ],
    hepaticRules: [],
    contraindications: ['Penicillin allergy'],
    sideEffects: ['Diarrhea', 'Rash', 'High Sodium Load'],
    interactions: ['Allopurinol']
  },
  {
    id: 'd_meropenem',
    genericName: 'Meropenem',
    brandNamesEU: ['Merrem'],
    brandNamesArab: ['Merrem', 'Meronem'],
    indication: 'Severe Infections',
    normalDose: '1g IV q8h',
    renalRules: [
        { maxCrCl: 50, minCrCl: 26, adjustment: '1g q12h', type: 'interval' },
        { maxCrCl: 25, minCrCl: 10, adjustment: '500mg q12h', type: 'reduction' },
        { maxCrCl: 10, adjustment: '500mg q24h', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: ['Anaphylaxis to Beta-lactams'],
    sideEffects: ['Seizures (rare)', 'Diarrhea'],
    interactions: ['Valproic Acid (Contraindicated)']
  },
  {
    id: 'd_imipenem',
    genericName: 'Imipenem/Cilastatin',
    brandNamesEU: ['Primaxin'],
    brandNamesArab: ['Tienam'],
    indication: 'Severe Infections',
    normalDose: '500mg IV q6h',
    renalRules: [
        { maxCrCl: 70, minCrCl: 41, adjustment: '500mg q8h', type: 'interval' },
        { maxCrCl: 40, minCrCl: 21, adjustment: '250mg q6h', type: 'reduction' },
        { maxCrCl: 20, adjustment: '250mg q12h', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: ['Seizure history', 'Anaphylaxis to Beta-lactams'],
    sideEffects: ['Seizures', 'Nausea'],
    interactions: ['Valproic Acid', 'Ganciclovir']
  },
  {
    id: 'd_cefepime',
    genericName: 'Cefepime',
    brandNamesEU: ['Maxipime'],
    brandNamesArab: ['Maxipime', 'Cefepime'],
    indication: 'Febrile Neutropenia, Pneumonia',
    normalDose: '2g IV q8h',
    renalRules: [
        { maxCrCl: 60, minCrCl: 30, adjustment: '2g q12h', type: 'interval' },
        { maxCrCl: 29, minCrCl: 11, adjustment: '2g q24h', type: 'interval' },
        { maxCrCl: 10, adjustment: '1g q24h', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: ['Cephalosporin allergy'],
    sideEffects: ['Encephalopathy (in renal failure)'],
    interactions: ['Aminoglycosides']
  },
  {
    id: 'd_levofloxacin',
    genericName: 'Levofloxacin',
    brandNamesEU: ['Levaquin', 'Tavanic'],
    brandNamesArab: ['Tavanic', 'Levanic', 'Unibiotic'],
    indication: 'Pneumonia, UTI',
    normalDose: '750mg IV/PO q24h',
    renalRules: [
        { maxCrCl: 49, minCrCl: 20, adjustment: '750mg q48h', type: 'interval' },
        { maxCrCl: 19, adjustment: '750mg q48h then 500mg q48h', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: ['QT Prolongation history'],
    sideEffects: ['Tendon Rupture', 'QT Prolongation', 'Confusion'],
    interactions: ['Warfarin', 'Antacids', 'Insulin']
  },
  {
    id: 'd_teicoplanin',
    genericName: 'Teicoplanin',
    brandNamesEU: ['Targocid'],
    brandNamesArab: ['Targocid'],
    indication: 'Gram Positive Infections',
    normalDose: '400mg IV q24h',
    renalRules: [
        { maxCrCl: 60, minCrCl: 40, adjustment: 'q48h', type: 'interval' },
        { maxCrCl: 40, adjustment: 'q72h', type: 'interval' }
    ],
    hepaticRules: [],
    contraindications: ['Hypersensitivity'],
    sideEffects: ['Ototoxicity', 'Nephrotoxicity'],
    interactions: ['Aminoglycosides']
  },
  {
    id: 'd3',
    genericName: 'Vancomycin (IV)',
    brandNamesEU: ['Vancocin'],
    brandNamesArab: ['Vancocin', 'Vancomycine'],
    indication: 'MRSA, Severe Gram+ infections',
    normalDose: '15-20 mg/kg every 8-12 hours',
    renalRules: [
        { maxCrCl: 49, minCrCl: 20, adjustment: '15 mg/kg every 24-48 hours', type: 'interval' },
        { maxCrCl: 20, adjustment: 'Dose by levels / post-dialysis', type: 'avoid' }
    ],
    hepaticRules: [],
    contraindications: ['Hypersensitivity'],
    sideEffects: ['Nephrotoxicity', 'Ototoxicity', 'Red Man Syndrome'],
    interactions: ['Aminoglycosides', 'Piperacillin-Tazobactam']
  },
  {
    id: 'd_gentamicin',
    genericName: 'Gentamicin',
    brandNamesEU: ['Cidomycin'],
    brandNamesArab: ['Garamycin', 'Gentam'],
    indication: 'Severe Gram-negative infections',
    normalDose: '3-7 mg/kg once daily',
    renalRules: [
        { maxCrCl: 60, minCrCl: 40, adjustment: 'Every 36 hours', type: 'interval' },
        { maxCrCl: 40, minCrCl: 20, adjustment: 'Every 48 hours', type: 'interval' },
        { maxCrCl: 20, adjustment: 'Dose by levels', type: 'caution' }
    ],
    hepaticRules: [],
    contraindications: ['Myasthenia gravis'],
    sideEffects: ['Nephrotoxicity', 'Ototoxicity'],
    interactions: ['Loop diuretics', 'Vancomycin']
  },
  {
    id: 'd_erythromycin',
    genericName: 'Erythromycin',
    brandNamesEU: ['Erythrocin', 'Ery-Tab', 'Abbotic'],
    brandNamesArab: ['Erythrocin', 'Erythromycin', 'Abbotic'],
    indication: 'Respiratory/Skin infections',
    normalDose: '250-500 mg every 6 hours',
    renalRules: [],
    hepaticRules: [
        { classes: [ChildPughClass.B, ChildPughClass.C], adjustment: 'Reduce dose by 50% (Risk of cholestasis)', type: 'reduction' }
    ],
    contraindications: ['QT prolongation', 'Statins (simvastatin)'],
    sideEffects: ['GI upset', 'QT prolongation'],
    interactions: ['Warfarin', 'Theophylline', 'Statins']
  },
  {
    id: 'd_metronidazole',
    genericName: 'Metronidazole',
    brandNamesEU: ['Flagyl', 'Metronide', 'Zyloprim'],
    brandNamesArab: ['Flagyl', 'Amrizole', 'Dumozol', 'Metrazole'],
    indication: 'Anaerobic infections, C. diff',
    normalDose: '500 mg every 8 hours',
    renalRules: [
        { maxCrCl: 10, adjustment: '50% dose reduction (accumulates in ESRD)', type: 'reduction' }
    ],
    hepaticRules: [
        { classes: [ChildPughClass.C], adjustment: 'Reduce dose by 50% (every 12h)', type: 'reduction' }
    ],
    contraindications: ['First trimester pregnancy', 'Alcohol use'],
    sideEffects: ['Metallic taste', 'Neuropathy (long term)'],
    interactions: ['Alcohol (Disulfiram-like reaction)', 'Warfarin']
  },
  {
    id: 'd_fluconazole',
    genericName: 'Fluconazole',
    brandNamesEU: ['Diflucan', 'Fungoral'],
    brandNamesArab: ['Diflucan', 'Fluzol', 'Funzole', 'Trican'],
    indication: 'Fungal infections (Candida)',
    normalDose: '200-400 mg daily',
    renalRules: [
        { maxCrCl: 50, adjustment: 'Reduce dose by 50%', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: ['QT prolongation co-meds'],
    sideEffects: ['Elevated LFTs', 'QT prolongation'],
    interactions: ['Warfarin', 'Statins', 'Phenytoin']
  },
  {
    id: 'd_rifampicin',
    genericName: 'Rifampicin',
    brandNamesEU: ['Rifadin', 'Rimactane', 'Rofact'],
    brandNamesArab: ['Rifadin', 'Rimactan', 'Rifampicin'],
    indication: 'TB, Prophylaxis',
    normalDose: '600 mg daily',
    renalRules: [],
    hepaticRules: [
        { classes: [ChildPughClass.C], adjustment: 'Reduce by 50% or Avoid', type: 'reduction' }
    ],
    contraindications: ['Active hepatitis'],
    sideEffects: ['Orange fluids', 'Hepatotoxicity'],
    interactions: ['OCPs', 'Warfarin', 'Protease inhibitors']
  },

  // --- ANTICOAGULANTS & ANTIPLATELETS ---
  {
    id: 'd5',
    genericName: 'Warfarin',
    brandNamesEU: ['Coumadin', 'Marevan', 'Jantoven'],
    brandNamesArab: ['Coumadin', 'Marevan', 'Hemofarin'],
    indication: 'Anticoagulation',
    normalDose: 'Target INR 2-3',
    renalRules: [],
    hepaticRules: [
        { classes: [ChildPughClass.A, ChildPughClass.B, ChildPughClass.C], adjustment: 'Reduce dose significantly. Monitor INR closely.', type: 'reduction' }
    ],
    contraindications: ['Active bleeding', 'Pregnancy'],
    sideEffects: ['Bleeding'],
    interactions: ['Many antibiotics', 'Amiodarone']
  },
  {
    id: 'd_rivaroxaban',
    genericName: 'Rivaroxaban',
    brandNamesEU: ['Xarelto'],
    brandNamesArab: ['Xarelto'],
    indication: 'Anticoagulation (DOAC)',
    normalDose: '20 mg daily',
    renalRules: [
        { maxCrCl: 50, minCrCl: 15, adjustment: '15 mg daily', type: 'reduction' },
        { maxCrCl: 15, adjustment: 'Avoid', type: 'avoid' }
    ],
    hepaticRules: [
        { classes: [ChildPughClass.B, ChildPughClass.C], adjustment: 'Contraindicated', type: 'avoid' }
    ],
    contraindications: ['Active bleeding', 'Child-Pugh B/C'],
    sideEffects: ['Bleeding'],
    interactions: ['Ketoconazole', 'Ritonavir']
  },
  {
    id: 'd_apixaban',
    genericName: 'Apixaban',
    brandNamesEU: ['Eliquis'],
    brandNamesArab: ['Eliquis'],
    indication: 'Anticoagulation (DOAC)',
    normalDose: '5 mg BID',
    renalRules: [
         { maxCrCl: 25, adjustment: '2.5 mg BID if: Age>=80 or Wt<=60kg or SCr>=1.5', type: 'caution' }
    ],
    hepaticRules: [
        { classes: [ChildPughClass.C], adjustment: 'Not recommended', type: 'avoid' }
    ],
    contraindications: ['Active bleeding'],
    sideEffects: ['Bleeding'],
    interactions: ['Strong CYP3A4 inhibitors']
  },
  {
    id: 'd_dabigatran',
    genericName: 'Dabigatran',
    brandNamesEU: ['Pradaxa'],
    brandNamesArab: ['Pradaxa'],
    indication: 'Anticoagulation (DOAC)',
    normalDose: '150 mg BID',
    renalRules: [
        { maxCrCl: 30, minCrCl: 15, adjustment: '75 mg BID', type: 'reduction' },
        { maxCrCl: 15, adjustment: 'Contraindicated', type: 'contraindicated' }
    ],
    hepaticRules: [],
    contraindications: ['Mechanical heart valves'],
    sideEffects: ['Gastritis', 'Bleeding'],
    interactions: ['P-gp inhibitors (Verapamil)']
  },
  {
    id: 'd_edoxaban',
    genericName: 'Edoxaban',
    brandNamesEU: ['Lixiana', 'Savaysa'],
    brandNamesArab: ['Lixiana'],
    indication: 'Anticoagulation (DOAC)',
    normalDose: '60 mg daily',
    renalRules: [
        { maxCrCl: 95, minCrCl: 51, adjustment: '60 mg daily', type: 'interval' },
        { maxCrCl: 50, minCrCl: 15, adjustment: '30 mg daily', type: 'reduction' },
        { maxCrCl: 15, adjustment: 'Avoid', type: 'avoid' }
    ],
    hepaticRules: [
        { classes: [ChildPughClass.C], adjustment: 'Not recommended', type: 'avoid' }
    ],
    contraindications: ['CrCl > 95 mL/min (Reduced efficacy)'],
    sideEffects: ['Bleeding', 'Anemia'],
    interactions: ['Rifampin']
  },
  {
    id: 'd_enoxaparin',
    genericName: 'Enoxaparin (LMWH)',
    brandNamesEU: ['Clexane', 'Lovenox'],
    brandNamesArab: ['Clexane'],
    indication: 'DVT Prophylaxis/Treatment',
    normalDose: '1 mg/kg BID (Treatment) or 40mg daily (Prophylaxis)',
    renalRules: [
        { maxCrCl: 30, adjustment: 'Treatment: 1 mg/kg daily. Prophylaxis: 30 mg daily', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: ['HIT History', 'Active Bleeding'],
    sideEffects: ['Bleeding', 'Thrombocytopenia'],
    interactions: ['Antiplatelets']
  },
  {
    id: 'd_heparin',
    genericName: 'Heparin (Unfractionated)',
    brandNamesEU: ['Heparin'],
    brandNamesArab: ['Heparin'],
    indication: 'Anticoagulation',
    normalDose: 'Protocol based (APTT)',
    renalRules: [],
    hepaticRules: [
        { classes: [ChildPughClass.C], adjustment: 'Caution (Reduced synthesis of clotting factors)', type: 'caution' }
    ],
    contraindications: ['Severe thrombocytopenia'],
    sideEffects: ['HIT', 'Bleeding', 'Osteoporosis (Long term)'],
    interactions: ['Nitroglycerin (may decrease heparin effect)']
  },
  {
    id: 'd_clopidogrel',
    genericName: 'Clopidogrel',
    brandNamesEU: ['Plavix', 'Iscover'],
    brandNamesArab: ['Plavix', 'Clopid', 'Myogrel'],
    indication: 'Antiplatelet',
    normalDose: '75 mg daily',
    renalRules: [],
    hepaticRules: [
        { classes: [ChildPughClass.C], adjustment: 'Caution (Prodrug requiring bioactivation)', type: 'caution' }
    ],
    contraindications: ['Active bleeding'],
    sideEffects: ['Bleeding', 'TTP (rare)'],
    interactions: ['Omeprazole/Esomeprazole (Reduce efficacy)', 'NSAIDs']
  },
  {
    id: 'd_ticagrelor',
    genericName: 'Ticagrelor',
    brandNamesEU: ['Brilinta', 'Possia'],
    brandNamesArab: ['Brilinta'],
    indication: 'Antiplatelet (ACS)',
    normalDose: '90 mg BID',
    renalRules: [],
    hepaticRules: [
        { classes: [ChildPughClass.C], adjustment: 'Avoid', type: 'avoid' }
    ],
    contraindications: ['History of intracranial hemorrhage'],
    sideEffects: ['Dyspnea', 'Bleeding'],
    interactions: ['Strong CYP3A4 inhibitors']
  },

  // --- CARDIOVASCULAR (Others) ---
  {
    id: 'd_enalapril',
    genericName: 'Enalapril',
    brandNamesEU: ['Renitec'],
    brandNamesArab: ['Renitec', 'Ezaprill'],
    indication: 'Hypertension, Heart Failure',
    normalDose: '5-20 mg daily',
    renalRules: [
        { maxCrCl: 30, minCrCl: 10, adjustment: 'Start 2.5 mg daily', type: 'reduction' },
        { maxCrCl: 10, adjustment: '2.5 mg on dialysis days', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: ['History of angioedema', 'Pregnancy'],
    sideEffects: ['Cough', 'Hyperkalemia', 'Angioedema'],
    interactions: ['NSAIDs', 'Potassium supplements']
  },
  {
    id: 'd_digoxin',
    genericName: 'Digoxin',
    brandNamesEU: ['Lanoxin'],
    brandNamesArab: ['Lanoxin', 'Cardixin'],
    indication: 'AFib, Heart Failure',
    normalDose: '0.125-0.25 mg daily',
    renalRules: [
        { maxCrCl: 50, minCrCl: 10, adjustment: '0.125 mg daily or 0.25 mg q48h', type: 'reduction' },
        { maxCrCl: 10, adjustment: '0.0625 mg daily or 0.125 mg 3x/week', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: ['VFib'],
    sideEffects: ['Arrhythmia', 'Nausea', 'Visual disturbances'],
    interactions: ['Amiodarone', 'Verapamil', 'Macrolides']
  },
  {
    id: 'd_sotalol',
    genericName: 'Sotalol',
    brandNamesEU: ['Betapace', 'Sotacor'],
    brandNamesArab: ['Betapace', 'Sotacor'],
    indication: 'Arrhythmias',
    normalDose: '80-160 mg BID',
    renalRules: [
        { maxCrCl: 60, minCrCl: 40, adjustment: 'Every 24h', type: 'interval' },
        { maxCrCl: 40, minCrCl: 20, adjustment: 'Every 36h', type: 'interval' },
        { maxCrCl: 20, adjustment: 'Every 48h or Avoid', type: 'interval' }
    ],
    hepaticRules: [],
    contraindications: ['Asthma', 'QT prolongation', 'Bradychardia'],
    sideEffects: ['Bradycardia', 'Torsades de Pointes'],
    interactions: ['QT prolonging drugs']
  },
  {
    id: 'd7',
    genericName: 'Simvastatin',
    brandNamesEU: ['Zocor', 'Lipostat', 'Simvacor'],
    brandNamesArab: ['Zocor', 'Simva', 'Simvator'],
    indication: 'Hyperlipidemia',
    normalDose: '10-40 mg daily',
    renalRules: [
        { maxCrCl: 30, adjustment: 'Start 5mg, caution', type: 'reduction' }
    ],
    hepaticRules: [
        { classes: [ChildPughClass.B, ChildPughClass.C], adjustment: 'Avoid', type: 'avoid' },
        { classes: [ChildPughClass.A], adjustment: 'Max 20 mg/day', type: 'reduction' }
    ],
    contraindications: ['Active liver disease'],
    sideEffects: ['Myopathy', 'Rhabdomyolysis'],
    interactions: ['CYP3A4 inhibitors', 'Gemfibrozil']
  },
  {
    id: 'd_atorvastatin',
    genericName: 'Atorvastatin',
    brandNamesEU: ['Lipitor', 'Sortis', 'Torvast'],
    brandNamesArab: ['Lipitor', 'Ator', 'Sortis'],
    indication: 'Hyperlipidemia',
    normalDose: '10-80 mg daily',
    renalRules: [],
    hepaticRules: [
        { classes: [ChildPughClass.B, ChildPughClass.C], adjustment: 'Avoid', type: 'avoid' },
        { classes: [ChildPughClass.A], adjustment: 'Max 20 mg/day', type: 'reduction' }
    ],
    contraindications: ['Active liver disease'],
    sideEffects: ['Myopathy', 'Liver enzyme elevation'],
    interactions: ['CYP3A4 inhibitors']
  },
  {
    id: 'd_rosuvastatin',
    genericName: 'Rosuvastatin',
    brandNamesEU: ['Crestor'],
    brandNamesArab: ['Crestor', 'Rosuvast'],
    indication: 'Hyperlipidemia',
    normalDose: '5-40 mg daily',
    renalRules: [
        { maxCrCl: 30, adjustment: 'Start 5mg, Max 10mg', type: 'reduction' }
    ],
    hepaticRules: [
        { classes: [ChildPughClass.C], adjustment: 'Avoid', type: 'avoid' }
    ],
    contraindications: ['Active liver disease'],
    sideEffects: ['Myopathy', 'Rhabdomyolysis'],
    interactions: ['Gemfibrozil']
  },
  {
    id: 'd_pravastatin',
    genericName: 'Pravastatin',
    brandNamesEU: ['Pravachol', 'Lipostat'],
    brandNamesArab: ['Pravachol', 'Lipostat'],
    indication: 'Hyperlipidemia',
    normalDose: '10-40 mg daily',
    renalRules: [
         { maxCrCl: 30, adjustment: 'Start 10mg, Max 20mg', type: 'reduction' }
    ],
    hepaticRules: [
        { classes: [ChildPughClass.C], adjustment: 'Caution', type: 'caution' }
    ],
    contraindications: ['Active liver disease'],
    sideEffects: ['Myopathy'],
    interactions: ['Cyclosporine']
  },

  // --- NEURO & ANTI-EPILEPTICS ---
  {
    id: 'd4',
    genericName: 'Diazepam',
    brandNamesEU: ['Valium', 'Stesolid', 'Apozepam'],
    brandNamesArab: ['Valium', 'Calm-Pax', 'Neuril', 'Temesta'],
    indication: 'Anxiety, Seizures',
    normalDose: '2-10 mg 2-4x daily',
    renalRules: [],
    hepaticRules: [
        { classes: [ChildPughClass.A, ChildPughClass.B], adjustment: 'Reduce dose 50%', type: 'reduction' },
        { classes: [ChildPughClass.C], adjustment: 'Avoid (HE Risk)', type: 'avoid' }
    ],
    contraindications: ['Severe hepatic insufficiency', 'Myasthenia gravis'],
    sideEffects: ['Sedation', 'Respiratory depression'],
    interactions: ['Alcohol', 'Opioids']
  },
  {
    id: 'd_gabapentin',
    genericName: 'Gabapentin',
    brandNamesEU: ['Neurontin'],
    brandNamesArab: ['Neurontin', 'Gaptin', 'Convertin'],
    indication: 'Neuropathic pain, Seizures',
    normalDose: '300-600 mg TID',
    renalRules: [
        { maxCrCl: 60, minCrCl: 30, adjustment: '200-700 mg BID', type: 'reduction' },
        { maxCrCl: 30, minCrCl: 15, adjustment: '200-700 mg daily', type: 'reduction' },
        { maxCrCl: 15, adjustment: '100-300 mg daily', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: [],
    sideEffects: ['Somnolence', 'Dizziness', 'Ataxia'],
    interactions: ['Opioids (sedation)']
  },
  {
    id: 'd_pregabalin',
    genericName: 'Pregabalin',
    brandNamesEU: ['Lyrica'],
    brandNamesArab: ['Lyrica', 'Pregaval', 'Kemirica'],
    indication: 'Neuropathic pain, Seizures',
    normalDose: '75-150 mg BID',
    renalRules: [
        { maxCrCl: 60, minCrCl: 30, adjustment: '75-150 mg daily', type: 'reduction' },
        { maxCrCl: 30, minCrCl: 15, adjustment: '25-75 mg daily', type: 'reduction' },
        { maxCrCl: 15, adjustment: '25-50 mg daily', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: [],
    sideEffects: ['Edema', 'Weight gain', 'Dizziness'],
    interactions: ['CNS depressants']
  },
  {
    id: 'd_levetiracetam',
    genericName: 'Levetiracetam',
    brandNamesEU: ['Keppra'],
    brandNamesArab: ['Keppra', 'Epitam', 'Levepsy'],
    indication: 'Seizures',
    normalDose: '500-1000 mg BID',
    renalRules: [
        { maxCrCl: 80, minCrCl: 50, adjustment: '500-1000 mg every 12h', type: 'interval' },
        { maxCrCl: 50, minCrCl: 30, adjustment: '250-750 mg every 12h', type: 'reduction' },
        { maxCrCl: 30, adjustment: '250-500 mg every 12h', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: ['Hypersensitivity'],
    sideEffects: ['Irritability', 'Somnolence'],
    interactions: ['Few interactions']
  },
  {
    id: 'd_carbamazepine',
    genericName: 'Carbamazepine',
    brandNamesEU: ['Tegretol'],
    brandNamesArab: ['Tegretol'],
    indication: 'Seizures, Trigeminal Neuralgia',
    normalDose: '200-400 mg BID/TID',
    renalRules: [
        { maxCrCl: 10, adjustment: '75% of dose', type: 'reduction' }
    ],
    hepaticRules: [
        { classes: [ChildPughClass.C], adjustment: 'Monitor closely or Avoid', type: 'caution' }
    ],
    contraindications: ['Bone marrow depression', 'MAOI use'],
    sideEffects: ['Hyponatremia (SIADH)', 'Rash (SJS)', 'Agranulocytosis'],
    interactions: ['Potent enzyme inducer (Warfarin, OCPs)']
  },
  {
    id: 'd_valproic',
    genericName: 'Valproic Acid',
    brandNamesEU: ['Depakine'],
    brandNamesArab: ['Depakine', 'Valparin'],
    indication: 'Seizures, Bipolar',
    normalDose: '15-60 mg/kg/day',
    renalRules: [],
    hepaticRules: [
        { classes: [ChildPughClass.A, ChildPughClass.B, ChildPughClass.C], adjustment: 'Contraindicated in significant hepatic dysfunction', type: 'contraindicated' }
    ],
    contraindications: ['Liver disease', 'Urea cycle disorders'],
    sideEffects: ['Hepatotoxicity', 'Pancreatitis', 'Weight gain'],
    interactions: ['Lamotrigine (increases rash risk)', 'Meropenem (lowers valproate)']
  },
  {
    id: 'd_topiramate',
    genericName: 'Topiramate',
    brandNamesEU: ['Topamax'],
    brandNamesArab: ['Topamax', 'Topiram'],
    indication: 'Migraine, Seizures',
    normalDose: '25-200 mg BID',
    renalRules: [
        { maxCrCl: 70, adjustment: 'Reduce dose by 50%', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: [],
    sideEffects: ['Cognitive slowing', 'Kidney stones', 'Weight loss'],
    interactions: ['OCPs (reduced efficacy)']
  },
  {
    id: 'd_lamotrigine',
    genericName: 'Lamotrigine',
    brandNamesEU: ['Lamictal'],
    brandNamesArab: ['Lamictal', 'Lamic'],
    indication: 'Seizures, Bipolar',
    normalDose: '100-200 mg daily (Slow titration!)',
    renalRules: [
         { maxCrCl: 10, adjustment: 'Reduce maintenance dose', type: 'reduction' }
    ],
    hepaticRules: [
        { classes: [ChildPughClass.B], adjustment: 'Reduce dose by 25%', type: 'reduction' },
        { classes: [ChildPughClass.C], adjustment: 'Reduce dose by 50%', type: 'reduction' }
    ],
    contraindications: [],
    sideEffects: ['Rash (SJS) - Critical', 'Dizziness'],
    interactions: ['Valproate (doubles lamotrigine half-life)']
  },
  {
    id: 'd_lithium',
    genericName: 'Lithium',
    brandNamesEU: ['Priadel', 'Camcolit'],
    brandNamesArab: ['Prianil'],
    indication: 'Bipolar Disorder',
    normalDose: 'Titrate to 0.6-1.2 mEq/L',
    renalRules: [
        { maxCrCl: 50, minCrCl: 10, adjustment: 'Reduce 50-75%', type: 'reduction' },
        { maxCrCl: 10, adjustment: 'Avoid', type: 'avoid' }
    ],
    hepaticRules: [],
    contraindications: ['Severe renal disease', 'Dehydration'],
    sideEffects: ['Tremor', 'Hypothyroidism', 'Diabetes Insipidus'],
    interactions: ['NSAIDs', 'ACE inhibitors', 'Diuretics']
  },

  // --- METABOLIC & GI ---
  {
    id: 'd6',
    genericName: 'Metformin',
    brandNamesEU: ['Glucophage', 'Metforal'],
    brandNamesArab: ['Glucophage', 'Cidophage', 'Glucored'],
    indication: 'Type 2 Diabetes',
    normalDose: '500-1000 mg BID',
    renalRules: [
        { maxCrCl: 45, minCrCl: 30, adjustment: 'Max 1000 mg/day', type: 'reduction' },
        { maxCrCl: 30, adjustment: 'Contraindicated', type: 'contraindicated' }
    ],
    hepaticRules: [
       { classes: [ChildPughClass.B, ChildPughClass.C], adjustment: 'Avoid (Lactic Acidosis Risk)', type: 'avoid' }
    ],
    contraindications: ['eGFR < 30', 'Metabolic acidosis'],
    sideEffects: ['GI upset', 'Lactic acidosis'],
    interactions: ['Contrast dye']
  },
  {
    id: 'd_glyburide',
    genericName: 'Glyburide (Glibenclamide)',
    brandNamesEU: ['Daonil'],
    brandNamesArab: ['Daonil', 'Glibil'],
    indication: 'Type 2 Diabetes',
    normalDose: '2.5-20 mg daily',
    renalRules: [
        { maxCrCl: 50, adjustment: 'Reduce 50% or Avoid (Hypoglycemia)', type: 'reduction' },
        { maxCrCl: 30, adjustment: 'Contraindicated', type: 'contraindicated' }
    ],
    hepaticRules: [],
    contraindications: ['Severe renal/hepatic failure'],
    sideEffects: ['Severe hypoglycemia'],
    interactions: ['Beta-blockers', 'Alcohol']
  },
  {
    id: 'd_insulin',
    genericName: 'Insulin (All types)',
    brandNamesEU: ['Lantus', 'Novorapid', 'Humalog'],
    brandNamesArab: ['Lantus', 'Apidra', 'Mixtard'],
    indication: 'Diabetes',
    normalDose: 'Individualized',
    renalRules: [
        { maxCrCl: 50, adjustment: 'Reduce daily dose by 25-50% (Clearance reduced)', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: ['Hypoglycemia'],
    sideEffects: ['Hypoglycemia'],
    interactions: ['Beta-blockers']
  },
  {
    id: 'd_allopurinol',
    genericName: 'Allopurinol',
    brandNamesEU: ['Zyloric'],
    brandNamesArab: ['Zyloric', 'No-Uric'],
    indication: 'Gout',
    normalDose: '100-300 mg daily',
    renalRules: [
        { maxCrCl: 50, minCrCl: 10, adjustment: 'Max 200 mg daily', type: 'reduction' },
        { maxCrCl: 10, adjustment: 'Max 100 mg 3x/week', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: ['Hypersensitivity'],
    sideEffects: ['Rash (SJS/DRESS)', 'GI upset'],
    interactions: ['Azathioprine', 'Mercaptopurine']
  },
  {
    id: 'd_famotidine',
    genericName: 'Famotidine',
    brandNamesEU: ['Pepcid'],
    brandNamesArab: ['Pepcid', 'Antodine'],
    indication: 'GERD, Peptic Ulcer',
    normalDose: '20-40 mg daily',
    renalRules: [
        { maxCrCl: 50, adjustment: 'Reduce dose 50% (CNS risk)', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: [],
    sideEffects: ['Confusion (elderly/renal)'],
    interactions: ['Cefpodoxime (absorption)']
  },
  {
    id: 'd_metoclopramide',
    genericName: 'Metoclopramide',
    brandNamesEU: ['Primperan'],
    brandNamesArab: ['Primperan', 'Plasil'],
    indication: 'Nausea, Gastroparesis',
    normalDose: '10 mg TID',
    renalRules: [
        { maxCrCl: 60, adjustment: 'Reduce 50% (EPS risk)', type: 'reduction' }
    ],
    hepaticRules: [],
    contraindications: ['Bowel obstruction', 'Pheochromocytoma'],
    sideEffects: ['Extrapyramidal symptoms', 'Drowsiness'],
    interactions: ['Antipsychotics']
  },
  {
    id: 'd_udca',
    genericName: 'Ursodeoxycholic Acid',
    brandNamesEU: ['Ursofalk', 'Urso', 'Deursil'],
    brandNamesArab: ['Ursofalk', 'Ursogall', 'Ursochol'],
    indication: 'PBC, Gallstones',
    normalDose: '13-15 mg/kg/day',
    renalRules: [],
    hepaticRules: [
         { classes: [], adjustment: 'No modification required', type: 'caution' }
    ],
    contraindications: ['Acute cholecystitis'],
    sideEffects: ['Diarrhea'],
    interactions: ['Aluminum antacids']
  },
  {
    id: 'd_cyclosporine',
    genericName: 'Cyclosporine',
    brandNamesEU: ['Sandimmun', 'Neoral'],
    brandNamesArab: ['Sandimmun'],
    indication: 'Transplant Rejection',
    normalDose: 'Dosed by levels',
    renalRules: [
         { maxCrCl: 100, adjustment: 'Nephrotoxic - Monitor Levels closely', type: 'caution' }
    ],
    hepaticRules: [],
    contraindications: ['Uncontrolled hypertension'],
    sideEffects: ['Nephrotoxicity', 'Hypertension'],
    interactions: ['CYP3A4 inhibitors/inducers']
  }
];