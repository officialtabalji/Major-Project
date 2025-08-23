# 🗄️ MongoDB Setup Guide

This guide will help you set up MongoDB for your Wanderlust Airbnb clone.

## 🚀 Quick Start

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Set Up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Select "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

6. **Update Environment Variables**
   ```bash
   # Create .env.local file
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB

1. **Install MongoDB Community Edition**
   - [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
   - [macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
   - [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. **Start MongoDB Service**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

3. **Update Environment Variables**
   ```bash
   # Create .env.local file
   MONGODB_URI=mongodb://localhost:27017/wanderlust
   ```

## 🔧 Environment Configuration

Create a `.env.local` file in your project root:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority

# RapidAPI (Optional)
NEXT_PUBLIC_RAPID_API_KEY=your-api-key-here

# Environment
NODE_ENV=development
```

## 🌱 Database Seeding

After setting up MongoDB, seed your database with sample data:

```bash
# Using npm script
npm run db:seed

# Or directly with ts-node
npx ts-node app/lib/seed.ts
```

This will create:
- 3 sample users (hosts)
- 3 sample properties
- Proper relationships between users and properties

## 📊 Database Schema

### Properties Collection
- **Basic Info**: ID, title, description, photos
- **Address**: Line1, city, state, zip code, coordinates
- **Physical**: Bedrooms, bathrooms, square footage, year built
- **Financial**: List price, monthly rent, price per sq ft
- **Host**: Host ID, name, email
- **Amenities**: WiFi, kitchen, parking, etc.
- **Rules**: House rules and policies
- **Ratings**: Average rating and reviews

### Users Collection
- **Profile**: Username, email, password, first/last name
- **Role**: Guest, host, or admin
- **Properties**: Array of owned property IDs
- **Favorites**: Array of favorited property IDs
- **Bookings**: Array of booking IDs
- **Reviews**: Array of review IDs

### Bookings Collection
- **Property**: Property ID and host ID
- **Guest**: Guest ID and details
- **Dates**: Check-in and check-out
- **Status**: Pending, confirmed, cancelled, completed
- **Payment**: Payment status and amount

## 🔍 API Endpoints

### Properties
- `GET /api/properties` - List all properties with filtering
- `GET /api/properties/[id]` - Get specific property
- `POST /api/properties` - Create new property
- `PUT /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property

### Query Parameters
- `city` - Filter by city
- `state` - Filter by state
- `propertyType` - Filter by property type
- `minPrice` / `maxPrice` - Price range
- `bedrooms` / `bathrooms` - Minimum requirements
- `limit` - Results per page
- `page` - Page number

## 🚨 Troubleshooting

### Connection Issues
```bash
# Check if MongoDB is running
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl status mongod
```

### Authentication Issues
- Verify username/password in connection string
- Check if user has proper permissions
- Ensure IP address is whitelisted (Atlas)

### Build Errors
```bash
# Clear build cache
rm -rf .next
npm run build
```

## 📈 Performance Tips

1. **Indexes**: Database indexes are automatically created for:
   - City and state combinations
   - Price ranges
   - Bedroom/bathroom counts
   - Property types
   - Text search (city, state, description, features)

2. **Connection Pooling**: Mongoose automatically manages connections

3. **Query Optimization**: Use specific field selection and pagination

## 🔐 Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Database Access**: Use read/write permissions only where needed
3. **Input Validation**: All API endpoints validate input data
4. **Rate Limiting**: Consider implementing rate limiting for production

## 🚀 Production Deployment

### Vercel
1. Add `MONGODB_URI` to Vercel environment variables
2. Ensure MongoDB Atlas network access includes Vercel IPs

### Other Platforms
1. Set `MONGODB_URI` environment variable
2. Configure network access for your hosting provider

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [MongoDB Atlas](https://www.mongodb.com/atlas)

## 🆘 Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify MongoDB connection string
3. Ensure all dependencies are installed
4. Check network access settings
5. Review the troubleshooting section above
