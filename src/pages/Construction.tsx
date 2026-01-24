import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardHat,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  Play,
  AlertTriangle,
  Package,
  MapPin,
  Users,
  Calendar,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
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
  'in-progress': { color: 'text-forest-400', bg: 'bg-forest-500/20', border: 'border-forest-500/30', icon: Play, label: 'In Progress' },
  completed: { color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30', icon: CheckCircle2, label: 'Completed' },
};

const partStatusConfig = {
  pending: { color: 'text-slate-400', bg: 'bg-slate-500/20', label: 'Pending' },
  cutting: { color: 'text-amber-400', bg: 'bg-amber-500/20', label: 'Production' },
  ready: { color: 'text-forest-400', bg: 'bg-forest-500/20', label: 'Ready' },
  installed: { color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Installed' },
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
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
      {/* Page header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Construction Progress</h1>
          <p className="text-slate-500 mt-1">Sequential assembly and disassembly for structural integrity</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-800/50 rounded-xl p-1">
            <button
              onClick={() => setMode('build')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'build'
                  ? 'bg-forest-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowRight className="w-4 h-4 inline mr-2" />
              Build Mode
            </button>
            <button
              onClick={() => setMode('disassemble')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'disassemble'
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Disassemble Mode
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-forest-500/20 flex items-center justify-center">
              <HardHat className="w-5 h-5 text-forest-400" />
            </div>
            <span className="text-slate-400">Construction Phase</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">
            {completedPhases} <span className="text-sm text-slate-500 font-normal">/ {mockPhases.length}</span>
          </p>
          <div className="progress-bar mt-2">
            <div
              className="progress-bar-fill"
              style={{ width: `${(completedPhases / mockPhases.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-slate-400">Timeline Progress</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">
            {elapsedDuration} <span className="text-sm text-slate-500 font-normal">/ {totalDuration} days</span>
          </p>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-earth-500/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-earth-400" />
            </div>
            <span className="text-slate-400">Current Phase Parts</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">
            {installedParts} <span className="text-sm text-slate-500 font-normal">/ {currentPhaseParts.length} installed</span>
          </p>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-slate-400">Construction Team</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">12 workers</p>
          <p className="text-xs text-slate-500 mt-1">4 teams working in parallel</p>
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
                  <button
                    onClick={() => {
                      setSelectedPhase(phase.id);
                      togglePhase(phase.id);
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-slate-700/50 border border-forest-500/50'
                        : 'bg-slate-800/40 border border-slate-700/30 hover:border-slate-600/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${status.bg} flex items-center justify-center`}
                      >
                        <StatusIcon className={`w-5 h-5 ${status.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">
                            {mode === 'disassemble' ? 'Disassemble' : 'Phase'} {mode === 'disassemble' ? mockPhases.length - index : index + 1}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}
                          >
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
                  </button>

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
                              <div
                                className={`flex items-center gap-1 ${
                                  phase.actualDuration <= phase.estimatedDuration
                                    ? 'text-forest-400'
                                    : 'text-amber-400'
                                }`}
                              >
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
                  <span className="status-badge-success">
                    <Play className="w-4 h-4" />
                    In Progress
                  </span>
                  <span className="text-slate-500">Phase 3 / 6</span>
                </div>
                <h2 className="text-xl font-display font-bold text-white">Wall Installation</h2>
                <p className="text-slate-400 mt-1">Installing hempcrete wall panels and insulation layers</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-secondary py-2 px-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  View Location
                </button>
              </div>
            </div>

            {/* Progress visualization */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                <p className="text-2xl font-display font-bold text-blue-400">{installedParts}</p>
                <p className="text-sm text-slate-400">Installed</p>
              </div>
              <div className="p-4 rounded-xl bg-forest-500/10 border border-forest-500/20 text-center">
                <p className="text-2xl font-display font-bold text-forest-400">{readyParts}</p>
                <p className="text-sm text-slate-400">Ready</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-500/10 border border-slate-500/20 text-center">
                <p className="text-2xl font-display font-bold text-slate-400">
                  {currentPhaseParts.length - installedParts - readyParts}
                </p>
                <p className="text-sm text-slate-400">In Production</p>
              </div>
            </div>

            {/* Alert */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-400">Construction Notice</p>
                <p className="text-sm text-slate-400 mt-1">
                  Insulation B-001 and B-002 are ready. Please install immediately after Exterior Wall A-003 to ensure structural integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Parts list */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Parts Installation Sequence</h3>
              <button className="text-sm text-forest-400 hover:text-forest-300 flex items-center gap-1">
                <RotateCcw className="w-4 h-4" />
                Reset Sequence
              </button>
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
                      className={`p-4 rounded-xl border transition-all duration-200 ${
                        canInstall
                          ? 'bg-forest-500/10 border-forest-500/30'
                          : 'bg-slate-800/40 border-slate-700/30'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center text-sm font-mono text-slate-400">
                            {mode === 'disassemble' ? currentPhaseParts.length - index : index + 1}
                          </span>
                          <div
                            className="w-12 h-12 rounded-xl"
                            style={{ backgroundColor: materialColor.light }}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white">{part.name}</p>
                          <p className="text-sm text-slate-500">
                            {materialColor.name} · {part.weight}kg · Load {part.loadCapacity}kg
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${partStatus.bg} ${partStatus.color}`}
                          >
                            {partStatus.label}
                          </span>
                          
                          {canInstall && (
                            <button className="btn-primary py-2 px-4 text-sm">
                              {mode === 'build' ? 'Confirm Install' : 'Confirm Remove'}
                            </button>
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
