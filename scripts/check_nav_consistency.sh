#!/bin/bash

echo "=== NAVIGATION CONSISTENCY CHECK ==="
echo ""

# Expected desktop nav order from index.html
echo "Expected Desktop Nav Order (from index.html):"
echo "  Artists → Flash → FAQ → [LOGO] → Contact → About → Shop"
echo ""

# Expected mobile nav order from index.html
echo "Expected Mobile Nav Order (from index.html):"
echo "  Portfolio → Artists → Flash → FAQ → Contact → About → Shop → Book Now"
echo ""

echo "=== Checking Desktop Navigation Order ==="
echo ""

check_desktop_nav() {
    local file="$1"
    echo "File: $file"
    
    # Extract desktop nav links in order (between "Desktop bar" and "Mobile Menu")
    sed -n '/Desktop [Bb]ar/,/Mobile Menu/p' "$file" | \
    grep -oE 'href="[^"]*\.html[^"]*".*class="text-sm tracking' | \
    grep -oE 'href="[^"]*"' | \
    sed 's/href="//g; s/"//g; s/\.\.\/\?//g' | \
    grep -v '#' | \
    awk '{print "  " NR ". " $0}'
    
    echo ""
}

# Check all files
for file in index.html about.html artists.html contact.html faq.html flash.html shop.html; do
    check_desktop_nav "$file"
done

for file in artists/*.html; do
    check_desktop_nav "$file"
done

echo "=== Checking Mobile Navigation Order ==="
echo ""

check_mobile_nav() {
    local file="$1"
    echo "File: $file"
    
    # Extract mobile nav links in order
    sed -n '/Mobile Menu/,/Book Now/p' "$file" | \
    grep 'href="' | \
    grep -v 'button\|img src\|close-mobile' | \
    grep -oE 'href="[^"]*"' | \
    sed 's/href="//g; s/"//g; s/\.\.\/\?//g' | \
    awk '{
        if ($0 ~ /#portfolio/) print "  " NR ". Portfolio"
        else if ($0 ~ /artists\.html/) print "  " NR ". Artists"
        else if ($0 ~ /flash\.html/) print "  " NR ". Flash"
        else if ($0 ~ /faq\.html/) print "  " NR ". FAQ"
        else if ($0 ~ /contact\.html/) print "  " NR ". Contact"
        else if ($0 ~ /about\.html/) print "  " NR ". About"
        else if ($0 ~ /shop\.html/) print "  " NR ". Shop"
        else if ($0 ~ /#book/) print "  " NR ". Book Now"
    }'
    
    echo ""
}

# Check all files
for file in index.html about.html artists.html contact.html faq.html flash.html shop.html; do
    check_mobile_nav "$file"
done

for file in artists/*.html; do
    check_mobile_nav "$file"
done
