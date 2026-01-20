# SEO Implementation Guide

## Overview
This document outlines the SEO (Search Engine Optimization) implementation for the Viktor Van Steenweghen portfolio and blog website.

## Implementation Summary

### 1. Meta Tags & Open Graph
- **Location**: `index.html` and dynamically managed via `react-helmet-async`
- **Features**:
  - Primary meta tags (title, description, keywords, author)
  - Open Graph tags for social media sharing (Facebook, LinkedIn)
  - Twitter Card tags for Twitter sharing
  - Canonical URLs to prevent duplicate content issues
  - Theme colors for mobile browsers

### 2. Structured Data (Schema.org)
Implemented JSON-LD structured data for better search engine understanding:

- **Website Schema**: General website information in `index.html`
- **Person Schema**: Portfolio page with professional details, skills, and social profiles
- **Blog Schema**: Blog listing page with all posts
- **BlogPosting Schema**: Individual blog posts with author, date, and content details

### 3. SEO Component
- **Location**: `src/components/SEO.tsx`
- **Purpose**: Reusable component for managing page-specific meta tags
- **Features**:
  - Dynamic title and description
  - Customizable Open Graph images
  - Article-specific meta tags
  - Structured data injection
  - Canonical URL management

### 4. Page-Specific SEO

#### Portfolio Page (`/`)
- Title: "Portfolio | Viktor Van Steenweghen"
- Description: Based on profile data
- Schema: Person type with skills, work experience, and social links
- Open Graph type: profile

#### Blog Listing Page (`/blogs`)
- Title: "Blog | Viktor Van Steenweghen"
- Description: "Discover the latest articles and insights..."
- Schema: Blog type with list of all blog posts
- Open Graph type: website

#### Blog Post Detail Page (`/post/:id`)
- Dynamic title based on post title
- Dynamic description from post content (first 160 characters)
- Schema: BlogPosting type with full article metadata
- Open Graph type: article with publish date and tags
- Dynamic Open Graph image if post has featured image

### 5. robots.txt
- **Location**: `public/robots.txt`
- **Purpose**: Control search engine crawler access
- **Configuration**:
  - Allows all pages except API routes and JSON files
  - References sitemap location
  - Sets crawl delay to 1 second

### 6. sitemap.xml
- **Location**: `public/sitemap.xml`
- **Purpose**: Help search engines discover and index pages
- **Includes**:
  - Homepage (priority: 1.0, weekly updates)
  - Blog listing (priority: 0.9, daily updates)
  - Placeholder for individual blog posts (priority: 0.8, monthly updates)

**Note**: Update sitemap with actual blog post URLs as content is added.

### 7. Vite Build Optimization
- **Location**: `vite.config.ts`
- **Optimizations**:
  - Terser minification for smaller bundle sizes
  - Manual chunk splitting for better caching:
    - React vendor bundle (React, React DOM, React Router)
    - Utils bundle (Lucide React icons)
  - CSS code splitting
  - Optimized dependency pre-bundling

## Best Practices Implemented

### Technical SEO
- ✅ Semantic HTML structure with proper heading hierarchy
- ✅ Descriptive alt text for images
- ✅ ARIA labels for accessibility (also helps SEO)
- ✅ Fast loading times with code splitting
- ✅ Mobile-responsive design
- ✅ Clean, readable URLs
- ✅ Proper use of HTML5 semantic elements

### Content SEO
- ✅ Unique titles for each page
- ✅ Descriptive meta descriptions (under 160 characters)
- ✅ Structured data for rich snippets
- ✅ Internal linking structure
- ✅ Breadcrumb navigation on blog posts

### Social Media SEO
- ✅ Open Graph tags for Facebook, LinkedIn
- ✅ Twitter Card tags for Twitter
- ✅ Social media preview images
- ✅ Proper content sharing metadata

## Deployment Checklist

Before deploying to production:

1. **Update URLs**: Replace all instances of `https://viktorvansteenweghen.com/` with your actual domain
2. **Add Open Graph Image**: Create and add `public/og-image.jpg` (recommended size: 1200x630px)
3. **Update Sitemap**: Add individual blog post URLs to sitemap.xml
4. **Verify Canonical URLs**: Ensure all canonical URLs match your production domain
5. **Test Meta Tags**: Use tools like:
   - Facebook Sharing Debugger
   - Twitter Card Validator
   - Google Rich Results Test
   - Schema.org Validator
6. **Submit to Search Engines**:
   - Google Search Console: Submit sitemap
   - Bing Webmaster Tools: Submit sitemap
7. **Monitor Performance**:
   - Google Analytics for traffic
   - Google Search Console for search performance
   - PageSpeed Insights for load times

## Testing SEO

### Tools to Use
- **Google Search Console**: Monitor indexing and search performance
- **Google Lighthouse**: Check SEO score (aim for 90+)
- **Schema Markup Validator**: Verify structured data
- **Facebook Sharing Debugger**: Test Open Graph tags
- **Twitter Card Validator**: Test Twitter Cards
- **GTmetrix/PageSpeed Insights**: Test page speed

### Manual Checks
1. View page source and verify meta tags are present
2. Test social sharing on different platforms
3. Verify proper title tags in browser tab
4. Check that robots.txt is accessible at `/robots.txt`
5. Check that sitemap.xml is accessible at `/sitemap.xml`

## Future Improvements

Consider implementing:
- Dynamic sitemap generation based on blog posts
- Automatic image optimization
- Lazy loading for images
- Service worker for offline capability (PWA)
- RSS feed for blog
- Breadcrumb structured data
- FAQ structured data (if applicable)
- Video structured data (if applicable)
- Google Analytics 4 or similar analytics
- Performance monitoring (Web Vitals)

## Maintenance

### Regular Tasks
- Update sitemap when new blog posts are added
- Monitor search rankings and adjust content accordingly
- Check for broken links regularly
- Update Open Graph images when content changes significantly
- Review and update meta descriptions periodically
- Monitor Core Web Vitals and address any issues

## Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
- [Moz SEO Learning Center](https://moz.com/learn/seo)
