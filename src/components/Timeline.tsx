import React from 'react';
import { Play, Pause, FastForward, RotateCcw, Repeat, Info, ChevronRight } from 'lucide-react';
import { LifeEvent } from '../types';
import { PLAYBACK_SPEEDS } from '../constants';

interface TimelineProps {
  events: LifeEvent[];
  currentIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  onPlayPause: () => void;
  onSeek: (index: number) => void;
  onSpeedChange: (speed: number) => void;
  currentSpeed: number;
  onToggleStats: () => void;
  onRestart: () => void;
  onFastForward: () => void;
  onToggleLoop: () => void;
}

const Timeline: React.FC<TimelineProps> = ({
  events,
  currentIndex,
  isPlaying,
  isLooping,
  onPlayPause,
  onSeek,
  onSpeedChange,
  currentSpeed,
  onToggleStats,
  onRestart,
  onFastForward,
  onToggleLoop
}) => {
  const currentEvent = events[currentIndex];
  const progress = ((currentIndex) / (events.length - 1)) * 100;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'birth': return 'bg-green-100 text-green-800 border-green-200';
      case 'death': return 'bg-gray-800 text-white border-gray-600';
      case 'arrest': return 'bg-red-100 text-red-800 border-red-200';
      case 'speech': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[2000] bg-white/90 backdrop-blur-xl border-t border-gray-200/50 pb-safe pt-4 px-4 md:px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">

      {/* Slider Container */}
      <div className="relative w-full h-8 mb-4 group cursor-pointer">
        {/* Track */}
        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Input Range */}
        <input
          type="range"
          min={0}
          max={events.length - 1}
          value={currentIndex}
          onChange={(e) => onSeek(parseInt(e.target.value))}
          className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-8 opacity-0 cursor-pointer z-20"
        />

        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-orange-600 rounded-full shadow-md z-10 pointer-events-none transition-all duration-300 group-hover:scale-125"
          style={{ left: `${progress}%`, marginLeft: '-8px' }}
        />
      </div>

      {/* Controls & Info Row */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-4">

        {/* Playback Controls */}
        <div className="flex items-center gap-3">
          <button onClick={onRestart} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors" title="Restart">
            <RotateCcw size={18} />
          </button>

          <button
            onClick={onPlayPause}
            className="w-12 h-12 flex items-center justify-center bg-gray-900 hover:bg-black text-white rounded-full transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-gray-900/20"
          >
            {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} className="ml-1" />}
          </button>

          <button onClick={onFastForward} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors" title="Jump to End">
            <FastForward size={18} />
          </button>

          <div className="h-8 w-px bg-gray-200 mx-1" />

          <button
            onClick={onToggleLoop}
            className={`p-2 rounded-full transition-colors ${isLooping ? 'text-orange-600 bg-orange-50' : 'text-gray-400 hover:text-gray-600'}`}
            title="Loop Playback"
          >
            <Repeat size={18} />
          </button>
        </div>

        {/* Event Information */}
        <div className="flex-1 text-center lg:text-left min-w-0 w-full">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-1.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getTypeColor(currentEvent.type)}`}>
              {currentEvent.type}
            </span>
            <span className="text-gray-400 text-xs font-medium flex items-center gap-1">
              {currentEvent.date}
              <ChevronRight size={12} />
              {currentEvent.location}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-gray-900 leading-tight truncate">
            {currentEvent.title}
          </h1>
          <p className="hidden md:block text-sm text-gray-500 truncate mt-1 max-w-3xl">
            {currentEvent.description}
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
            {PLAYBACK_SPEEDS.map((s) => (
              <button
                key={s.label}
                onClick={() => onSpeedChange(s.value)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${currentSpeed === s.value
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-400 hover:text-gray-700'
                  }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            onClick={onToggleStats}
            className="p-2.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors border border-transparent hover:border-orange-200"
            title="Toggle Statistics"
          >
            <Info size={22} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Timeline;
