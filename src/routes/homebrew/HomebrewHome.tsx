import IconGridHomebrew from '../../components and functions/assetsForDesign/IconGridHomebrew'


function Header() {
    return (
        <>
            <header className='title '>
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <div className="container">
                                <h1 >Create your own Homebrew!</h1>
                                <br />
                                <h6 className="container text-center" style={{width:"50%"}}>
                                    Create your own itens and spell and take charge of your own adventure making it a unic experience for all your payers!
                                </h6>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}



export default function HomebrewCreation() {

    return (
        <>
            <Header />
            <IconGridHomebrew />
        </>
    );

}