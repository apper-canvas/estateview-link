import { motion } from 'framer-motion'
import PropertyCard from '@/components/organisms/PropertyCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const PropertyGrid = ({ 
  properties = [], 
  loading = false, 
  error = null, 
  onRetry,
  savedProperties = [],
  onSaveToggle,
  viewMode = "grid",
  className = "" 
}) => {
  if (loading) {
    return <Loading type="properties" />
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />
  }

  if (!properties.length) {
    return <Empty type="properties" onAction={() => window.location.reload()} />
  }

  const gridClasses = viewMode === "grid" 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    : "space-y-4"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${gridClasses} ${className}`}
    >
      {properties.map((property, index) => (
        <motion.div
          key={property.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <PropertyCard 
            property={property}
            isSaved={savedProperties.includes(property.Id)}
            onSaveToggle={onSaveToggle}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default PropertyGrid