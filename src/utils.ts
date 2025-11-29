import { LifeEvent } from './types';

// Haversine formula to calculate distance between two points
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
};

export const calculateTotalDistance = (events: LifeEvent[], currentIndex: number): number => {
    let total = 0;
    for (let i = 1; i <= currentIndex; i++) {
        total += calculateDistance(
            events[i - 1].lat,
            events[i - 1].lng,
            events[i].lat,
            events[i].lng
        );
    }
    return Math.round(total);
};

export const getEventStats = (events: LifeEvent[], currentIndex: number) => {
    const sliced = events.slice(0, currentIndex + 1);
    return {
        arrests: sliced.filter(e => e.type === 'arrest').length,
        speeches: sliced.filter(e => e.type === 'speech').length,
        movements: sliced.filter(e => e.type === 'movement').length,
        countries: new Set(sliced.map(e => e.location.split(',').pop()?.trim())).size,
        yearsActive: events[currentIndex].year - events[0].year,
    };
};

export const getYearlyIntensity = (events: LifeEvent[]) => {
    const intensity: Record<number, number> = {};
    events.forEach(e => {
        intensity[e.year] = (intensity[e.year] || 0) + 1;
    });
    return Object.entries(intensity).map(([year, count]) => ({ year: parseInt(year), count }));
};
