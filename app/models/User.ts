import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  profile: {
    avatar?: string
    bio?: string
    phone?: string
    dateOfBirth?: Date
  }
  role: 'guest' | 'host' | 'admin'
  isVerified: boolean
  properties: string[] // Array of property IDs owned by the user
  favorites: string[] // Array of property IDs favorited by the user
  bookings: string[] // Array of booking IDs made by the user
  reviews: string[] // Array of review IDs written by the user
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  profile: {
    avatar: String,
    bio: { type: String, maxlength: 500 },
    phone: String,
    dateOfBirth: Date
  },
  role: {
    type: String,
    enum: ['guest', 'host', 'admin'],
    default: 'guest'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  properties: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }],
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }],
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true
})

// Indexes for better query performance
UserSchema.index({ email: 1 })
UserSchema.index({ username: 1 })
UserSchema.index({ role: 1 })
UserSchema.index({ 'profile.phone': 1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
