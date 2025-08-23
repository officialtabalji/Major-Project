import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/app/lib/mongodb'
import Property from '@/app/models/Property'

// GET /api/properties - Get all properties with filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const state = searchParams.get('state')
    const propertyType = searchParams.get('propertyType')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const bedrooms = searchParams.get('bedrooms')
    const bathrooms = searchParams.get('bathrooms')
    const limit = searchParams.get('limit') || '20'
    const page = searchParams.get('page') || '1'

    // Build filter object
    const filter: any = {}
    
    if (city) {
      filter['address.city'] = { $regex: city, $options: 'i' }
    }
    
    if (state) {
      filter['address.state'] = { $regex: state, $options: 'i' }
    }
    
    if (propertyType) {
      filter.propertyType = propertyType
    }
    
    if (minPrice || maxPrice) {
      filter['financial.listPrice'] = {}
      if (minPrice) filter['financial.listPrice'].$gte = parseInt(minPrice)
      if (maxPrice) filter['financial.listPrice'].$lte = parseInt(maxPrice)
    }
    
    if (bedrooms) {
      filter['physical.bedrooms'] = { $gte: parseInt(bedrooms) }
    }
    
    if (bathrooms) {
      filter['physical.bathrooms'] = { $gte: parseInt(bathrooms) }
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    // Execute query
    const properties = await Property.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean()

    // Get total count for pagination
    const total = await Property.countDocuments(filter)

    return NextResponse.json({
      success: true,
      data: properties,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })

  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

// POST /api/properties - Create a new property
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['propertyId', 'address', 'physical', 'financial', 'propertyType', 'host']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Check if property already exists
    const existingProperty = await Property.findOne({ propertyId: body.propertyId })
    if (existingProperty) {
      return NextResponse.json(
        { success: false, error: 'Property with this ID already exists' },
        { status: 400 }
      )
    }

    // Create new property
    const property = new Property({
      ...body,
      listDate: new Date(),
      ratings: {
        average: 0,
        count: 0,
        reviews: []
      }
    })

    await property.save()

    return NextResponse.json({
      success: true,
      data: property,
      message: 'Property created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create property' },
      { status: 500 }
    )
  }
}
