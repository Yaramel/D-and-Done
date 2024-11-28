import { useState, useEffect } from 'react';
import CharInfoboard from '../../components and functions/characters/CharInfoboard.tsx';
import { getCharInfo } from '../../components and functions/FetchLogic.tsx';
import DDoneLoading from '../../components and functions/assetsForDesign/DDoneLoading.js';


export default function CharInfoHomebrew() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    const [isLoading, setIsLoading] = useState(false);
    const currentPath = window.location.pathname.toLocaleLowerCase();
    const charPath = currentPath.replace("/characters/", "");

    const loadingMessage = "Loading Char info"

    console.log(charPath);

    const [charData, setCharData] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getCharInfo(charPath)
            .then(charData => {
                console.log(charData);
                setCharData(charData);
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            })
            .finally(
                () => setIsLoading(false)
            );
    }, [currentPath, charPath]); 

    ////Artificial char to not use the whole api fetchs:
//     const myJSON: CharData = {
//     "_id": "6675c109d7ae8e2300001aec",
//     "name": "Aaron",
//     "author": "yara",
//     "index": "aaron-by-yara",
//     "level": 1,
//     "char_class": "Bard",
//     "ability_scores": {
//         "str": 12,
//         "dex": 12,
//         "con": 12,
//         "int": 12,
//         "wis": 12,
//         "cha": 12
//     },
//     "weapons": [
//         {
//             "index": "dagger",
//             "isEquiped": false
//         }
//     ],
//     "armors": [
//         {
//             "index": "leather-armor",
//             "isEquiped": true
//         }
//     ],
//     "iventory": [
//         {
//             "index": "acid-vial"
//         }
//     ],
//     "spells": [],
//     "description": "aa",
//     "race": "Elf"
// }


    
    return (
        <>
            <header>
            {/* <CharInfoboard charData={myJSON} /> */}
            {charData && <CharInfoboard charData={charData} />}
            </header>
            <DDoneLoading isLoading={isLoading} message={loadingMessage} />
        </>
    );
}

