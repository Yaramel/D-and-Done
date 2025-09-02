/* eslint-disable @typescript-eslint/no-explicit-any */
import BreadcrumbNav from "../assetsForDesign/BreabcrumbNav";
import { 
  CharListItem, 
  ClassListItem, 
  RaceListItem, 
  RuleListItem, 
  SpellListItem 
} from "../assetsForDesign/ListItems";

// importa dinamicamente todas as imagens de temas
const themeImages = import.meta.glob("/src/assets/themes/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

interface CampaignData {
  _id: string;
  name: string;
  master: string;
  index: string;
  characters: { index: string }[];
  isPrivate: boolean;
  playersNum: number;
  homebrews: { rules: { index: string }[]; spells: { index: string }[] };
  ban: { classes: { index: string }[]; spells: { index: string }[]; races: { index: string }[] };
  desc: string;
  theme: string;
}

interface CampaignInfoboardProps {
  campaignData: CampaignData;
}

export default function CampaignInfoboard({ campaignData }: CampaignInfoboardProps) {
  // usa glob para resolver imagem do tema
  const themeKey = `/src/assets/themes/${campaignData.theme.toLowerCase()}.png`;
  const themeImageUrl = themeImages[themeKey] || themeImages["/src/assets/themes/nocampaign.png"];

  return (
    <div className="even-section">
      <ul className="custom-list">
        <li>
          <BreadcrumbNav />
        </li>
      </ul>

      <ul className="custom-list">
        <li>
          <div className="container">
            <h1 className="container titleText">{campaignData.name}</h1>
            <div className="col-md-5">
              <strong>by GameMaster {campaignData.master}</strong>
            </div>
            <br />
            <div
              className="panel-body inf-content rounded p-5 spellBoard background-camp-image-with-opacity"
              style={{
                backgroundImage: `url(${themeImageUrl})`,
                color: "white",
              }}
            >
              <div className="row">
                <div className="container">
                  <div className="table-responsive ">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <strong>Player Characters: </strong>
                          <span>{campaignData.playersNum}</span>
                        </div>
                        <div className="col-md-12">
                          <strong>Theme: </strong>
                          <span>{campaignData.theme}</span>
                        </div>
                        <div className="col-md-12">
                          <strong>Description</strong>
                          <p>{campaignData.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <section className="container m-3 campaignDetails">
                  <hr className="my-5 separator" style={{ borderWidth: "3px" }} />
                  <div className="row">
                    {campaignData.homebrews.rules.length > 0 && (
                      <div className="col-md-12">
                        <strong>Homebrew Rules</strong>
                        {campaignData.homebrews.rules.map((rule, index) => (
                          <RuleListItem key={index} itemInfo={rule} />
                        ))}
                      </div>
                    )}

                    {campaignData.homebrews.spells.length > 0 && (
                      <div className="col-md-12">
                        <strong>Homebrew Spells</strong>
                        {campaignData.homebrews.spells.map((spell, index) => (
                          <SpellListItem key={index} itemInfo={spell} />
                        ))}
                        <hr className="my-5 separator" style={{ borderWidth: "3px" }} />
                      </div>
                    )}

                    {campaignData.ban.classes.length > 0 && (
                      <div className="col-md-12">
                        <strong>Banned Classes</strong>
                        {campaignData.ban.classes.map((cls, index) => (
                          <ClassListItem key={index} itemInfo={cls} toFetch={true} />
                        ))}
                      </div>
                    )}

                    {campaignData.ban.races.length > 0 && (
                      <div className="col-md-12">
                        <strong>Banned Races</strong>
                        {campaignData.ban.races.map((race, index) => (
                          <RaceListItem key={index} itemInfo={race} toFetch={true} />
                        ))}
                      </div>
                    )}

                    {campaignData.ban.spells.length > 0 && (
                      <div className="col-md-12">
                        <strong>Banned Spells</strong>
                        {campaignData.ban.spells.map((spell, index) => (
                          <SpellListItem key={index} itemInfo={spell} toFetch={true} />
                        ))}
                      </div>
                    )}

                    <div className="col-md-12">
                      <hr className="my-5 separator" style={{ borderWidth: "3px" }} />
                      <strong>
                        Characters <span>({campaignData.characters.length} / {campaignData.playersNum})</span>
                      </strong>
                      <div className="row">
                        {campaignData.characters.map((char, index) => (
                          <div className="col-md-4 my-5" key={index}>
                            <CharListItem key={index} itemInfo={char} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
