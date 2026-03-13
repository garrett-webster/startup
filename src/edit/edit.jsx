import React, {useEffect, useState} from 'react';
import './edit.css';
import { useApp } from "../context/AppContext";

export function Edit() {
    const { eventInfo, setEventInfo } = useApp();

    const [form, setForm] = useState({
        name: "",
        organizer: "",
        description: "",
        latitude: "",
        longitude: ""
    });

    useEffect(() => {
        if (eventInfo) {
            setForm({
                name: eventInfo.name ?? "",
                organizer: eventInfo.organizer ?? "",
                description: eventInfo.description ?? "",
                latitude: eventInfo.latitude ?? "",
                longitude: eventInfo.longitude ?? ""
            });
        }
    }, [eventInfo]);

    function updateField(field, value) {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const missing = Object.values(form).filter(v => v === "");
        if (missing.length > 0) {
            alert("All fields must have values");
            return;
        }

        const response = await fetch('/api/eventInfo', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ eventInfo: form })
        });

        if (response.ok) {
            const updated = await response.json();
            setEventInfo(updated);
            setForm({
                name: updated.name ?? "",
                organizer: updated.organizer ?? "",
                description: updated.description ?? "",
                latitude: updated.latitude ?? "",
                longitude: updated.longitude ?? ""
            });
            alert("Event saved successfully");
        } else {
            alert("Error saving event: " + response.status);
        }
    };

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
                                id="name"
                                type="text"
                                value={form.name}
                                onChange={(e) => updateField("name", e.target.value)}
                            />

                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                value={form.description}
                                onChange={(e) => updateField("description", e.target.value)}
                            />
                        </div>

                        <div className="form-column">
                            <label htmlFor="organizerName">Organizer</label>
                            <input
                                id="organizerName"
                                type="text"
                                value={form.organizer}
                                onChange={(e) => updateField("organizer", e.target.value)}
                            />

                            <label htmlFor="latitude">Latitude</label>
                            <input
                                id="latitude"
                                type="number"
                                step="any"
                                min="-90"
                                max="90"
                                value={form.latitude}
                                onChange={(e) =>
                                    updateField(
                                        "latitude",
                                        e.target.value === "" ? "" : Number(e.target.value)
                                    )
                                }
                            />

                            <label htmlFor="longitude">Longitude</label>
                            <input
                                id="longitude"
                                type="number"
                                step="any"
                                min="-180"
                                max="180"
                                value={form.longitude}
                                onChange={(e) =>
                                    updateField(
                                        "longitude",
                                        e.target.value === "" ? "" : Number(e.target.value)
                                    )
                                }
                            />
                            <input type="submit" value="Save"/>
                        </div>

                    </div>
                </form>
            </div>

            <div className="padding"></div>
        </main>
    );
}