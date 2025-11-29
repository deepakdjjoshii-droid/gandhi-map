import React from 'react';
import { useMap } from 'react-leaflet';
import { Plus, Minus } from 'lucide-react';

const ZoomControls: React.FC = () => {
    const map = useMap();

    const handleZoomIn = () => {
        map.zoomIn();
    };

    const handleZoomOut = () => {
        map.zoomOut();
    };

    return (
        <div className="absolute bottom-24 left-4 z-[1000] flex flex-col gap-2">
            <button
                onClick={handleZoomIn}
                className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 text-gray-700 transition-colors border border-gray-200"
                title="Zoom In"
            >
                <Plus size={20} />
            </button>
            <button
                onClick={handleZoomOut}
                className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 text-gray-700 transition-colors border border-gray-200"
                title="Zoom Out"
            >
                <Minus size={20} />
            </button>
        </div>
    );
};

export default ZoomControls;
