'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Heart } from 'lucide-react'

interface PropertyCardProps {
  id: string
  title: string
  location: string
  price: number
  rating: number
  imageUrl: string
  isNew?: boolean
}

export default function PropertyCard({ 
  id, 
  title, 
  location, 
  price, 
  rating, 
  imageUrl, 
  isNew = false 
}: PropertyCardProps) {
  return (
    <div className="card group">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] bg-gray-200 relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* New Badge */}
        {isNew && (
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            New
          </div>
        )}
        
        {/* Heart Button */}
        <button className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200">
          <Heart className="h-5 w-5 text-gray-600 hover:text-primary" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm text-gray-600">{rating}</span>
          </div>
          
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">${price}</span>
            <span className="text-sm text-gray-600"> / night</span>
          </div>
        </div>
        
        <Link 
          href={`/listing/${id}`}
          className="btn-primary w-full mt-4 text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
