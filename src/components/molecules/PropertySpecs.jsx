import ApperIcon from '@/components/ApperIcon'

const PropertySpecs = ({ property, className = "" }) => {
  const specs = [
    { icon: "Bed", value: property.bedrooms, label: "Bedrooms" },
    { icon: "Bath", value: property.bathrooms, label: "Bathrooms" },
    { icon: "Square", value: property.sqft?.toLocaleString(), label: "Sq Ft" },
    { icon: "Calendar", value: property.yearBuilt, label: "Built" },
  ]

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {specs.map((spec, index) => (
        <div key={index} className="text-center p-3 bg-surface rounded-lg">
          <ApperIcon name={spec.icon} className="w-5 h-5 text-primary-600 mx-auto mb-2" />
          <div className="font-semibold text-gray-900">{spec.value}</div>
          <div className="text-sm text-gray-600">{spec.label}</div>
        </div>
      ))}
    </div>
  )
}

export default PropertySpecs