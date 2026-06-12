import { motion, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'

export default function IslandMap({ buildings = [], onRemoveBuilding, onDropBuilding, onMoveBuilding }) {
  const mapRef = useRef(null)

  const handleDrop = (event) => {
    event.preventDefault()
    const rawData = event.dataTransfer.getData('application/json')
    if (!rawData || !mapRef.current) return

    const payload = JSON.parse(rawData)
    const bounds = mapRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))

    onDropBuilding?.(payload, { x, y })
  }

  return (
    <div
      ref={mapRef}
      className="relative w-full bg-white bg-opacity-5 rounded-xl border border-island-blue border-opacity-20 aspect-video overflow-hidden"
      role="application"
      aria-label="Smart Island map canvas"
      tabIndex={0}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      style={{
        backgroundImage:
          'linear-gradient(0deg, transparent 24%, rgba(0, 212, 255, 0.05) 25%, rgba(0, 212, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.05) 75%, rgba(0, 212, 255, 0.05) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, 0.05) 25%, rgba(0, 212, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.05) 75%, rgba(0, 212, 255, 0.05) 76%, transparent 77%)',
        backgroundSize: '50px 50px',
      }}
    >
      <AnimatePresence>
        {buildings.map((building) => (
          <motion.div
            key={building.id}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/json', JSON.stringify({
                type: 'placed',
                buildingId: building.id,
              }))
            }}
            className="absolute cursor-move outline-none"
            tabIndex={0}
            aria-label={`${building.name} building`}
            style={{
              left: `${(building.position?.x ?? 0.2) * 88}%`,
              top: `${(building.position?.y ?? 0.2) * 84}%`,
            }}
          >
            <div className="glass-effect rounded-lg p-3 group hover:shadow-premium transition-all">
              <div className="text-4xl">{building.icon}</div>
              <p className="text-xs font-semibold mt-1 text-island-blue whitespace-nowrap">{building.name}</p>
              <button
                aria-label={`Remove ${building.name}`}
                className="absolute -top-2 -right-2 w-6 h-6 bg-coral-alert rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                onClick={() => onRemoveBuilding && onRemoveBuilding(building.id)}
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {buildings.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-center opacity-50">
          <div>
            <div className="text-6xl mb-4">🏝️</div>
            <p className="text-text-secondary">Place your first building!</p>
          </div>
        </div>
      )}
    </div>
  )
}