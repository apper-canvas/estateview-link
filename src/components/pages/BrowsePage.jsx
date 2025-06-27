import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FilterSidebar from '@/components/organisms/FilterSidebar'
import PropertyGrid from '@/components/organisms/PropertyGrid'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { getAllProperties } from '@/services/api/propertiesService'
import { getSavedProperties } from '@/services/api/savedPropertiesService'

const BrowsePage = () => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [savedProperties, setSavedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    loadProperties()
    loadSavedProperties()
  }, [])

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllProperties()
      setProperties(data)
      setFilteredProperties(data)
    } catch (err) {
      setError('Failed to load properties. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadSavedProperties = async () => {
    try {
      const saved = await getSavedProperties()
      setSavedProperties(saved.map(item => item.propertyId))
    } catch (error) {
      console.error('Failed to load saved properties:', error)
    }
  }

  const handleFiltersChange = (filters) => {
    let filtered = [...properties]

    // Apply filters
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice))
    }
    if (filters.propertyType) {
      filtered = filtered.filter(p => p.propertyType === filters.propertyType)
    }
    if (filters.minBeds) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.minBeds))
    }
    if (filters.minBaths) {
      filtered = filtered.filter(p => p.bathrooms >= parseInt(filters.minBaths))
    }
    if (filters.location) {
      const searchTerm = filters.location.toLowerCase()
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(searchTerm) ||
        p.state.toLowerCase().includes(searchTerm) ||
        p.address.toLowerCase().includes(searchTerm) ||
        p.zipCode.includes(searchTerm)
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.listingDate) - new Date(b.listingDate))
        break
      default:
        break
    }

    setFilteredProperties(filtered)
  }

  const handleSaveToggle = (propertyId, isSaved) => {
    if (isSaved) {
      setSavedProperties(prev => [...prev, propertyId])
    } else {
      setSavedProperties(prev => prev.filter(id => id !== propertyId))
    }
  }

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
                  Browse Properties
                </h1>
                <p className="text-gray-600">
                  {filteredProperties.length} propert{filteredProperties.length !== 1 ? 'ies' : 'y'} found
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  icon="Filter"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden"
                >
                  Filters
                </Button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ApperIcon name="Grid3X3" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors duration-200 ${
                      viewMode === 'list'
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ApperIcon name="List" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Grid */}
            <PropertyGrid
              properties={filteredProperties}
              loading={loading}
              error={error}
              onRetry={loadProperties}
              savedProperties={savedProperties}
              onSaveToggle={handleSaveToggle}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  )
}

export default BrowsePage