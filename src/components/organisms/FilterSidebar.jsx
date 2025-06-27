import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const FilterSidebar = ({ isOpen, onClose, onFiltersChange, className = "" }) => {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    minBeds: '',
    minBaths: '',
    location: '',
  })

  const propertyTypeOptions = [
    { value: 'House', label: 'House' },
    { value: 'Condo', label: 'Condo' },
    { value: 'Townhouse', label: 'Townhouse' },
    { value: 'Apartment', label: 'Apartment' },
  ]

  const bedroomOptions = [
    { value: '1', label: '1+ Bedrooms' },
    { value: '2', label: '2+ Bedrooms' },
    { value: '3', label: '3+ Bedrooms' },
    { value: '4', label: '4+ Bedrooms' },
  ]

  const bathroomOptions = [
    { value: '1', label: '1+ Bathrooms' },
    { value: '2', label: '2+ Bathrooms' },
    { value: '3', label: '3+ Bathrooms' },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange(filters)
    }, 500)

    return () => clearTimeout(timer)
  }, [filters, onFiltersChange])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      minBeds: '',
      minBaths: '',
      location: '',
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 bg-white lg:bg-surface rounded-none lg:rounded-lg shadow-xl lg:shadow-card z-50 lg:z-auto overflow-y-auto ${className}`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 font-display">Filters</h2>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </Button>
              )}
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Sections */}
          <div className="space-y-6">
            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-3">
                <Input
                  label="Minimum Price"
                  type="number"
                  placeholder="$0"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <Input
                  label="Maximum Price"
                  type="number"
                  placeholder="No limit"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <Select
                label="Property Type"
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                options={propertyTypeOptions}
                placeholder="Any type"
              />
            </div>

            {/* Bedrooms */}
            <div>
              <Select
                label="Bedrooms"
                value={filters.minBeds}
                onChange={(e) => handleFilterChange('minBeds', e.target.value)}
                options={bedroomOptions}
                placeholder="Any bedrooms"
              />
            </div>

            {/* Bathrooms */}
            <div>
              <Select
                label="Bathrooms"
                value={filters.minBaths}
                onChange={(e) => handleFilterChange('minBaths', e.target.value)}
                options={bathroomOptions}
                placeholder="Any bathrooms"
              />
            </div>

            {/* Location */}
            <div>
              <Input
                label="Location"
                placeholder="City, State, or ZIP"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                icon="MapPin"
              />
            </div>
          </div>

          {/* Active Filters Count */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-3 bg-primary-50 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-700">
                  {Object.values(filters).filter(v => v !== '').length} filter{Object.values(filters).filter(v => v !== '').length !== 1 ? 's' : ''} active
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-700"
                >
                  Clear
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default FilterSidebar