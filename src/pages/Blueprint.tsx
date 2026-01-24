import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileImage,
  Layers,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Download,
  Eye,
  RefreshCw,
  ArrowRight,
  Box,
  Scale,
  Leaf,
  Sparkles,
} from 'lucide-react';
import { MATERIAL_COLORS, type MaterialType, type MaterialRequirement, type ComplianceCheck } from '../types';

// Based on 45' × 36' (150m²) 2-story residential blueprint
interface ExtendedMaterialRequirement extends MaterialRequirement {
  application?: string;
}

const mockMaterialRequirements: ExtendedMaterialRequirement[] = [
  { 
    material: 'bamboo', 
    quantity: 485,
    unit: 'm²', 
    loadRequirement: 500,
    density: 700,
    carbonFootprint: 12,
    recyclability: 95,
    durability: 25,
    supplier: 'GreenBamboo Co.',
    estimatedCost: 29100,
    deliveryTime: 14,
    application: 'Floor joists, roof rafters, structural beams'
  },
  { 
    material: 'recycled-wood', 
    quantity: 320,
    unit: 'm²', 
    loadRequirement: 750,
    density: 650,
    carbonFootprint: 18,
    recyclability: 100,
    durability: 30,
    supplier: 'EcoWood Industries',
    estimatedCost: 25600,
    deliveryTime: 10,
    application: 'Wall studs, interior framing, partitions'
  },
  { 
    material: 'hemp-concrete', 
    quantity: 145,
    unit: 'm³', 
    loadRequirement: 300,
    density: 400,
    carbonFootprint: 35,
    recyclability: 85,
    durability: 50,
    supplier: 'HempBuild Ltd.',
    estimatedCost: 36250,
    deliveryTime: 21,
    application: 'External wall infill, thermal mass'
  },
  { 
    material: 'mycelium', 
    quantity: 420,
    unit: 'm²', 
    loadRequirement: 50,
    density: 180,
    carbonFootprint: 5,
    recyclability: 100,
    durability: 15,
    supplier: 'MycoMaterials',
    estimatedCost: 16800,
    deliveryTime: 7,
    application: 'Acoustic panels, thermal insulation'
  },
  { 
    material: 'recycled-steel', 
    quantity: 12.5,
    unit: 'tons', 
    loadRequirement: 2000,
    density: 7850,
    carbonFootprint: 450,
    recyclability: 100,
    durability: 100,
    supplier: 'SteelCycle Corp.',
    estimatedCost: 37500,
    deliveryTime: 18,
    application: 'Load-bearing columns, beams, connectors'
  },
  { 
    material: 'cork', 
    quantity: 300,
    unit: 'm²', 
    loadRequirement: 100,
    density: 240,
    carbonFootprint: 8,
    recyclability: 90,
    durability: 40,
    supplier: 'CorkNature Inc.',
    estimatedCost: 18000,
    deliveryTime: 12,
    application: 'Flooring for all rooms (2 floors)'
  },
];

const mockComplianceChecks: ComplianceCheck[] = [
  { name: 'Structural Safety Standards', status: 'pass', description: 'Complies with national building structure safety codes' },
  { name: 'Green Building Certification', status: 'pass', description: 'Meets LEED Gold standard requirements' },
  { name: 'Seismic Resistance', status: 'pass', description: 'Satisfies Zone 4 seismic design requirements' },
  { name: 'Fire Safety Code', status: 'warning', description: 'Some areas require additional fire-resistant coating', recommendation: 'Recommend adding Class A fire coating on load-bearing beams' },
  { name: 'Energy Efficiency Standards', status: 'pass', description: 'Energy consumption 45% below baseline' },
];

// Generate a simple Lego-style block grid for visualization
function LegoVisualization() {
  const blocks = [];
  const materials: MaterialType[] = ['bamboo', 'recycled-wood', 'hemp-concrete', 'mycelium', 'recycled-steel', 'cork'];
  
  for (let layer = 0; layer < 5; layer++) {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 6; col++) {
        const materialIndex = (layer + row + col) % materials.length;
        const material = materials[materialIndex];
        const colors = MATERIAL_COLORS[material];
        
        blocks.push({
          id: `${layer}-${row}-${col}`,
          x: col * 40 + row * 10,
          y: row * 25 - layer * 30,
          material,
          colors,
          delay: (layer * 0.1 + row * 0.05 + col * 0.02),
        });
      }
    }
  }
  
  return (
    <div className="relative w-full h-80 overflow-hidden">
      <svg viewBox="-20 -150 320 250" className="w-full h-full">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>
        {blocks.map((block) => (
          <motion.g
            key={block.id}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: block.delay, duration: 0.5, ease: 'easeOut' }}
          >
            <rect
              x={block.x}
              y={block.y}
              width={36}
              height={20}
              rx={3}
              fill={block.colors.light}
              stroke={block.colors.dark}
              strokeWidth={1}
              filter="url(#shadow)"
            />
            <polygon
              points={`${block.x},${block.y} ${block.x + 36},${block.y} ${block.x + 30},${block.y - 8} ${block.x - 6},${block.y - 8}`}
              fill={block.colors.light}
              stroke={block.colors.dark}
              strokeWidth={0.5}
              opacity={0.9}
            />
            {[0, 1, 2].map((i) => (
              <ellipse
                key={i}
                cx={block.x + 8 + i * 12}
                cy={block.y - 6}
                rx={4}
                ry={2}
                fill={block.colors.dark}
                opacity={0.6}
              />
            ))}
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type Step = 'upload' | 'processing' | 'result';

export function Blueprint() {
  const [step, setStep] = useState<Step>('upload');
  const [uploadedFiles, setUploadedFiles] = useState<{ scene?: File; blueprint?: File }>({});
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent, type: 'scene' | 'blueprint') => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'scene' | 'blueprint') => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleGenerate = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('result');
    }, 3000);
  };

  const resetProcess = () => {
    setStep('upload');
    setUploadedFiles({});
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero Section with Blueprint Background */}
      <motion.div 
        variants={itemVariants} 
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/blueprint.jpg" 
            alt="Blueprint" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80" />
        </div>
        
        {/* Content */}
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary-400" />
                <span className="text-sm font-medium text-primary-400">AI-Powered</span>
              </div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">Blueprint Generator</h1>
              <p className="text-slate-300 max-w-xl">Upload scene and blueprint to generate modular assembly drawings, <span className="text-primary-400 font-medium">safety compliance audit reports</span>, and <span className="text-accent-400 font-medium">material requirement analysis</span></p>
            </div>
            {step === 'result' && (
              <motion.button 
                onClick={resetProcess} 
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw className="w-5 h-5" />
                Regenerate
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Steps indicator */}
      <motion.div variants={itemVariants} className="glass-panel p-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[
            { key: 'upload', label: 'Upload Files', icon: Upload },
            { key: 'processing', label: 'AI Analysis', icon: Zap },
            { key: 'result', label: 'Results', icon: Layers },
          ].map((s, index) => {
            const isActive = s.key === step;
            const isPast = 
              (step === 'processing' && s.key === 'upload') ||
              (step === 'result' && (s.key === 'upload' || s.key === 'processing'));
            
            return (
              <div key={s.key} className="flex items-center">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                        : isPast
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                        : 'bg-slate-700/50 text-slate-500 border border-slate-600/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </motion.div>
                  <span className={`font-medium ${isActive ? 'text-white' : isPast ? 'text-primary-400' : 'text-slate-500'}`}>
                    {s.label}
                  </span>
                </div>
                {index < 2 && <ArrowRight className="w-5 h-5 text-slate-600 mx-6" />}
              </div>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Scene upload */}
            <div className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400/20 to-primary-600/20 flex items-center justify-center ring-1 ring-primary-500/30">
                  <FileImage className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Scene Image</h3>
                  <p className="text-sm text-slate-500">Upload building site photo or rendering</p>
                </div>
              </div>
              
              <label
                className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? 'border-primary-500 bg-primary-500/10'
                    : uploadedFiles.scene
                    ? 'border-primary-500/50 bg-primary-500/5'
                    : 'border-slate-700/50 hover:border-primary-500/50 hover:bg-slate-800/30'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => handleDrop(e, 'scene')}
              >
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, 'scene')} />
                {uploadedFiles.scene ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-8 h-8 text-primary-400" />
                    </div>
                    <p className="text-white font-medium">{uploadedFiles.scene.name}</p>
                    <p className="text-sm text-slate-500 mt-1">Click to reselect</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mb-3">
                      <Upload className="w-8 h-8 text-slate-500" />
                    </div>
                    <p className="text-slate-300">Drag file here or click to upload</p>
                    <p className="text-sm text-slate-500 mt-1">Supports JPG, PNG, WebP</p>
                  </div>
                )}
              </label>
            </div>

            {/* Blueprint upload */}
            <div className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400/20 to-accent-600/20 flex items-center justify-center ring-1 ring-accent-500/30">
                  <Layers className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Architectural Blueprint</h3>
                  <p className="text-sm text-slate-500">Upload CAD drawings or design files</p>
                </div>
              </div>
              
              <label
                className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  uploadedFiles.blueprint
                    ? 'border-accent-500/50 bg-accent-500/5'
                    : 'border-slate-700/50 hover:border-accent-500/50 hover:bg-slate-800/30'
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, 'blueprint')}
              >
                <input type="file" className="hidden" accept=".dwg,.dxf,.pdf,image/*" onChange={(e) => handleFileSelect(e, 'blueprint')} />
                {uploadedFiles.blueprint ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-accent-500/20 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-8 h-8 text-accent-400" />
                    </div>
                    <p className="text-white font-medium">{uploadedFiles.blueprint.name}</p>
                    <p className="text-sm text-slate-500 mt-1">Click to reselect</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mb-3">
                      <Upload className="w-8 h-8 text-slate-500" />
                    </div>
                    <p className="text-slate-300">Drag file here or click to upload</p>
                    <p className="text-sm text-slate-500 mt-1">Supports DWG, DXF, PDF</p>
                  </div>
                )}
              </label>
            </div>

            {/* Generate button */}
            <div className="lg:col-span-2 flex justify-center">
              <motion.button
                onClick={handleGenerate}
                disabled={!uploadedFiles.scene || !uploadedFiles.blueprint}
                className="btn-primary flex items-center gap-3 px-10 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="w-6 h-6" />
                Generate Blueprint
                <Sparkles className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel p-12 text-center relative overflow-hidden"
          >
            {/* Background animation */}
            <div className="absolute inset-0 opacity-10">
              <img src="/blueprint.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            
            <div className="relative">
              <motion.div 
                className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary-400/20 to-primary-600/20 border border-primary-500/30 flex items-center justify-center mb-6"
                animate={{ 
                  boxShadow: ['0 0 20px rgba(34, 197, 94, 0.3)', '0 0 60px rgba(34, 197, 94, 0.5)', '0 0 20px rgba(34, 197, 94, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-12 h-12 text-primary-400" />
              </motion.div>
              <h2 className="text-2xl font-display font-bold text-white mb-2">AI Analyzing Blueprint</h2>
              <p className="text-slate-500 mb-8">Identifying structures and generating modular parts...</p>
              
              <div className="max-w-md mx-auto space-y-3">
                {[
                  'Analyzing building structure...',
                  'Identifying load requirements...',
                  'Matching renewable materials...',
                  'Generating part drawings...',
                ].map((task, index) => (
                  <motion.div
                    key={task}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.6 }}
                    className="flex items-center gap-3 text-left bg-slate-800/50 rounded-lg px-4 py-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.6 + 0.3 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary-400" />
                    </motion.div>
                    <span className="text-slate-300">{task}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Blueprint Specifications */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center ring-2 ring-primary-500/30">
                  <Layers className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Building Specifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Footprint</p>
                      <p className="text-white font-semibold">45' × 36' (150m²)</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Stories</p>
                      <p className="text-white font-semibold">2 Floors</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Total Area</p>
                      <p className="text-white font-semibold">300 m²</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Building Type</p>
                      <p className="text-white font-semibold">Residential</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700/30 text-xs text-slate-400">
                    Includes: Garage (24'×24'), Living Room (16'×16'), Kitchen (12'×18'), Dining (12'×12'), Family Room (16'×16'), Study (12'×12')
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 3D Lego visualization */}
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2 text-lg">
                    <Box className="w-5 h-5 text-primary-400" />
                    Modular Parts Preview
                  </h3>
                  <motion.button 
                    className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Eye className="w-4 h-4" />
                    3D View
                  </motion.button>
                </div>
                
                <LegoVisualization />
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(MATERIAL_COLORS).slice(0, 6).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/30">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: value.light }} />
                      <span className="text-xs text-slate-400">{value.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material requirements */}
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2 text-lg">
                    <Leaf className="w-5 h-5 text-primary-400" />
                    Material Requirements
                  </h3>
                  <motion.button 
                    className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </motion.button>
                </div>
                
                <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {mockMaterialRequirements.map((req, index) => {
                    const colors = MATERIAL_COLORS[req.material];
                    return (
                      <motion.div
                        key={req.material}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-primary-500/30 transition-all"
                        whileHover={{ scale: 1.01, y: -2 }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {colors.image ? (
                              <div className="w-14 h-14 rounded-lg overflow-hidden ring-2 ring-slate-600/50">
                                <img src={colors.image} alt={colors.name} className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="w-14 h-14 rounded-lg" style={{ backgroundColor: colors.light }} />
                            )}
                            <div>
                              <p className="font-semibold text-white text-lg">{colors.name}</p>
                              <p className="text-sm text-slate-400">{req.supplier}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-display font-bold text-white text-xl">{req.quantity.toLocaleString()}</p>
                            <p className="text-sm text-slate-400">{req.unit}</p>
                          </div>
                        </div>

                        {/* Parameters Grid */}
                        <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-700/30">
                          <div className="flex items-center gap-2">
                            <Scale className="w-3.5 h-3.5 text-primary-400" />
                            <div>
                              <p className="text-xs text-slate-500">Load Capacity</p>
                              <p className="text-sm font-semibold text-white">{req.loadRequirement} kg/m²</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Box className="w-3.5 h-3.5 text-blue-400" />
                            <div>
                              <p className="text-xs text-slate-500">Density</p>
                              <p className="text-sm font-semibold text-white">{req.density} kg/m³</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Leaf className="w-3.5 h-3.5 text-green-400" />
                            <div>
                              <p className="text-xs text-slate-500">Carbon Footprint</p>
                              <p className="text-sm font-semibold text-white">{req.carbonFootprint} kg CO₂</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                            <div>
                              <p className="text-xs text-slate-500">Recyclability</p>
                              <p className="text-sm font-semibold text-white">{req.recyclability}%</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-orange-400" />
                            <div>
                              <p className="text-xs text-slate-500">Durability</p>
                              <p className="text-sm font-semibold text-white">{req.durability} years</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                            <div>
                              <p className="text-xs text-slate-500">Delivery</p>
                              <p className="text-sm font-semibold text-white">{req.deliveryTime} days</p>
                            </div>
                          </div>
                        </div>

                        {/* Application */}
                        {req.application && (
                          <div className="mt-3 pt-3 border-t border-slate-700/30">
                            <p className="text-xs text-slate-500 mb-1">Application</p>
                            <p className="text-sm text-slate-300">{req.application}</p>
                          </div>
                        )}

                        {/* Cost */}
                        {req.estimatedCost && (
                          <div className="mt-3 pt-3 border-t border-slate-700/30 flex items-center justify-between">
                            <span className="text-sm text-slate-400">Estimated Cost</span>
                            <span className="text-lg font-bold text-primary-400">${req.estimatedCost.toLocaleString()}</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary-500/10 to-primary-500/5 border border-primary-500/20">
                  <div className="flex items-center gap-2 text-primary-400 mb-2">
                    <Scale className="w-5 h-5" />
                    <span className="font-medium">Total Parts</span>
                  </div>
                  <p className="text-3xl font-display font-bold text-white">2,564 pieces</p>
                </div>
              </div>
            </div>

            {/* Compliance report */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-primary-400" />
                  Compliance Audit Report
                </h3>
                <div className="flex items-center gap-3">
                  <span className="status-badge-success">
                    <CheckCircle2 className="w-4 h-4" />
                    Compliant
                  </span>
                  <motion.button 
                    className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Download className="w-4 h-4" />
                    Download Report
                  </motion.button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockComplianceChecks.map((check) => (
                  <motion.div
                    key={check.name}
                    className={`p-4 rounded-xl border ${
                      check.status === 'pass'
                        ? 'bg-primary-500/5 border-primary-500/20'
                        : check.status === 'warning'
                        ? 'bg-accent-500/5 border-accent-500/20'
                        : 'bg-red-500/5 border-red-500/20'
                    }`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start gap-3">
                      {check.status === 'pass' ? (
                        <CheckCircle2 className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium text-white text-sm">{check.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{check.description}</p>
                        {check.recommendation && (
                          <p className="text-xs text-accent-400 mt-2">⚠️ {check.recommendation}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4">
              <motion.button 
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-5 h-5" />
                Preview Full Blueprint
              </motion.button>
              <motion.button 
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowRight className="w-5 h-5" />
                Send to Factory
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
