'use client'

import { Search, MapPin, Calendar, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Content */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find your next stay with locals
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Discover unique places to stay and connect with hosts around the world
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
            {/* Location */}
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full pl-10 pr-4 py-4 text-gray-900 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Dates */}
            <div className="flex-1 relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Check in - Check out"
                className="w-full pl-10 pr-4 py-4 text-gray-900 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Guests */}
            <div className="flex-1 relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Number of guests"
                className="w-full pl-10 pr-4 py-4 text-gray-900 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Search Button */}
            <button className="bg-primary hover:bg-red-600 text-white px-8 py-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center">
              <Search className="h-5 w-5 mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
