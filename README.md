# Wanderlust - Airbnb Clone

A modern, responsive Airbnb clone built with Next.js, TypeScript, and Tailwind CSS. This MVP demonstrates the core functionality of a vacation rental platform with a beautiful, user-friendly interface.

## Features

### 🏠 Homepage
- **Navbar**: Logo (Wanderlust), navigation links, and authentication buttons
- **Hero Section**: Eye-catching tagline "Find your next stay with locals" with integrated search bar
- **Search Bar**: Location, dates, and guests input fields
- **Property Grid**: Responsive grid showcasing sample property listings with photos, titles, prices, and ratings

### 🏡 Property Listings
- **Property Cards**: Beautiful cards displaying property information with hover effects
- **Sample Data**: 6 curated properties with high-quality images from Unsplash
- **Responsive Design**: Optimized for all device sizes

### 📋 Individual Listing Pages
- **Detailed Views**: Large property images with comprehensive information
- **Property Details**: Title, description, price, location, amenities, and specifications
- **Booking Integration**: "Request Booking" button with modal confirmation
- **Navigation**: Easy back navigation to homepage

### 📝 Booking System
- **Booking Form**: Complete form with name, email, dates, guests, and message fields
- **Form Validation**: Required field validation and date constraints
- **Console Logging**: All form submissions logged to browser console (MVP requirement)
- **User Experience**: Success messages and form reset functionality

### 🏘️ Host Portal
- **Property Submission**: Comprehensive form for adding new properties
- **Form Fields**: Title, location, price, description, bedrooms, bathrooms, max guests
- ** Amenities Selection**: Checkbox-based amenity selection system
- **Photo Upload Placeholder**: UI ready for future photo upload implementation
- **Data Logging**: All submissions logged to console (MVP requirement)

### 🔐 Authentication Pages
- **Login Page**: Email and password fields with form validation
- **Signup Page**: Username, email, password, and confirmation fields
- **Form Handling**: Client-side validation and console logging
- **Navigation**: Seamless navigation between authentication pages

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom component classes
- **Icons**: Lucide React for consistent iconography
- **Images**: Next.js Image component with Unsplash integration
- **Responsiveness**: Mobile-first design approach

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd wanderlust-airbnb-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── Navbar.tsx     # Navigation component
│   ├── Hero.tsx       # Hero section with search
│   └── PropertyCard.tsx # Property listing cards
├── listing/            # Property detail pages
│   └── [id]/          # Dynamic routing for properties
├── booking/            # Booking request form
├── host/               # Host property submission
├── login/              # User authentication
├── signup/             # User registration
├── globals.css         # Global styles and Tailwind
├── layout.tsx          # Root layout component
└── page.tsx            # Homepage
```

## Routing Structure

- `/` → Homepage with hero section and property grid
- `/listing/[id]` → Individual property detail pages
- `/booking` → Booking request form
- `/host` → Host property submission form
- `/login` → User authentication
- `/signup` → User registration

## Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`:
- **Primary**: `#FF5A5F` (Airbnb-style red)
- **Secondary**: `#00A699` (Teal accent)
- **Dark**: `#484848` (Text color)
- **Light**: `#F7F7F7` (Background color)

### Components
Custom component classes are defined in `globals.css`:
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons  
- `.btn-outline` - Outline style buttons
- `.card` - Property card styling
- `.input-field` - Form input styling

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` directory
3. Configure redirects for Next.js routing

### Other Platforms
- **Railway**: Connect GitHub repo and deploy
- **Render**: Connect GitHub repo and deploy
- **DigitalOcean App Platform**: Connect GitHub repo and deploy

## Future Enhancements

- **Backend Integration**: Real database and API endpoints
- **User Authentication**: JWT tokens and session management
- **Image Upload**: Cloud storage integration (AWS S3, Cloudinary)
- **Payment Processing**: Stripe integration for bookings
- **Real-time Chat**: Host-guest communication
- **Reviews & Ratings**: User feedback system
- **Search & Filtering**: Advanced property search
- **Maps Integration**: Google Maps or Mapbox
- **Mobile App**: React Native companion app

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support or questions, please open an issue in the GitHub repository.

---

**Note**: This is an MVP (Minimum Viable Product) designed to demonstrate core functionality. All form submissions are logged to the console as specified in the requirements. Backend integration and real data persistence would be implemented in future versions.
