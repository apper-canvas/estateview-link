import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon, 
  iconPosition = "left",
  disabled = false,
  className = "",
  onClick,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-gradient-primary text-white hover:shadow-lg transform hover:scale-105 focus:ring-primary-500",
    secondary: "bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800 hover:from-secondary-200 hover:to-secondary-300 focus:ring-secondary-500",
    accent: "bg-gradient-accent text-white hover:shadow-lg transform hover:scale-105 focus:ring-accent-500",
    outline: "border-2 border-primary-300 text-primary-700 hover:bg-primary-50 focus:ring-primary-500",
    ghost: "text-primary-700 hover:bg-primary-50 focus:ring-primary-500",
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  }
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none" : ""
  
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <ApperIcon name={icon} className="w-4 h-4 mr-2" />
      )}
      {children}
      {icon && iconPosition === "right" && (
        <ApperIcon name={icon} className="w-4 h-4 ml-2" />
      )}
    </motion.button>
  )
}

export default Button