import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import { saveProperty, removeSavedProperty, getSavedProperties } from '@/services/api/savedPropertiesService'

const PropertyCard = ({ property, isSaved = false, onSaveToggle }) => {
  const [isLiked, setIsLiked] = useState(isSaved)
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveToggle = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsLoading(true)
    try {
      if (isLiked) {
        await removeSavedProperty(property.Id)
        setIsLiked(false)
        toast.success('Property removed from saved list')
      } else {
        await saveProperty(property.Id)
        setIsLiked(true)
        toast.success('Property saved to your list')
      }
      
      if (onSaveToggle) {
        onSaveToggle(property.Id, !isLiked)
      }
      
      // Trigger storage event for header update
      window.dispatchEvent(new Event('storage'))
    } catch (error) {
      toast.error('Failed to update saved properties')
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-surface rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
    >
      <Link to={`/property/${property.Id}`} className="block">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.images?.[0] || '/api/placeholder/400/320'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Save Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSaveToggle}
            disabled={isLoading}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isLiked
                ? 'bg-accent-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-accent-500'
            }`}
          >
            <ApperIcon 
              name={isLiked ? "Heart" : "Heart"} 
              className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
            />
          </motion.button>
          
          {/* Status Badge */}
          {property.status && (
            <div className="absolute top-3 left-3">
              <Badge 
                variant={property.status === 'For Sale' ? 'success' : 'warning'}
                className="font-semibold"
              >
                {property.status}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="mb-2">
            <span className="text-2xl font-bold text-accent-gradient font-display">
              {formatPrice(property.price)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors duration-200">
            {property.title}
          </h3>

          {/* Address */}
          <div className="flex items-center text-gray-600 mb-3">
            <ApperIcon name="MapPin" className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-sm truncate">
              {property.address}, {property.city}, {property.state}
            </span>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
                <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Bath" className="w-4 h-4 mr-1" />
                <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
              </div>
            </div>
            {property.sqft && (
              <div className="flex items-center">
                <ApperIcon name="Square" className="w-4 h-4 mr-1" />
                <span>{property.sqft.toLocaleString()} sq ft</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default PropertyCard