import DDoneButton from "../components and functions/assetsForDesign/DDoneButton";

// importa imagens
const miscImages = import.meta.glob("/src/assets/*.{png,jpg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export default function ErrorPage() {
  const NotfoundUrl = miscImages["/src/assets/404.png"];

  return (
    <div
      className="text-center background-camp-image-404"
      style={{
        backgroundImage: `url(${NotfoundUrl})`,
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
        404 - You got too far, adventurer... nothing to see here
      </h1>

      <DDoneButton
        width="150px"
        height={2}
        onClick={() => (window.location.href = "/")}
        text="Back to Safety"
      />
    </div>
  );
}
