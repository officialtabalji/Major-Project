'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, MapPin, Users } from 'lucide-react'
import Navbar from '../../components/Navbar'

// Sample listing data (in a real app, this would come from an API)
const getListingData = (id: string) => {
  const listings = {
    '1': {
      id: '1',
      title: 'Cozy Mountain Cabin',
      location: 'Aspen, Colorado',
      price: 150,
      rating: 4.8,
      description: 'Experience the perfect mountain getaway in this charming cabin. Nestled in the heart of Aspen, this cozy retreat offers stunning mountain views, modern amenities, and a peaceful atmosphere. Perfect for couples or small families looking to escape the hustle and bustle.',
      imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop',
      amenities: ['WiFi', 'Free Parking', 'Kitchen', 'Mountain View', 'Fireplace', 'Hot Tub'],
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1
    },
    '2': {
      id: '2',
      title: 'Beachfront Villa',
      location: 'Maui, Hawaii',
      price: 300,
      rating: 4.9,
      description: 'Luxurious beachfront villa with direct access to pristine beaches. This stunning property features panoramic ocean views, private pool, and world-class amenities. Perfect for those seeking a premium beach vacation experience.',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=800&fit=crop',
      amenities: ['Private Pool', 'Beach Access', 'Ocean View', 'Kitchen', 'WiFi', 'Parking'],
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2
    }
  }
  
  return listings[id as keyof typeof listings] || listings['1']
}

export default function ListingPage({ params }: { params: { id: string } }) {
  const listing = getListingData(params.id)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const handleBookingRequest = () => {
    setShowBookingForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Listings
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image and Details */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden mb-8">
              <Image
                src={listing.imageUrl}
                alt={listing.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span className="text-gray-700">{listing.rating}</span>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{listing.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{listing.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{listing.maxGuests}</div>
                  <div className="text-sm text-gray-600">Max Guests</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">About this place</h3>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What this place offers</h3>
                <div className="grid grid-cols-2 gap-3">
                  {listing.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900">${listing.price}</div>
                <div className="text-gray-600">per night</div>
              </div>

              <button 
                onClick={handleBookingRequest}
                className="btn-primary w-full text-lg py-4"
              >
                Request Booking
              </button>

              <div className="mt-6 text-center text-sm text-gray-500">
                You won't be charged yet
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Request Booking</h3>
              <p className="text-gray-600 mb-6">
                Your booking request for "{listing.title}" has been logged to the console.
              </p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowBookingForm(false)}
                  className="btn-outline flex-1"
                >
                  Close
                </button>
                <Link 
                  href="/booking"
                  className="btn-primary flex-1 text-center"
                >
                  Go to Booking Form
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
