import { useUser } from '../UserContext.tsx'; // Import useUser
import IconGridProfile from '../components and functions/assetsForDesign/IconGrid Profile.tsx';

function Header() {
    const { user } = useUser(); 
    return(
        <header className='title'>
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <div className="container">
                                <h1>Welcome, {user[0].username}</h1>
                                {user[0].isMaster }
                            </div>
                        </div>
                    </div>
                </div>
            </header>

    );
}


export default function Profile() {
    const { user } = useUser(); 
    if (!user ) {
        return (
          <div className='even-section'>
            <p>Please log in to see your profile.</p>
          </div>
        );
    }
    return (
        <>
            <Header />
            <IconGridProfile />
        </>
    );

}