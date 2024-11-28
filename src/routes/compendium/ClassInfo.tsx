import { useState, useEffect } from 'react';
import ClassInfoboard from '../../components and functions/compendium/classes/ClassInfoboard.tsx';

export default function ClassInfo() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    const currentPath = window.location.pathname.toLocaleLowerCase();
    const classPath = currentPath.replace("/class/", "");

    const [classData, setClassData] = useState(null);

    useEffect(() => {
        getClassInfo(classPath)
            .then(classData => {
                setClassData(classData);
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });
    }, [currentPath, classPath]); // Trigger effect when currentPath or classPath changes

    return (
        <>
            <header>
                {classData && <ClassInfoboard classData={classData} />}
            </header>
        </>
    );
}

export function getClassInfo(classIndex: string) {
    return fetch(`https://www.dnd5eapi.co/api/classes/${classIndex}`)
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
