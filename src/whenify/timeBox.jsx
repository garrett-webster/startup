import React, { useEffect, useState } from 'react';
import './whenify.css';
import { useApp } from "../context/AppContext";

// Helper outside component to prevent re-creation on every render
function determineWeather(code) {
    console.log(code)
    if ([0, 1, 2].includes(code)) return 'sunny';
    if ([3, 45, 48].includes(code)) return 'cloudy';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snowing';
    // Defaults to raining for all other drizzle/rain/storm codes
    console.log("Error")
    return 'raining';
}

export function TimeBox({ id, handleVote, name, dateTime, currentUser, yesVotes = [], noVotes = [] }) {
    const { eventInfo } = useApp();
    const [weatherCondition, setWeatherCondition] = useState(null);

    const date = dateTime.toLocaleDateString(undefined, {
        weekday: "long", month: "long", day: "numeric"
    });

    const time = dateTime.toLocaleTimeString(undefined, {
        hour: "numeric", minute: "2-digit"
    });

    function getForecastTimes(date) {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hour = String(date.getUTCHours()).padStart(2, '0');

        const targetHour = `${year}-${month}-${day}T${hour}:00`;
        return { targetHour };
    }

    useEffect(() => {
        async function fetchForecast() {
            const { targetHour } = getForecastTimes(dateTime);
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${eventInfo.latitude}&longitude=${eventInfo.longitude}&hourly=weathercode&start_hour=${targetHour}&end_hour=${targetHour}&timezone=America/Denver`;

            try {
                const res = await fetch(url);
                const data = await res.json();

                if (data.hourly && data.hourly.weathercode) {
                    const code = data.hourly.weathercode[0];
                    setWeatherCondition(determineWeather(code));
                }
            } catch (error) {
                console.error("Failed to fetch weather forecast:", error);
            }
        }
        fetchForecast();
    }, [dateTime, eventInfo.latitude, eventInfo.longitude]);

    return (
        <div className="time-box">
            <div className="time-info-box">
                <p className="nameLabel">{ name }</p>
                <p className="dateLabel">{ date }</p>
                <p className="timeLabel">{ time }</p>
            </div>
            <div className="time-box-right">
                {/* Dynamically render icon based on condition string */}
                {weatherCondition && (
                    <img
                        src={`/${weatherCondition}.svg`}
                        alt={weatherCondition}
                        className="weather-icon"
                    />
                )}
                <div className="voting-box">
                    <div className="voting-row">
                        <button
                            className={`voting-btn voting-row-element ${yesVotes.includes(currentUser) ? 'selected-button' : ''}`}
                            onClick={() => handleVote(id, "yes", currentUser)}
                        >Yes</button>
                        <p className="vote-total-display voting-row-element">{ yesVotes.length }</p>
                    </div>
                    <div className="voting-row">
                        <button
                            className={`voting-btn voting-row-element ${noVotes.includes(currentUser) ? 'selected-button' : ''}`}
                            onClick={() => handleVote(id, "no", currentUser)}
                        >No</button>
                        <p className="vote-total-display voting-row-element">{ noVotes.length }</p>
                    </div>
                </div>
            </div>
        </div>
    );
}