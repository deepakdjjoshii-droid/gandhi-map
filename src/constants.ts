import L from 'leaflet';

export const PLAYBACK_SPEEDS = [
  { label: '1x', value: 2000 },
  { label: '2x', value: 1000 },
  { label: '5x', value: 400 },
  { label: '10x', value: 200 },
];

// Custom Icon Creator function
export const createCustomIcon = (isActive: boolean) => {
  if (isActive) {
    return L.divIcon({
      className: 'custom-marker-icon',
      html: `<div class="marker-pulse"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  }

  return L.divIcon({
    className: 'custom-marker-icon',
    html: `<div class="w-3 h-3 bg-orange-600 rounded-full border-2 border-white shadow-md"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

export const MAP_TILE_LAYER = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
export const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
