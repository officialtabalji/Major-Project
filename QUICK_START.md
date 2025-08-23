# 🚀 Quick Start Guide - Wanderlust Airbnb Clone

## ⚡ Get Running in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Your Browser
Navigate to: **http://localhost:3000** (or the port shown in terminal)

## 🎯 What You'll See

- **Homepage**: Beautiful hero section with search bar and 6 sample properties
- **Property Cards**: Click any property to view details
- **Navigation**: Use navbar to explore different sections
- **Forms**: Test booking and host forms (data logs to console)

## 🔍 Test All Features

### ✅ Homepage (`/`)
- Hero section with search bar
- Grid of 6 property listings
- Responsive design (try resizing browser)

### ✅ Property Details (`/listing/1`)
- Click any property card
- View large images and details
- Test "Request Booking" button

### ✅ Booking Form (`/booking`)
- Fill out the complete form
- Check browser console for logged data
- Form validation and reset functionality

### ✅ Host Portal (`/host`)
- Comprehensive property submission form
- Amenities selection
- Console logging of all data

### ✅ Authentication (`/login`, `/signup`)
- Login and signup forms
- Form validation
- Console logging

## 🚀 Deploy to Production

### Option 1: Vercel (Easiest)
1. Push to GitHub
2. Connect to Vercel
3. Auto-deploy on every push

### Option 2: Other Platforms
- Netlify, Railway, Render
- See `DEPLOYMENT.md` for detailed instructions

## 📱 Test Responsiveness

- **Desktop**: Full layout with side-by-side content
- **Tablet**: Responsive grid adjustments
- **Mobile**: Stacked layout with mobile-optimized navigation

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

### Styling Issues
- Ensure Tailwind CSS is working
- Check browser console for errors
- Verify all CSS imports in `globals.css`

## 📊 Performance Check

```bash
# Build for production
npm run build

# Start production server
npm start

# Test production build locally
```

## 🎉 You're All Set!

Your Airbnb clone is now running locally and ready for:
- ✅ Development and testing
- ✅ Customization and enhancement
- ✅ Production deployment
- ✅ Portfolio showcase

## 🔗 Quick Links

- **Project Summary**: `PROJECT_SUMMARY.md`
- **Deployment Guide**: `DEPLOYMENT.md`
- **Full README**: `README.md`
- **Live Demo**: Deploy to see it in action!

---

**Happy coding! 🎨✨**
