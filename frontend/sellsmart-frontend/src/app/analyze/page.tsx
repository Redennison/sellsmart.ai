'use client'

import { useState, useEffect } from 'react'

export default function AnalyzePage() {

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    km: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="w-full max-w-md bg-black/80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-sm p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Analyze Your Car</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { name: 'make', label: 'Make', type: 'text', placeholder: 'Enter make' },
            { name: 'model', label: 'Model', type: 'text', placeholder: 'Enter model' },
            { name: 'year', label: 'Year', type: 'number', placeholder: 'Enter year', min: 1900, max: new Date().getFullYear() },
            { name: 'km', label: 'Kilometers', type: 'number', placeholder: 'Enter kilometers', min: 0 }
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                required
                min={field.min}
                max={field.max}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
            </div>
          ))}
          <button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            Analyze
          </button>
        </form>
      </div>
    </div>
  )
}

