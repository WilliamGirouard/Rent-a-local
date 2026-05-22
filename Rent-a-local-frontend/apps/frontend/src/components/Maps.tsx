import L, { LatLngBounds } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

//Fix bug avec CRA et leaflet ou icon affiche pas
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({iconUrl: markerIcon, shadowUrl: markerShadow});

// Limite la region de montreal et les alentours
const MAP_REGION_LIMITS = new LatLngBounds(
    [45.20, -74.50],
    [46.20, -73]
)

export interface Local {
    id: number;
    name: string;
    address: string;
    description: string;
    pricePerDay: number;
    lat: number;
    lng: number;
    images: string[]
}

interface MapsProps {
    onMarkerClick?: (local: Local) => void;
    locals?: Local[];
    localDetailed?: Local;
}

export default function Maps({ onMarkerClick, locals, localDetailed }: MapsProps) {
    
    const localsOnDisplay = localDetailed ? [localDetailed] : locals 
    const mapCenter: [number, number] = localDetailed ? [localDetailed.lat, localDetailed.lng] : [45.5, -73]
    
    const toggleFullscreen = () => {
        const mapElement = document.querySelector('.leaflet-container');
        if (!document.fullscreenElement) {
            mapElement?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Bouton plein écran */}
            <button
                onClick={toggleFullscreen}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1000,
                    padding: '8px 16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                }}
            >
                ⛶ Plein écran
            </button>
            
            <MapContainer 
                center={mapCenter}
                zoom={10}
                minZoom={9}
                maxBounds={MAP_REGION_LIMITS}
                style={{width: "100%", height: "100%"}}
            >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"/>
                {localsOnDisplay?.map(local => (
                    <Marker 
                        key={local.id} 
                        position={[local.lat, local.lng]}
                        eventHandlers={{
                            click: () => onMarkerClick?.(local)
                        }}
                    >
                        <Popup>{local.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}