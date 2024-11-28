import { useEffect } from 'react';
import CharCreate from '../../components and functions/characters/CharCreate.tsx';
import { useUser } from '../../UserContext.tsx'; // Import useUser


export default function CharInfoHomebrew() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
    const { user } = useUser(); //import { useUser } from '../../UserContext.tsx'; // Import useUser
    if (!user) {
        return (
          <div className='even-section'>
            <p>Please log in to create a character.</p>
          </div>
        );
    }

    return (
        <>
            <header>
            <CharCreate/>
            </header>
        </>
    );
}

