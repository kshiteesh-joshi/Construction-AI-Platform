import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Factory as FactoryIcon,
  Bot,
  Package,
  Clock,
  CheckCircle2,
  Play,
  Pause,
  Settings,
  RefreshCw,
  Zap,
  TrendingUp,
} from 'lucide-react';
import type { CuttingRobot, BuildingPart, MaterialType } from '../types';
import { MATERIAL_COLORS } from '../types';

// Robot images
const ROBOT_IMAGES = [
  '/cutting_robot1.png',
  '/cutting_robot2.jpeg',
  '/cutting_robot3.jpg',
  '/cutting_robot4.jpg',
];

const mockRobots: CuttingRobot[] = [
  { id: 'r1', name: 'Cutting Robot A-01', status: 'cutting', currentPart: 'BM-0847', progress: 67, partsCompleted: 234, totalParts: 350 },
  { id: 'r2', name: 'Cutting Robot A-02', status: 'cutting', currentPart: 'RW-1203', progress: 23, partsCompleted: 189, totalParts: 350 },
  { id: 'r3', name: 'Cutting Robot B-01', status: 'idle', progress: 0, partsCompleted: 350, totalParts: 350 },
  { id: 'r4', name: 'Cutting Robot B-02', status: 'maintenance', progress: 0, partsCompleted: 312, totalParts: 350 },
];

// Part images mapping
const PART_IMAGES: Record<string, string> = {
  'Load Beam': '/loadbeam.webp',
  'Wall Panel': '/wall_panel.jpeg',
  'Insulation': '/insulation.jpeg',
  'Decor Panel': '/dector_panel.jpg',
  'Connector': '/recycle_steel.jpg',
  'Floor Tile': '/floor_tile.jpg',
};

const getPartImage = (partName: string): string | undefined => {
  for (const [key, image] of Object.entries(PART_IMAGES)) {
    if (partName.includes(key)) return image;
  }
  return undefined;
};

const mockParts: BuildingPart[] = [
  { id: 'BM-0847', name: 'Load Beam #847', material: 'bamboo', dimensions: { width: 200, height: 30, depth: 15 }, weight: 12.5, loadCapacity: 500, position: { x: 0, y: 0, z: 0 }, sequence: 847, status: 'cutting', tag: 'A-847' },
  { id: 'RW-1203', name: 'Wall Panel #1203', material: 'recycled-wood', dimensions: { width: 120, height: 240, depth: 5 }, weight: 8.2, loadCapacity: 200, position: { x: 0, y: 0, z: 0 }, sequence: 1203, status: 'cutting', tag: 'W-1203' },
  { id: 'HC-0456', name: 'Insulation #456', material: 'hemp-concrete', dimensions: { width: 100, height: 100, depth: 10 }, weight: 15.0, loadCapacity: 100, position: { x: 0, y: 0, z: 0 }, sequence: 456, status: 'ready', tag: 'I-456' },
  { id: 'MY-0089', name: 'Decor Panel #89', material: 'mycelium', dimensions: { width: 60, height: 60, depth: 3 }, weight: 1.2, loadCapacity: 20, position: { x: 0, y: 0, z: 0 }, sequence: 89, status: 'ready', tag: 'D-089' },
  { id: 'RS-0023', name: 'Connector #23', material: 'recycled-steel', dimensions: { width: 15, height: 15, depth: 5 }, weight: 2.8, loadCapacity: 2000, position: { x: 0, y: 0, z: 0 }, sequence: 23, status: 'ready', tag: 'C-023' },
  { id: 'BM-0848', name: 'Load Beam #848', material: 'bamboo', dimensions: { width: 200, height: 30, depth: 15 }, weight: 12.5, loadCapacity: 500, position: { x: 0, y: 0, z: 0 }, sequence: 848, status: 'pending' },
  { id: 'CK-0112', name: 'Floor Tile #112', material: 'cork', dimensions: { width: 30, height: 30, depth: 2 }, weight: 0.8, loadCapacity: 150, position: { x: 0, y: 0, z: 0 }, sequence: 112, status: 'pending' },
];

const statusConfig = {
  idle: { color: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/30', label: 'Idle' },
  cutting: { color: 'text-primary-400', bg: 'bg-primary-500/20', border: 'border-primary-500/30', label: 'Cutting' },
  maintenance: { color: 'text-accent-400', bg: 'bg-accent-500/20', border: 'border-accent-500/30', label: 'Maintenance' },
  error: { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', label: 'Error' },
};

const partStatusConfig = {
  pending: { color: 'text-slate-400', bg: 'bg-slate-500/20', label: 'Pending' },
  cutting: { color: 'text-accent-400', bg: 'bg-accent-500/20', label: 'Cutting' },
  ready: { color: 'text-primary-400', bg: 'bg-primary-500/20', label: 'Ready' },
  installed: { color: 'text-secondary-400', bg: 'bg-secondary-500/20', label: 'Installed' },
  verified: { color: 'text-purple-400', bg: 'bg-purple-500/20', label: 'Verified' },
};

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

// Material Usage Stats Component with animated percentages
function MaterialUsageStats() {
  const materials = Object.entries(MATERIAL_COLORS).slice(0, 6);
  const [percentages, setPercentages] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    materials.forEach(([key]) => {
      initial[key] = Math.random() * 20 + 30; // Start between 30-50%
    });
    return initial;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentages((prev) => {
        const updated: Record<string, number> = {};
        materials.forEach(([key]) => {
          const current = prev[key] || 30;
          // Reset to random start value when reaching 98%
          if (current >= 98) {
            updated[key] = Math.random() * 20 + 20; // Reset to 20-40%
          } else {
            // Slower increase: 0.05-0.2% per tick
            const increment = Math.random() * 0.15 + 0.05;
            updated[key] = Math.min(current + increment, 98);
          }
        });
        return updated;
      });
    }, 200); // Slower interval: 200ms instead of 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div variants={itemVariants} className="glass-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-400" />
          Material Usage Statistics
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {materials.map(([key, value]) => {
          const percentage = percentages[key] || 50;
          return (
            <motion.div 
              key={key} 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full aspect-square rounded-xl mb-3 flex items-center justify-center relative overflow-hidden border border-slate-700/50">
                {/* Material image background */}
                {value.image && (
                  <img 
                    src={value.image} 
                    alt={value.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                )}
                {/* Subtle dark overlay for text readability */}
                <div className="absolute inset-0 bg-slate-900/20" />
                {/* Animated fill - semi-transparent to show image */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 mix-blend-overlay"
                  initial={{ height: '0%' }}
                  animate={{ height: `${percentage}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ 
                    background: `linear-gradient(to top, ${value.light}90, ${value.light}50)`,
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-white/30 to-transparent animate-pulse" />
                </motion.div>
                {/* Percentage text */}
                <span className="relative z-10 text-2xl font-display font-bold text-white drop-shadow-lg">
                  {percentage.toFixed(0)}%
                </span>
              </div>
              <p className="text-sm text-white font-medium">{value.name}</p>
              <p className="text-xs text-slate-500">Used</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function Factory() {
  const [robots, setRobots] = useState(mockRobots);
  const [selectedRobot, setSelectedRobot] = useState<string | null>(null);

  // Simulate robot progress
  useEffect(() => {
    const interval = setInterval(() => {
      setRobots((prev) =>
        prev.map((robot) => {
          if (robot.status === 'cutting') {
            const newProgress = robot.progress + Math.random() * 2;
            if (newProgress >= 100) {
              return {
                ...robot,
                progress: 0,
                partsCompleted: Math.min(robot.partsCompleted + 1, robot.totalParts),
              };
            }
            return { ...robot, progress: newProgress };
          }
          return robot;
        })
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const totalCompleted = robots.reduce((sum, r) => sum + r.partsCompleted, 0);
  const totalParts = robots.reduce((sum, r) => sum + r.totalParts, 0);
  const overallProgress = (totalCompleted / totalParts) * 100;

  const readyParts = mockParts.filter((p) => p.status === 'ready').length;
  const cuttingParts = mockParts.filter((p) => p.status === 'cutting').length;
  const pendingParts = mockParts.filter((p) => p.status === 'pending').length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero Section with Background Image */}
      <motion.div 
        variants={itemVariants} 
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/robot_factory.webp" 
            alt="Factory" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">Factory Monitor</h1>
              <p className="text-slate-400 max-w-lg">Real-time monitoring of cutting robots and production progress</p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button 
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw className="w-5 h-5" />
                Refresh
              </motion.button>
              <motion.button 
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Settings className="w-5 h-5" />
                Robot Settings
              </motion.button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{overallProgress.toFixed(1)}%</p>
                  <p className="text-xs text-slate-400">Overall Progress</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{totalCompleted}</p>
                  <p className="text-xs text-slate-400">Parts Completed</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{cuttingParts}</p>
                  <p className="text-xs text-slate-400">Now Cutting</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">4.5h</p>
                  <p className="text-xs text-slate-400">Est. Completion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Robots panel */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary-400" />
              Cutting Robot Status
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              {robots.filter((r) => r.status === 'cutting').length} running
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {robots.map((robot, index) => {
              const status = statusConfig[robot.status];
              const robotImage = ROBOT_IMAGES[index % ROBOT_IMAGES.length];
              return (
                <motion.div
                  key={robot.id}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    selectedRobot === robot.id
                      ? 'bg-slate-700/50 border-primary-500/50'
                      : 'bg-slate-800/40 border-slate-700/30 hover:border-primary-500/30'
                  }`}
                  onClick={() => setSelectedRobot(robot.id === selectedRobot ? null : robot.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-xl ${status.bg} flex items-center justify-center overflow-hidden relative border-2 ${status.border}`}>
                        <img src={robotImage} alt={robot.name} className="w-full h-full object-cover" />
                        {/* Status indicator overlay */}
                        {robot.status === 'cutting' && (
                          <div className="absolute inset-0 bg-primary-500/20 animate-pulse" />
                        )}
                        {robot.status === 'maintenance' && (
                          <div className="absolute inset-0 bg-accent-500/30" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{robot.name}</p>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color} border ${status.border}`}>
                          {robot.status === 'cutting' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                          )}
                          {status.label}
                        </span>
                      </div>
                    </div>
                    {robot.status === 'cutting' && (
                      <button className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                        <Pause className="w-4 h-4 text-slate-400" />
                      </button>
                    )}
                    {robot.status === 'idle' && (
                      <button className="p-2 rounded-lg bg-primary-500/20 hover:bg-primary-500/30 transition-colors">
                        <Play className="w-4 h-4 text-primary-400" />
                      </button>
                    )}
                  </div>

                  {robot.status === 'cutting' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-400">Current: {robot.currentPart}</span>
                        <span className="text-white font-medium">{robot.progress.toFixed(0)}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div className="progress-bar-fill" style={{ width: `${robot.progress}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Total Progress</span>
                    <span className="text-white font-medium">{robot.partsCompleted}/{robot.totalParts}</span>
                  </div>
                  <div className="progress-bar mt-1">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${(robot.partsCompleted / robot.totalParts) * 100}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Parts queue */}
        <motion.div variants={itemVariants} className="glass-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-white">Parts Queue</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-primary-400" />
              <span className="text-slate-400">{readyParts} ready</span>
              <span className="w-2 h-2 rounded-full bg-accent-400 ml-2" />
              <span className="text-slate-400">{pendingParts} pending</span>
            </div>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {mockParts.map((part) => {
              const materialColor = MATERIAL_COLORS[part.material as MaterialType];
              const partStatus = partStatusConfig[part.status];
              
              return (
                <motion.div
                  key={part.id}
                  className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden relative"
                      style={{ backgroundColor: materialColor.light }}
                    >
                      {getPartImage(part.name) ? (
                        <img src={getPartImage(part.name)} alt={part.name} className="absolute inset-0 w-full h-full object-cover" />
                      ) : materialColor.image && (
                        <img src={materialColor.image} alt={materialColor.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                      )}
                      <span className="text-xs font-bold text-white relative z-10 drop-shadow-lg bg-black/30 px-1 rounded">{part.sequence}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white text-sm truncate">{part.name}</p>
                        {part.tag && (
                          <span className="px-1.5 py-0.5 rounded bg-slate-700 text-xs text-slate-400 font-mono">{part.tag}</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {materialColor.name} · {part.dimensions.width}×{part.dimensions.height}×{part.dimensions.depth}mm
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${partStatus.bg} ${partStatus.color}`}>
                      {partStatus.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Production analytics */}
      <MaterialUsageStats />
    </motion.div>
  );
}
