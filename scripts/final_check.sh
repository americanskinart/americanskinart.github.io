#!/bin/bash

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         AMERICAN SKIN ART - LINK VALIDATION REPORT         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Count files
total_files=$(find . -name "*.html" -not -path "./404.html" -not -path "./coming-soon.html" -not -path "./snippets/*" | wc -l)
echo "Total HTML files scanned: $total_files"
echo ""

echo "═══════════════════════════════════════════════════════════"
echo "1. FILE EXISTENCE CHECK"
echo "═══════════════════════════════════════════════════════════"

all_good=true

# Core navigation pages
echo "Core Pages:"
for file in index.html about.html artists.html contact.html faq.html flash.html shop.html; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file MISSING!"
        all_good=false
    fi
done

echo ""
echo "Artist Pages:"
for file in artists/sinisterblack_tattoos.html artists/dannypeltier.ink.html artists/cruelbloomtattoo.html artists/deadedwalker_memorial.html; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file MISSING!"
        all_good=false
    fi
done

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "2. NAVIGATION CONSISTENCY CHECK"
echo "═══════════════════════════════════════════════════════════"

echo ""
echo "Expected Desktop Nav: Artists → Flash → FAQ → [LOGO] → Contact → About → Shop"
echo "Expected Mobile Nav: Portfolio → Artists → Flash → FAQ → Contact → About → Shop → Book Now"
echo ""

# Check mobile nav order for each file
echo "Mobile Navigation Order Verification:"
for file in index.html about.html artists.html contact.html faq.html flash.html shop.html; do
    order=$(sed -n '/Mobile Menu/,/Book Now/p' "$file" | \
            grep 'href=".*\.html' | \
            grep -v 'button\|img src\|close-mobile' | \
            grep -oE '(portfolio|artists\.html|flash\.html|faq\.html|contact\.html|about\.html|shop\.html)' | \
            paste -sd "→" -)
    
    expected="portfolio→artists.html→flash.html→faq.html→contact.html→about.html→shop.html"
    
    if [ "$order" = "$expected" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file has incorrect order: $order"
        all_good=false
    fi
done

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "3. BROKEN LINK CHECK"
echo "═══════════════════════════════════════════════════════════"

broken_count=0

for html_file in index.html about.html artists.html contact.html faq.html flash.html shop.html artists/*.html; do
    if [ ! -f "$html_file" ]; then continue; fi
    
    # Get directory of current file
    dir=$(dirname "$html_file")
    
    # Extract all .html links
    links=$(grep -oE 'href="[^"]*\.html[^"]*"' "$html_file" | grep -oE '"[^"]*"' | tr -d '"' | grep -v '^http')
    
    while IFS= read -r link; do
        if [ -z "$link" ]; then continue; fi
        
        # Remove query params and fragments for file check
        file_part="${link%%\?*}"
        file_part="${file_part%%#*}"
        
        if [ -z "$file_part" ]; then continue; fi
        
        # Resolve relative path
        if [[ "$file_part" == ../* ]]; then
            # From artists/ subdirectory
            target="${file_part#../}"
        else
            target="$file_part"
        fi
        
        # Check if file exists
        if [ ! -f "$target" ] && [ ! -z "$target" ]; then
            # Ignore query string links (they're valid)
            if [[ "$link" == *"?"* ]] && [ -f "${link%%\?*}" ]; then
                continue
            fi
            echo "  ✗ $html_file → $link (target not found: $target)"
            ((broken_count++))
            all_good=false
        fi
    done <<< "$links"
done

if [ $broken_count -eq 0 ]; then
    echo "  ✓ No broken links found!"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "4. SUMMARY"
echo "═══════════════════════════════════════════════════════════"

if [ "$all_good" = true ]; then
    echo ""
    echo "  ✅ ALL CHECKS PASSED!"
    echo "  All navigation links are working correctly."
    echo "  Navigation order is consistent across all pages."
    echo ""
else
    echo ""
    echo "  ⚠️  ISSUES FOUND - See details above"
    echo ""
fi

echo "═══════════════════════════════════════════════════════════"
