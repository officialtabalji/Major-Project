import connectDB from './mongodb'
import Property from '../models/Property'
import User from '../models/User'

const sampleProperties = [
  {
    propertyId: 'prop_001',
    address: {
      line1: '123 Mountain View Dr',
      city: 'Aspen',
      state: 'CO',
      zipCode: '81611',
      formattedAddress: '123 Mountain View Dr, Aspen, CO 81611',
    },
    physical: {
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1800,
      lotSize: 0.5,
      yearBuilt: 2010,
    },
    financial: {
      listPrice: 150,
      monthlyRent: 4500,
      pricePerSquareFoot: 0.083,
    },
    propertyType: 'Single Family',
    listingStatus: 'For Rent',
    photos: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    ],
    description: 'Cozy mountain cabin with stunning views of the Rockies. Perfect for nature lovers and outdoor enthusiasts.',
    features: ['Mountain View', 'Fireplace', 'Deck', 'Garage', 'Ski Storage'],
    location: {
      latitude: 39.1911,
      longitude: -106.8175,
    },
    host: {
      id: 'host_001',
      name: 'Sarah Johnson',
      email: 'sarah@example.com'
    },
    amenities: ['WiFi', 'Kitchen', 'Free Parking', 'Fireplace', 'Deck'],
    rules: ['No smoking', 'No pets', 'Quiet hours 10 PM - 8 AM']
  },
  {
    propertyId: 'prop_002',
    address: {
      line1: '456 Beachfront Blvd',
      city: 'Maui',
      state: 'HI',
      zipCode: '96753',
      formattedAddress: '456 Beachfront Blvd, Maui, HI 96753',
    },
    physical: {
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 2800,
      lotSize: 0.8,
      yearBuilt: 2015,
    },
    financial: {
      listPrice: 300,
      monthlyRent: 8500,
      pricePerSquareFoot: 0.107,
    },
    propertyType: 'Villa',
    listingStatus: 'For Rent',
    photos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    ],
    description: 'Luxurious beachfront villa with private access to pristine beaches. Enjoy stunning ocean views and tropical paradise.',
    features: ['Ocean View', 'Private Beach Access', 'Pool', 'Outdoor Kitchen', 'Garden'],
    location: {
      latitude: 20.7984,
      longitude: -156.3319,
    },
    host: {
      id: 'host_002',
      name: 'Mike Chen',
      email: 'mike@example.com'
    },
    amenities: ['Pool', 'Beach Access', 'Outdoor Kitchen', 'WiFi', 'Free Parking'],
    rules: ['No parties', 'Respect quiet hours', 'Keep beach clean']
  },
  {
    propertyId: 'prop_003',
    address: {
      line1: '789 Urban Loft Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      formattedAddress: '789 Urban Loft Ave, New York, NY 10001',
    },
    physical: {
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1200,
      lotSize: 0.1,
      yearBuilt: 2020,
    },
    financial: {
      listPrice: 200,
      monthlyRent: 6000,
      pricePerSquareFoot: 0.167,
    },
    propertyType: 'Condo',
    listingStatus: 'For Rent',
    photos: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    ],
    description: 'Modern urban loft in the heart of Manhattan. High ceilings, exposed brick, and contemporary amenities.',
    features: ['High Ceilings', 'Exposed Brick', 'Balcony', 'Gym Access', 'Doorman'],
    location: {
      latitude: 40.7505,
      longitude: -73.9934,
    },
    host: {
      id: 'host_003',
      name: 'Emma Rodriguez',
      email: 'emma@example.com'
    },
    amenities: ['Gym Access', 'Doorman', 'Balcony', 'WiFi', 'Kitchen'],
    rules: ['No smoking', 'Respect neighbors', 'Building rules apply']
  }
]

const sampleUsers = [
  {
    username: 'sarah_host',
    email: 'sarah@example.com',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'host',
    isVerified: true
  },
  {
    username: 'mike_host',
    email: 'mike@example.com',
    password: 'password123',
    firstName: 'Mike',
    lastName: 'Chen',
    role: 'host',
    isVerified: true
  },
  {
    username: 'emma_host',
    email: 'emma@example.com',
    password: 'password123',
    firstName: 'Emma',
    lastName: 'Rodriguez',
    role: 'host',
    isVerified: true
  }
]

export async function seedDatabase() {
  try {
    await connectDB()
    
    console.log('🌱 Starting database seeding...')
    
    // Clear existing data
    await Property.deleteMany({})
    await User.deleteMany({})
    
    console.log('🗑️ Cleared existing data')
    
    // Create users
    const createdUsers = await User.insertMany(sampleUsers)
    console.log(`👥 Created ${createdUsers.length} users`)
    
    // Update properties with real user IDs
    const propertiesWithUsers = sampleProperties.map((property, index) => ({
      ...property,
      host: {
        ...property.host,
        id: createdUsers[index]._id.toString()
      }
    }))
    
    // Create properties
    const createdProperties = await Property.insertMany(propertiesWithUsers)
    console.log(`🏠 Created ${createdProperties.length} properties`)
    
    // Update users with their property IDs
    for (let i = 0; i < createdUsers.length; i++) {
      await User.findByIdAndUpdate(createdUsers[i]._id, {
        properties: [createdProperties[i]._id]
      })
    }
    
    console.log('✅ Database seeding completed successfully!')
    console.log(`📊 Total properties: ${createdProperties.length}`)
    console.log(`👥 Total users: ${createdUsers.length}`)
    
    return { success: true, properties: createdProperties, users: createdUsers }
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

// Run seeder if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('🎉 Seeding completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error)
      process.exit(1)
    })
}
