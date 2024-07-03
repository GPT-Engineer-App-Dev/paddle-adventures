import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MapPage = () => {
  const [markers, setMarkers] = useState([]);
  const [newMarker, setNewMarker] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", photo: null });

  const addMarker = (e) => {
    setNewMarker(e.latlng);
  };

  const saveMarker = () => {
    setMarkers([...markers, { ...newMarker, ...form }]);
    setNewMarker(null);
    setForm({ name: "", description: "", photo: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, photo: URL.createObjectURL(e.target.files[0]) });
  };

  return (
    <div className="relative h-full">
      <MapContainer
        center={[59.372972225392466, 18.69869029448855]}
        zoom={13}
        className="h-full"
        whenCreated={(map) => {
          useMapEvents({
            click: addMarker,
          });
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker}>
            <Popup>
              <div>
                <h3>{marker.name}</h3>
                <p>{marker.description}</p>
                {marker.photo && <img src={marker.photo} alt={marker.name} className="w-full h-auto" />}
              </div>
            </Popup>
          </Marker>
        ))}
        {newMarker && (
          <Marker position={newMarker}>
            <Popup>
              <div>
                <Input
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                <Textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                <Input type="file" onChange={handleFileChange} className="mb-2" />
                <Button onClick={saveMarker}>Save</Button>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;