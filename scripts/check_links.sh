#!/bin/bash

echo "=== NAVIGATION LINK VALIDATION ==="
echo ""

# Function to check navigation links in a file
check_nav_links() {
    local file="$1"
    local base_path="$2"
    
    echo "Checking: $file"
    
    # Extract navigation links (excluding external links, assets, and fragments)
    local nav_links=$(grep -oE 'href="[^"]*\.html[^"]*"' "$file" | grep -oE '"[^"]*"' | tr -d '"' | grep -v '^http' | sort -u)
    
    while IFS= read -r link; do
        # Remove fragment identifiers for file checking
        local file_path="${link%%#*}"
        local full_path="${base_path}${file_path}"
        
        if [ -n "$file_path" ]; then
            if [ -f "$full_path" ]; then
                echo "  ✓ $link"
            else
                echo "  ✗ MISSING: $link (looking for: $full_path)"
            fi
        fi
    done <<< "$nav_links"
    
    echo ""
}

# Check root files
for file in index.html about.html artists.html contact.html faq.html flash.html shop.html; do
    if [ -f "$file" ]; then
        check_nav_links "$file" ""
    fi
done

# Check artist files
for file in artists/*.html; do
    if [ -f "$file" ]; then
        check_nav_links "$file" "artists/"
    fi
done

echo "=== LINK VALIDATION COMPLETE ==="
