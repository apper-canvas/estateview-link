import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  type = "properties", 
  message, 
  subMessage, 
  actionText, 
  onAction 
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case "properties":
        return {
          icon: "Home",
          title: message || "No properties found",
          subtitle: subMessage || "Try adjusting your filters or search criteria to find more properties.",
          action: actionText || "Clear Filters",
        }
      case "saved":
        return {
          icon: "Heart",
          title: message || "No saved properties yet",
          subtitle: subMessage || "Start browsing and save your favorite properties to see them here.",
          action: actionText || "Browse Properties",
        }
      case "search":
        return {
          icon: "Search",
          title: message || "No results found",
          subtitle: subMessage || "We couldn't find any properties matching your search. Try using different keywords.",
          action: actionText || "Clear Search",
        }
      default:
        return {
          icon: "FileX",
          title: message || "No data available",
          subtitle: subMessage || "There's nothing to show here right now.",
          action: actionText || "Refresh",
        }
    }
  }

  const content = getEmptyContent()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-64 p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        className="w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={content.icon} className="w-10 h-10 text-primary-600" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-gray-900 mb-3 font-display"
      >
        {content.title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-8 max-w-md leading-relaxed"
      >
        {content.subtitle}
      </motion.p>
      
      {onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onAction}
          className="bg-gradient-accent text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <ApperIcon name="ArrowRight" className="w-4 h-4" />
          <span>{content.action}</span>
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty