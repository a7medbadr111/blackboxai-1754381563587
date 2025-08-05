# BadRex Store - Shopify Theme

A modern, responsive Shopify theme designed for digital product stores, featuring a dark theme with purple accents and multilingual support.

## Features

- **Modern Design**: Clean, dark theme with purple gradient accents
- **Multilingual Support**: Full English and Arabic support with RTL layout
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Digital Product Focused**: Optimized for selling digital products, games, and software
- **AJAX Cart**: Smooth cart updates without page reloads
- **Trust Elements**: Built-in trust badges and security indicators
- **Fast Loading**: Optimized for performance with minimal dependencies

## Theme Structure

```
BadRex-Theme/
├── assets/
│   ├── base.css          # Main stylesheet with TailwindCSS utilities
│   └── global.js         # JavaScript for cart functionality and interactions
├── config/
│   └── settings_schema.json  # Theme customization options
├── layout/
│   └── theme.liquid      # Main layout template
├── locales/
│   ├── en.default.json   # English translations
│   └── ar.json          # Arabic translations with RTL support
├── sections/
│   ├── header.liquid     # Site header with navigation
│   ├── hero.liquid       # Homepage hero section
│   ├── featured-products.liquid  # Featured products grid
│   ├── trust-section.liquid      # Trust badges and testimonials
│   └── footer.liquid     # Site footer
├── snippets/
│   ├── language-switcher.liquid  # Language switching component
│   ├── product-card.liquid       # Reusable product card
│   └── price.liquid      # Product price display
└── templates/
    ├── index.liquid      # Homepage template
    ├── product.liquid    # Product page template
    ├── collection.liquid # Collection page template
    ├── cart.liquid       # Shopping cart template
    └── page.contact.liquid  # Contact page template
```

## Key Pages

### Homepage
- Hero section with animated background
- Featured products grid
- Trust section with statistics and testimonials

### Product Page
- Product image gallery
- Add to cart functionality
- Product details and description
- Trust badges (instant delivery, verified, etc.)

### Collection Page
- Product filtering and sorting
- Search functionality
- Responsive product grid

### Cart Page
- AJAX cart updates
- Quantity controls
- Order summary
- Trust indicators

### Contact Page
- Contact form
- Business information
- FAQ section

## Multilingual Support

The theme supports both English and Arabic languages:

- **English**: Default language with left-to-right layout
- **Arabic**: Full RTL (right-to-left) support with proper text alignment
- **Language Switcher**: Easy switching between languages
- **Localized Content**: All static text is translatable

## Customization

The theme can be customized through the Shopify admin:

- **Colors**: Primary and secondary brand colors
- **Typography**: Custom font selection
- **Layout**: Spacing and sizing options
- **Product Cards**: Display options and styling
- **Cart**: Cart type and behavior settings

## Installation

1. Download the theme ZIP file
2. In your Shopify admin, go to Online Store > Themes
3. Click "Upload theme" and select the ZIP file
4. Once uploaded, click "Customize" to configure the theme
5. Publish the theme when ready

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The theme is optimized for performance:

- Minimal JavaScript dependencies
- Optimized CSS with utility classes
- Lazy loading for images
- Efficient Liquid templating
- Clean, semantic HTML

## Support

For support and customization requests, please contact the BadRex team.

## Version History

### v1.0.0
- Initial release
- Complete theme structure
- Multilingual support (English/Arabic)
- AJAX cart functionality
- Responsive design
- Trust elements and security badges

## License

This theme is proprietary software created for BadRex Store. All rights reserved.
