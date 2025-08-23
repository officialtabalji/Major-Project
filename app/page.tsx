'use client'

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PropertyCard from './components/PropertyCard'
import AdvancedSearch from './components/AdvancedSearch'
import { Property, getProperties, SearchParams } from './lib/api'

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useState<SearchParams>({})

  useEffect(() => {
    loadProperties()
  }, [])

  useEffect(() => {
    filterProperties()
  }, [properties, searchParams])

  const loadProperties = async () => {
    try {
      setLoading(true)
      const data = await getProperties({ limit: 20 })
      setProperties(data)
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterProperties = () => {
    let filtered = [...properties]

    if (searchParams.city) {
      filtered = filtered.filter(property =>
        property.address.city.toLowerCase().includes(searchParams.city!.toLowerCase())
      )
    }

    if (searchParams.state) {
      filtered = filtered.filter(property =>
        property.address.state.toLowerCase().includes(searchParams.state!.toLowerCase())
      )
    }

    if (searchParams.minPrice) {
      filtered = filtered.filter(property =>
        property.financial.listPrice >= searchParams.minPrice!
      )
    }

    if (searchParams.maxPrice) {
      filtered = filtered.filter(property =>
        property.financial.listPrice <= searchParams.maxPrice!
      )
    }

    if (searchParams.bedrooms) {
      filtered = filtered.filter(property =>
        property.physical.bedrooms >= searchParams.bedrooms!
      )
    }

    if (searchParams.bathrooms) {
      filtered = filtered.filter(property =>
        property.physical.bathrooms >= searchParams.bathrooms!
      )
    }

    if (searchParams.propertyType) {
      filtered = filtered.filter(property =>
        property.propertyType === searchParams.propertyType
      )
    }

    setFilteredProperties(filtered)
  }

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params)
  }

  const handleRefresh = () => {
    loadProperties()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero onSearch={handleSearch} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Advanced Search */}
        <AdvancedSearch onSearch={handleSearch} currentFilters={searchParams} />

        {/* Search Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {searchParams.city || searchParams.state ? 'Search Results' : 'Featured Properties'}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredProperties.length} properties found
              {searchParams.city && ` in ${searchParams.city}`}
              {searchParams.state && `, ${searchParams.state}`}
              {searchParams.minPrice && ` from $${searchParams.minPrice}`}
              {searchParams.maxPrice && ` up to $${searchParams.maxPrice}`}
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              Refresh
            </button>
            <button
              onClick={() => setSearchParams({})}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && (
          <>
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or browse all properties.
                </p>
                <button
                  onClick={() => setSearchParams({})}
                  className="btn-primary"
                >
                  View All Properties
                </button>
              </div>
            )}
          </>
        )}

        {/* Become a Host CTA */}
        <section className="mt-20 bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Become a Host
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Share your space and earn money by hosting guests. Join thousands of hosts who are already earning extra income.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/host" className="btn-primary">
              List Your Property
            </a>
            <a href="/host" className="btn-outline">
              Learn More
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
