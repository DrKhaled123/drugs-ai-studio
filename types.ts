import React from 'react';

export enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export enum ChildPughClass {
  A = 'A',
  B = 'B',
  C = 'C'
}

export interface PatientData {
  name: string;
  age: number;
  weight: number; // kg
  gender: Gender;
  scr: number; // Serum Creatinine mg/dL
  bilirubin: number; // mg/dL
  albumin: number; // g/dL
  inr: number;
  sodium: number; // mEq/L
  potassium: number; // mEq/L
  ascites: 'None' | 'Mild' | 'Moderate/Severe';
  encephalopathy: 'None' | 'Grade 1-2' | 'Grade 3-4';
  history: string;
}

export interface CalculationResult {
  crCl: number; // mL/min
  childPughScore: number;
  childPughClass: ChildPughClass;
  bmi: number;
}

export interface DrugRenalRule {
  minCrCl?: number;
  maxCrCl: number;
  adjustment: string;
  type: 'reduction' | 'interval' | 'avoid' | 'contraindicated' | 'caution';
}

export interface DrugHepaticRule {
  classes: ChildPughClass[];
  adjustment: string;
  type: 'reduction' | 'avoid' | 'caution' | 'contraindicated';
}

export interface Drug {
  id: string;
  genericName: string;
  brandNamesEU: string[];
  brandNamesArab: string[];
  indication: string;
  normalDose: string;
  renalRules: DrugRenalRule[];
  hepaticRules: DrugHepaticRule[];
  contraindications: string[];
  sideEffects: string[];
  interactions: string[];
}

export interface ProtocolSection {
    title: string;
    content: string | React.ReactNode;
    critical?: boolean;
    color?: string;
}