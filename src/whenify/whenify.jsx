import React from 'react';
import './whenify.css';

export function Whenify() {
    return (
        <div id="whenify">
            <div id="left-padding"></div>
            <div id="times">
                <div id="time-boxes">
                    <div className="time-box">
                        <div className="time-info-box">
                            <p className="nameLabel">Jenny Jensen</p>
                            <p className="dateLabel">Thursday, July 23rd</p>
                            <p className="timeLabel"> 2 PM</p>
                        </div>
                        <div className="time-box-right">
                            <div className="voting-box">
                                <div className="voting-row">
                                    <button className="voting-btn voting-row-element">Yes</button>
                                    <p className="vote-total-display voting-row-element">3</p>
                                </div>
                                <div className="voting-row">
                                    <button className="voting-btn voting-row-element">No</button>
                                    <p className="vote-total-display voting-row-element">1</p>
                                </div>
                            </div>
                            <img src="/rainIcon.png" alt="rain cloud" className="weather-icon"/>
                        </div>
                    </div>
                    <div className="time-box">
                        <div className="time-info-box">
                            <p className="nameLabel">Isaac Scott</p>
                            <p className="dateLabel">Sunday, July 26th</p>
                            <p className="timeLabel"> 5 PM</p>
                        </div>
                        <div className="time-box-right">
                            <img src="/sunIcon.png" alt="sunny" className="weather-icon"/>
                            <div className="voting-box">
                                <div className="voting-row">
                                    <button className="voting-btn voting-row-element">Yes</button>
                                    <p className="vote-total-display voting-row-element">7</p>
                                </div>
                                <div className="voting-row">
                                    <button className="voting-btn voting-row-element">No</button>
                                    <p className="vote-total-display voting-row-element">4</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="new-time">
                    <label htmlFor="dateInput">Date</label> <input id="dateInput" type="date"/>
                    <label htmlFor="timeInput">Time</label> <input id="timeInput" type="time"/>
                    <input type="submit" value="Submit" style={{ marginTop: '5px' }}/>
                </div>
            </div>
            <div id="middle-padding"></div>
            <div id="event-info-container">
                <p id="eventTitle">Hike the Y</p>
                <p id="organizerName">Organized by Carol Binsen</p>
                <p id="description">Hey guys! We're going to go hike the Y but I need to know when you can go. Put a
                    time when you're available and let us know which times that have been proposed work for you!</p>
            </div>
            <div id="right-padding"></div>
        </div>
    );
}