import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LifeEvent } from '../types';

interface MapControllerProps {
  currentEvent: LifeEvent;
  followCamera: boolean;
}

const MapController: React.FC<MapControllerProps> = ({ currentEvent, followCamera }) => {
  const map = useMap();

  useEffect(() => {
    if (followCamera && currentEvent) {
      map.flyTo([currentEvent.lat, currentEvent.lng], 6, {
        animate: true,
        duration: 2.0, // Slower, smoother flight
        easeLinearity: 0.25,
      });
    }
  }, [currentEvent, followCamera, map]);

  return null;
};

export default MapController;
