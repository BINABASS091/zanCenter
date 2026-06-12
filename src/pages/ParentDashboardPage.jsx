import { motion } from 'framer-motion'
import TopNavigation from '../components/TopNavigation'
import { Download, Bell, Calendar, Heart, ShieldCheck, TrendingUp } from 'lucide-react'

const childProgress = [
  { label: 'Learning', value: 82 },
  { label: 'Creativity', value: 64 },
  { label: 'Consistency', value: 91 },
]

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export default function ParentDashboardPage() {
  const exportSummary = () => {
    downloadTextFile(
      'smart-island-parent-summary.txt',
      ['Smart Island Parent Summary', '', 'Child: Explorer', 'Weekly progress: 82%', 'Missions completed: 3', 'Teacher comments: Strong progress in logic and sustainability'].join('\n')
    )
  }

  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <TopNavigation />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Parent Dashboard</h1>
          <p className="text-text-secondary text-lg">See learning progress, wellbeing signals, and weekly summaries</p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Weekly Progress', value: '82%', icon: <TrendingUp /> },
            { label: 'Wellbeing', value: 'Healthy', icon: <Heart /> },
            { label: 'Alerts', value: '0', icon: <Bell /> },
            { label: 'Next Review', value: 'Fri 3 PM', icon: <Calendar /> },
          ].map((item) => (
            <div key={item.label} className="premium-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl text-island-blue">{item.icon}</div>
                <span className="text-xs text-text-secondary">Live</span>
              </div>
              <p className="text-text-secondary text-sm mb-1">{item.label}</p>
              <p className="text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 premium-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><ShieldCheck size={24} /> Progress Overview</h2>
            <div className="space-y-4">
              {childProgress.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-2">
                    <span>{item.label}</span>
                    <span className="text-text-secondary">{item.value}%</span>
                  </div>
                  <div className="h-3 bg-white bg-opacity-10 rounded-full overflow-hidden">
                    <motion.div animate={{ width: `${item.value}%` }} className="h-full bg-gradient-to-r from-island-blue to-tropical-green" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Download size={24} /> Export</h2>
            <p className="text-text-secondary text-sm mb-6">Download weekly progress summaries for school or home review.</p>
            <button onClick={exportSummary} className="w-full premium-button-primary">
              Download Summary
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
