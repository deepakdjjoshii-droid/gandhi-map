import React from 'react';
import { LifeEvent } from '../types';
import { X, Globe, MapPin, Footprints, Clock, Video, Gavel, Mic, Users } from 'lucide-react';
import { calculateTotalDistance, getEventStats, getYearlyIntensity } from '../utils';

interface StatsPanelProps {
  events: LifeEvent[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  followCamera: boolean;
  onToggleFollow: () => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  events,
  currentIndex,
  isOpen,
  onClose,
  followCamera,
  onToggleFollow
}) => {
  const currentEvent = events[currentIndex];
  const stats = getEventStats(events, currentIndex);
  const totalDistance = calculateTotalDistance(events, currentIndex);
  const yearlyIntensity = getYearlyIntensity(events);

  return (
    <div
      className={`fixed top-4 right-4 z-[2000] w-80 md:w-96 bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl transition-all duration-500 transform border border-white/50 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
        }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100/50 flex justify-between items-center bg-orange-50/50 rounded-t-2xl">
        <h2 className="font-serif text-lg font-bold text-gray-800 flex items-center gap-2">
          <Footprints className="text-orange-600" size={20} />
          Journey Stats
        </h2>
        <button onClick={onClose} className="p-1.5 hover:bg-black/5 rounded-full transition-colors text-gray-500">
          <X size={18} />
        </button>
      </div>

      <div className="p-5 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">

        {/* Camera Toggle */}
        <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            <Video size={16} className="text-blue-500" />
            <span>Auto-Follow Camera</span>
          </div>
          <button
            onClick={onToggleFollow}
            className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${followCamera ? 'bg-orange-500' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${followCamera ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<MapPin size={16} />}
            label="Distance"
            value={`${totalDistance} km`}
            color="text-orange-600"
            bg="bg-orange-50"
          />
          <StatCard
            icon={<Globe size={16} />}
            label="Countries"
            value={stats.countries}
            color="text-blue-600"
            bg="bg-blue-50"
          />
          <StatCard
            icon={<Gavel size={16} />}
            label="Arrests"
            value={stats.arrests}
            color="text-red-600"
            bg="bg-red-50"
          />
          <StatCard
            icon={<Mic size={16} />}
            label="Speeches"
            value={stats.speeches}
            color="text-purple-600"
            bg="bg-purple-50"
          />
        </div>

        {/* Timeline Progress */}
        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100/50">
          <div className="flex items-center gap-2 text-emerald-700 mb-2">
            <Clock size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Active Years</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.yearsActive}</p>
              <p className="text-xs text-gray-500">Years of service</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-emerald-800">{events[0].year} — {currentEvent.year}</p>
            </div>
          </div>
        </div>

        {/* Sparkline Graph */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Event Intensity</h3>
          <div className="flex items-end h-16 gap-1">
            {yearlyIntensity.map((d) => (
              <div
                key={d.year}
                className={`flex-1 rounded-t-sm transition-all duration-300 ${d.year === currentEvent.year ? 'bg-orange-500' : 'bg-gray-200'}`}
                style={{ height: `${Math.min(d.count * 20, 100)}%` }}
                title={`${d.year}: ${d.count} events`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color, bg }: any) => (
  <div className={`${bg} p-3 rounded-xl border border-white/50 shadow-sm`}>
    <div className={`flex items-center gap-2 ${color} mb-1`}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</span>
    </div>
    <p className="text-lg font-bold text-gray-800">{value}</p>
  </div>
);

export default StatsPanel;
