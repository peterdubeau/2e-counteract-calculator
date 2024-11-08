npm run build

if [[ -e CNAME ]]; then
  cp CNAME dist
fi

cd dist
surge