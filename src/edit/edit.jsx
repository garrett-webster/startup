import React from 'react';
import './edit.css';

export function Edit() {
    return (
        <main>
            <div className="padding"></div>
            <div id="edit-box">
                <h3>Edit</h3>
                <form>
                    <div id="form-element-container">
                        <div className="form-column">
                            <label htmlFor="name">Name</label><input id="name" type="text" value="Hike the Y"/>
                            <label htmlFor="description">Description</label><textarea id="description">Hey guys! We're going to go hike the Y but I need to know when you can go. Put a time when you're available and let us know which times that have been proposed work for you!</textarea>
                        </div>
                        <div className="form-column">
                            <label htmlFor="locationName">Location</label><input id="locationName" type="text"
                                                                                 value="Y trail"/>
                            <label htmlFor="latitude">Latitude</label><input id="latitude" type="number" step="any"
                                                                             min="-90" max="90" value="40.2448"/>
                            <label htmlFor="longitude">Longitude</label><input id="longitude" step="any" min="-180"
                                                                               max="180" value="-111.6272"/>
                            <input type="submit" value="save"/>
                        </div>
                    </div>
                </form>
            </div>
            <div className="padding"></div>
        </main>
    );
}