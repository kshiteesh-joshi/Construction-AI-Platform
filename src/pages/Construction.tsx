import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardHat,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  Activity,
  AlertTriangle,
  Package,
  MapPin,
  Users,
  Calendar,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Hammer,
} from 'lucide-react';
import type { ConstructionPhase, BuildingPart, MaterialType } from '../types';
import { MATERIAL_COLORS } from '../types';

const mockPhases: ConstructionPhase[] = [
  {
    id: 'p1',
    name: 'Foundation Structure',
    description: 'Laying renewable material foundation and load-bearing structure',
    sequence: 1,
    status: 'completed',
    estimatedDuration: 5,
    actualDuration: 4,
    parts: [],
  },
  {
    id: 'p2',
    name: 'Main Framework',
    description: 'Building bamboo and recycled steel hybrid framework',
    sequence: 2,
    status: 'completed',
    estimatedDuration: 8,
    actualDuration: 9,
    parts: [],
  },
  {
    id: 'p3',
    name: 'Wall Installation',
    description: 'Installing hempcrete wall panels and insulation layers',
    sequence: 3,
    status: 'in-progress',
    estimatedDuration: 6,
    parts: [],
  },
  {
    id: 'p4',
    name: 'Roof Structure',
    description: 'Building green roof and solar panel supports',
    sequence: 4,
    status: 'pending',
    estimatedDuration: 4,
    parts: [],
  },
  {
    id: 'p5',
    name: 'Interior Finishing',
    description: 'Installing cork flooring and mycelium decorative panels',
    sequence: 5,
    status: 'pending',
    estimatedDuration: 7,
    parts: [],
  },
  {
    id: 'p6',
    name: 'System Integration',
    description: 'Installing smart building systems and energy management',
    sequence: 6,
    status: 'pending',
    estimatedDuration: 3,
    parts: [],
  },
];

const currentPhaseParts: BuildingPart[] = [
  { id: 'wp-001', name: 'Exterior Wall A-001', material: 'hemp-concrete', dimensions: { width: 300, height: 280, depth: 20 }, weight: 45, loadCapacity: 300, position: { x: 0, y: 0, z: 0 }, sequence: 1, status: 'installed' },
  { id: 'wp-002', name: 'Exterior Wall A-002', material: 'hemp-concrete', dimensions: { width: 300, height: 280, depth: 20 }, weight: 45, loadCapacity: 300, position: { x: 1, y: 0, z: 0 }, sequence: 2, status: 'installed' },
  { id: 'wp-003', name: 'Exterior Wall A-003', material: 'hemp-concrete', dimensions: { width: 300, height: 280, depth: 20 }, weight: 45, loadCapacity: 300, position: { x: 2, y: 0, z: 0 }, sequence: 3, status: 'installed' },
  { id: 'ip-001', name: 'Insulation B-001', material: 'mycelium', dimensions: { width: 300, height: 280, depth: 10 }, weight: 8, loadCapacity: 50, position: { x: 0, y: 0, z: 1 }, sequence: 4, status: 'ready' },
  { id: 'ip-002', name: 'Insulation B-002', material: 'mycelium', dimensions: { width: 300, height: 280, depth: 10 }, weight: 8, loadCapacity: 50, position: { x: 1, y: 0, z: 1 }, sequence: 5, status: 'ready' },
  { id: 'wp-004', name: 'Exterior Wall A-004', material: 'hemp-concrete', dimensions: { width: 300, height: 280, depth: 20 }, weight: 45, loadCapacity: 300, position: { x: 3, y: 0, z: 0 }, sequence: 6, status: 'pending' },
  { id: 'ip-003', name: 'Insulation B-003', material: 'mycelium', dimensions: { width: 300, height: 280, depth: 10 }, weight: 8, loadCapacity: 50, position: { x: 2, y: 0, z: 1 }, sequence: 7, status: 'pending' },
];

const phaseStatusConfig = {
  pending: { color: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/30', icon: Clock, label: 'Pending' },
  'in-progress': { color: 'text-primary-400', bg: 'bg-primary-500/20', border: 'border-primary-500/30', icon: Activity, label: 'In Progress' },
  completed: { color: 'text-secondary-400', bg: 'bg-secondary-500/20', border: 'border-secondary-500/30', icon: CheckCircle2, label: 'Completed' },
};

const partStatusConfig = {
  pending: { color: 'text-slate-400', bg: 'bg-slate-500/20', label: 'Pending' },
  cutting: { color: 'text-accent-400', bg: 'bg-accent-500/20', label: 'Production' },
  ready: { color: 'text-primary-400', bg: 'bg-primary-500/20', label: 'Ready' },
  installed: { color: 'text-secondary-400', bg: 'bg-secondary-500/20', label: 'Installed' },
  verified: { color: 'text-purple-400', bg: 'bg-purple-500/20', label: 'Verified' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
};

export function Construction() {
  const [selectedPhase, setSelectedPhase] = useState<string>('p3');
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['p3']));
  const [mode, setMode] = useState<'build' | 'disassemble'>('build');

  const togglePhase = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  const completedPhases = mockPhases.filter((p) => p.status === 'completed').length;
  const totalDuration = mockPhases.reduce((sum, p) => sum + p.estimatedDuration, 0);
  const elapsedDuration = mockPhases
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + (p.actualDuration || p.estimatedDuration), 0);

  const installedParts = currentPhaseParts.filter((p) => p.status === 'installed').length;
  const readyParts = currentPhaseParts.filter((p) => p.status === 'ready').length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero Section with Stone Background */}
      <motion.div 
        variants={itemVariants} 
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/hempcrete.jpg" 
            alt="Hempcrete blocks" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Hammer className="w-5 h-5 text-primary-400" />
                <span className="text-sm font-medium text-primary-400">Active Construction</span>
              </div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">Construction Progress</h1>
              <p className="text-slate-400 max-w-lg">Sequential assembly and disassembly for structural integrity</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-800/70 backdrop-blur-sm rounded-xl p-1 border border-slate-700/50">
                <motion.button
                  onClick={() => setMode('build')}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    mode === 'build'
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  whileHover={{ scale: mode === 'build' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowRight className="w-4 h-4 inline mr-2" />
                  Build
                </motion.button>
                <motion.button
                  onClick={() => setMode('disassemble')}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    mode === 'disassemble'
                      ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  whileHover={{ scale: mode === 'disassemble' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-4 h-4 inline mr-2" />
                  Disassemble
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <HardHat className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{completedPhases}/{mockPhases.length}</p>
                  <p className="text-xs text-slate-400">Phases Done</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-secondary-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{elapsedDuration}d</p>
                  <p className="text-xs text-slate-400">of {totalDuration} days</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{installedParts}/{currentPhaseParts.length}</p>
                  <p className="text-xs text-slate-400">Parts Installed</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-xs text-slate-400">Workers Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Phase timeline */}
        <motion.div variants={itemVariants} className="lg:col-span-1 glass-panel p-6">
          <h2 className="text-lg font-display font-semibold text-white mb-6">Construction Phases</h2>
          
          <div className="space-y-2">
            {(mode === 'disassemble' ? [...mockPhases].reverse() : mockPhases).map((phase, index) => {
              const status = phaseStatusConfig[phase.status];
              const isExpanded = expandedPhases.has(phase.id);
              const isSelected = selectedPhase === phase.id;
              const StatusIcon = status.icon;

              return (
                <div key={phase.id}>
                  <motion.button
                    onClick={() => {
                      setSelectedPhase(phase.id);
                      togglePhase(phase.id);
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-slate-700/50 border border-primary-500/50'
                        : 'bg-slate-800/40 border border-slate-700/30 hover:border-primary-500/30'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${status.bg} flex items-center justify-center`}>
                        <StatusIcon className={`w-5 h-5 ${status.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">
                            {mode === 'disassemble' ? 'Remove' : 'Phase'} {mode === 'disassemble' ? mockPhases.length - index : index + 1}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                        <p className="font-medium text-white truncate">{phase.name}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 ml-6 border-l-2 border-slate-700">
                          <p className="text-sm text-slate-400 mb-3">{phase.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-slate-500">
                              <Clock className="w-4 h-4" />
                              Est. {phase.estimatedDuration} days
                            </div>
                            {phase.actualDuration && (
                              <div className={`flex items-center gap-1 ${phase.actualDuration <= phase.estimatedDuration ? 'text-primary-400' : 'text-accent-400'}`}>
                                Actual {phase.actualDuration} days
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Current phase details */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Phase info */}
          <div className="glass-panel p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-primary-400 font-medium">
                    In Progress
                  </span>
                  <span className="text-slate-500">Phase 3 / 6</span>
                </div>
                <h2 className="text-2xl font-display font-bold text-white">Wall Installation</h2>
                <p className="text-slate-400 mt-1">Installing hempcrete wall panels and insulation layers</p>
              </div>
              <motion.button 
                className="btn-secondary py-2 px-4 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MapPin className="w-4 h-4" />
                View Location
              </motion.button>
            </div>

            {/* Progress visualization */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <motion.div 
                className="p-4 rounded-xl bg-secondary-500/10 border border-secondary-500/20 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-3xl font-display font-bold text-secondary-400">{installedParts}</p>
                <p className="text-sm text-slate-400">Installed</p>
              </motion.div>
              <motion.div 
                className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-3xl font-display font-bold text-primary-400">{readyParts}</p>
                <p className="text-sm text-slate-400">Ready</p>
              </motion.div>
              <motion.div 
                className="p-4 rounded-xl bg-slate-500/10 border border-slate-500/20 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-3xl font-display font-bold text-slate-400">
                  {currentPhaseParts.length - installedParts - readyParts}
                </p>
                <p className="text-sm text-slate-400">In Production</p>
              </motion.div>
            </div>

            {/* Alert */}
            <div className="p-4 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-accent-400">Construction Notice</p>
                <p className="text-sm text-slate-400 mt-1">
                  Insulation B-001 and B-002 are ready. Please install immediately after Exterior Wall A-003 to ensure structural integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Parts list */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-lg">Parts Installation Sequence</h3>
              <motion.button 
                className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
                whileHover={{ x: 2 }}
              >
                <RotateCcw className="w-4 h-4" />
                Reset Sequence
              </motion.button>
            </div>

            <div className="space-y-2">
              {(mode === 'disassemble' ? [...currentPhaseParts].reverse() : currentPhaseParts).map(
                (part, index) => {
                  const materialColor = MATERIAL_COLORS[part.material as MaterialType];
                  const partStatus = partStatusConfig[part.status];
                  const canInstall =
                    mode === 'build'
                      ? part.status === 'ready' && index === currentPhaseParts.findIndex((p) => p.status === 'ready')
                      : part.status === 'installed' && index === [...currentPhaseParts].reverse().findIndex((p) => p.status === 'installed');

                  return (
                    <motion.div
                      key={part.id}
                      initial={{ opacity: 0, x: mode === 'build' ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: mode === 'build' ? 30 : -30 }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                      className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                        canInstall
                          ? 'bg-primary-500/10 border-primary-500/40 shadow-lg shadow-primary-500/10'
                          : 'bg-slate-800/40 border-slate-700/30 hover:border-slate-600/50'
                      }`}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      {/* Animated glow for installable parts */}
                      {canInstall && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="flex items-center gap-3">
                          <motion.span 
                            className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center text-sm font-mono text-slate-400"
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.5 }}
                          >
                            {mode === 'disassemble' ? currentPhaseParts.length - index : index + 1}
                          </motion.span>
                          <motion.div 
                            className="w-12 h-12 rounded-xl overflow-hidden relative" 
                            style={{ backgroundColor: materialColor.light }}
                            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {/* Use insulation.jpeg for parts named "Insulation", otherwise use material image */}
                            {part.name.includes('Insulation') ? (
                              <img src="/insulation.jpeg" alt="Insulation" className="absolute inset-0 w-full h-full object-cover" />
                            ) : materialColor.image ? (
                              <img src={materialColor.image} alt={materialColor.name} className="absolute inset-0 w-full h-full object-cover" />
                            ) : null}
                          </motion.div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <motion.p 
                            className="font-medium text-white"
                            whileHover={{ x: 3 }}
                          >
                            {part.name}
                          </motion.p>
                          <p className="text-sm text-slate-500">
                            {materialColor.name} · {part.weight}kg · Load {part.loadCapacity}kg
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <motion.span 
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${partStatus.bg} ${partStatus.color}`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {partStatus.label}
                          </motion.span>
                          
                          {canInstall && (
                            <motion.button 
                              className="btn-primary py-2 px-4 text-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              animate={{ 
                                boxShadow: [
                                  '0 0 20px rgba(34, 197, 94, 0.3)',
                                  '0 0 30px rgba(34, 197, 94, 0.5)',
                                  '0 0 20px rgba(34, 197, 94, 0.3)',
                                ]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {mode === 'build' ? 'Install' : 'Remove'}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
