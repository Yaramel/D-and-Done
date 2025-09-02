/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import BreadcrumbNav from "../assetsForDesign/BreabcrumbNav.tsx";
import ScoreDisplayerInput from "../assetsForDesign/ScoreDisplayerInput.tsx";
import DDoneLoading from "../assetsForDesign/DDoneLoading.js";

import DDoneTextInput from "../assetsForDesign/DDoneTextInput.tsx";
import { useUser } from "../../UserContext.tsx"; // Import useUser
import DDoneTextArea from "../assetsForDesign/DDoneTextArea.tsx";
import DDoneDropdown from "../assetsForDesign/DDoneDropdown.tsx";
import DDoneButton from "../assetsForDesign/DDoneButton.tsx";
import {
  EquipmentListTablePost,
  SpellListTablePost,
} from "../assetsForDesign/Tables.tsx";
import {
  getHomebrewSpellInfo,
  getSpells,
  postCharInfo,
} from "../FetchLogic.tsx";
import {
  ConfirmationPopUp,
  InformationPopUp,
} from "../assetsForDesign/DDoneConfirmation.tsx";

// importa dinamicamente imagens das classes
const classImages = import.meta.glob("/src/assets/classes/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// importa dinamicamente imagens das ilustrações
const classBGImages = import.meta.glob(
  "/src/assets/classes/illustrations/*.png",
  {
    eager: true,
    import: "default",
  }
) as Record<string, string>;

// importa a imagem de "nop"
const otherImages = import.meta.glob("/src/assets/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

type Dictionary = {
  [key: string]: number;
};

export default function CharCreate() {
  const { user } = useUser();

  // -------------------------------------------------------------
  const [name, setName] = useState("");
  const [index, setIndex] = useState("");
  const handleNameChange = (value: string) => {
    setName(value);
    setIndex(
      (value + "-by-" + user[0].username)
        .replace(/\s+/g, "-")
        .toLowerCase()
    );
  };

  // -------------------------------------------------------------
  const [level, setLevel] = useState<string | null>(null);
  const handleLevelChange = (value: string) => {
    if (value === "") {
      setLevel(null);
      return;
    }
    setLevel(Math.min(20, parseInt(value)).toString());
  };

  // -------------------------------------------------------------
  const raceOptions = [
    "Dragonborn",
    "Dwarf",
    "Elf",
    "Gnome",
    "Half-Elf",
    "Half-Orc",
    "Halfling",
    "Human",
    "Tiefling",
  ];
  const [race, setRace] = useState("Select");
  const handleRaceChange = (value: string) => {
    setRace(value);
  };

  // -------------------------------------------------------------
  const charClassOptions = [
    "Druid",
    "Barbarian",
    "Bard",
    "Cleric",
    "Ranger",
    "Fighter",
    "Rogue",
    "Wizard",
    "Sorcerer",
    "Warlock",
    "Paladin",
    "Monk",
  ];
  const caster = [
    "Druid",
    "Bard",
    "Cleric",
    "Ranger",
    "Wizard",
    "Sorcerer",
    "Warlock",
    "Paladin",
  ];
  const [charClass, setCharClass] = useState("Select");
  const [charClassPic, setCharClassPic] = useState("default");
  const handleCharClassChange = (value: string) => {
    setCharClass(value);
    setCharClassPic(value);
  };

  // resolve imagem de fundo da classe
  let classBGImageUrl =
    classBGImages[
    `/src/assets/classes/illustrations/${charClassPic.toLowerCase()}.png`
    ];
  if (charClass === "Select") {
    classBGImageUrl =
      classBGImages["/src/assets/classes/illustrations/noclass.png"];
  }

  // -------------------------------------------------------------
  const abilityScores = ["str", "dex", "con", "int", "wis", "cha"];
  const [scores, setScores] = useState<AbilityScores>({
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  });

  const handleScoreChange = (key: string, newScore: number) => {
    setScores((prevScores) => ({
      ...prevScores,
      [key]: newScore,
    }));
    getEquipedArmorClass();
  };

  const [scoresJson, setScoresJson] = useState({
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  });

  useEffect(() => {
    if (!Object.values(scores).includes(null)) {
      const jsonstring = JSON.stringify(scores);
      try {
        const parsedJson = JSON.parse(jsonstring);
        setScoresJson(parsedJson);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      setScoresJson({
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
      });
    }
  }, [scores]);

  // -------------------------------------------------------------
  const [desc, setDesc] = useState("");
  const handleDescChange = (value: string) => {
    setDesc(value);
  };

  // -------------------------------------------------------------
  const hpDice: Dictionary = {
    druid: 8,
    barbarian: 12,
    bard: 8,
    cleric: 8,
    ranger: 10,
    fighter: 10,
    rogue: 8,
    wizard: 6,
    sorcerer: 6,
    warlock: 8,
    paladin: 10,
    monk: 8,
  };

  const spellScore: Dictionary = {
    druid: Math.floor((scores.wis - 10) / 2),
    barbarian: 0,
    bard: Math.floor((scores.cha - 10) / 2),
    cleric: Math.floor((scores.wis - 10) / 2),
    ranger: Math.floor((scores.wis - 10) / 2),
    fighter: 0,
    rogue: 0,
    wizard: Math.floor((scores.int - 10) / 2),
    sorcerer: Math.floor((scores.cha - 10) / 2),
    warlock: Math.floor((scores.cha - 10) / 2),
    paladin: Math.floor((scores.cha - 10) / 2),
    monk: 0,
  };

  // -------------------------------------------------------------
  const [iventoryPost, setIventoryPost] = useState<any[]>([]);
  const handleIventoryItemsUpdate = useCallback((updatedIventory: any[]) => {
    const iventoryList = updatedIventory.map((item) =>
      item ? { index: item.index } : { index: "" }
    );
    setIventoryPost(iventoryList);
  }, []);

  const [iventoryPostJson, setIventoryPostJson] = useState<any[]>([]);
  useEffect(() => {
    try {
      setIventoryPostJson(JSON.parse(JSON.stringify(iventoryPost)));
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [iventoryPost]);

  const [spellList, setSpellList] = useState<any[]>([]);
  const [coreSpells, setCoreSpells] = useState<any[]>([]);

  const fetchSpells = async () => {
    try {
      const data = await getSpells("", "", "", charClass);
      const fetchedItems = data.results.filter(
        (el) => el.level <= Math.floor(parseInt(level as string) / 2) + 1
      );
      setCoreSpells(fetchedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const [homebrewSpells, setHomebrewSpells] = useState<any[]>([]);
  const fetchHomebrewSpells = async () => {
    try {
      const homebrewData = await getHomebrewSpellInfo();
      const fetchedItems = homebrewData.map((item: any) => ({
        ...item,
        source: "restdb",
      }));
      setHomebrewSpells(fetchedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHomebrewSpells();
  }, []);

  useEffect(() => {
    fetchSpells();
  }, [level, charClass]);

  useEffect(() => {
    setSpellList(
      [...coreSpells, ...homebrewSpells.filter((el) =>
        el.classes.includes(charClass)
      )].sort((a, b) => a.name.localeCompare(b.name))
    );
  }, [homebrewSpells, coreSpells]);

  // -------------------------------------------------------------
  const [spellsPost, setSpellsPost] = useState<any[]>([]);
  const handleSpellItemsUpdate = useCallback((updatedSpells: any[]) => {
    const spellsList = updatedSpells.map((spell) =>
      spell ? { index: spell.index } : { index: "" }
    );
    setSpellsPost(spellsList);
  }, []);

  const [spellsPostJson, setSpellsPostJson] = useState<any[]>([]);
  useEffect(() => {
    try {
      setSpellsPostJson(JSON.parse(JSON.stringify(spellsPost)));
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [spellsPost]);

  // -------------------------------------------------------------
  const [weaponsPost, setWeaponsPost] = useState<any[]>([]);
  const handleWeaponsItemsUpdate = useCallback((updatedWeapons: any[]) => {
    const weaponsPostList = updatedWeapons.map((weapon) =>
      weapon
        ? { index: weapon.index, isEquiped: weapon.isEquiped }
        : { index: "", isEquiped: false }
    );
    setWeaponsPost(weaponsPostList);
  }, []);

  const [weaponsPostJson, setWeaponsPostJson] = useState<any[]>([]);
  useEffect(() => {
    try {
      setWeaponsPostJson(JSON.parse(JSON.stringify(weaponsPost)));
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [weaponsPost]);

  // -------------------------------------------------------------
  const [equipedArmorClass, setEquipedArmorClass] = useState(0);
  const [armors, setArmors] = useState<any[]>([]);
  const [armorsPost, setArmorsPost] = useState<any[]>([]);

  const handleArmorsItemsUpdate = useCallback((updatedArmors: any[]) => {
    const armorsPostList = updatedArmors.map((armor) =>
      armor
        ? { index: armor.index, isEquiped: armor.isEquiped }
        : { index: "", isEquiped: false }
    );
    setArmorsPost(armorsPostList);
    setArmors(updatedArmors);
    getEquipedArmorClass();
  }, []);

  const getEquipedArmorClass = useCallback(() => {
    let total_bonus = 0;
    let base_armor = 10;
    let anyArmorEquiped = false;
    if (!armors.includes(null) && !armorsPost.includes(null)) {
      for (let i = 0; i < armors.length; i += 1) {
        if (armorsPost[i].isEquiped && armors[i].index !== "shield") {
          anyArmorEquiped = true;
          base_armor = armors[i].armor_class.base;
          if (armors[i].armor_class.dex_bonus) {
            total_bonus += Math.min(
              armors[i].armor_class.max_bonus || Infinity,
              Math.floor((scores.dex - 10) / 2)
            );
          }
        } else if (
          armorsPost[i].isEquiped &&
          armors[i].index === "shield"
        ) {
          total_bonus += 2;
        }
      }
    }
    if (!anyArmorEquiped) {
      total_bonus += Math.floor((scores.dex - 10) / 2);
    }
    setEquipedArmorClass(base_armor + total_bonus);
  }, [scores, armors, armorsPost]);

  useEffect(() => {
    getEquipedArmorClass();
  }, [getEquipedArmorClass]);

  const [armorsPostJson, setArmorsPostJson] = useState<any[]>([]);
  useEffect(() => {
    try {
      setArmorsPostJson(JSON.parse(JSON.stringify(armorsPost)));
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [armorsPost]);

  // -------------------------------------------------------------
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showWarn, setShowWarn] = useState(false);

  const handleConfirmSave = () => {
    setShowConfirmation(false);
    handleSave();
  };
  const handleCancelSave = () => setShowConfirmation(false);
  const handleCancelWarn = () => setShowWarn(false);

  const showSuccessMessage = (message: string, url: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  };

  const showFailMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 1000);
  };

  const handleSave = async () => {
    setLoading(true);
    const nameCheck = name !== "";
    const charClassCheck =
      !(charClass === "" || charClass === "Select");
    const raceCheck = !(race === "" || race === "Select");
    const levelCheck = !(level === "" || level === "Select");
    const scoresCheck = Object.values(scores).every(
      (score) => score !== 0 && !isNaN(score)
    );
    const descCheck = desc !== "";

    const info: any = {
      name,
      author: user[0].username,
      index,
      level,
      race,
      char_class: charClass,
      ability_scores: scoresJson,
      weapons: weaponsPostJson,
      armors: armorsPostJson,
      iventory: iventoryPostJson,
      spells: spellsPostJson,
      description: desc,
    };

    if (
      charClassCheck &&
      nameCheck &&
      levelCheck &&
      raceCheck &&
      scoresCheck &&
      descCheck
    ) {
      try {
        await postCharInfo(info);
        setLoading(false);
        setSuccess(true);
        showSuccessMessage("Character Created Successfully!", "/characters");
      } catch (error) {
        setLoading(false);
        setError(true);
        showFailMessage("Error while posting");
        setTimeout(() => {
          setError(false);
        }, 1500);
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setShowConfirmation(false);
      setShowWarn(true);
    }
  };

  const nopUrl = otherImages["/src/assets/nop.png"];
  if (!user || user[0].isMaster) {
    return (
      <div
        className="text-center background-camp-image"
        style={{
          backgroundImage: `url(${nopUrl})`,
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
    <div className="even-section">
      <ul className="custom-list">
        <li>
          <BreadcrumbNav />
          <br />
          <div className="container">
            <h1 className="container titleText">Create Your Character</h1>
          </div>
        </li>
      </ul>

      <ul className="custom-list">
        <li>
          <div className="container ">
            <div
              className="panel-body inf-content rounded p-5 spellBoard background-camp-image-with-opacity"
              style={{
                backgroundImage: `url(${classBGImageUrl})`,
                color: "white",
                // overflow: "visible",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                // objectFit: 'cover',
                position: 'relative',
                top: '-20px',
              }}
            >
              <div className="row">
                <div className="col-md-8">
                  <div className="table-responsive ">
                    <div className="container">
                      <h5>Character Name:*</h5>
                      <DDoneTextInput
                        width="100%"
                        placeholder="Enter your Character Name"
                        value={name}
                        onChange={handleNameChange}
                      />

                      <br />

                      <div className="row">
                        <div className="col-md-5">
                          <strong>Class</strong>
                          <DDoneDropdown
                            width="110px"
                            height="30px"
                            options={charClassOptions}
                            value={charClass}
                            onChange={handleCharClassChange}
                          />
                        </div>
                        <div className="col-md-4">
                          <strong>Race</strong>
                          <DDoneDropdown
                            width="130px"
                            height="30px"
                            options={raceOptions}
                            value={race}
                            onChange={handleRaceChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <strong>Level</strong>
                          <DDoneTextInput
                            width="70px"
                            placeholder="nº"
                            value={level || ""}
                            isNumber={true}
                            limit={20}
                            onChange={handleLevelChange}
                          />
                        </div>

                        <div className="col-md-5">
                          <br />
                          <strong>Hit Points</strong>{" "}
                          <span>
                            {charClass !== "Select" &&
                              parseInt(level || "0") > 0 &&
                              scores.con > 0
                              ? hpDice[charClass.toLowerCase()] +
                              Math.floor((scores.con - 10) / 2) +
                              (-1 + parseInt(level || "0")) *
                              ((1 +
                                hpDice[charClass.toLowerCase()] / 2) +
                                Math.floor((scores.con - 10) / 2))
                              : "-"}
                          </span>
                        </div>
                        <div className="col-md-3">
                          <br />
                          <strong>Armor Class</strong>{" "}
                          <span>{equipedArmorClass}</span>
                        </div>

                        <div className="col-md-12">
                          <br />
                          <strong>Ability Scores</strong>
                          <div className="row">
                            {abilityScores.map((key) => (
                              <ScoreDisplayerInput
                                key={key}
                                title={key}
                                score={scores[key as keyof AbilityScores]}
                                onScoreChange={(newScore) =>
                                  handleScoreChange(
                                    key,
                                    parseInt(newScore as string)
                                  )
                                }
                              />
                            ))}
                          </div>
                          <p className=""></p>
                          <div className="row">
                            <div className="col-md-4">
                              <strong>Initiative</strong>{" "}
                              <span>
                                {scores.dex === 0
                                  ? "-"
                                  : Math.floor((scores.dex - 10) / 2)}
                              </span>
                            </div>
                            <div className="col-md-4">
                              <strong>Perception</strong>{" "}
                              <span>
                                {scores.wis === 0
                                  ? "-"
                                  : 10 + Math.floor((scores.wis - 10) / 2)}
                              </span>
                            </div>
                            <div className="col-md-4">
                              <strong>Speed</strong>{" "}
                              <span>
                                {race === "" || race === "Select"
                                  ? "-"
                                  : race === "Dwarf"
                                    ? "25ft"
                                    : "30ft"}
                              </span>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    </div>
                    <section className="container">
                      <div></div>
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
                    {charClass === "Select" ? null : (
                      <img
                        alt="Character Class"
                        className="img-thumbnail  img-fluid border-0"
                        src={
                          classImages[
                          `/src/assets/classes/${charClass.toLowerCase()}.png`
                          ]
                        }
                      />
                    )}
                  </div>
                </div>

                <section className="container m-3">
                  <hr
                    className="my-5 separator"
                    style={{ borderWidth: "3px" }}
                  />
                  <div className="row">
                    <div className="col-md-12 my-5">
                      <strong>Weapons</strong>
                      <EquipmentListTablePost
                        key={charClass}
                        cat={"weapon"}
                        onEquipmentItemsUpdate={handleWeaponsItemsUpdate}
                      />
                    </div>

                    <div className="col-md-12 my-5">
                      <strong>Armor</strong>
                      <EquipmentListTablePost
                        key={charClass}
                        cat={"armor"}
                        onEquipmentItemsUpdate={handleArmorsItemsUpdate}
                      />
                    </div>

                    <div className="col-md-12 my-5">
                      <strong>Iventory</strong>
                      <EquipmentListTablePost
                        key={charClass}
                        cat={"adventuring-gear"}
                        onEquipmentItemsUpdate={handleIventoryItemsUpdate}
                      />
                    </div>

                    {caster.includes(charClass) &&
                      level !== null &&
                      spellScore[charClass.toLowerCase()] >= 0 && (
                        <div className="col-md-12 my-5">
                          <strong>
                            Spells{" "}
                            {level
                              ? (Math.floor(parseInt(level) / 2) +
                                spellScore[charClass.toLowerCase()]) >
                                0
                                ? `(up to ${Math.floor(parseInt(level) / 2) +
                                spellScore[charClass.toLowerCase()]
                                })`
                                : ""
                              : "-"}
                          </strong>
                          <SpellListTablePost
                            spellList={spellList}
                            key={charClass}
                            charClass={charClass.toLowerCase()}
                            charLevel={level}
                            spellAmount={
                              level
                                ? Math.floor(parseInt(level) / 2) +
                                spellScore[charClass.toLowerCase()]
                                : "-"
                            }
                            onSpellItemsUpdate={handleSpellItemsUpdate}
                          />
                        </div>
                      )}

                    <hr
                      className="my-5 separator"
                      style={{ borderWidth: "3px" }}
                    />

                    <h6 className="titleText">Description and Story: </h6>
                    <DDoneTextArea
                      width="100%"
                      height={10}
                      placeholder="Write your character's Description and background story"
                      value={desc}
                      onChange={handleDescChange}
                    />
                  </div>
                </section>
              </div>
              <br />
              <div className="row justify-content-center">
                <DDoneButton
                  width="100px"
                  height={2}
                  onClick={() => setShowConfirmation(true)}
                  text="Save"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
      {showConfirmation && (
        <ConfirmationPopUp
          message="Are you sure you want to create this character?"
          onConfirm={handleConfirmSave}
          onCancel={handleCancelSave}
        />
      )}
      {isLoading && (
        <DDoneLoading
          isLoading={isLoading}
          isOK={isSuccess}
          isFail={isError}
          message={
            isLoading ? "Saving..." : isSuccess ? successMessage : "Failed to save"
          }
        />
      )}
      {isSuccess && (
        <ConfirmationPopUp
          message=""
          successMessage={successMessage}
          isSuccess={true}
        />
      )}
      {isError && (
        <ConfirmationPopUp
          message=""
          successMessage={successMessage}
          isSuccess={true}
        />
      )}
      {showWarn && (
        <InformationPopUp
          message="Missing Required Information"
          onConfirm={handleCancelWarn}
        />
      )}
    </div>
  );
}
