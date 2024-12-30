// Initialize the map
const map = L.map('map').setView([20, 78], 5); // Centered on India
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data for different regions (latitude, longitude)
const points = {
  north: [
    { lat: 32, lon: 77, name: 'Point 1' }, // Himachal Pradesh
    { lat: 31, lon: 76, name: 'Point 2' }  // Punjab
  ],
  south: [
    { lat: 12, lon: 78, name: 'Point 3' }, // Tamil Nadu
    { lat: 13, lon: 80.2, name: 'Point 4' }  // Karnataka
  ],
  east: [
    { lat: 23, lon: 88, name: 'Point 5' }, // West Bengal
    { lat: 21, lon: 86, name: 'Point 6' }  // Odisha
  ],
  west: [
    { lat: 22, lon: 72, name: 'Point 7' }, // Gujarat
    { lat: 19, lon: 73, name: 'Point 8' }  // Maharashtra
  ]
};

// Add markers to the map
let markers = [];

// Function to add markers based on selected region
function updateMap(region) {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  // Add new markers
  if (region === 'all') {
    Object.values(points).flat().forEach(addMarker);
  } else {
    points[region]?.forEach(addMarker);
  }

  // Update statistics
  document.getElementById('total-points').textContent =
    region === 'all' ? Object.values(points).flat().length : points[region]?.length || 0;
}

// Function to add a single marker
function addMarker(point) {
  const marker = L.marker([point.lat, point.lon]).addTo(map);
  marker.bindPopup(`<b>${point.name}</b>`);
  markers.push(marker);
}

// Event listener for region filter
document.getElementById('region').addEventListener('change', (e) => {
  const region = e.target.value;
  updateMap(region);
});

// Initialize the map with all points
updateMap('all');