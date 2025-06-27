import ApperIcon from '@/components/ApperIcon'

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon,
  className = "",
  required = false,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            block w-full rounded-lg border-2 transition-colors duration-200
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
            ${error 
              ? 'border-error focus:border-error focus:ring-error' 
              : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-20
            placeholder-gray-400 text-gray-900
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-error flex items-center">
          <ApperIcon name="AlertCircle" className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

export default Input