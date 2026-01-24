export interface BuildingPart {
  id: string;
  name: string;
  material: MaterialType;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  weight: number;
  loadCapacity: number;
  position: { x: number; y: number; z: number };
  sequence: number;
  status: PartStatus;
  tag?: string;
}

export type MaterialType = 
  | 'bamboo' 
  | 'recycled-wood' 
  | 'mycelium' 
  | 'hemp-concrete' 
  | 'recycled-steel' 
  | 'cork' 
  | 'straw-bale'
  | 'rammed-earth';

export type PartStatus = 
  | 'pending' 
  | 'cutting' 
  | 'ready' 
  | 'installed' 
  | 'verified';

export interface MaterialRequirement {
  material: MaterialType;
  quantity: number;
  unit: string;
  loadRequirement: number;
  density: number; // kg/m³
  carbonFootprint: number; // kg CO₂/unit
  recyclability: number; // percentage
  durability: number; // years
  supplier?: string;
  estimatedCost?: number;
  deliveryTime?: number; // days
}

export interface ComplianceReport {
  id: string;
  projectName: string;
  generatedAt: string;
  status: 'compliant' | 'warning' | 'non-compliant';
  checks: ComplianceCheck[];
  certifications: string[];
}

export interface ComplianceCheck {
  name: string;
  status: 'pass' | 'warning' | 'fail';
  description: string;
  recommendation?: string;
}

export interface CuttingRobot {
  id: string;
  name: string;
  status: 'idle' | 'cutting' | 'maintenance' | 'error';
  currentPart?: string;
  progress: number;
  partsCompleted: number;
  totalParts: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'design' | 'cutting' | 'construction' | 'completed';
  progress: number;
  createdAt: string;
  updatedAt: string;
  totalParts: number;
  completedParts: number;
  materials: MaterialRequirement[];
}

export interface ConstructionPhase {
  id: string;
  name: string;
  description: string;
  sequence: number;
  status: 'pending' | 'in-progress' | 'completed';
  parts: BuildingPart[];
  estimatedDuration: number;
  actualDuration?: number;
}

export const MATERIAL_COLORS: Record<MaterialType, { light: string; dark: string; name: string; image?: string }> = {
  'bamboo': { light: '#a3c585', dark: '#7ea05c', name: 'Bamboo', image: '/bamboo.webp' },
  'recycled-wood': { light: '#c4a574', dark: '#9e7d4d', name: 'Recycled Wood', image: '/recyclewood.jpeg' },
  'mycelium': { light: '#e8dcc8', dark: '#c9b99a', name: 'Mycelium', image: '/mycelium.jpeg' },
  'hemp-concrete': { light: '#d4c8b8', dark: '#a89880', name: 'Hempcrete', image: '/hempcrete.jpg' },
  'recycled-steel': { light: '#9ca3af', dark: '#6b7280', name: 'Recycled Steel', image: '/recycle_steel.jpg' },
  'cork': { light: '#d4a574', dark: '#b8875a', name: 'Cork', image: '/cork.webp' },
  'straw-bale': { light: '#e8d59c', dark: '#c9b060', name: 'Straw Bale' },
  'rammed-earth': { light: '#b89878', dark: '#8b6d50', name: 'Rammed Earth' },
};
