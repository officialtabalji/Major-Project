import mongoose, { Schema, Document } from 'mongoose'

export interface IProperty extends Document {
  propertyId: string
  address: {
    line1: string
    line2?: string
    city: string
    state: string
    zipCode: string
    formattedAddress: string
  }
  physical: {
    bedrooms: number
    bathrooms: number
    squareFootage: number
    lotSize: number
    yearBuilt: number
  }
  financial: {
    listPrice: number
    monthlyRent: number
    pricePerSquareFoot: number
  }
  listDate: Date
  propertyType: string
  listingStatus: string
  photos: string[]
  description?: string
  features: string[]
  location: {
    latitude: number
    longitude: number
  }
  host: {
    id: string
    name: string
    email: string
  }
  amenities: string[]
  rules: string[]
  availability: {
    checkIn: string
    checkOut: string
    minStay: number
    maxStay: number
  }
  ratings: {
    average: number
    count: number
    reviews: Array<{
      userId: string
      rating: number
      comment: string
      date: Date
    }>
  }
  createdAt: Date
  updatedAt: Date
}

const PropertySchema: Schema = new Schema({
  propertyId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  address: {
    line1: { type: String, required: true },
    line2: String,
    city: { type: String, required: true, index: true },
    state: { type: String, required: true, index: true },
    zipCode: { type: String, required: true },
    formattedAddress: { type: String, required: true }
  },
  physical: {
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    squareFootage: { type: Number, required: true, min: 0 },
    lotSize: { type: Number, required: true, min: 0 },
    yearBuilt: { type: Number, required: true, min: 1800 }
  },
  financial: {
    listPrice: { type: Number, required: true, min: 0 },
    monthlyRent: { type: Number, required: true, min: 0 },
    pricePerSquareFoot: { type: Number, required: true, min: 0 }
  },
  listDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['Single Family', 'Condo', 'Townhouse', 'Villa', 'Cabin', 'Cottage', 'Apartment', 'Loft'],
    index: true
  },
  listingStatus: {
    type: String,
    required: true,
    enum: ['For Rent', 'For Sale', 'Rented', 'Sold', 'Pending'],
    default: 'For Rent'
  },
  photos: [{
    type: String,
    required: true
  }],
  description: String,
  features: [String],
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  host: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  amenities: [String],
  rules: [String],
  availability: {
    checkIn: { type: String, default: '15:00' },
    checkOut: { type: String, default: '11:00' },
    minStay: { type: Number, default: 1, min: 1 },
    maxStay: { type: Number, default: 30, min: 1 }
  },
  ratings: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0, min: 0 },
    reviews: [{
      userId: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }]
  }
}, {
  timestamps: true
})

// Create compound indexes for better query performance
PropertySchema.index({ 'address.city': 1, 'address.state': 1 })
PropertySchema.index({ 'financial.listPrice': 1 })
PropertySchema.index({ 'physical.bedrooms': 1, 'physical.bathrooms': 1 })
PropertySchema.index({ 'propertyType': 1, 'listingStatus': 1 })
PropertySchema.index({ 'location.latitude': 1, 'location.longitude': 1 })

// Text search index
PropertySchema.index({
  'address.city': 'text',
  'address.state': 'text',
  'description': 'text',
  'features': 'text'
})

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema)
