import { useEffect } from 'react';
import { useUser } from '../../UserContext.tsx'; 
import BreadcrumbNav from "../../components and functions/assetsForDesign/BreabcrumbNav.tsx";
import CharListSearch from '../../components and functions/characters/CharListSearch.tsx';

// importa imagens misc
const miscImages = import.meta.glob("/src/assets/*.{png,jpg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export default function CharList() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useUser();

  if (!user) {
    return (
      <div className='even-section'>
        <p>Please log in to see your created characters.</p>
      </div>
    );
  }

  const nopUrl = miscImages["/src/assets/nop.png"];

  if (!user || user[0].isMaster) {
    return (
      <div
        className="text-center background-camp-image"
        style={{
          backgroundImage: `url(${nopUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          color: "white",
        }}
      >
        <h1
          style={{
            marginTop: "25%",
            filter:
              "drop-shadow(1px 1px 1px black) drop-shadow(-1px -1px 1px black)",
          }}
        >
          Please log in as Player to create a new character.
        </h1>
      </div>
    );
  }

  return (
    <div className='even-section'>
      <ul className="custom-list">
        <li>
          <BreadcrumbNav />
          <br />
          <div className="container">
            <h1 className="container titleText">Your Characters</h1>
          </div>
        </li>
      </ul>
      <CharListSearch />
    </div>
  );
}
