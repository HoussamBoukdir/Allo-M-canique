import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../../services/api';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MechanicMap = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    try {
      const response = await api.get('/mechanics');
      // Filter mechanics with valid coordinates
      const validMechanics = response.data.filter(m => m.latitude && m.longitude);
      setMechanics(validMechanics);
    } catch (error) {
      console.error('Error fetching mechanics for map:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center bg-gray-50 rounded-[3rem]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const center = [33.5731, -7.5898]; // Casablanca default

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Mécaniciens à proximité</h2>
          <p className="text-gray-500 font-medium">Visualisez tous nos experts certifiés sur la carte</p>
        </div>

        <div className="h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
          <MapContainer 
            center={center} 
            zoom={12} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mechanics && mechanics.length > 0 && mechanics.map((mechanic) => (
              <Marker 
                key={mechanic.id} 
                position={[Number(mechanic.latitude), Number(mechanic.longitude)]}
              >
                <Popup>
                  <div className="p-2 min-w-[150px]">
                    <h3 className="font-bold text-gray-900 mb-1">{mechanic.name}</h3>
                    <p className="text-blue-600 text-xs font-black uppercase mb-2">{mechanic.specialty}</p>
                    <p className="text-[10px] text-gray-400 font-bold mb-3">{mechanic.city}</p>
                    <a 
                      href={`/mechanic/${mechanic.id}`}
                      className="block text-center bg-blue-600 text-white py-2 px-4 rounded-xl text-xs font-black hover:bg-black transition-all"
                      style={{ textDecoration: 'none' }}
                    >
                      Voir le profil
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default MechanicMap;
