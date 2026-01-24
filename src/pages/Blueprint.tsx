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
} from 'lucide-react';
import { MATERIAL_COLORS, type MaterialType, type MaterialRequirement, type ComplianceCheck } from '../types';

const mockMaterialRequirements: MaterialRequirement[] = [
  { material: 'bamboo', quantity: 1250, unit: 'm²', loadRequirement: 500 },
  { material: 'recycled-wood', quantity: 840, unit: 'm²', loadRequirement: 750 },
  { material: 'hemp-concrete', quantity: 320, unit: 'm³', loadRequirement: 300 },
  { material: 'mycelium', quantity: 180, unit: 'm²', loadRequirement: 50 },
  { material: 'recycled-steel', quantity: 45, unit: 'tons', loadRequirement: 2000 },
  { material: 'cork', quantity: 560, unit: 'm²', loadRequirement: 100 },
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
            {/* Block body */}
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
            {/* Top face (3D effect) */}
            <polygon
              points={`${block.x},${block.y} ${block.x + 36},${block.y} ${block.x + 30},${block.y - 8} ${block.x - 6},${block.y - 8}`}
              fill={block.colors.light}
              stroke={block.colors.dark}
              strokeWidth={0.5}
              opacity={0.9}
            />
            {/* Studs */}
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
    transition: { staggerChildren: 0.1 },
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
    // Simulate processing
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
      {/* Page header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Blueprint Generator</h1>
          <p className="text-slate-500 mt-1">Upload scene and blueprint to generate modular assembly drawings</p>
        </div>
        {step === 'result' && (
          <button onClick={resetProcess} className="btn-secondary flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Regenerate
          </button>
        )}
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
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-forest-500 text-white shadow-lg shadow-forest-500/30'
                        : isPast
                        ? 'bg-forest-500/20 text-forest-400'
                        : 'bg-slate-700/50 text-slate-500'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <s.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      isActive ? 'text-white' : isPast ? 'text-forest-400' : 'text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {index < 2 && (
                  <ArrowRight className="w-5 h-5 text-slate-600 mx-6" />
                )}
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
                <div className="w-10 h-10 rounded-xl bg-forest-500/20 flex items-center justify-center">
                  <FileImage className="w-5 h-5 text-forest-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Scene Image</h3>
                  <p className="text-sm text-slate-500">Upload building site photo or rendering</p>
                </div>
              </div>
              
              <label
                className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-forest-500 bg-forest-500/10'
                    : uploadedFiles.scene
                    ? 'border-forest-500/50 bg-forest-500/5'
                    : 'border-slate-700/50 hover:border-slate-600'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => handleDrop(e, 'scene')}
              >
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, 'scene')}
                />
                {uploadedFiles.scene ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="w-12 h-12 text-forest-400 mb-3" />
                    <p className="text-white font-medium">{uploadedFiles.scene.name}</p>
                    <p className="text-sm text-slate-500 mt-1">Click to reselect</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-slate-500 mb-3" />
                    <p className="text-slate-300">Drag file here or click to upload</p>
                    <p className="text-sm text-slate-500 mt-1">Supports JPG, PNG, WebP</p>
                  </div>
                )}
              </label>
            </div>

            {/* Blueprint upload */}
            <div className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-earth-500/20 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-earth-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Architectural Blueprint</h3>
                  <p className="text-sm text-slate-500">Upload CAD drawings or design files</p>
                </div>
              </div>
              
              <label
                className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  uploadedFiles.blueprint
                    ? 'border-earth-500/50 bg-earth-500/5'
                    : 'border-slate-700/50 hover:border-slate-600'
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, 'blueprint')}
              >
                <input
                  type="file"
                  className="hidden"
                  accept=".dwg,.dxf,.pdf,image/*"
                  onChange={(e) => handleFileSelect(e, 'blueprint')}
                />
                {uploadedFiles.blueprint ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="w-12 h-12 text-earth-400 mb-3" />
                    <p className="text-white font-medium">{uploadedFiles.blueprint.name}</p>
                    <p className="text-sm text-slate-500 mt-1">Click to reselect</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-slate-500 mb-3" />
                    <p className="text-slate-300">Drag file here or click to upload</p>
                    <p className="text-sm text-slate-500 mt-1">Supports DWG, DXF, PDF</p>
                  </div>
                )}
              </label>
            </div>

            {/* Generate button */}
            <div className="lg:col-span-2 flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={!uploadedFiles.scene || !uploadedFiles.blueprint}
                className="btn-primary flex items-center gap-2 px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-6 h-6" />
                Generate Blueprint
              </button>
            </div>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-forest-400/20 to-forest-600/20 border border-forest-500/30 flex items-center justify-center mb-6 animate-pulse">
              <Zap className="w-10 h-10 text-forest-400" />
            </div>
            <h2 className="text-xl font-display font-bold text-white mb-2">AI Analyzing Blueprint</h2>
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
                  className="flex items-center gap-3 text-left"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.6 + 0.3 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-forest-400" />
                  </motion.div>
                  <span className="text-slate-300">{task}</span>
                </motion.div>
              ))}
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 3D Lego visualization */}
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Box className="w-5 h-5 text-forest-400" />
                    Modular Parts Preview
                  </h3>
                  <button className="btn-secondary text-sm py-2 px-3 flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    3D View
                  </button>
                </div>
                
                <LegoVisualization />
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(MATERIAL_COLORS).slice(0, 6).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50">
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: value.light }}
                      />
                      <span className="text-xs text-slate-400">{value.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material requirements */}
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-forest-400" />
                    Material Requirements
                  </h3>
                  <button className="btn-secondary text-sm py-2 px-3 flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {mockMaterialRequirements.map((req) => {
                    const colors = MATERIAL_COLORS[req.material];
                    return (
                      <div
                        key={req.material}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/30"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg"
                            style={{ backgroundColor: colors.light }}
                          />
                          <div>
                            <p className="font-medium text-white">{colors.name}</p>
                            <p className="text-sm text-slate-500">
                              Load: {req.loadRequirement} kg/m²
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-bold text-white">
                            {req.quantity.toLocaleString()}
                          </p>
                          <p className="text-sm text-slate-500">{req.unit}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 p-4 rounded-xl bg-forest-500/10 border border-forest-500/20">
                  <div className="flex items-center gap-2 text-forest-400 mb-2">
                    <Scale className="w-5 h-5" />
                    <span className="font-medium">Total Parts</span>
                  </div>
                  <p className="text-2xl font-display font-bold text-white">2,847 pieces</p>
                </div>
              </div>
            </div>

            {/* Compliance report */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-forest-400" />
                  Compliance Audit Report
                </h3>
                <div className="flex items-center gap-3">
                  <span className="status-badge-success">
                    <CheckCircle2 className="w-4 h-4" />
                    Compliant
                  </span>
                  <button className="btn-secondary text-sm py-2 px-3 flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Download Full Report
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockComplianceChecks.map((check) => (
                  <div
                    key={check.name}
                    className={`p-4 rounded-xl border ${
                      check.status === 'pass'
                        ? 'bg-forest-500/5 border-forest-500/20'
                        : check.status === 'warning'
                        ? 'bg-amber-500/5 border-amber-500/20'
                        : 'bg-red-500/5 border-red-500/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {check.status === 'pass' ? (
                        <CheckCircle2 className="w-5 h-5 text-forest-400 flex-shrink-0 mt-0.5" />
                      ) : check.status === 'warning' ? (
                        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium text-white text-sm">{check.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{check.description}</p>
                        {check.recommendation && (
                          <p className="text-xs text-amber-400 mt-2">⚠️ {check.recommendation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4">
              <button className="btn-secondary flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Preview Full Blueprint
              </button>
              <button className="btn-primary flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                Send to Factory
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
