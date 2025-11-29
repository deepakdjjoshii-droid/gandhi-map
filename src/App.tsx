import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { events } from './data';
import { AppState } from './types';
import { PLAYBACK_SPEEDS, MAP_TILE_LAYER, MAP_ATTRIBUTION, createCustomIcon } from './constants';
import Timeline from './components/Timeline';
import StatsPanel from './components/StatsPanel';
import MapController from './components/MapController';
import ZoomControls from './components/ZoomControls';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentIndex: 0,
    isPlaying: false,
    speed: PLAYBACK_SPEEDS[0].value,
    followCamera: true,
    showStats: true,
    isLooping: false,
  });

  const timerRef = useRef<number | null>(null);

  // Playback Logic
  useEffect(() => {
    if (state.isPlaying) {
      timerRef.current = window.setInterval(() => {
        setState((prev) => {
          if (prev.currentIndex >= events.length - 1) {
            if (prev.isLooping) {
              return { ...prev, currentIndex: 0 };
            }
            return { ...prev, isPlaying: false };
          }
          return { ...prev, currentIndex: prev.currentIndex + 1 };
        });
      }, state.speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.isPlaying, state.speed, state.isLooping]);

  // Handlers
  const handlePlayPause = () => setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  const handleSeek = (index: number) => setState(prev => ({ ...prev, currentIndex: index, isPlaying: false }));
  const handleSpeedChange = (speed: number) => setState(prev => ({ ...prev, speed }));
  const handleToggleFollow = () => setState(prev => ({ ...prev, followCamera: !prev.followCamera }));
  const handleToggleStats = () => setState(prev => ({ ...prev, showStats: !prev.showStats }));
  const handleMarkerClick = (index: number) => setState(prev => ({ ...prev, currentIndex: index, isPlaying: false }));

  const handleRestart = () => setState(prev => ({ ...prev, currentIndex: 0, isPlaying: false }));
  const handleFastForward = () => setState(prev => ({ ...prev, currentIndex: events.length - 1, isPlaying: false }));
  const handleToggleLoop = () => setState(prev => ({ ...prev, isLooping: !prev.isLooping }));

  const currentEvent = events[state.currentIndex];

  const pathCoordinates = events
    .slice(0, state.currentIndex + 1)
    .map(e => [e.lat, e.lng] as [number, number]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100 font-sans">

      <MapContainer
        center={[21.6417, 69.6293]}
        zoom={5}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution={MAP_ATTRIBUTION}
          url={MAP_TILE_LAYER}
        />

        <MapController currentEvent={currentEvent} followCamera={state.followCamera} />
        <ZoomControls />

        <Polyline
          positions={pathCoordinates}
          pathOptions={{ color: '#ea580c', weight: 3, opacity: 0.8, dashArray: '6, 8', lineCap: 'round' }}
        />

        {events.map((event, index) => {
          const isFuture = index > state.currentIndex;
          const isCurrent = index === state.currentIndex;

          if (isFuture) return null;

          return (
            <Marker
              key={event.id}
              position={[event.lat, event.lng]}
              icon={createCustomIcon(isCurrent)}
              eventHandlers={{
                click: () => handleMarkerClick(index),
              }}
              zIndexOffset={isCurrent ? 1000 : 0}
            >
              <Popup className="font-sans">
                <div className="p-3">
                  <div className="mb-2">
                    {event.images && (
                      <img src={event.images[0]} alt={event.title} className="w-full h-32 object-cover rounded-lg mb-2" />
                    )}
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider border border-orange-200 px-1.5 py-0.5 rounded bg-orange-50">{event.date}</span>
                  </div>
                  <strong className="text-base block text-gray-900 leading-tight mb-1">{event.title}</strong>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">{event.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>

      <StatsPanel
        events={events}
        currentIndex={state.currentIndex}
        isOpen={state.showStats}
        onClose={handleToggleStats}
        followCamera={state.followCamera}
        onToggleFollow={handleToggleFollow}
      />

      <Timeline
        events={events}
        currentIndex={state.currentIndex}
        isPlaying={state.isPlaying}
        isLooping={state.isLooping}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        currentSpeed={state.speed}
        onSpeedChange={handleSpeedChange}
        onToggleStats={handleToggleStats}
        onRestart={handleRestart}
        onFastForward={handleFastForward}
        onToggleLoop={handleToggleLoop}
      />

    </div>
  );
};

export default App;
