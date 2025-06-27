import { motion } from 'framer-motion'

const Loading = ({ type = "properties" }) => {
  if (type === "properties") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="bg-surface rounded-lg shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse bg-[length:200%_100%]" 
                 style={{ animation: 'shimmer 2s infinite' }} />
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%]" 
                   style={{ animation: 'shimmer 2s infinite' }} />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3 animate-pulse bg-[length:200%_100%]" 
                   style={{ animation: 'shimmer 2s infinite' }} />
              <div className="flex space-x-4">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16 animate-pulse bg-[length:200%_100%]" 
                     style={{ animation: 'shimmer 2s infinite' }} />
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16 animate-pulse bg-[length:200%_100%]" 
                     style={{ animation: 'shimmer 2s infinite' }} />
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16 animate-pulse bg-[length:200%_100%]" 
                     style={{ animation: 'shimmer 2s infinite' }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === "detail") {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse bg-[length:200%_100%]" 
               style={{ animation: 'shimmer 2s infinite' }} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%]" 
                   style={{ animation: 'shimmer 2s infinite' }} />
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3 animate-pulse bg-[length:200%_100%]" 
                   style={{ animation: 'shimmer 2s infinite' }} />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%]" 
                       style={{ animation: 'shimmer 2s infinite' }} />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%]" 
                   style={{ animation: 'shimmer 2s infinite' }} />
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-64">
      <motion.div
        className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

// Add shimmer keyframe animation
const style = document.createElement('style')
style.textContent = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`
document.head.appendChild(style)

export default Loading