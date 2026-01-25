import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileUp,
  Factory,
  HardHat,
  Leaf,
  Settings,
  Bell,
  Search,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/blueprint', icon: FileUp, label: 'Blueprint' },
  { to: '/factory', icon: Factory, label: 'Factory' },
  { to: '/construction', icon: HardHat, label: 'Construction' },
];

export function Layout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-700/30 bg-gradient-to-b from-slate-900/80 to-slate-950/90 backdrop-blur-2xl flex flex-col relative">
        {/* Decorative glow */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none" />
        
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/30 relative">
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-accent-500/30 rounded-2xl blur-xl" />
              <img 
                src="/new-logo.png" 
                alt="Lithos.AI Logo" 
                className="relative w-12 h-12 rounded-2xl object-cover shadow-lg ring-1 ring-white/10"
              />
            </motion.div>
            <div>
              <h1 className="font-display font-bold text-xl text-white tracking-tight">
                Lithos<span className="text-gradient-primary">.AI</span>
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-primary-400" />
                Renewable Building Platform
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Menu</p>
          <ul className="space-y-1 mt-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500/20 to-primary-500/5 text-primary-400 border border-primary-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="navGlow"
                          className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <item.icon
                        className={`w-5 h-5 transition-all duration-300 relative z-10 ${
                          isActive ? 'text-primary-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      />
                      <span className="font-medium relative z-10">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-primary-400 shadow-lg shadow-primary-400/50"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-slate-700/30">
          <motion.div 
            className="glass-panel p-4 mb-4 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-500/20 rounded-full blur-2xl" />
            <div className="flex items-center gap-3 mb-3 relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400/20 to-primary-600/20 flex items-center justify-center ring-1 ring-primary-500/30">
                <Leaf className="w-5 h-5 text-primary-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">Carbon Saved</p>
                <p className="text-xs text-slate-500">This Month</p>
              </div>
            </div>
            <p className="text-3xl font-display font-bold text-gradient-primary relative">12.8 tons</p>
            <p className="text-xs text-slate-500 mt-1">67% less than traditional</p>
          </motion.div>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-slate-700/30 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/5 to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-4 flex-1 relative">
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 transition-colors group-focus-within:text-primary-400" />
              <input
                type="text"
                placeholder="Search projects, parts, or materials..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 relative">
            <motion.button 
              className="relative p-2.5 rounded-xl hover:bg-slate-800/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 ring-2 ring-slate-900" />
            </motion.button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-700/50">
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/20 ring-1 ring-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-bold text-white">JW</span>
              </motion.div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-200">Architect</p>
                <p className="text-xs text-accent-400 font-medium">Pro Member</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
