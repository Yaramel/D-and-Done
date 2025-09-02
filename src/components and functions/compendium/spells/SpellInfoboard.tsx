/* eslint-disable @typescript-eslint/no-explicit-any */
import BreadcrumbNav from "../../assetsForDesign/BreabcrumbNav";

// importa dinamicamente imagens fixas
const miscImages = import.meta.glob("/src/assets/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// importa dinamicamente imagens das escolas de magia
const schoolImages = import.meta.glob("/src/assets/spell-schools/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

interface Inputs {
  spellData: any;
}

export default function SpellInfoBoard({ spellData }: Inputs) {
  // resolve fundo
  const spellUrl = miscImages["/src/assets/magic.jpg"];

  // resolve ícone da escola
  const schoolKey = `/src/assets/spell-schools/${spellData.school.index}.png`;
  const schoolImageUrl =
    schoolImages[schoolKey] ||
    schoolImages["/src/assets/spell-schools/default.png"];

  return (
    <div className="even-section">
      <BreadcrumbNav />
      <br />
      <div className="container">
        <h1 className="container titleText">{spellData.name}</h1>
        <div className="container">
          <strong>
            {spellData.author ? `homebrew by ${spellData.author}` : ""}
          </strong>
        </div>
        <br />
        <div
          className="panel-body inf-content rounded p-5 spellBoard background-camp-image-with-opacity"
          style={{
            backgroundImage: `url(${spellUrl})`,
            color: "white",
          }}
        >
          <div className="row">
            <div className="col-md-8">
              <div className="table-responsive">
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <strong>Level</strong>
                      <p>{spellData.level == 0 ? "Cantrip" : spellData.level}</p>
                    </div>
                    <div className="col-md-3">
                      <strong>Casting Time</strong>
                      <p>{spellData.casting_time}</p>
                    </div>
                    <div className="col-md-3">
                      <strong>Range/Area</strong>
                      <p>
                        {spellData.range && spellData.area_of_effect
                          ? `${spellData.range} / ${spellData.area_of_effect?.type} ${spellData.area_of_effect.size}ft`
                          : spellData.range
                          ? spellData.range
                          : `${spellData.area_of_effect.type} ${spellData.area_of_effect.size}ft radius`}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <strong>Components</strong>
                      <p>{spellData.components}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <strong>Duration</strong>
                      <p>{spellData.duration}</p>
                    </div>
                    <div className="col-md-3">
                      <strong>School</strong>
                      <p>{spellData.school.name}</p>
                    </div>
                    <div className="col-md-3">
                      <strong>Attack/Save</strong>
                      <p>
                        {spellData.dc
                          ? `${spellData.dc.dc_type.name} for ${
                              spellData.dc.dc_success
                                ? spellData.dc.dc_success
                                : spellData.level == 0
                                ? "None"
                                : "Half"
                            }`
                          : spellData.attack_type
                          ? spellData.attack_type
                          : "-"}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <strong>Damage/Effect</strong>
                      <p>
                        {spellData.name === "Prismatic Spray"
                          ? "Varies / ALL"
                          : spellData.damage
                          ? spellData.damage.damage_at_slot_level
                            ? `${spellData.damage.damage_at_slot_level[spellData.level]} / ${spellData.damage.damage_type.name}`
                            : spellData.damage_at_slot_level
                            ? `${spellData.damage_at_slot_level[0].replace(
                                " ",
                                ""
                              )}/${
                                spellData.damage.damage_type.name == "Select"
                                  ? "Fire"
                                  : spellData.damage.damage_type.name
                              }`
                            : "-"
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="my-5 separator" style={{ borderWidth: "3px" }} />
                <section className="container">
                  <div>{spellData.desc}</div>
                </section>
              </div>
            </div>
            <div className="col-md-4 noBackground d-flex justify-content-center align-items-center">
              <div
                className="rounded-circle img-container d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#0f0f0f",
                  maxWidth: "300px",
                  maxHeight: "300px",
                }}
              >
                <img
                  alt="Spell's School"
                  className="img-thumbnail img-fluid border-0"
                  src={schoolImageUrl}
                />
              </div>
            </div>
            <section className="container m-3">
              <br />
              <h6 className="titleText">Available for: </h6>
              {spellData.classes.map((item: any, index: number) => (
                <span key={index}>
                  {item.name ? item.name : item}
                  {index < spellData.classes.length - 1 && ", "}
                </span>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
