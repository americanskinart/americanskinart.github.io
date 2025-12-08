#!/usr/bin/env python3
"""
Generate slideshow-images.json by scanning artist slideshow folders
Run this with: python generate-slideshow-json.py
"""

import os
import json
from pathlib import Path

# Base paths
BASE_DIR = Path(__file__).parent
ARTISTS_PATH = BASE_DIR / 'images' / 'artists'
OUTPUT_PATH = BASE_DIR / 'data' / 'slideshow-images.json'

# Artist configuration
ARTISTS = {
    'sinisterblack_tattoos': {
        'handle': '@sinisterblack_tattoos',
        'page': 'artists/sinisterblack_tattoos.html'
    },
    'dannypeltier.ink': {
        'handle': '@dannypeltier.ink',
        'page': 'artists/dannypeltier.ink.html'
    },
    'cruelbloomtattoo': {
        'handle': '@cruelbloomtattoo',
        'page': 'artists/cruelbloomtattoo.html'
    }
}

# Supported image extensions
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}

def main():
    slideshow_images = []

    # Scan each artist's slideshow folder
    for artist_key, artist_info in ARTISTS.items():
        slideshow_path = ARTISTS_PATH / artist_key / 'slideshow'

        if not slideshow_path.exists():
            print(f"⚠ Slideshow folder not found: {slideshow_path}")
            continue

        # Get all image files
        for file_path in slideshow_path.iterdir():
            if file_path.suffix.lower() in IMAGE_EXTENSIONS:
                # Get relative path from web root
                relative_path = f"images/artists/{artist_key}/slideshow/{file_path.name}"

                # Get modification time
                mtime = file_path.stat().st_mtime

                slideshow_images.append({
                    'src': relative_path,
                    'alt': artist_info['handle'],
                    'href': artist_info['page'],
                    'username': artist_info['handle'],
                    'artist': artist_key,
                    'mtime': mtime
                })

    # Sort by modification time (newest first)
    slideshow_images.sort(key=lambda x: x['mtime'], reverse=True)

    # Remove mtime from output
    for image in slideshow_images:
        del image['mtime']

    # Ensure output directory exists
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    # Write to JSON file
    with open(OUTPUT_PATH, 'w') as f:
        json.dump(slideshow_images, f, indent=2)

    print(f"[OK] Generated {len(slideshow_images)} slideshow images")
    print(f"[OK] Saved to: {OUTPUT_PATH}")

    # Show first few images
    if slideshow_images:
        print("\nNewest images:")
        for img in slideshow_images[:5]:
            print(f"  - {img['src']} ({img['artist']})")

if __name__ == '__main__':
    main()
