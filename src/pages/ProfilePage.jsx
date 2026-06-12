import { motion } from 'framer-motion'
import TopNavigation from '../components/TopNavigation'
import XPBar from '../components/XPBar'
import ProgressRing from '../components/ProgressRing'
import { useGameStore } from '../store/gameStore'
import { useAgeMode } from '../hooks/useAgeMode'
import { User, BadgeCheck, Download, Share2 } from 'lucide-react'

export default function ProfilePage() {
  const { userName, level, xp, totalXP, buildings = [], totalAchievements = [], unlockedAchievements = [], learningStreak } = useGameStore()
  const { mode } = useAgeMode()

  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <TopNavigation />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Profile</h1>
          <p className="text-text-secondary text-lg">Your learning identity and personal achievements</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="premium-card rounded-2xl p-8 text-center">
            <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-island-blue to-tropical-green flex items-center justify-center text-5xl mb-5">
              <User size={48} />
            </div>
            <h2 className="text-2xl font-bold mb-1">{userName}</h2>
            <p className="text-text-secondary mb-2">{mode.label}</p>
            <p className="text-xs text-island-blue mb-6">Ages {mode.ages} · {learningStreak} day streak 🔥</p>
            <XPBar currentXP={xp} level={level} />
            <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
              <div className="glass-effect rounded-xl p-4"><p className="text-text-secondary">Level</p><p className="text-2xl font-bold">{level}</p></div>
              <div className="glass-effect rounded-xl p-4"><p className="text-text-secondary">XP</p><p className="text-2xl font-bold">{totalXP}</p></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 premium-button-secondary flex items-center justify-center gap-2"><Download size={16} /> Export</button>
              <button className="flex-1 premium-button-primary flex items-center justify-center gap-2"><Share2 size={16} /> Share</button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="premium-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Progress Overview</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <ProgressRing percentage={82} size={140} color="#00D4FF" label="Learning" value="Progress" />
                <ProgressRing percentage={64} size={140} color="#2EE59D" label="Creativity" value="Growth" />
                <ProgressRing percentage={91} size={140} color="#FFCC00" label="Consistency" value="Streak" />
              </div>
            </div>

            <div className="premium-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><BadgeCheck size={24} /> Achievements</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {totalAchievements.map((ach) => {
                  const isUnlocked = unlockedAchievements.some((ua) => ua.id === ach.id)
                  return (
                    <div key={ach.id} className={`glass-effect rounded-xl p-4 flex items-center justify-between transition-all ${isUnlocked ? 'border border-tropical-green border-opacity-30' : 'opacity-50'}`}>
                      <span className="flex items-center gap-2">
                        <span>{ach.icon}</span>
                        <span className={isUnlocked ? 'text-white font-medium' : 'text-text-secondary line-through'}>{ach.title}</span>
                      </span>
                      {isUnlocked ? (
                        <span className="text-golden-sun">🏆</span>
                      ) : (
                        <span className="text-text-secondary text-xs">🔒</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="premium-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Island Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Buildings', value: buildings.length || 0 },
                  { label: 'Projects', value: 3 },
                  { label: 'Badges', value: 8 },
                  { label: 'Certificates', value: 3 },
                ].map((item) => (
                  <div key={item.label} className="glass-effect rounded-xl p-4 text-center">
                    <p className="text-text-secondary text-xs">{item.label}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
