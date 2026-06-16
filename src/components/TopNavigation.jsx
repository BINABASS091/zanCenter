import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUIStore, useGameStore } from '../store/gameStore'
import { Menu, X, Gamepad2 } from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
  { to: '/hub', label: 'Play', icon: '🎮' },
  { to: '/island', label: 'Build', icon: '🏗️' },
  { to: '/react-course', label: 'React', icon: '⚛️' },
  { to: '/explore', label: 'Explore', icon: '🗺️' },
  { to: '/portfolio', label: 'Portfolio', icon: '📂' },
  { to: '/dashboard', label: 'Hub', icon: '📊' },
]

export default function TopNavigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { userName, level } = useGameStore()
  const { toggleAICoach } = useUIStore()
  const location = useLocation()

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="hidden lg:flex items-center justify-between sticky top-0 z-40 glass-effect px-6 xl:px-8 py-3 backdrop-blur-xl"
      >
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🏝️</span>
          <div>
            <h1 className="text-lg font-bold text-island-blue leading-tight">Smart Island</h1>
            <p className="text-[10px] text-text-secondary">Experience Hub</p>
          </div>
        </Link>

        <div className="flex items-center gap-1 xl:gap-3">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} label={item.label} icon={item.icon} active={location.pathname === item.to} />
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleAICoach}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition-all text-sm"
          >
            <span>🤖</span>
            <span className="hidden xl:inline">Guide</span>
          </button>

          {/* Portals Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition-all text-sm">
              <span>🏫</span>
              <span className="hidden xl:inline">Portals</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 rounded-xl glass-effect bg-ocean-surface border border-white/10 shadow-premium opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 py-2 z-50">
              <Link to="/parent" className="block px-4 py-2 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-all">
                👨‍👩‍👦 Parent Portal
              </Link>
              <Link to="/teacher" className="block px-4 py-2 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-all">
                🍎 Teacher Portal
              </Link>
            </div>
          </div>

          <Link to="/profile" className="flex items-center gap-2 glass-effect px-3 py-2 rounded-xl hover:border-island-blue/30 transition-all">
            <span>⭐</span>
            <span className="font-semibold text-sm">Lv.{level}</span>
          </Link>
        </div>
      </motion.nav>

      <motion.nav className="lg:hidden glass-effect px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <Gamepad2 size={22} className="text-island-blue" />
          <span className="font-bold text-island-blue">Smart Island</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Lv.{level}</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {sidebarOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="lg:hidden fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-72 glass-effect z-30 p-4 overflow-y-auto border-r border-white/10"
        >
          <p className="text-xs text-text-secondary px-3 mb-3">Hi, {userName}! 🌍</p>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                location.pathname === item.to ? 'bg-island-blue/20 text-island-blue' : 'hover:bg-white/10'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <hr className="border-white/10 my-4" />
          <button
            onClick={() => { toggleAICoach(); setSidebarOpen(false) }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-left mb-1"
          >
            <span>🤖</span>
            <span>Island Guide AI</span>
          </button>
          <Link
            to="/parent"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 hover:bg-white/10 text-text-secondary"
          >
            <span>👨‍👩‍👦</span>
            <span>Parent Portal</span>
          </Link>
          <Link
            to="/teacher"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 hover:bg-white/10 text-text-secondary"
          >
            <span>🍎</span>
            <span>Teacher Portal</span>
          </Link>
        </motion.div>
      )}
    </>
  )
}

function NavLink({ to, label, icon, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
        active ? 'bg-island-blue/20 text-island-blue' : 'text-text-secondary hover:text-white hover:bg-white/5'
      }`}
    >
      <span className="text-base">{icon}</span>
      {label}
    </Link>
  )
}
