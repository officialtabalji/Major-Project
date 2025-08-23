'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, Upload, DollarSign, MapPin, FileText, Users, Bed, Bath } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function HostPage() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [] as string[]
  })

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const availableAmenities = [
    'WiFi', 'Free Parking', 'Kitchen', 'Air Conditioning', 'Heating',
    'Washer & Dryer', 'Pool', 'Hot Tub', 'Gym', 'Pet Friendly',
    'Mountain View', 'Ocean View', 'City View', 'Balcony', 'Garden',
    'BBQ Grill', 'Fireplace', 'Workspace', 'TV', 'Netflix'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Log the property data to console as specified in requirements
    console.log('New Property Data:', {
      ...formData,
      amenities: selectedAmenities,
      submittedAt: new Date().toISOString()
    })
    
    // Show success message
    alert('Property added successfully! Check the console for details.')
    
    // Reset form
    setFormData({
      title: '',
      location: '',
      price: '',
      description: '',
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      amenities: []
    })
    setSelectedAmenities([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Host</h1>
          <p className="text-gray-600">
            Share your space with travelers and start earning money. Fill out the form below to list your property.
          </p>
        </div>

        {/* Host Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Home className="h-5 w-5 mr-2 text-primary" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Title */}
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="e.g., Cozy Mountain Cabin with Stunning Views"
                  />
                </div>

                {/* Location */}
                <div className="md:col-span-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="input-field pl-10"
                      placeholder="e.g., Aspen, Colorado"
                    />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Night
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="input-field pl-10"
                      placeholder="150"
                    />
                  </div>
                </div>

                {/* Max Guests */}
                <div>
                  <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      id="maxGuests"
                      name="maxGuests"
                      value={formData.maxGuests}
                      onChange={handleInputChange}
                      required
                      className="input-field pl-10"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <div className="relative">
                    <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      id="bedrooms"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      required
                      className="input-field pl-10"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <div className="relative">
                    <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      id="bathrooms"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      required
                      className="input-field pl-10"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Bathroom' : 'Bathrooms'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Photos Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="h-5 w-5 mr-2 text-primary" />
                Photos
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF up to 10MB (Photos placeholder for MVP)
                </p>
                <button
                  type="button"
                  className="btn-outline mt-4"
                  onClick={() => alert('Photo upload functionality will be implemented in future versions')}
                >
                  Upload Photos
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Description
              </h3>
              
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Property Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={6}
                className="input-field resize-none"
                placeholder="Describe your property, its unique features, nearby attractions, and what makes it special..."
              />
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
              <p className="text-gray-600 mb-4">Select the amenities your property offers:</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableAmenities.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="btn-primary w-full text-lg py-4"
              >
                List My Property
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-600">
              <p>By listing your property, you agree to our hosting terms and conditions.</p>
              <p className="mt-1">We'll review your listing within 24-48 hours and contact you with next steps.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
