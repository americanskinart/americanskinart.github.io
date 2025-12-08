#!/bin/bash

echo "═══════════════════════════════════════════════════════════"
echo "   GOOGLE ANALYTICS TAG VERIFICATION"
echo "═══════════════════════════════════════════════════════════"
echo ""

all_files=(
  "index.html"
  "about.html"
  "artists.html"
  "contact.html"
  "faq.html"
  "flash.html"
  "shop.html"
  "artists/sinisterblack_tattoos.html"
  "artists/dannypeltier.ink.html"
  "artists/cruelbloomtattoo.html"
  "artists/deadedwalker_memorial.html"
)

missing_count=0
found_count=0

for file in "${all_files[@]}"; do
  if [ -f "$file" ]; then
    if grep -q "G-YRJES7B1V5" "$file"; then
      echo "✓ $file - Google Analytics tag found"
      ((found_count++))
    else
      echo "✗ $file - MISSING Google Analytics tag"
      ((missing_count++))
    fi
  else
    echo "✗ $file - FILE NOT FOUND"
    ((missing_count++))
  fi
done

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "SUMMARY: $found_count/${#all_files[@]} files have Google Analytics"
if [ $missing_count -eq 0 ]; then
  echo "✅ All files updated successfully!"
else
  echo "⚠️  $missing_count files are missing the tag"
fi
echo "═══════════════════════════════════════════════════════════"
