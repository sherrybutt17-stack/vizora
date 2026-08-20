#!/bin/bash
strip() {
  curl -s "http://localhost:3000$1" | sed 's/<[^>]*>/ /g' | tr -s ' \n' ' ' \
    | tr 'A-Z' 'a-z' | tr -c 'a-z0-9 ' ' ' | tr -s ' ' | tr ' ' '\n' | sort -u | grep -v '^$'
}
compare() {
  strip "$1" > /tmp/a.txt
  strip "$2" > /tmp/b.txt
  local common total pct
  common=$(comm -12 /tmp/a.txt /tmp/b.txt | wc -l | tr -d ' ')
  total=$(cat /tmp/a.txt /tmp/b.txt | sort -u | wc -l | tr -d ' ')
  pct=$(awk -v c="$common" -v t="$total" 'BEGIN{printf "%.0f", (c/t)*100}')
  printf "  %-34s vs %-34s  %s%% shared / %s%% unique\n" "$1" "$2" "$pct" "$((100-pct))"
}
compare /specialties/cardiology /specialties/mental-health
compare /specialties/dermatology /specialties/dme
compare /specialties/anesthesia /specialties/podiatry
compare /locations/texas /locations/california
compare /locations/vermont /locations/ohio
compare /locations/hawaii /locations/maine
echo ""
echo "Word counts (unique-word volume per page):"
for p in /specialties/cardiology /specialties/mental-health /locations/texas /locations/vermont /services/denial-management; do
  printf "  %-36s %s unique words\n" "$p" "$(strip $p | wc -l | tr -d ' ')"
done
