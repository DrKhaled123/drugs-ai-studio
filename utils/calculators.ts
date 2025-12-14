import { CalculationResult, ChildPughClass, Gender, PatientData } from '../types';

export const calculateCrCl = (
  age: number,
  weight: number,
  scr: number,
  gender: Gender
): number => {
  if (!age || !weight || !scr) return 0;
  // Cockcroft-Gault Equation
  let crCl = ((140 - age) * weight) / (72 * scr);
  if (gender === Gender.Female) {
    crCl *= 0.85;
  }
  return parseFloat(crCl.toFixed(2));
};

export const calculateBMI = (weight: number): number => {
    // Placeholder as height is not in basic inputs currently
    return 0; 
}

export const calculateChildPugh = (
  bilirubin: number,
  albumin: number,
  inr: number,
  ascites: string,
  encephalopathy: string
): { score: number; class: ChildPughClass } => {
  let score = 0;

  // Bilirubin
  if (bilirubin < 2) score += 1;
  else if (bilirubin <= 3) score += 2;
  else score += 3;

  // Albumin
  if (albumin > 3.5) score += 1;
  else if (albumin >= 2.8) score += 2;
  else score += 3;

  // INR
  if (inr < 1.7) score += 1;
  else if (inr <= 2.3) score += 2;
  else score += 3;

  // Ascites
  if (ascites === 'None') score += 1;
  else if (ascites === 'Mild') score += 2;
  else score += 3;

  // Encephalopathy
  if (encephalopathy === 'None') score += 1;
  else if (encephalopathy === 'Grade 1-2') score += 2;
  else score += 3;

  let cpClass = ChildPughClass.A;
  if (score >= 7 && score <= 9) cpClass = ChildPughClass.B;
  if (score >= 10) cpClass = ChildPughClass.C;

  return { score, class: cpClass };
};

export const calculateFluidMaintenance = (weight: number): string => {
    // Holiday-Segar Formula
    let fluid = 0;
    if (weight <= 10) fluid = weight * 100;
    else if (weight <= 20) fluid = 1000 + (weight - 10) * 50;
    else fluid = 1500 + (weight - 20) * 20;
    
    return `${fluid.toFixed(0)} mL/day`;
};

// SHOCK MANAGEMENT
export const calculateShockFluidBolus = (weight: number): string => {
    // Surviving Sepsis Guidelines: 30mL/kg within first 3 hours
    const vol = weight * 30;
    return `${vol.toFixed(0)} mL (Crystalloid)`;
};

export const calculateShockVasopressor = (weight: number): string => {
    // 0.05 to 3.3 mcg/kg/min for Norepinephrine
    const low = 0.05 * weight; // mcg/min
    const high = 3.3 * weight; // mcg/min
    return `${low.toFixed(1)} - ${high.toFixed(1)} mcg/min`;
};

// ELECTROLYTE MANAGEMENT

// 1. Hypernatremia (Water Deficit)
export const calculateHypernatremiaCorrection = (weight: number, currentNa: number, gender: Gender): { deficit: string, rate: string } => {
    if (currentNa <= 145) return { deficit: "N/A", rate: "N/A" };
    
    // Total Body Water Estimate
    const tbwFactor = gender === Gender.Male ? 0.6 : 0.5;
    const tbw = weight * tbwFactor;
    
    // Free Water Deficit = TBW x ((SerumNa / 140) - 1)
    const deficitLiters = tbw * ((currentNa / 140) - 1);
    const deficitML = deficitLiters * 1000;

    // Correction Rate: Safe correction usually over 48-72h (e.g., 0.5 mEq/L/hr max)
    // Here we provide the infusion rate to replace the deficit over 48 hours
    const rate48h = deficitML / 48;

    return {
        deficit: `${deficitLiters.toFixed(2)} Liters`,
        rate: `${rate48h.toFixed(0)} mL/hr (D5W over 48h)`
    };
};

// 2. Hyponatremia (Sodium Deficit)
export const calculateSodiumDeficit = (weight: number, currentNa: number, gender: Gender): string => {
    if (currentNa >= 135) return "N/A (Na Normal)";
    
    // Total Body Water
    const tbwFactor = gender === Gender.Male ? 0.6 : 0.5;
    const tbw = weight * tbwFactor;
    
    // Target usually 135 or safe rise. Calculating total deficit to 135.
    // Sodium Deficit = TBW x (TargetNa - CurrentNa)
    const deficit = tbw * (135 - currentNa);
    
    return `${deficit.toFixed(0)} mEq`;
};