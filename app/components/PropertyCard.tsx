'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Heart } from 'lucide-react'
import { Property } from '../lib/api'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    id,
    address,
    physical,
    financial,
    photos,
    features
  } = property

  const mainPhoto = photos[0] || '/placeholder-property.jpg'
  const location = `${address.city}, ${address.state}`
  const price = `$${financial.listPrice}/night`
  const bedrooms = physical.bedrooms
  const bathrooms = physical.bathrooms

  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <Image
          src={mainPhoto}
          alt={address.formattedAddress}
          width={400}
          height={300}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
        <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-md shadow-md">
          <span className="text-sm font-semibold text-primary">{price}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {address.line1}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <span className="text-sm">{bedrooms} bed{bedrooms !== 1 ? 's' : ''}</span>
          <span className="mx-2">•</span>
          <span className="text-sm">{bathrooms} bath{bathrooms !== 1 ? 's' : ''}</span>
          <span className="mx-2">•</span>
          <span className="text-sm">{physical.squareFootage} sq ft</span>
        </div>
        
        {features.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <Link
          href={`/listing/${id}`}
          className="btn-primary w-full text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
