'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Star, MapPin, Users, Calendar, DollarSign, Home, Car, Wifi, Coffee, Snowflake } from 'lucide-react'
import { getPropertyById, Property } from '../../lib/api'

export default function ListingPage() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBookingModal, setShowBookingModal] = useState(false)

  useEffect(() => {
    if (params.id) {
      loadProperty(params.id as string)
    }
  }, [params.id])

  const loadProperty = async (id: string) => {
    try {
      setLoading(true)
      const data = await getPropertyById(id)
      setProperty(data)
    } catch (error) {
      console.error('Error loading property:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBookingRequest = () => {
    if (property) {
      const bookingData = {
        propertyId: property.id,
        propertyTitle: property.address.formattedAddress,
        price: property.financial.listPrice,
        location: `${property.address.city}, ${property.address.state}`,
        timestamp: new Date().toISOString()
      }
      
      console.log('Booking Request Data:', bookingData)
      setShowBookingModal(true)
      
      // Redirect to booking page after a short delay
      setTimeout(() => {
        router.push('/booking')
      }, 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const amenities = [
    { icon: Wifi, label: 'WiFi', available: true },
    { icon: Coffee, label: 'Kitchen', available: true },
    { icon: Car, label: 'Free Parking', available: true },
    { icon: Snowflake, label: 'Air Conditioning', available: true },
    { icon: Home, label: 'Private Entrance', available: true },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={property.photos[0] || '/placeholder-property.jpg'}
                alt={property.address.formattedAddress}
                fill
                className="object-cover"
              />
            </div>
          </div>
          {property.photos.slice(1, 5).map((photo, index) => (
            <div key={index} className="relative h-48 rounded-xl overflow-hidden">
              <Image
                src={photo}
                alt={`${property.address.formattedAddress} - Photo ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.address.line1}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{property.address.formattedAddress}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{property.physical.bedrooms} bedroom{property.physical.bedrooms !== 1 ? 's' : ''}</span>
                    <span>•</span>
                    <span>{property.physical.bathrooms} bathroom{property.physical.bathrooms !== 1 ? 's' : ''}</span>
                    <span>•</span>
                    <span>{property.physical.squareFootage} sq ft</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    ${property.financial.listPrice}
                  </div>
                  <div className="text-gray-600">per night</div>
                  <div className="flex items-center mt-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">4.8</span>
                    <span className="text-gray-600 ml-1">(24 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {property.description || 'This beautiful property offers a comfortable and memorable stay. Perfect for your next trip!'}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">Built in {property.physical.yearBuilt}</span>
                </div>
                <div className="flex items-center">
                  <Home className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{property.propertyType}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">Max {Math.floor(property.physical.bedrooms * 2)} guests</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">${property.financial.pricePerSquareFoot}/sq ft</span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <amenity.icon className={`w-5 h-5 mr-3 ${amenity.available ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={amenity.available ? 'text-gray-700' : 'text-gray-400'}>
                      {amenity.label}
                    </span>
                  </div>
                ))}
                {property.features.slice(0, 5).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary mb-1">
                  ${property.financial.listPrice}
                </div>
                <div className="text-gray-600">per night</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cleaning fee</span>
                  <span className="font-medium">$50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span className="font-medium">$25</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${property.financial.listPrice + 75}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBookingRequest}
                className="w-full btn-primary py-4 text-lg"
              >
                Request Booking
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Request Sent!</h3>
            <p className="text-gray-600 mb-6">
              Your booking request has been logged. Redirecting to the booking form...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
