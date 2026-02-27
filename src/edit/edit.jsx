import React, {useState} from 'react';
import './edit.css';

export function Edit({eventInfo, setEventInfo}) {
    const [name, setName] = useState(eventInfo.name);
    const [organizer, setOrganizer] = useState(eventInfo.organizer);
    const [description, setDescription] = useState(eventInfo.description);
    const [latitude, setLatitude] = useState(eventInfo.latitude);
    const [longitude, setLongitude] = useState(eventInfo.longitude);

    const handleSubmit = (e) => {
        e.preventDefault();

        let missing = [name, organizer, description, latitude, longitude].filter(item => item === "");
        if (missing.length > 0) {
            alert("All fields must have values");
            return;
        }

        setEventInfo({
            name: name,
            organizer: organizer,
            description: description,
            latitude: latitude,
            longitude: longitude
        })
        alert("Event saved successfully");
    }

    return (
        <main>
            <div className="padding"></div>
            <div id="edit-box">
                <h3>Edit</h3>
                <form onSubmit={handleSubmit}>
                    <div id="form-element-container">
                        <div className="form-column">
                            <label htmlFor="name">Name</label>
                                <input
                                    id="name" type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="form-column">
                            <label htmlFor="organizerName">Organizer</label>
                                <input
                                    id="organizerName"
                                    type="text"
                                    value={organizer}
                                    onChange={(e) => setOrganizer(e.target.value)}
                                />
                            <label htmlFor="latitude">Latitude</label>
                                <input
                                    id="latitude"
                                    type="number"
                                    step="any"
                                    min="-90"
                                    max="90"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value === "" ? "" : Number(e.target.value))}
                                />
                            <label htmlFor="longitude">Longitude</label>
                                <input
                                    id="longitude"
                                    step="any"
                                    min="-180"
                                    max="180"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value === "" ? "" : Number(e.target.value))}
                                />
                            <input type="submit" value="save"/>
                        </div>
                    </div>
                </form>
            </div>
            <div className="padding"></div>
        </main>
    );
}