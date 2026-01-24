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
  Zap,
  Target,
} from 'lucide-react';
import type { Project } from '../types';

// Project images mapping
const PROJECT_IMAGES: Record<string, string> = {
  'Eco Community Center': '/Eco_Community_Center.jpg',
  'Sustainable Residence Block A': '/Sustainable_ResidenceBlockA.jpg',
  'Green Office Building': '/green_officebuilding.jpg',
};

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
    gradient: 'from-primary-400 to-primary-600',
    glow: 'shadow-primary-500/20',
  },
  {
    label: 'Parts Completion',
    value: '73.2%',
    change: '+5.4%',
    trend: 'up',
    icon: Target,
    gradient: 'from-secondary-400 to-secondary-600',
    glow: 'shadow-secondary-500/20',
  },
  {
    label: 'Factory Efficiency',
    value: '94.8%',
    change: '+1.2%',
    trend: 'up',
    icon: Zap,
    gradient: 'from-accent-400 to-accent-600',
    glow: 'shadow-accent-500/20',
  },
  {
    label: 'Est. Completion',
    value: '12 days',
    change: '-3 days',
    trend: 'up',
    icon: Clock,
    gradient: 'from-purple-400 to-purple-600',
    glow: 'shadow-purple-500/20',
  },
];

const statusColors = {
  design: { bg: 'bg-secondary-500/20', text: 'text-secondary-400', border: 'border-secondary-500/30', label: 'Designing', glow: 'shadow-secondary-500/20' },
  cutting: { bg: 'bg-accent-500/20', text: 'text-accent-400', border: 'border-accent-500/30', label: 'Cutting', glow: 'shadow-accent-500/20' },
  construction: { bg: 'bg-primary-500/20', text: 'text-primary-400', border: 'border-primary-500/30', label: 'Building', glow: 'shadow-primary-500/20' },
  completed: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30', label: 'Completed', glow: '' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
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
          <h1 className="text-3xl font-display font-bold text-white">Dashboard</h1>
          <p className="text-slate-500 mt-1">Monitor your renewable building projects</p>
        </div>
        <motion.button 
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Package className="w-5 h-5" />
          New Project
        </motion.button>
      </motion.div>

      {/* Stats grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label} 
            className="glass-panel p-5 group hover:border-primary-500/30 transition-all duration-300"
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg ${stat.glow}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-primary-400' : 'text-red-400'}`}>
                {stat.change}
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects list */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-white">Project Overview</h2>
            <motion.button 
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 font-medium"
              whileHover={{ x: 4 }}
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          <div className="space-y-4">
            {mockProjects.map((project, index) => {
              const status = statusColors[project.status];
              const projectImage = PROJECT_IMAGES[project.name];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-xl border border-slate-700/30 hover:border-primary-500/30 transition-all duration-300 cursor-pointer group overflow-hidden`}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Background Image */}
                  {projectImage && (
                    <div className="absolute inset-0">
                      <img
                        src={projectImage}
                        alt={project.name}
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/70" />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="relative p-5">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="flex items-start justify-between mb-4 relative">
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors text-lg">
                          {project.name}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">{project.description}</p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.text} border ${status.border} shadow-lg ${status.glow}`}>
                        {status.label}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 relative">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-white font-semibold">{project.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <motion.div
                            className="progress-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">Parts</p>
                        <p className="text-white font-semibold">
                          <span className="text-primary-400">{project.completedParts}</span>/{project.totalParts}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Environmental impact with wood texture */}
        <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden">
          {/* Wood Background */}
          <div className="absolute inset-0">
            <img 
              src="/bamboo.webp" 
              alt="Green Bamboo" 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/50 to-slate-900/70" />
          </div>
          
          <div className="relative glass-panel p-6 bg-transparent border-slate-700/30">
            <h2 className="text-xl font-display font-semibold text-white mb-6">Environmental Impact</h2>
            
            <div className="space-y-6">
              <div className="text-center py-6">
                <motion.div 
                  className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-primary-400/20 to-primary-600/10 border border-primary-500/30 flex items-center justify-center mb-4 relative"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(34, 197, 94, 0.3)',
                      '0 0 40px rgba(34, 197, 94, 0.5)',
                      '0 0 20px rgba(34, 197, 94, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary-500/10 to-transparent" />
                  <Leaf className="w-14 h-14 text-primary-400 relative z-10" />
                </motion.div>
                <p className="text-4xl font-display font-bold text-gradient-primary">-67%</p>
                <p className="text-sm text-slate-500 mt-1">Carbon Footprint Reduction</p>
              </div>
              
              <div className="space-y-3">
                {[
                  { icon: Recycle, label: 'Recycled Materials', value: '89%', color: 'primary' },
                  { icon: Package, label: 'Waste Recovery', value: '94%', color: 'accent' },
                  { icon: Factory, label: 'Energy Efficiency', value: 'A+', color: 'secondary' },
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 hover:border-primary-500/30 transition-all duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/20 flex items-center justify-center ring-1 ring-${item.color}-500/30`}>
                        <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                      </div>
                      <span className="text-sm text-slate-300 font-medium">{item.label}</span>
                    </div>
                    <span className="text-lg font-bold text-white">{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
