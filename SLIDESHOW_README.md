# Dynamic Slideshow System

## Overview

The slideshow on the homepage now dynamically pulls images from artist folders. This allows you to easily add or remove images without editing any code.

## Folder Structure

```
images/artists/
├── sinisterblack_tattoos/
│   └── slideshow/           ← Drop images here for Devin
├── dannypeltier.ink/
│   └── slideshow/           ← Drop images here for Danny
└── cruelbloomtattoo/
    └── slideshow/           ← Drop images here for Dale
```

## How to Use

### Adding New Images

1. Navigate to the artist's `slideshow` folder
   - Example: `images/artists/sinisterblack_tattoos/slideshow/`

2. Drop your image files into the folder
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
   - Images will automatically appear in the homepage slideshow

3. Refresh the website - the new images will be included automatically!

### Removing Images

1. Navigate to the artist's `slideshow` folder
2. Delete the image file you want to remove
3. Refresh the website - the image will no longer appear in the slideshow

### Image Guidelines

- **File Naming**: Use descriptive names (e.g., `skull-tattoo-01.jpg`, `rose-sleeve.png`)
- **File Size**: Optimize images for web (recommended < 2MB per image)
- **Dimensions**: Consistent aspect ratios work best (portrait or square)
- **Quality**: Use high-quality images that showcase the work well

## Features

- **Automatic Discovery**: The system automatically scans the slideshow folders
- **Random Order**: Images are shuffled randomly each time the page loads
- **Clickable Links**: Each image links to the respective artist's page
- **Responsive**: Works on both desktop and mobile devices
- **No Code Changes**: Just add/remove files - no HTML or JavaScript editing needed

## Technical Details

### PHP Endpoint

The system uses a PHP script at `api/get-slideshow-images.php` that:
- Scans each artist's `slideshow` folder
- Returns a JSON array of all images with metadata
- Shuffles the order randomly
- Links each image to the artist's page

### Artist Configuration

To add a new artist or change artist URLs, edit `api/get-slideshow-images.php`:

```php
$artists = [
    'artist_folder_name' => [
        'handle' => '@instagram_handle',
        'page' => 'artists/artist-page.html'
    ]
];
```

### Slideshow Settings

The slideshow auto-advances every 4 seconds. To change this, edit the `setInterval` value in `index.html`:

```javascript
setInterval(nextSlide, 4000); // 4000 = 4 seconds
```

## Troubleshooting

**Images not showing up?**
- Verify the image is in the correct `slideshow` folder
- Check the file extension is supported (jpg, jpeg, png, gif, webp)
- Clear your browser cache and refresh

**Need to change artist links?**
- Edit the `$artists` array in `api/get-slideshow-images.php`
- The `href` property controls where each image links

**Want different slideshow speeds?**
- Change the `setInterval` timing in the slideshow script (currently 4000ms)

## Server Requirements

- PHP 7.0 or higher
- Read access to the `images/artists/` directory
- Web server configured to execute PHP files in the `api/` directory
