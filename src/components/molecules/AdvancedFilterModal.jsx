import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const AdvancedFilterModal = ({ isOpen, onClose, onApplyFilters, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    amenities: [],
    minYearBuilt: '',
    maxYearBuilt: '',
    minLotSize: '',
    maxLotSize: '',
    minSqft: '',
    maxSqft: '',
    features: [],
    ...initialFilters
  })

  useEffect(() => {
    if (isOpen) {
      setFilters({ 
        amenities: [],
        minYearBuilt: '',
        maxYearBuilt: '',
        minLotSize: '',
        maxLotSize: '',
        minSqft: '',
        maxSqft: '',
        features: [],
        ...initialFilters
      })
    }
  }, [isOpen, initialFilters])

  const amenityOptions = [
    'Parking space included',
    'Fitness center',
    'Rooftop deck access',
    'Concierge service',
    'In-unit laundry',
    'Swimming pool',
    'Tennis court',
    'Elevator',
    'Balcony',
    'Fireplace',
    'Walk-in closet',
    'Air conditioning',
    'Hardwood floors',
    'Granite countertops',
    'Stainless steel appliances'
  ]

  const featureOptions = [
    'Floor-to-ceiling windows',
    'Open-concept design',
    'Gourmet kitchen',
    'Smart home technology',
    'Private balcony',
    'Waterfront views',
    'Mountain views',
    'City views',
    'Garden',
    'Deck',
    'Basement',
    'Garage',
    'Historic features',
    'Modern updates',
    'Energy efficient'
  ]

  const handleInputChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleArrayToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleClear = () => {
    const clearedFilters = {
      amenities: [],
      minYearBuilt: '',
      maxYearBuilt: '',
      minLotSize: '',
      maxLotSize: '',
      minSqft: '',
      maxSqft: '',
      features: []
    }
    setFilters(clearedFilters)
    onApplyFilters(clearedFilters)
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl sm:align-middle"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 font-display">
              Advanced Filters
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <ApperIcon name="X" className="w-6 h-6" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="max-h-96 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Year Built */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Year Built</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Min Year"
                    type="number"
                    placeholder="e.g., 1990"
                    value={filters.minYearBuilt}
                    onChange={(e) => handleInputChange('minYearBuilt', e.target.value)}
                  />
                  <Input
                    label="Max Year"
                    type="number"
                    placeholder="e.g., 2024"
                    value={filters.maxYearBuilt}
                    onChange={(e) => handleInputChange('maxYearBuilt', e.target.value)}
                  />
                </div>
              </div>

              {/* Square Footage */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Square Footage</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Min Sqft"
                    type="number"
                    placeholder="e.g., 1000"
                    value={filters.minSqft}
                    onChange={(e) => handleInputChange('minSqft', e.target.value)}
                  />
                  <Input
                    label="Max Sqft"
                    type="number"
                    placeholder="e.g., 5000"
                    value={filters.maxSqft}
                    onChange={(e) => handleInputChange('maxSqft', e.target.value)}
                  />
                </div>
              </div>

              {/* Lot Size */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Lot Size (acres)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Min Acres"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 0.25"
                    value={filters.minLotSize}
                    onChange={(e) => handleInputChange('minLotSize', e.target.value)}
                  />
                  <Input
                    label="Max Acres"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 2.0"
                    value={filters.maxLotSize}
                    onChange={(e) => handleInputChange('maxLotSize', e.target.value)}
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Amenities</h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {amenityOptions.map(amenity => (
                    <label key={amenity} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => handleArrayToggle('amenities', amenity)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 md:col-span-2">
                <h4 className="text-lg font-semibold text-gray-900">Property Features</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                  {featureOptions.map(feature => (
                    <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.features.includes(feature)}
                        onChange={() => handleArrayToggle('features', feature)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!hasActiveFilters}
            >
              Clear All
            </Button>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleApply}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdvancedFilterModal