import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ImageGallery from '@/components/molecules/ImageGallery'
import PropertySpecs from '@/components/molecules/PropertySpecs'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { getPropertyById } from '@/services/api/propertiesService'
import { saveProperty, removeSavedProperty, getSavedProperties } from '@/services/api/savedPropertiesService'

const PropertyDetailPage = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  useEffect(() => {
    loadProperty()
    checkIfSaved()
  }, [id])

  const loadProperty = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getPropertyById(parseInt(id))
      setProperty(data)
    } catch (err) {
      setError('Failed to load property details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const checkIfSaved = async () => {
    try {
      const saved = await getSavedProperties()
      setIsSaved(saved.some(item => item.propertyId === parseInt(id)))
    } catch (error) {
      console.error('Failed to check saved status:', error)
    }
  }

  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        await removeSavedProperty(parseInt(id))
        setIsSaved(false)
        toast.success('Property removed from saved list')
      } else {
        await saveProperty(parseInt(id))
        setIsSaved(true)
        toast.success('Property saved to your list')
      }
      
      // Trigger storage event for header update
      window.dispatchEvent(new Event('storage'))
    } catch (error) {
      toast.error('Failed to update saved properties')
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return <Loading type="detail" />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadProperty} />
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message="Property not found" showRetry={false} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Browse
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-display">
                  {property.title}
                </h1>
                {property.status && (
                  <Badge 
                    variant={property.status === 'For Sale' ? 'success' : 'warning'}
                    size="lg"
                  >
                    {property.status}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <ApperIcon name="MapPin" className="w-5 h-5 mr-2" />
                <span className="text-lg">
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </span>
              </div>
              
              <div className="text-4xl font-bold text-accent-gradient font-display">
                {formatPrice(property.price)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={isSaved ? "accent" : "outline"}
                icon={isSaved ? "Heart" : "Heart"}
                onClick={handleSaveToggle}
                className={isSaved ? "fill-current" : ""}
              >
                {isSaved ? "Saved" : "Save Property"}
              </Button>
              <Button
                variant="primary"
                icon="Phone"
                onClick={() => setIsContactFormOpen(true)}
              >
                Contact Agent
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ImageGallery images={property.images} title={property.title} />
            </motion.div>

            {/* Property Specs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PropertySpecs property={property} />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface rounded-lg p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 font-display mb-4">
                About This Property
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </motion.div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-surface rounded-lg p-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900 font-display mb-4">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <ApperIcon name="Check" className="w-4 h-4 text-success mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Property Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface rounded-lg p-6 sticky top-24"
            >
              <h3 className="text-xl font-semibold text-gray-900 font-display mb-4">
                Property Details
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium text-gray-900">{property.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built</span>
                  <span className="font-medium text-gray-900">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(property.listingDate)}
                  </span>
                </div>
                {property.sqft && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per Sq Ft</span>
                    <span className="font-medium text-gray-900">
                      ${Math.round(property.price / property.sqft).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="primary"
                  icon="MessageCircle"
                  onClick={() => setIsContactFormOpen(true)}
                  className="w-full mb-3"
                >
                  Request Information
                </Button>
                <Button
                  variant="outline"
                  icon="Calendar"
                  className="w-full"
                >
                  Schedule Tour
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailPage