import { useEffect } from 'react';
import HomebrewSpellCreate from '../../components and functions/homebrew/HomebrewSpellCreate';



export default function HomebrewSpellCreation() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
  return (
      <>
          <header>
              <HomebrewSpellCreate />
          </header>
      </>
  );
}