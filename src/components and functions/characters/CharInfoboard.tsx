/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import BreadcrumbNav from "../assetsForDesign/BreabcrumbNav.tsx";
import ScoreDisplayer from '../assetsForDesign/ScoreDisplayer.tsx';
import { getEquipmentInfo, getSpellInfo } from "../FetchLogic.tsx";
import { CharEquipmentListItem, CharSpellListItem } from './CharOtherItemsListItem.tsx';

interface AbilityScores {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}

interface CharData {
    _id: string;
    name: string;
    author: string;
    index: string;
    level: number;
    race: string;
    char_class: string;
    ability_scores: AbilityScores;
    weapons: { index: string; isEquiped: boolean }[];
    armors: { index: string; isEquiped: boolean }[];
    iventory: { index: string }[];
    spells: { index: string }[];
    campaigns: any[];
    picture: string[];
    description: string;
}

interface CharInfoboardProps {
    charData: CharData;
}

type Dictionary = {
    [key: string]: number;
};




export default function CharInfoboard({ charData }: CharInfoboardProps) {

    // const [isLoading, setIsLoading] = useState(false);
    // const [loadingMessage, setLoadingMessage] = useState('');
    const hpDice: Dictionary = {
        Druid: 8,
        Barbarian: 12,
        Bard: 8,
        Cleric: 8,
        Ranger: 10,
        Fighter: 10,
        Rogue: 8,
        Wizard: 6,
        Sorcerer: 6,
        Warlock: 8,
        Paladin: 10,
        Monk: 8
    };

    console.log(charData);

    const [equipedArmorClass, setEquipedArmorClass] = useState(0);

    // useEffect(() => {
    //     fetchEquipmentFromApi();
    // }, []);

    // const fetchEquipmentFromApi = async () => {
    //     setIsLoading(true);
    //     setLoadingMessage("Building Character Sheet");
    //     try {
    //         const data = await getEquipment(filter.name, '');
    //         setItems(data.results);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    //     finally {
    //         setTimeout(() => { setIsLoading(false) }, 500);
    //     }
    // };

    

    useEffect(() => {
        getEquipedArmorClass();
    }, []);

    const getEquipedArmorClass = async () => {
        let total_bonus = 0;
        let base_armor = 10;
        for (let i = 0; i < charData.armors.length; i += 1) {
            if (charData.armors[i].isEquiped && charData.armors[i].index != "shield") {
                const response = await getEquipmentInfo(charData.armors[i].index);

                base_armor = response.armor_class.base;
                if (response.armor_class.dex_bonus) {
                    total_bonus += Math.min(response.armor_class.max_bonus || -Math.log(0), (Math.floor((charData.ability_scores.dex - 10) / 2)));
                }
            }
            else if (charData.armors[i].isEquiped && charData.armors[i].index == "shield") {
                total_bonus += 2;
            }

        }
        setEquipedArmorClass(base_armor + total_bonus);
    }

    console.log("chardata",charData);

    const classBGImageUrl = `/src/assets/classes/illustrations/${charData.char_class.toLowerCase()}.png`;


    return (
        <div className="even-section">
            <ul className="custom-list">
                <li>
                    <BreadcrumbNav />

                </li>
            </ul>

            <ul className="custom-list">
                <li>
                    <div className="container ">
                        <h1 className="container titleText">{charData.name}</h1>
                        <div className="col-md-5">
                            <strong>by {charData.author}</strong>
                        </div>
                        <br />
                        <div className="panel-body inf-content rounded p-5 spellBoard background-camp-image-with-opacity"
                        
                        style={{
                            '--background-image-url': `url(${classBGImageUrl})`,
                            color: 'white',
                        }}>
                            <div className="row">
                                <div className="col-md-8">

                                    <div
                                        className="table-responsive"
                                       
                                    >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <strong>Class</strong> <span>{charData.char_class.charAt(0).toUpperCase() + charData.char_class.slice(1)}</span>
                                                </div>
                                                <div className="col-md-4">
                                                    <strong>Race</strong> <span>{charData.race.charAt(0).toUpperCase() + charData.race.slice(1)}</span>
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Level</strong> <span>{charData.level}</span>
                                                </div>
                                                <div className="col-md-5">
                                                    <strong>Hit Points</strong> <span>{(hpDice[charData.char_class] + (Math.floor((charData.ability_scores.con - 10) / 2)) + (charData.level - 1) * (Math.floor((charData.ability_scores.con - 10) / 2) + 1 + hpDice[charData.char_class] / 2))}</span>
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Armor Class</strong> <span>{equipedArmorClass}</span>
                                                </div>
                                                <div className="col-md-12">
                                                    <br />
                                                    <strong>Ability Scores</strong>
                                                    <div className="row">
                                                        {Object.entries(charData.ability_scores).map(([key, value]) => (
                                                            <ScoreDisplayer key={key} score={value} title={key.charAt(0).toUpperCase() + key.slice(1)} />
                                                        ))}
                                                    </div>
                                                    <p className=""></p>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <strong>Initiative</strong> <span>{Math.floor((charData.ability_scores.dex - 10) / 2)}</span>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <strong>Perception</strong> <span>{10 + Math.floor((charData.ability_scores.wis - 10) / 2)}</span>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <strong>speed</strong> <span>{charData.race == "dwarf" ? "25ft" : "30ft"}</span>
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
                                    <div className="rounded-circle d-flex img-container justify-content-center align-items-center" style={{ backgroundColor: "#0f0f0f", maxWidth: "300px", maxHeight: "300px" }}>
                                        {/* Placeholder for another image or content */}
                                        <img alt="Character's Class" title="" className="img-thumbnail img-fluid  border-0" src={"/src/assets/classes/" + charData.char_class.toLowerCase() + ".png"}  />
                                    </div>
                                </div>


                                <section className="container m-3 charCreate">

                                    <hr className="my-5 separator" style={{ borderWidth: "3px" }} />

                                    <div className="row">
                                        <div className="col-md-12">
                                            <strong>Weapons</strong>
                                            {Object.entries(charData.weapons).map(([key, value]) => (
                                                <CreateEquipmentItem item={value} key={key} isEquiped={value.isEquiped} />
                                            ))}
                                            <p className=""></p>
                                        </div>
                                        <div className="col-md-12">
                                            <strong>Armors</strong>
                                            {Object.entries(charData.armors).map(([key, value]) => (
                                                <CreateEquipmentItem item={value} key={key} isEquiped={value.isEquiped} />
                                            ))}
                                            <p className=""></p>
                                        </div>
                                        <div className="col-md-12">
                                            <strong>Inventory</strong>
                                            {Object.entries(charData.iventory).map(([key, value]) => (
                                                <CreateEquipmentItem item={value} key={key} />
                                            ))}
                                            <p className=""></p>
                                        </div>
                                        {Object.entries(charData.spells).length > 0 && <div className="col-md-12">
                                            <strong>Spells</strong>
                                            {Object.entries(charData.spells).map(([key, value]) => (
                                                <CreateSpellItem item={value} key={key} />
                                            ))}
                                            <p className=""></p>
                                        </div>}
                                    </div>


                                    <hr className="my-5 separator" style={{ borderWidth: "3px" }} />

                                    <h6 className="titleText">Description and Story: </h6>
                                    <span>{charData.description}</span>

                                </section>



                            </div>
                            {/* <SpellListTablePost charClass={charData.class} /> */}
                        </div>
                    </div>
                    {/* <DDoneLoading isLoading={isLoading} message={loadingMessage} /> */}
                </li>
            </ul>
        </div >
    );
}

function CreateEquipmentItem({ item, isEquiped }: any) {
    const [itemInfo, setItemInfo] = useState(null);

    useEffect(() => {
        fetchEquipmentInfo(item.index);
    }, [item.index]);

    const fetchEquipmentInfo = async (equipmentIndex: any) => {
        try {
            const data = await getEquipmentInfo(equipmentIndex);
            setItemInfo(data);
        } catch (error) {
            console.error('Error fetching equipment info:', error);
        }
    };

    if (!itemInfo) {
        return null; // Handle case where itemInfo is not yet loaded
    }

    return (
        <CharEquipmentListItem itemInfo={itemInfo} isEquiped={isEquiped} />
    );
}

function CreateSpellItem({ item }: any) {
    const [itemInfo, setItemInfo] = useState(null);

    useEffect(() => {
        fetchSpellInfo(item.index);
    }, [item.index]);

    const fetchSpellInfo = async (spellIndex: any) => {
        try {
            const data = await getSpellInfo(spellIndex);
            setItemInfo(data);
        } catch (error) {
            console.error('Error fetching equipment info:', error);
        }
    };

    if (!itemInfo) {
        return null; // Handle case where itemInfo is not yet loaded
    }

    return (
        <CharSpellListItem itemInfo={itemInfo} />
    );
}