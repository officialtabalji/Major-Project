import mongoose, { Schema, Document } from 'mongoose'

export interface IBooking extends Document {
  propertyId: string
  guestId: string
  hostId: string
  checkIn: Date
  checkOut: Date
  guests: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  specialRequests?: string
  cancellationReason?: string
  createdAt: Date
  updatedAt: Date
}

const BookingSchema: Schema = new Schema({
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  guestId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hostId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  specialRequests: String,
  cancellationReason: String
}, {
  timestamps: true
})

// Indexes for better query performance
BookingSchema.index({ propertyId: 1 })
BookingSchema.index({ guestId: 1 })
BookingSchema.index({ hostId: 1 })
BookingSchema.index({ checkIn: 1, checkOut: 1 })
BookingSchema.index({ status: 1 })
BookingSchema.index({ paymentStatus: 1 })

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)
