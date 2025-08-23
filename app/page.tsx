import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PropertyCard from './components/PropertyCard'

// Sample data for MVP
const sampleListings = [
  {
    id: '1',
    title: 'Cozy Mountain Cabin',
    location: 'Aspen, Colorado',
    price: 150,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    isNew: true
  },
  {
    id: '2',
    title: 'Beachfront Villa',
    location: 'Maui, Hawaii',
    price: 300,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop'
  },
  {
    id: '3',
    title: 'Urban Loft',
    location: 'New York, NY',
    price: 200,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
  },
  {
    id: '4',
    title: 'Desert Oasis',
    location: 'Sedona, Arizona',
    price: 180,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
  },
  {
    id: '5',
    title: 'Lakeside Cottage',
    location: 'Lake Tahoe, CA',
    price: 220,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop'
  },
  {
    id: '6',
    title: 'Historic Townhouse',
    location: 'Charleston, SC',
    price: 175,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      
      {/* Featured Listings Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Places to Stay
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover handpicked accommodations that offer unique experiences and unforgettable memories
            </p>
          </div>
          
          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleListings.map((listing) => (
              <PropertyCard
                key={listing.id}
                {...listing}
              />
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="btn-outline px-8 py-4 text-lg">
              View All Listings
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Host?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Share your space and start earning money by hosting travelers from around the world
          </p>
          <a href="/host" className="btn-secondary text-lg px-8 py-4">
            Become a Host
          </a>
        </div>
      </section>
    </main>
  )
}
