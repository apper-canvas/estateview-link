import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PropertyGrid from '@/components/organisms/PropertyGrid'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { getSavedProperties, removeSavedProperty } from '@/services/api/savedPropertiesService'
import { getPropertyById } from '@/services/api/propertiesService'

const SavedPropertiesPage = () => {
  const [savedProperties, setSavedProperties] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadSavedProperties()
  }, [])

  const loadSavedProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const saved = await getSavedProperties()
      setSavedProperties(saved.map(item => item.propertyId))
      
      // Load full property details for each saved property
      const propertyPromises = saved.map(item => getPropertyById(item.propertyId))
      const propertyData = await Promise.all(propertyPromises)
      
      setProperties(propertyData.filter(Boolean)) // Filter out any null results
    } catch (err) {
      setError('Failed to load saved properties. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveProperty = async (propertyId) => {
    try {
      await removeSavedProperty(propertyId)
      setSavedProperties(prev => prev.filter(id => id !== propertyId))
      setProperties(prev => prev.filter(property => property.Id !== propertyId))
      
      // Trigger storage event for header update
      window.dispatchEvent(new Event('storage'))
    } catch (error) {
      console.error('Failed to remove saved property:', error)
    }
  }

  const handleSaveToggle = (propertyId, isSaved) => {
    if (!isSaved) {
      handleRemoveProperty(propertyId)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading type="properties" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadSavedProperties} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="Heart" className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-display">
                Saved Properties
              </h1>
              <p className="text-gray-600">
                {properties.length} propert{properties.length !== 1 ? 'ies' : 'y'} saved
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {properties.length === 0 ? (
          <Empty 
            type="saved" 
            onAction={() => window.location.href = '/'}
          />
        ) : (
          <PropertyGrid
            properties={properties}
            savedProperties={savedProperties}
            onSaveToggle={handleSaveToggle}
          />
        )}
      </div>
    </div>
  )
}

export default SavedPropertiesPage