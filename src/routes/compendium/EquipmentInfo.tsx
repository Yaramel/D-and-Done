import { useState, useEffect } from 'react';
import EquipmentInfoboard from '../../components and functions/compendium/equipments/EquipmentInfoboard.tsx';

export default function EquipmentInfo() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    const currentPath = window.location.pathname.toLocaleLowerCase();
    const equipmentPath = currentPath.replace("/equipment/", "");

    const [equipmentData, setEquipmentData] = useState(null);

    useEffect(() => {
        getEquipmentInfo(equipmentPath)
            .then(equipmentData => {
                setEquipmentData(equipmentData);
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });
    }, [currentPath, equipmentPath]); // Trigger effect when currentPath or equipmentPath changes

    return (
        <>
            <header>
                {equipmentData && <EquipmentInfoboard equipmentData={equipmentData} />}
            </header>
        </>
    );
}

export function getEquipmentInfo(equipmentIndex) {
    return fetch(`https://www.dnd5eapi.co/api/equipment/${equipmentIndex}`)
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
