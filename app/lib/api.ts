// Real Estate API Configuration
const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY || 'your-api-key-here';
const RAPID_API_HOST = 'realty-mole-property-api.p.rapidapi.com';

export interface Property {
  _id?: string;
  id?: string;
  propertyId: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
    formattedAddress: string;
  };
  physical: {
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    lotSize: number;
    yearBuilt: number;
  };
  financial: {
    listPrice: number;
    monthlyRent: number;
    pricePerSquareFoot: number;
  };
  listDate: string | Date;
  propertyType: string;
  listingStatus: string;
  photos: string[];
  description?: string;
  features: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  host?: {
    id: string;
    name: string;
    email: string;
  };
  amenities?: string[];
  rules?: string[];
  ratings?: {
    average: number;
    count: number;
    reviews: Array<{
      userId: string;
      rating: number;
      comment: string;
      date: Date;
    }>;
  };
}

export interface SearchParams {
  city?: string;
  state?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  limit?: number;
  page?: number;
}

export class RealEstateAPI {
  private baseUrl = 'https://realty-mole-property-api.p.rapidapi.com';
  private headers = {
    'X-RapidAPI-Key': RAPID_API_KEY,
    'X-RapidAPI-Host': RAPID_API_HOST,
  };

  async searchProperties(params: SearchParams): Promise<Property[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.city) queryParams.append('city', params.city);
      if (params.state) queryParams.append('state', params.state);
      if (params.propertyType) queryParams.append('propertyType', params.propertyType);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
      if (params.bedrooms) queryParams.append('bedrooms', params.bedrooms.toString());
      if (params.bathrooms) queryParams.append('bathrooms', params.bathrooms.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const response = await fetch(`${this.baseUrl}/properties?${queryParams}`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
  }

  async getPropertyById(propertyId: string): Promise<Property | null> {
    try {
      const response = await fetch(`${this.baseUrl}/properties/${propertyId}`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching property:', error);
      return null;
    }
  }

  async getPropertiesByLocation(city: string, state: string, limit: number = 20): Promise<Property[]> {
    return this.searchProperties({ city, state, limit });
  }

  async getPropertiesByPriceRange(minPrice: number, maxPrice: number, limit: number = 20): Promise<Property[]> {
    return this.searchProperties({ minPrice, maxPrice, limit });
  }
}

// MongoDB API functions
export async function getProperties(params: SearchParams = {}): Promise<Property[]> {
  try {
    // Try to get data from MongoDB API
    const queryParams = new URLSearchParams();
    
    if (params.city) queryParams.append('city', params.city);
    if (params.state) queryParams.append('state', params.state);
    if (params.propertyType) queryParams.append('propertyType', params.propertyType);
    if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params.bedrooms) queryParams.append('bedrooms', params.bedrooms.toString());
    if (params.bathrooms) queryParams.append('bathrooms', params.bathrooms.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.page) queryParams.append('page', params.page.toString());

    const response = await fetch(`/api/properties?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from MongoDB API');
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error('Invalid response from MongoDB API');
    
  } catch (error) {
    console.error('Error fetching from MongoDB:', error);
    
    // Fallback to RapidAPI
    try {
      const rapidApiProperties = await realEstateAPI.searchProperties(params);
      if (rapidApiProperties.length > 0) {
        return rapidApiProperties;
      }
    } catch (rapidApiError) {
      console.error('RapidAPI also failed:', rapidApiError);
    }
    
    // Final fallback to mock data
    return mockProperties.filter(property => {
      if (params.city && !property.address.city.toLowerCase().includes(params.city!.toLowerCase())) return false;
      if (params.state && property.address.state !== params.state) return false;
      if (params.minPrice && property.financial.listPrice < params.minPrice) return false;
      if (params.maxPrice && property.financial.listPrice > params.maxPrice) return false;
      if (params.bedrooms && property.physical.bedrooms < params.bedrooms) return false;
      if (params.bathrooms && property.physical.bathrooms < params.bathrooms) return false;
      return true;
    });
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    // Try to get data from MongoDB API
    const response = await fetch(`/api/properties/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from MongoDB API');
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error('Invalid response from MongoDB API');
    
  } catch (error) {
    console.error('Error fetching from MongoDB:', error);
    
    // Fallback to RapidAPI
    try {
      const rapidApiProperty = await realEstateAPI.getPropertyById(id);
      if (rapidApiProperty) {
        return rapidApiProperty;
      }
    } catch (rapidApiError) {
      console.error('RapidAPI also failed:', rapidApiError);
    }
    
    // Final fallback to mock data
    return mockProperties.find(property => property.id === id) || null;
  }
}

// API instance
export const realEstateAPI = new RealEstateAPI();

// Fallback mock data when API is not available
export const mockProperties: Property[] = [
  {
    id: '1',
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
    listDate: '2024-01-15',
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
  },
  {
    id: '2',
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
    listDate: '2024-01-10',
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
  },
  {
    id: '3',
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
    listDate: '2024-01-20',
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
  },
  {
    id: '4',
    propertyId: 'prop_004',
    address: {
      line1: '321 Desert Trail',
      city: 'Sedona',
      state: 'AZ',
      zipCode: '86336',
      formattedAddress: '321 Desert Trail, Sedona, AZ 86336',
    },
    physical: {
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 2200,
      lotSize: 1.2,
      yearBuilt: 2008,
    },
    financial: {
      listPrice: 180,
      monthlyRent: 5400,
      pricePerSquareFoot: 0.082,
    },
    listDate: '2024-01-12',
    propertyType: 'Single Family',
    listingStatus: 'For Rent',
    photos: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
    description: 'Peaceful desert oasis surrounded by red rock formations. Perfect for meditation and outdoor adventures.',
    features: ['Red Rock Views', 'Desert Garden', 'Patio', 'Fire Pit', 'Hiking Trails'],
    location: {
      latitude: 34.8697,
      longitude: -111.7610,
    },
  },
  {
    id: '5',
    propertyId: 'prop_005',
    address: {
      line1: '654 Lakeside Dr',
      city: 'Lake Tahoe',
      state: 'CA',
      zipCode: '96150',
      formattedAddress: '654 Lakeside Dr, Lake Tahoe, CA 96150',
    },
    physical: {
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1900,
      lotSize: 0.6,
      yearBuilt: 2012,
    },
    financial: {
      listPrice: 220,
      monthlyRent: 6600,
      pricePerSquareFoot: 0.116,
    },
    listDate: '2024-01-18',
    propertyType: 'Cottage',
    listingStatus: 'For Rent',
    photos: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
    description: 'Charming lakeside cottage with panoramic views of Lake Tahoe. Ideal for water sports and mountain activities.',
    features: ['Lake View', 'Private Dock', 'Deck', 'Fireplace', 'Boat Storage'],
    location: {
      latitude: 39.0968,
      longitude: -120.0324,
    },
  },
  {
    id: '6',
    propertyId: 'prop_006',
    address: {
      line1: '987 Historic Row',
      city: 'Charleston',
      state: 'SC',
      zipCode: '29401',
      formattedAddress: '987 Historic Row, Charleston, SC 29401',
    },
    physical: {
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 2500,
      lotSize: 0.4,
      yearBuilt: 1890,
    },
    financial: {
      listPrice: 175,
      monthlyRent: 5250,
      pricePerSquareFoot: 0.070,
    },
    listDate: '2024-01-14',
    propertyType: 'Townhouse',
    listingStatus: 'For Rent',
    photos: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
    ],
    description: 'Historic townhouse in the heart of Charleston. Rich in character with modern amenities and southern charm.',
    features: ['Historic Architecture', 'Balcony', 'Garden', 'Fireplace', 'Original Details'],
    location: {
      latitude: 32.7765,
      longitude: -79.9311,
    },
  },
];
