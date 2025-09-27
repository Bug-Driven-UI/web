#!/bin/sh
set -eu

: "${API_BASE:=/api}"

WWW_ROOT="/usr/share/nginx/html"
TEMPLATE="${WWW_ROOT}/env-config.js.template"
OUT="${WWW_ROOT}/env-config.js"
INDEX="${WWW_ROOT}/index.html"

if [ -f "$TEMPLATE" ]; then
  envsubst < "$TEMPLATE" > "$OUT"
else
  cat > "$OUT" <<EOF
window.__ENV__ = { API_BASE: "${API_BASE}" };
EOF
fi

if [ -f "$INDEX" ]; then
  if ! grep -q 'env-config.js' "$INDEX"; then
    if grep -q '</head>' "$INDEX"; then
      sed -i 's#</head>#  <script src="/env-config.js"></script>\n</head>#' "$INDEX"
    elif grep -q '</body>' "$INDEX"; then
      sed -i 's#</body>#  <script src="/env-config.js"></script>\n</body>#' "$INDEX"
    else
      echo '<script src="/env-config.js"></script>' | cat - "$INDEX" > "$INDEX.tmp" && mv "$INDEX.tmp" "$INDEX"
    fi
  fi
fi

exec "$@"