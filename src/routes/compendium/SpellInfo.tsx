import { useState, useEffect } from 'react';
import SpellInfoboard from '../../components and functions/compendium/spells/SpellInfoboard.tsx';
import { getSpellInfo } from '../../components and functions/FetchLogic.tsx'; // Assuming you have this function already defined
import DDoneLoading from '../../components and functions/assetsForDesign/DDoneLoading.js';



export default function SpellInfo() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    const [isLoading, setIsLoading] = useState(false);
    const loadingMessage = 'Loading spell information';

    const currentPath = window.location.pathname.toLocaleLowerCase();
    const spellPath = currentPath.replace("/spells/", "");

    const [spellData, setSpellData] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        getSpellInfo(spellPath)
            .then(spellData => {
                setSpellData(spellData);
                setTimeout(() => { setIsLoading(false) }, 500);
            })
            .catch(error => {
                // Handle errors
                console.error(error);

            });
    }, [currentPath, spellPath]); // Trigger effect when currentPath or spellPath changes

    return (
        <>
            <header>
                {spellData && <SpellInfoboard spellData={spellData} />}
                <DDoneLoading isLoading={isLoading} message={loadingMessage} />
            </header>
        </>
    );
}
