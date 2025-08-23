# Deployment Guide - Wanderlust Airbnb Clone

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: Airbnb clone MVP"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js
   - Click "Deploy"

3. **Automatic Deployments**
   - Every push to main branch triggers automatic deployment
   - Preview deployments for pull requests
   - Custom domains available

### Option 2: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect your GitHub repo
   - Set build command: `npm run build`
   - Set publish directory: `.next`

3. **Configure redirects**
   Create `public/_redirects` file:
   ```
   /*    /index.html   200
   ```

### Option 3: Railway

1. **Connect GitHub**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Configure Environment**
   - Railway auto-detects Next.js
   - No additional configuration needed

### Option 4: Render

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Connect GitHub repository
   - Select "Web Service"
   - Build Command: `npm run build`
   - Start Command: `npm start`

## 🔧 Environment Variables

For production, you may want to set these environment variables:

```bash
# In Vercel/Railway/Render dashboard
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📱 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records

## 🧪 Testing Before Deployment

1. **Local Testing**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

2. **Build Testing**
   ```bash
   npm run build
   npm start
   # Test production build locally
   ```

3. **Check All Routes**
   - `/` - Homepage
   - `/listing/1` - Property detail
   - `/booking` - Booking form
   - `/host` - Host form
   - `/login` - Login page
   - `/signup` - Signup page

## 📊 Performance Optimization

### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor Core Web Vitals
- Track user behavior

### Image Optimization
- Next.js Image component is already optimized
- Images are served from Unsplash CDN
- Consider implementing lazy loading for more images

## 🔒 Security Considerations

1. **Form Validation**
   - Client-side validation implemented
   - Server-side validation needed for production

2. **CORS Configuration**
   - Configure allowed origins in production
   - Set up proper security headers

3. **Rate Limiting**
   - Implement rate limiting for forms
   - Protect against spam submissions

## 📈 Monitoring & Analytics

### Vercel
- Built-in performance monitoring
- Error tracking
- Real-time analytics

### Google Analytics
```typescript
// Add to app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **Image Loading Issues**
   - Check Unsplash URLs are accessible
   - Verify Next.js Image configuration
   - Check network connectivity

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check PostCSS configuration
   - Verify CSS imports in layout

### Performance Issues

1. **Slow Loading**
   - Enable Next.js Image optimization
   - Implement lazy loading
   - Use dynamic imports for heavy components

2. **Bundle Size**
   - Analyze bundle with `npm run build`
   - Remove unused dependencies
   - Implement code splitting

## 📚 Next Steps After Deployment

1. **SEO Optimization**
   - Add meta tags for each page
   - Implement Open Graph tags
   - Add structured data (JSON-LD)

2. **Backend Integration**
   - Set up database (PostgreSQL, MongoDB)
   - Implement user authentication
   - Add payment processing

3. **Advanced Features**
   - Real-time messaging
   - Advanced search and filtering
   - Review and rating system
   - Mobile app development

## 🆘 Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Issues**: Create issue in your repository

---

**Happy Deploying! 🎉**

Your Airbnb clone is now ready for the world to see!
