import React, {useEffect, useState} from 'react';
import './edit.css';
import {clearMemory} from "../../service";

export function Edit({eventInfo, setEventInfo, setCurrentUser}) {
    const [name, setName] = useState(eventInfo?.name || "");
    const [organizer, setOrganizer] = useState(eventInfo?.organizer || "");
    const [description, setDescription] = useState(eventInfo?.description || "");
    const [latitude, setLatitude] = useState(eventInfo?.latitude || "");
    const [longitude, setLongitude] = useState(eventInfo?.longitude || "");

    useEffect(() => {
        async function loadEventInfo() {
            try {
                const res = await fetch('/api/eventInfo', { credentials: 'include' });
                if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
                const data = await res.json();

                setName(data.name);
                setOrganizer(data.organizer);
                setDescription(data.description);
                setLatitude(data.latitude);
                setLongitude(data.longitude);

                setEventInfo(data);
            } catch (err) {
                alert(err.message);
            }
        }

        loadEventInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let missing = [name, organizer, description, latitude, longitude].filter(item => item === "");
        if (missing.length > 0) {
            alert("All fields must have values");
            return;
        }

        const response = await fetch('/api/eventInfo', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                eventInfo: {
                    name,
                    organizer,
                    description,
                    latitude,
                    longitude
                }
            })
        });

        if (response.ok) {
            const updated = await response.json();
            setEventInfo(updated);
            setName(updated.name);
            setOrganizer(updated.organizer);
            setDescription(updated.description);
            setLatitude(updated.latitude);
            setLongitude(updated.longitude);
            alert("Event saved successfully");
        } else {
            alert("Error saving event: " + response.status)
        }

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
                            <button
                                type="button"
                                id = "clearButton"
                                onClick={() => {
                                    clearMemory();
                                    localStorage.clear();
                                    setCurrentUser("");
                                    navigate("/login");
                                }}
                            >
                                Clear Data
                            </button>
                            <input type="submit" value="Save"/>
                        </div>
                    </div>
                </form>
            </div>
            <div className="padding"></div>
        </main>
    );
}