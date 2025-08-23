'use client'

import { useState } from 'react'
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import { SearchParams } from '../lib/api'

interface HeroProps {
  onSearch: (params: SearchParams) => void
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params: SearchParams = {}
    
    if (searchData.location) {
      // Try to parse city and state from location
      const locationParts = searchData.location.split(',').map(part => part.trim())
      if (locationParts.length >= 2) {
        params.city = locationParts[0]
        params.state = locationParts[1]
      } else {
        params.city = searchData.location
      }
    }
    
    onSearch(params)
  }

  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Content */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find your next stay with locals
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Discover unique places to stay and connect with hosts around the world
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                />
              </div>

              {/* Check-in Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                />
              </div>

              {/* Check-out Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                />
              </div>

              {/* Guests */}
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={searchData.guests}
                  onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search Properties
              </button>
            </div>
          </div>
        </form>

        {/* Popular Destinations */}
        <div className="mt-12">
          <p className="text-lg opacity-90 mb-4">Popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['New York, NY', 'Los Angeles, CA', 'Miami, FL', 'Chicago, IL', 'Las Vegas, NV'].map((destination) => (
              <button
                key={destination}
                onClick={() => {
                  setSearchData({ ...searchData, location: destination })
                  onSearch({ city: destination.split(',')[0], state: destination.split(',')[1] })
                }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors duration-200"
              >
                {destination}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
