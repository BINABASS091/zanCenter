import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, CheckCircle, BookOpen } from 'lucide-react'
import { LESSON_SNIPPETS } from '../data/reactCourse'
import { useGameStore, useUIStore } from '../store/gameStore'

export default function ReactLessonPlayer({ lesson, onClose }) {
  const { completeReactLesson } = useGameStore()
  const { addNotification } = useUIStore()
  const snippet = LESSON_SNIPPETS[lesson?.id]
  const [code, setCode] = useState(snippet?.starter || `// ${lesson?.title}\n// Start coding here...`)
  const [phase, setPhase] = useState(snippet ? 'code' : 'learn')
  const [done, setDone] = useState(false)

  if (!lesson) return null

  const runLesson = () => {
    if (snippet) {
      if (!snippet.validate(code)) {
        addNotification({ type: 'error', title: 'Not quite!', message: snippet.hint })
        return
      }
    }
    setDone(true)
    completeReactLesson(lesson.id, lesson.xp)
    addNotification({ type: 'success', title: 'Lesson complete!', message: `+${lesson.xp} XP — ${lesson.title}` })
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-ocean-deep/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-effect rounded-3xl border border-island-blue/30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 md:p-6 border-b border-white/10 flex justify-between items-start">
            <div>
              <p className="text-xs text-island-blue font-semibold mb-1">⚛️ React Course</p>
              <h3 className="text-xl font-bold">{lesson.title}</h3>
              <p className="text-sm text-text-secondary">{lesson.duration} · +{lesson.xp} XP</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X size={20} /></button>
          </div>

          <div className="p-5 md:p-6">
            {done ? (
              <div className="text-center py-10">
                <CheckCircle size={56} className="mx-auto text-tropical-green mb-4" />
                <h4 className="text-2xl font-bold mb-2">Lesson Complete!</h4>
                <p className="text-text-secondary mb-6">You earned {lesson.xp} XP toward your portfolio.</p>
                <button onClick={onClose} className="premium-button-primary px-8">Continue</button>
              </div>
            ) : phase === 'learn' ? (
              <div>
                <div className="text-5xl mb-4 text-center">{lesson.icon}</div>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {lesson.type === 'story'
                    ? 'Websites are like digital islands — each page is a place visitors can explore. React helps you build those places with reusable components!'
                    : `In this lesson you'll practice ${lesson.title.toLowerCase()} — a key skill for building real websites and portfolios.`}
                </p>
                <button
                  onClick={() => (snippet ? setPhase('code') : runLesson())}
                  className="premium-button-primary w-full flex items-center justify-center gap-2"
                >
                  <BookOpen size={18} /> {snippet ? 'Start Coding' : 'Complete Lesson'}
                </button>
              </div>
            ) : (
              <div>
                {snippet?.challenge && (
                  <p className="text-sm text-golden-sun mb-3">🎯 Challenge: {snippet.challenge}</p>
                )}
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-48 md:h-56 font-mono text-sm bg-ocean-deep/80 border border-white/10 rounded-xl p-4 text-tropical-green focus:outline-none focus:ring-2 focus:ring-island-blue/50"
                  spellCheck={false}
                />
                <div className="flex gap-3 mt-4">
                  <button onClick={runLesson} className="premium-button-primary flex-1 flex items-center justify-center gap-2">
                    <Play size={18} /> Run & Complete
                  </button>
                  <button onClick={() => setCode(snippet.starter)} className="premium-button-secondary">Reset</button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
