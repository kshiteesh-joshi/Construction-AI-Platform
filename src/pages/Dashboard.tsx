import { motion } from 'framer-motion';
import {
  TrendingUp,
  Package,
  Factory,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Leaf,
  Recycle,
} from 'lucide-react';
import type { Project } from '../types';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Eco Community Center',
    description: 'Public building using bamboo and recycled wood',
    status: 'construction',
    progress: 68,
    createdAt: '2025-12-15',
    updatedAt: '2026-01-23',
    totalParts: 1247,
    completedParts: 848,
    materials: [],
  },
  {
    id: '2',
    name: 'Sustainable Residence Block A',
    description: 'Residential project combining hempcrete and cork',
    status: 'cutting',
    progress: 35,
    createdAt: '2026-01-10',
    updatedAt: '2026-01-23',
    totalParts: 892,
    completedParts: 312,
    materials: [],
  },
  {
    id: '3',
    name: 'Green Office Building',
    description: 'Mycelium insulation material demonstration',
    status: 'design',
    progress: 12,
    createdAt: '2026-01-20',
    updatedAt: '2026-01-22',
    totalParts: 2134,
    completedParts: 0,
    materials: [],
  },
];

const stats = [
  {
    label: 'Active Projects',
    value: '8',
    change: '+2',
    trend: 'up',
    icon: Package,
    color: 'forest',
  },
  {
    label: 'Parts Completion',
    value: '73.2%',
    change: '+5.4%',
    trend: 'up',
    icon: CheckCircle2,
    color: 'forest',
  },
  {
    label: 'Factory Efficiency',
    value: '94.8%',
    change: '+1.2%',
    trend: 'up',
    icon: Factory,
    color: 'earth',
  },
  {
    label: 'Est. Completion',
    value: '12 days',
    change: '-3 days',
    trend: 'up',
    icon: Clock,
    color: 'earth',
  },
];

const statusColors = {
  design: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', label: 'Designing' },
  cutting: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: 'Cutting' },
  construction: { bg: 'bg-forest-500/20', text: 'text-forest-400', border: 'border-forest-500/30', label: 'Building' },
  completed: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30', label: 'Completed' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Dashboard() {
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
          <h1 className="text-2xl font-display font-bold text-white">Dashboard</h1>
          <p className="text-slate-500 mt-1">Monitor your renewable building projects</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Package className="w-5 h-5" />
          New Project
        </button>
      </motion.div>

      {/* Stats grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-panel p-5">
            <div className="flex items-start justify-between">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  stat.color === 'forest' ? 'bg-forest-500/20' : 'bg-earth-500/20'
                }`}
              >
                <stat.icon
                  className={`w-5 h-5 ${
                    stat.color === 'forest' ? 'text-forest-400' : 'text-earth-400'
                  }`}
                />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-forest-400' : 'text-red-400'
                }`}
              >
                {stat.change}
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects list */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-semibold text-white">Project Overview</h2>
            <button className="text-sm text-forest-400 hover:text-forest-300 transition-colors flex items-center gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {mockProjects.map((project) => {
              const status = statusColors[project.status];
              return (
                <div
                  key={project.id}
                  className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-white group-hover:text-forest-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">{project.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text} border ${status.border}`}
                    >
                      {status.label}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white font-medium">{project.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Parts</p>
                      <p className="text-white font-medium">
                        {project.completedParts}/{project.totalParts}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Environmental impact */}
        <motion.div variants={itemVariants} className="glass-panel p-6">
          <h2 className="text-lg font-display font-semibold text-white mb-6">Environmental Impact</h2>
          
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-forest-400/20 to-forest-600/20 border border-forest-500/30 flex items-center justify-center mb-4 animate-pulse-glow">
                <Leaf className="w-12 h-12 text-forest-400" />
              </div>
              <p className="text-3xl font-display font-bold text-forest-400">-67%</p>
              <p className="text-sm text-slate-500 mt-1">Carbon Footprint Reduction</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-forest-500/20 flex items-center justify-center">
                    <Recycle className="w-4 h-4 text-forest-400" />
                  </div>
                  <span className="text-sm text-slate-300">Recycled Materials</span>
                </div>
                <span className="text-sm font-medium text-white">89%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-earth-500/20 flex items-center justify-center">
                    <Package className="w-4 h-4 text-earth-400" />
                  </div>
                  <span className="text-sm text-slate-300">Waste Recovery</span>
                </div>
                <span className="text-sm font-medium text-white">94%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Factory className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm text-slate-300">Energy Efficiency</span>
                </div>
                <span className="text-sm font-medium text-white">A+</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
