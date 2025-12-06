import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
}

export default function Button({ variant = 'primary', size = 'md', fullWidth = false, children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all inline-flex items-center justify-center'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700',
    accent: 'bg-orange-600 text-white hover:bg-orange-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-gray-700 hover:bg-gray-100'
  }
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
      {children}
    </button>
  )
}
