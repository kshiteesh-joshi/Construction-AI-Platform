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
      <aside className="w-72 border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-xl flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest-400 to-forest-600 flex items-center justify-center shadow-lg shadow-forest-500/30">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-white">Origin</h1>
              <p className="text-xs text-slate-500">Renewable Building Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-forest-500/20 text-forest-400 border border-forest-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className={`w-5 h-5 transition-colors ${
                          isActive ? 'text-forest-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-forest-400"
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
        <div className="p-4 border-t border-slate-700/50">
          <div className="glass-panel p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-forest-500/20 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-forest-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">Carbon Reduction</p>
                <p className="text-xs text-slate-500">This Month</p>
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-forest-400">12.8 tons</p>
            <p className="text-xs text-slate-500 mt-1">67% less than traditional materials</p>
          </div>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-slate-700/50 bg-slate-900/30 backdrop-blur-xl flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search projects, parts, or materials..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-forest-500/50 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl hover:bg-slate-800/50 transition-colors">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-forest-500" />
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-700/50">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-earth-400 to-earth-600 flex items-center justify-center">
                <span className="text-sm font-bold text-white">JW</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-200">Architect</p>
                <p className="text-xs text-slate-500">Pro Member</p>
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
