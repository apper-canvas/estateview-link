// Currency formatter
export const formatCurrency = (amount, options = {}) => {
  const defaultOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }
  
  return new Intl.NumberFormat('en-US', {
    ...defaultOptions,
    ...options
  }).format(amount)
}

// Number formatter with commas
export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number)
}

// Date formatter
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  
  return new Date(dateString).toLocaleDateString('en-US', {
    ...defaultOptions,
    ...options
  })
}

// Relative date formatter (e.g., "2 days ago")
export const formatRelativeDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now - date
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  return `${Math.floor(diffInDays / 365)} years ago`
}

// Address formatter
export const formatAddress = (property) => {
  const { address, city, state, zipCode } = property
  return `${address}, ${city}, ${state} ${zipCode}`
}

// Property specs formatter
export const formatPropertySpecs = (property) => {
  const specs = []
  
  if (property.bedrooms) {
    specs.push(`${property.bedrooms} bed${property.bedrooms !== 1 ? 's' : ''}`)
  }
  
  if (property.bathrooms) {
    specs.push(`${property.bathrooms} bath${property.bathrooms !== 1 ? 's' : ''}`)
  }
  
  if (property.sqft) {
    specs.push(`${formatNumber(property.sqft)} sq ft`)
  }
  
  return specs.join(' • ')
}

// Price per square foot calculator
export const calculatePricePerSqft = (price, sqft) => {
  if (!price || !sqft) return null
  return Math.round(price / sqft)
}

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}