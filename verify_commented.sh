#!/bin/bash

echo "═══════════════════════════════════════════════════════════"
echo "   GOOGLE ANALYTICS - COMMENTED OUT VERIFICATION"
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

active_count=0
commented_count=0

for file in "${all_files[@]}"; do
  if [ -f "$file" ]; then
    if grep -q "COMMENTED OUT UNTIL LIVE" "$file"; then
      echo "✓ $file - Google Analytics COMMENTED OUT"
      ((commented_count++))
    elif grep -q "G-YRJES7B1V5" "$file"; then
      echo "⚠ $file - Google Analytics is ACTIVE (not commented)"
      ((active_count++))
    else
      echo "? $file - No Google Analytics found"
    fi
  else
    echo "✗ $file - FILE NOT FOUND"
  fi
done

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "SUMMARY: $commented_count/${#all_files[@]} files have GA commented out"
if [ $active_count -eq 0 ]; then
  echo "✅ All Google Analytics tags are commented out!"
  echo "   Ready for development. Uncomment when going live."
else
  echo "⚠️  $active_count files still have active GA tracking"
fi
echo "═══════════════════════════════════════════════════════════"
