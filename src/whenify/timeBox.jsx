import React from 'react';
import './whenify.css';

export function TimeBox({ name, date, time, yesVotes = 0, noVotes = 0 }) {

    return (
        <div className="time-box">
            <div className="time-info-box">
                <p className="nameLabel">{ name }</p>
                <p className="dateLabel">{ date }</p>
                <p className="timeLabel">{ time }</p>
            </div>
            <div className="time-box-right">
                <img src="/rainIcon.png" alt="rain cloud" className="weather-icon"/>
                <div className="voting-box">
                    <div className="voting-row">
                        <button className="voting-btn voting-row-element">Yes</button>
                        <p className="vote-total-display voting-row-element">{ yesVotes }</p>
                    </div>
                    <div className="voting-row">
                        <button className="voting-btn voting-row-element">No</button>
                        <p className="vote-total-display voting-row-element">{ noVotes }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}