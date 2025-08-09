// Replace with your Mapbox access token
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [77.5946, 12.9716], // Bangalore
  zoom: 12
});

// Add zoom and rotation controls
map.addControl(new mapboxgl.NavigationControl());

// Add a marker
const marker = new mapboxgl.Marker()
  .setLngLat([77.5946, 12.9716])
  .setPopup(new mapboxgl.Popup().setHTML("<h3>Bangalore</h3><p>Silicon Valley of India</p>"))
  .addTo(map);

// Add route planning
async function getRoute(start, end) {
  const query = await fetch(https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken});
  const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry;

  map.addLayer({
    id: 'route',
    type: 'line',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: route
      }
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#3b9ddd',
      'line-width': 5
    }
  });
}

map.on('load', () => {
  const start = [77.5946, 12.9716];
  const end = [77.6784, 13.0210]; // Example destination
  getRoute(start, end);
});