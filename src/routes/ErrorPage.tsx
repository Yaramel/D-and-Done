import DDoneButton from "../components and functions/assetsForDesign/DDoneButton";

export default function ErrorPage() {
    const NotfoundUrl = `/src/assets/404.png`;
    return (

        <div className="  text-center background-camp-image-404"
            style={{
                '--background-image-url': `url(${NotfoundUrl})`,
                color: 'white',
            }}
        >
            <h1 style={{ marginTop: "25%", filter: "drop-shadow(1px 1px 1px black) drop-shadow(-1px -1px 1px black)" }}>404 - You got to far, adventurer... nothing to see here</h1>
           
                <DDoneButton
                    width="150px"
                    height={2}
                    onClick={() => window.location.href = "/"}
                    text="Back to Safety"
                />
          

        </div>

    )

}