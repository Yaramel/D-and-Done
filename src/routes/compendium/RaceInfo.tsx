import { useState, useEffect } from 'react';
import RaceInfoboard from '../../components and functions/compendium/races/RaceInfoboard.tsx';

export default function RaceInfo() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    const currentPath = window.location.pathname.toLocaleLowerCase();
    const racePath = currentPath.replace("/race/", "");

    const [raceData, setRaceData] = useState(null);

    useEffect(() => {
        getRaceInfo(racePath)
            .then(raceData => {
                setRaceData(raceData);
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });
    }, [currentPath, racePath]); // Trigger effect when currentPath or racePath changes

    return (
        <>
            <header>
                {raceData && <RaceInfoboard raceData={raceData} />}
            </header>
        </>
    );
}

export function getRaceInfo(raceIndex: string) {
    return fetch(`https://www.dnd5eapi.co/api/races/${raceIndex}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
            // Re-throw the error to propagate it to the caller
            throw error;
        });
}
