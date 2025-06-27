import { useState, useEffect } from 'react'
import Input from '@/components/atoms/Input'

const PriceFilter = ({ onFilterChange, className = "" }) => {
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        minPrice: minPrice ? parseInt(minPrice) : null,
        maxPrice: maxPrice ? parseInt(maxPrice) : null,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [minPrice, maxPrice, onFilterChange])

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
      <div className="grid grid-cols-1 gap-3">
        <Input
          label="Minimum Price"
          type="number"
          placeholder="$0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Input
          label="Maximum Price"
          type="number"
          placeholder="No limit"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
    </div>
  )
}

export default PriceFilter