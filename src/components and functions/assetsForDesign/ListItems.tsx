/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import DDoneButton from './DDoneButton.tsx';
import { FaTrashAlt } from "react-icons/fa";
import { getSpells, getSpellInfo, getEquipment, getEquipmentInfo, getClasses, getRaces, getCharInfo, getClassInfo, getRaceInfo } from '../FetchLogic.tsx'; // Import your fetch logic for spells
import { Link, useLocation } from 'react-router-dom'

// ================== IMPORTS DE ASSETS ==================
import logo from '/src/assets/logo.png';
import noCharSrc from '/src/assets/nochar.png';
import noCampaignUrl from '/src/assets/themes/nocampaign.png';

// glob para classes/illustrations
// const classIllustrations = import.meta.glob('/src/assets/classes/illustrations/*.png', {
//     eager: true,
//     import: 'default',
// }) as Record<string, string>;

// glob para classes normais
const classImages = import.meta.glob('/src/assets/classes/*.png', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

// glob para themes
// const themeImages = import.meta.glob('/src/assets/themes/*.png', {
//     eager: true,
//     import: 'default',
// }) as Record<string, string>;

interface classInputs {
    itemInfo: any;
    toFetch?: boolean;
}

interface equipmentInputs {
    itemInfo: any;
}

interface magicItemInputs {
    itemInfo: any;
}

interface raceInputs {
    itemInfo: any;
    toFetch?: boolean;
}

interface ruleInputs {
    itemInfo: any;
    catInfo?: any[];
}

interface spellInputs {
    itemInfo: any;
    toFetch?: boolean;
}

interface charInputs {
    itemInfo: any;
}

interface CampaignInputs {
    itemInfo: any;
}

export function ClassListItem({ itemInfo, toFetch }: classInputs) {

    const [info, setInfo] = useState({
        name: undefined,
        description: undefined,
        hit_die: undefined,
        saving_throws: undefined

    })
    console.log("aqui ", itemInfo.hit_die)

    if (toFetch) {
        useEffect(() => {
            fetchSpellInfo()
        }, [])

        const fetchSpellInfo = async () => {

            const classInfo = await getClassInfo(itemInfo.index);
            setInfo(classInfo);
        }
    }
    else {
        useEffect(() => {
            setInfo(itemInfo)
        }, [itemInfo])
    }

    let address = '';
    if (itemInfo) {
        address = (window.location.href.replace(location.pathname, "") + "/class/" + itemInfo.index.replaceAll("/", ""))
    }
    return (
        <>
            <div className="rounded spellBoard p-3 my-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1 d-flex align-items-center">
                            <img className="noBackground" src={logo} alt="Logo" width="30" height="30" />
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            <a href={info && address} className="custom-link">  {info && info.name ? info.name : "-"} </a>

                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            <p className="">{info.name && info.name == "Barbarian" ? "Bruiser, Damage Dealer" :
                                (info.name && info.name == "Bard" ? "Support, Crowd Control" :
                                    (info.name && info.name == "Cleric" ? "Support, Bruiser" :
                                        (info.name && info.name == "Druid" ? "Any" :
                                            (info.name && info.name == "Fighter" ? "Bruiser, Damage Dealer" :
                                                (info.name && info.name == "Monk" ? "Bruiser, Damage Dealer, Support" :
                                                    (info.name && info.name == "Paladin" ? "Damage Dealer, Bruiser, Support" :
                                                        (info.name && info.name == "Ranger" ? "Damage Dealer, Support" :
                                                            (info.name && info.name == "Rogue" ? "Damage Dealer" :
                                                                (info.name && info.name == "Sorcerer" ? "Crowd Control, Damage Dealer" :
                                                                    (info.name && info.name == "Warlock" ? "Damage Dealer, Crowd Control" :
                                                                        (info.name && info.name == "Wizard" ? "Crowd Control, Damage Dealer, Support" : "-"
                                                                        )))))))))))}</p>
                        </div>
                        <div className="col-md-1 d-flex align-items-center">
                            {info && info.hit_die ? "d" + info.hit_die : "-"}

                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            <p className="">{info.saving_throws && info.saving_throws.length ? (
                                info.saving_throws.map((item, index) => (
                                    <span key={index}>
                                        {item.name}
                                        {index < info.saving_throws.length - 1 && ", "}
                                    </span>
                                ))) : "-"}</p>

                        </div>
                        <div className="col-md-1 d-flex align-items-center">
                            <a href={info && address} className="btn btn-outline-info">More Info</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

//====================================================================
export function EquipmentListItem({ itemInfo }: equipmentInputs) {
    let address = '';
    if (itemInfo) {
        address = (window.location.href.replace(location.pathname, "") + "/equipment/" + itemInfo.index.replaceAll("/", ""))
    }
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    return (
        <>
            <div className="rounded spellBoard p-3 my-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1 d-flex align-items-center">
                            <img className="noBackground" src={logo} alt="Logo" width="30" height="30" />
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                            <a href={itemInfo && address} className="custom-link">  {itemInfo && itemInfo.name ? itemInfo.name : "-"} </a>

                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                            {itemInfo && itemInfo.equipment_category ? itemInfo.equipment_category.name : "-"}

                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            {itemInfo && itemInfo.weight ? itemInfo.weight + "oz" : "-"}
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            {itemInfo && itemInfo.cost ? itemInfo.cost.quantity + " " + itemInfo.cost.unit : "-"}
                        </div>
                        {/* 
                        <div className="col-md-1 d-flex align-items-center">
                            <a href="#" onClick={(e) => { e.preventDefault(); toggleDescription(); }}>
                                {showDescription ? <  AiFillCaretUp className="icon-link" size={40} /> : <AiFillCaretDown className="icon-link" size={40} />}
                            </a>
                        </div> */}

                        <div className="col-md-1 d-flex align-items-center">
                            <button
                                onClick={(e) => { e.preventDefault(); toggleDescription(); }}
                                className="icon-button"
                                aria-label={showDescription ? "Hide description" : "Show description"}
                            >
                                {showDescription ? <AiFillCaretUp className="icon-link" size={40} /> : <AiFillCaretDown className="icon-link" size={40} />}
                            </button>
                        </div>

                        {showDescription && (
                            <div className="container">
                                <hr className="my-5 separator" style={{ borderWidth: "2px" }} />

                                <p>{itemInfo && itemInfo.desc}</p>

                                <a href={itemInfo && address} className="btn btn-outline-info">More Info</a>

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}

//====================================================================
export function MagicItemListItem({ itemInfo }: magicItemInputs) {
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    return (
        <>
            <div className="rounded spellBoard p-3 my-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1 d-flex align-items-center">
                            <img className="noBackground" src={logo} alt="Logo" width="30" height="30" />
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                            {itemInfo && itemInfo.name ? itemInfo.name : "-"}

                        </div>
                        <div className="col-md-7 d-flex align-items-center">
                            Properties: {itemInfo.desc[0]}
                        </div>


                        {/* <div className="col-md-1 d-flex align-items-center">
                            <a href="#" onClick={(e) => { e.preventDefault(); toggleDescription(); }}>
                                {showDescription ? <  AiFillCaretUp className="icon-link" size={40} /> : <AiFillCaretDown className="icon-link" size={40} />}
                            </a>
                        </div> */}


                        <div className="col-md-1 d-flex align-items-center">
                            <button
                                onClick={(e) => { e.preventDefault(); toggleDescription(); }}
                                className="icon-button"
                                aria-label={showDescription ? "Hide description" : "Show description"}
                            >
                                {showDescription ? <AiFillCaretUp className="icon-link" size={40} /> : <AiFillCaretDown className="icon-link" size={40} />}
                            </button>
                        </div>


                        {showDescription && (
                            <div className="container">
                                <hr className="my-5 separator" style={{ borderWidth: "2px" }} />

                                <p>{itemInfo && itemInfo.desc[1]}</p>

                                {/* <a href={itemInfo && (window.location.href.replace("s/", "s") .replace("t/", "t") + "/" + itemInfo.index.replaceAll("/", ""))} className="btn btn-outline-info">More Info</a> */}

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}

//====================================================================
export function RaceListItem({ itemInfo, toFetch }: raceInputs) {
    let address = '';
    if (itemInfo) {
        address = (window.location.href.replace(location.pathname, "") + "/race/" + itemInfo.index.replaceAll("/", ""))
    }

    const [info, setInfo] = useState({
        name: undefined,
        ability_bonuses: undefined,
        traits: undefined

    })
    console.log("aqui ", itemInfo.hit_die)

    if (toFetch) {
        useEffect(() => {
            fetchSpellInfo()
        }, [])

        const fetchSpellInfo = async () => {

            const raceInfo = await getRaceInfo(itemInfo.index);
            setInfo(raceInfo);
        }
    }
    else {
        useEffect(() => {
            setInfo(itemInfo)
        }, [itemInfo])
    }

    return (
        <>
            <div className="rounded spellBoard p-3 my-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1 d-flex align-items-center">
                            <img className="noBackground" src={logo} alt="Logo" width="30" height="30" />
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            <span className='list-header-mobile titleText'> Name: &nbsp;</span> <a href={info && address} className="custom-link">  {info && info.name ? info.name : "-"} </a>

                        </div>
                        <div className="col-md-5 d-flex align-items-center">
                            <p className="">  <span className='list-header-mobile titleText'> Traits: &nbsp;</span> {info.traits && info.traits.length ? (
                                info.traits.map((item, index) => (
                                    <span key={index}>
                                        {item.name}
                                        {index < info.traits.length - 1 && ", "}
                                    </span>
                                ))) : "-"}</p>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            <p className=""> <span className='list-header-mobile titleText'> Ability Score: &nbsp;</span> {info.ability_bonuses && info.ability_bonuses.length == 6 ? "+1 to ALL" : (info.ability_bonuses && info.ability_bonuses.length ? (
                                info.ability_bonuses.map((item, index) => (
                                    <span key={index}>
                                        +{item.bonus} {item.ability_score.name}
                                        {index < info.ability_bonuses.length - 1 && ", "}
                                    </span>
                                ))) : "-")}</p>

                        </div>
                        <div className="col-md-1 d-flex align-items-center">
                            <a href={info && address} className="btn btn-outline-info">More Info</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

//====================================================================
export function CharListItem({ itemInfo }: charInputs) {



    const classImages = import.meta.glob('/src/assets/classes/illustrations/*.png', {
        eager: true,
        import: 'default',
    }) as Record<string, string>;

    const imageSrc = itemInfo
        ? classImages[`/src/assets/classes/illustrations/${itemInfo.char_class.toLowerCase()}.png`] : '';


    if (itemInfo == null) {
        return (
            <div className="char-list-item-null rounded p-3 my-3 text-center">
                <div className="char-list-frame-null rounded p-3 my-3 text-center">
                    <div className="char-name-box-null" >
                        <div className="char-name-null">New Character</div>
                    </div>
                    <div className="char-list-frame-null2 rounded p-3 my-3 text-center">

                        <div className="char-item-content-null">

                            <img className="char-class-image-null" src={noCharSrc} alt="Create Character" />

                        </div>
                    </div>
                </div>
                <div id='createCharButton'>
                    <DDoneButton
                        width="150px"
                        height={2}
                        onClick={() => window.location.href = "/characters/creation"}
                        text="Create Character"
                    />
                </div>
            </div>
        );
    }

    let address = '';
    if (itemInfo) {
        address = (window.location.href.replace(location.pathname, "") + "/characters/" + itemInfo.index.replaceAll("/", ""))
    }
    return (
        <div className="char-list-item-null rounded p-3 my-3 text-center">
            <div className="char-list-frame-null rounded p-3 my-3 text-center">
                <div className="char-name-box-null" >
                    <div className="char-name-null">{itemInfo && itemInfo.name ? itemInfo.name : "-"}</div>
                </div>
                <div className="char-list-frame-null2 rounded p-3 my-3 text-center">

                    <div className="char-item-content-null" >

                        {/* <img className="char-class-image" src={imageSrc} alt="Class" /> */}
                        <div
                            style={{
                                backgroundImage: `url(${imageSrc})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                color: 'white',
                                width: '250px',
                                height: '250px',
                                // objectFit: 'cover',
                                position: 'relative',
                                top: '-20px',
                            }}>
                        </div>
                    </div>
                </div>
            </div>
            <div id='createCharButton'>
                <DDoneButton
                    width="150px"
                    height={2}
                    onClick={() => window.location.href = address}
                    text="View Details"
                />
            </div>
        </div >
    );
}

//====================================================================
export function CharListItemCamp({ itemInfo }: charInputs) {
    const imageSrc = itemInfo
        ? classImages[`/src/assets/classes/${itemInfo.char_class.toLowerCase()}.png`]
        : '';


    if (itemInfo == null) {
        return (
            <div className="char-list-item-null rounded p-3 my-3 text-center">
                <div className="char-list-frame-null rounded p-3 my-3 text-center">
                    <div className="char-name-box-null" >
                        <div className="char-name-null">New Character</div>
                    </div>
                    <div className="char-list-frame-null2 rounded p-3 my-3 text-center">

                        <div className="char-item-content-null">

                            <img className="char-class-image-null" src={noCharSrc} alt="Create Character" />

                        </div>
                    </div>
                </div>
                <div id='createCharButton'>
                    <DDoneButton
                        width="150px"
                        height={2}
                        onClick={() => window.location.href = "/characters/creation"}
                        text="Create Character"
                    />
                </div>
            </div>
        );
    }

    let address = '';
    if (itemInfo) {
        address = (window.location.href.replace(location.pathname, "") + "/characters/" + itemInfo.index.replaceAll("/", ""))
    }
    return (
        <div className="char-list-item-camp rounded p-3 my-3 text-center">
            <div className="char-item-content">
                <img className="char-class-image" src={imageSrc} alt="Class" />
                <div className="char-name-box">
                    <div className="char-name">{itemInfo && itemInfo.name ? itemInfo.name : "-"}</div>
                </div>
            </div>

            <DDoneButton
                width="150px"
                height={2}
                onClick={() => window.location.href = address}
                text="View Details"
            />
        </div>
    );
}

//====================================================================

export function CampaignListItem({ itemInfo }: CampaignInputs) {

    const themeImages = import.meta.glob('/src/assets/themes/*.png', {
        eager: true,
        import: 'default',
    }) as Record<string, string>;

    const CampaignUrl = itemInfo
        ? themeImages[`/src/assets/themes/${itemInfo.theme.toLowerCase()}.png`] : '';


    if (!itemInfo) {
        return (
            <div className="camp-list-item rounded p-3  text-center background-camp-image"
                style={{
                    backgroundImage: `url(${noCampaignUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: '47% 20%',
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    backgroundBlendMode: "darken",

                }}
            >
                <div className="char-list-frame-null rounded p-3 text-center">
                    <div className="camp-name-box-null">
                        <Link to="/campaigns/creation">
                            <div className="char-name-null">New Campaign</div>
                        </Link>
                    </div>
                </div>
                <div className='camp-btn '>
                    <DDoneButton
                        width="150px"
                        height={2}
                        onClick={() => window.location.href = "/campaigns/creation"}
                        text="Create Campaign"
                    />
                </div>
            </div >
        );
    }
    const address = (window.location.href.replace(location.pathname, "") + "/campaigns/" + itemInfo.index?.replaceAll("/", ""))

    return (
        <div className="camp-list-item rounded p-3  text-center background-camp-image"
            style={{
                backgroundImage: `url(${CampaignUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: '50% 20%',
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                backgroundBlendMode: "darken",
            }}
        >
            <div className="camp-details">
                <span className="camp-detail">Master: {itemInfo.master}</span>
                <br />
                <br />
                <span className="camp-detail">Players Count: {itemInfo.characters.length}/{itemInfo.playersNum}</span>
                <br />
                {((itemInfo.ban.classes.length > 0 && !itemInfo.ban.classes.includes(null)) || (itemInfo.ban.spells.length > 0 && !itemInfo.ban.spells.includes(null)) || (itemInfo.ban.races.length > 0 && !itemInfo.ban.races.includes(null))) &&
                    (<>

                        <br />
                        <span className="camp-detail">Ban List:</span>
                        <br />
                    </>
                    )}

                {(itemInfo.ban.classes?.length > 0 && !itemInfo.ban.classes.includes(null)) &&
                    itemInfo.ban.classes.map((item, index) => (
                        <span key={index}>
                            -{item.name} (class)
                            <br />
                            {index < itemInfo.ban.classes.length - 1 && " "}
                        </span>
                    ))

                }
                {(itemInfo.ban.spells?.length > 0 && !itemInfo.ban.spells.includes(null)) &&
                    itemInfo.ban.spells.map((item, index) => (
                        <span key={index}>
                            -{item.name} (spell)
                            <br />
                            {index < itemInfo.ban.spells.length - 1 && " "}
                        </span>
                    ))

                }
                {(itemInfo.ban.races?.length > 0 && !itemInfo.ban.races.includes(null)) &&
                    itemInfo.ban.races.map((item, index) => (
                        <span key={index}>
                            -{item.name} (race)
                            <br />
                            {index < itemInfo.ban.races.length - 1 && " "}
                        </span>
                    ))

                }

                {/* HOMEBREW DAQUI PRA FRENTE */}
                {((itemInfo.homebrews.rules?.length > 0 && !itemInfo.homebrews.rules.includes(null)) || (itemInfo.homebrews.spells.length > 0 && !itemInfo.homebrews.spells.includes(null)))
                    && (<>
                        <br />
                        <span className="camp-detail">Homebrew List: </span>

                    </>
                    )}
                <br />
                {itemInfo.homebrews.rules?.length > 0 && !itemInfo.homebrews.rules.includes(null) &&
                    itemInfo.homebrews.rules.map((item, index) => (
                        <span key={index}>
                            -{item.name} (rule)

                            {index < itemInfo.homebrews.rules.length - 1 && " "}
                            <br />
                        </span>
                    ))

                }
                {itemInfo.homebrews.spells?.length > 0 && !itemInfo.homebrews.spells.includes(null) &&
                    itemInfo.homebrews.spells.map((item, index) => (
                        <span key={index}>
                            -{item.name} (spell)
                            <br />
                            {index < itemInfo.homebrews.spells.length - 1 && " "}
                            <br />

                        </span>
                    ))

                }


            </div>
            <div className="char-list-frame-null rounded p-3 text-center">
                <div className="camp-name-box-null">
                    <Link to={"/campaigns/" + itemInfo.index?.replaceAll("/", "")}>
                        <div className="char-name-null">{itemInfo && itemInfo.name ? itemInfo.name : "-"}</div>
                    </Link>
                </div>

            </div>
            <div className='camp-btn '>
                <DDoneButton
                    width="150px"
                    height={2}
                    onClick={() => window.location.href = address}
                    text="View Details"
                />
            </div>
        </div>
    );
}

//====================================================================
export function RuleListItem({ itemInfo, catInfo }: ruleInputs) {

    let address = '';
    if (itemInfo) {
        address = (window.location.href.replace(location.pathname, "") + "/rules/" + itemInfo.index.replaceAll("/", ""))
    }
    let categoryName;
    if (catInfo) {
        categoryName = Object.keys(catInfo).find(catName => catInfo[catName].includes(itemInfo.name)) || '';
    }

    function goToPage() {
        window.location.href = address;
    }

    return (
        <div className="rounded spellBoard p-3 my-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 d-flex align-items-center">

                        <a href={itemInfo?.index && address} className="custom-link">   {itemInfo && itemInfo.name} </a>

                    </div>
                    <div className="col-md-3 d-flex align-items-center">
                        {categoryName}
                    </div>
                    <div className="col-md-3 d-flex align-items-center">
                        {itemInfo.author ? <span className="badge badge-secondary">{"homebrew"}</span> : <span className="badge badge-secondary">{"core"}</span>}

                    </div>
                    <div className="col-md- d-flex align-items-center mx-3">
                        <DDoneButton
                            width="100px"
                            height={2}
                            onClick={() => goToPage()}
                            text="More Info"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


//====================================================================
export function SpellListItem({ itemInfo, toFetch }: spellInputs) {

    const [info, setInfo] = useState({

        level: undefined,
        school: undefined,
        casting_time: undefined,
        area_of_effect: undefined,
        range: undefined,
        components: undefined,
        duration: undefined,
        description: undefined,
        dc: undefined,
        damage: undefined,
        damage_at_slot_level: undefined,
        desc: undefined,
        attack_type: undefined,
        name: undefined,
        index: undefined

    })

    if (toFetch) {
        useEffect(() => {
            fetchSpellInfo()
        }, [])

        const fetchSpellInfo = async () => {
            const spellInfo = await getSpellInfo(itemInfo.index);
            setInfo(spellInfo)
        }
    }
    else {
        useEffect(() => {
            setInfo(itemInfo)
        }, [itemInfo])
    }



    const location = useLocation()
    let address = '';
    if (itemInfo) {
        address = (window.location.href.replace(location.pathname, "") + "/spells/" + itemInfo.index.replaceAll("/", ""))
    }
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    return (
        <>
            <div className="rounded spellBoard p-3 my-3" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-1 d-flex align-items-center">
                            <img className="noBackground" src={logo} alt="Logo" width="30" height="30" />

                            <div className="d-flex align-items-center m-2" style={{ fontSize: "small" }}>
                                <span className='list-header-mobile titleText'> Level: &nbsp;</span>{info && (info.level == "0" ? "Cantrip" :
                                    (info && (info.level == "1" ? `${info.level}st` :
                                        (info && (info.level == "2" ? `${info.level}nd` :
                                            (info && (info.level == "3" ? `${info.level}rd` :
                                                `${info.level}th`)))))))}
                            </div>
                        </div>
                        <div className="col-md-1 d-flex align-items-center ">
                            <span className='list-header-mobile titleText'> Name: &nbsp;</span><a href={info?.index && address} className="custom-link"> {info && info.name} </a>
                        </div>
                        <div className="col-md-1 d-flex align-items-center">
                            <span className='list-header-mobile titleText'> Casting Time: &nbsp;</span>{info && info.casting_time}
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            <span className='list-header-mobile titleText'> Duration: &nbsp;</span>{info && info.duration}
                        </div>
                        <div className="col-md-1 d-flex align-items-center">
                            <span className='list-header-mobile titleText'> Range/Area: &nbsp;</span> {info && (info.range && info.area_of_effect ? `${info.range} / ${info.area_of_effect.type} ${info.area_of_effect.size}ft` : (info && info.range ? info.range : "-"))}
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            <span className='list-header-mobile titleText'> Attack/Save: &nbsp;</span>{info && info.dc ? `${info.dc.dc_type.name} for ${info && info.dc.dc_success ? info.dc.dc_success : "none"}` : (info && info.attack_type ? info.attack_type : "-")}
                        </div>
                        <div className="col-md-1 d-flex align-items-center">
                            <span className='list-header-mobile titleText'> Damage/Effect: &nbsp;</span>{info && info.damage ? (info.damage.damage_at_slot_level ? `${info.damage.damage_at_slot_level[info.level]} / ${info.damage.damage_type.name}` : (info.damage_at_slot_level ? `${info.damage_at_slot_level[0].replace(" ", "")} /` + (info.damage.damage_type.name == 'Select' ? 'Fire' : `${info.damage.damage_type.name}`) : "-")) : "-"}
                        </div>
                        <div className="col-md-1 d-flex align-items-center mx-4">
                            <span className='list-header-mobile titleText' style={{ margin: "-25px" }}> School: &nbsp;</span> <span style={{ marginLeft: "25px" }}></span>{info.school ? info.school.name : info.school}

                        </div>
                        {/* <div className="col-md-1 d-flex align-items-center  mx-3">
                            <a href="#" onClick={(e) => { e.preventDefault(); toggleDescription(); }}>
                                {showDescription ? <  AiFillCaretUp className="icon-link" size={40} /> : <AiFillCaretDown className="icon-link" size={40} />}
                            </a>
                        </div> */}

                        <div className="col-md-1 d-flex align-items-center">
                            <button
                                onClick={(e) => { e.preventDefault(); toggleDescription(); }}
                                className="icon-button"
                                aria-label={showDescription ? "Hide description" : "Show description"}
                            >
                                {showDescription ? <AiFillCaretUp className="icon-link" size={40} /> : <AiFillCaretDown className="icon-link" size={40} />}
                            </button>
                        </div>

                        {showDescription && (
                            <div>
                                <hr className="my-5 separator" style={{ borderWidth: "2px" }} />

                                <p>{info && info.desc}</p>

                                <a href={info && address} className="btn btn-outline-info">More Info</a>

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}

//====================================================================
export function SpellListItemPost({ onDelete, initialSpell, charClass, charLevel, index, spellList, onSpellChange }) {
    const [spellName, setSpellName] = useState('');
    // const [spellList, setSpellList] = useState([]);
    const [filteredSpellList, setFilteredSpellList] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState(initialSpell);
    const [showDropdown, setShowDropdown] = useState(false);

    //Filtro input texto
    const handleInputChange = (e) => {
        const input = e.target.value;
        setSpellName(input);
        const filtered = spellList.filter(spell =>
            spell.name.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredSpellList(filtered);
        setShowDropdown(true);
    };

    useEffect(() => {

    }, [charClass, charLevel])

    useEffect(() => {
        console.log("filtered spell list de fato", spellList)
        setFilteredSpellList(spellList);
    }, [spellList]);

    const handleSpellSelect = async (spell) => {
        let spellInfo = spell;
        if (!spell.author) {
            const response = await getSpellInfo(spell.index);
            spellInfo = response;
        }
        setSelectedSpell(spellInfo);
        setSpellName(spellInfo.name);
        setShowDropdown(false);
        onSpellChange(spellInfo, index); // Notify parent component about the spell change
    };

    if (selectedSpell != null) {
        return (
            <div className="rounded equipmentBoard p-3 my-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1 d-flex align-items-center">
                            <img className="noBackground" src={logo} alt="Logo" width="30" height="30" />
                            <div className="d-flex align-items-center m-2" style={{ fontSize: "small" }}>
                                {selectedSpell.level === "0" ? "Cantrip" :
                                    (selectedSpell.level === "1" ? `${selectedSpell.level}st` :
                                        (selectedSpell.level === "2" ? `${selectedSpell.level}nd` :
                                            (selectedSpell.level === "3" ? `${selectedSpell.level}rd` :
                                                `${selectedSpell.level}th`)))}
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            {selectedSpell.name}
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            {selectedSpell.damage ? (selectedSpell.damage.damage_at_slot_level ? `${selectedSpell.damage.damage_at_slot_level[selectedSpell.level]} / ${selectedSpell.damage.damage_type.name}` : (selectedSpell.damage.damage_at_character_level ? `${selectedSpell.damage.damage_at_character_level[1]} / ${selectedSpell.damage.damage_type.name}` : "-")) : "-"}
                        </div>

                        <div className="col-md-1 px-5 d-flex align-items-center mx-5">
                            <button className="btn btn-outline-danger ml-2" onClick={() => onDelete(index)}><FaTrashAlt /></button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded equipmentBoard p-3 my-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type to search spells"
                            value={spellName}
                            onChange={handleInputChange}
                            onFocus={() => setShowDropdown(true)}

                        />
                        <button
                            className="btn btn-outline-secondary ml-2"
                            onClick={() => setShowDropdown(!showDropdown)}

                        >
                            <AiFillCaretDown />
                        </button>
                        {showDropdown && filteredSpellList.length > 0 && (
                            <ul className="dropdown-menu show w-100">
                                <div className="dropdown-list">
                                    {filteredSpellList.map((spell, index) => (
                                        <li key={index} className="dropdown-item" onClick={() => handleSpellSelect(spell)}>
                                            {spell.name}
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        )}
                    </div>
                    <div className="col-md-4 d-flex align-items-center"></div>
                    <div className="col-md-1 px-2 d-flex align-items-center mx-4">
                        <button className="btn btn-outline-danger" onClick={() => onDelete(index)}><FaTrashAlt /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}


//====================================================================
export function EquipmentListItemPost({ onDelete, initialEquipment, cat, index, onEquipmentChange, isMaxOut }) {
    const [equipmentName, setEquipmentName] = useState('');
    const [equipmentList, setEquipmentList] = useState([]);
    const [filteredEquipmentList, setFilteredEquipmentList] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState(initialEquipment);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isEquiped, setIsEquiped] = useState(initialEquipment?.isEquiped || false);

    const fetchEquipment = async () => {
        try {
            const data = await getEquipment('', cat);
            const allFetchedItems = [
                ...(data.equipment || []).map(item => ({ ...item, source: 'external' }))
            ];

            setEquipmentList(allFetchedItems);
            setFilteredEquipmentList(allFetchedItems);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchEquipment();
    }, []);

    const handleInputChange = (e) => {
        const input = e.target.value;
        setEquipmentName(input);
        const filtered = equipmentList.filter(equipment =>
            equipment.name.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredEquipmentList(filtered);
        setShowDropdown(true);
    };

    const handleEquipmentSelect = async (equipment) => {
        let equipmentInfo = equipment;
        if (!equipment.author) {
            const response = await getEquipmentInfo(equipment.index);
            equipmentInfo = response;
        }
        console.log("equipmentInfo")
        console.log(equipmentInfo)

        setEquipmentName(equipmentInfo.name);
        setShowDropdown(false);

        setSelectedEquipment(equipmentInfo);
        onEquipmentChange({ ...equipmentInfo, isEquiped }, index);
    };

    const handleIsEquipedSelect = () => {
        setIsEquiped(prevIsEquiped => {
            const newIsEquiped = !prevIsEquiped;
            console.log("New isEquiped value:", newIsEquiped);

            // Notify parent component about the isEquiped change
            onEquipmentChange({ ...selectedEquipment, isEquiped: newIsEquiped }, index);

            return newIsEquiped;
        });
    };

    useEffect(() => {
        console.log("isEquiped state changed:", isEquiped);
    }, [isEquiped]);

    return (
        <div className="rounded equipmentBoard p-2 my-1">
            <div className="container">
                <div className="row">
                    {selectedEquipment ? (
                        <>
                            <div className="col-md-1 d-flex align-items-center">
                                <img className="noBackground" src={logo} alt="Logo" width="30" height="30" />
                            </div>
                            <div className="col-md-3 d-flex align-items-center">
                                {selectedEquipment.name || "-"}
                            </div>
                            <div className="col-md-3 d-flex align-items-center">
                                {selectedEquipment.armor_category ?
                                    (selectedEquipment.armor_category === "Shield" ? "+2" : selectedEquipment.armor_class ? selectedEquipment.armor_class.base : "-")
                                    : selectedEquipment.damage ? `${selectedEquipment.damage.damage_dice} ${selectedEquipment.damage.damage_type.name}` : "-"}
                            </div>
                            <div className="col-md-2 d-flex align-items-center">
                                {cat !== 'adventuring-gear' && (
                                    <DDoneButton
                                        width="150px"
                                        height={2}
                                        onClick={handleIsEquipedSelect}
                                        text={isEquiped ? "Equipped" : "Not Equipped"}
                                        disabled={!isEquiped && isMaxOut && selectedEquipment.index !== "shield"}
                                    />
                                )}
                            </div>
                            <div className="col-md-1 px-5 d-flex align-items-center mx-5">
                                <button className="btn btn-outline-danger ml-2" onClick={() => onDelete(index)}>
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-md-6 d-flex align-items-center position-relative">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type to search item"
                                    value={equipmentName}
                                    onChange={handleInputChange}
                                    onFocus={() => setShowDropdown(true)}

                                />
                                <button
                                    className="btn btn-outline-secondary ml-2"
                                    onClick={() => setShowDropdown(!showDropdown)}

                                >
                                    <AiFillCaretDown />
                                </button>
                                {showDropdown && filteredEquipmentList.length > 0 && (
                                    <ul className="dropdown-menu show w-100">
                                        <div className="dropdown-list">
                                            {filteredEquipmentList.map((equipment, index) => (
                                                <li key={index} className="dropdown-item" onClick={() => handleEquipmentSelect(equipment)}>
                                                    {equipment.name}
                                                </li>
                                            ))}
                                        </div>
                                    </ul>
                                )}
                            </div>
                            <div className="col-md-4 d-flex align-items-center"></div>
                            <div className="col-md-1 px-2 d-flex align-items-center mx-4">
                                <button className="btn btn-outline-danger" onClick={() => onDelete(index)}>
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

//     if (selectedEquipment != null) {
//         return (
//             <div className="rounded equipmentBoard p-2 my-1">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-1 d-flex align-items-center">
//                             <img className="noBackground" src={logo} alt="Logo" width="30" height="30" />
//                         </div>
//                         <div className="col-md-3 d-flex align-items-center">
//                             {selectedEquipment && selectedEquipment.name ? selectedEquipment.name : "-"}
//                         </div>
//                         <div className="col-md-3 d-flex align-items-center">
//                             {selectedEquipment && selectedEquipment.armor_category ? (selectedEquipment.armor_category == "Shield" ? "+2" : "" + (selectedEquipment.armor_class ? selectedEquipment.armor_class.base : "-")) : (selectedEquipment.damage ? selectedEquipment.damage.damage_dice + " " + selectedEquipment.damage.damage_type.name : "")}
//                         </div>
//                         <div className="col-md-2 d-flex align-items-center">
//                             {cat !== 'adventuring-gear' && (
//                                 <DDoneButton
//                                     width="150px"
//                                     height={2}
//                                     onClick={handleIsEquipedSelect}
//                                     text={isEquiped ? "Equipped" : "Not Equipped"}
//                                     disabled={!isEquiped && isMaxOut && selectedEquipment.index != "shield"}
//                                 />
//                             )}
//                         </div>
//                         <div className="col-md-1 px-5 d-flex align-items-center mx-5">
//                             <button className="btn btn-outline-danger ml-2" onClick={() => { handleIsEquipedSelect; onDelete(index) }}><FaTrashAlt /></button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="rounded equipmentBoard p-3 my-3">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-6 d-flex align-items-center">
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Type to search equipments"
//                             value={equipmentName}
//                             onChange={handleInputChange}
//                             onFocus={() => setShowDropdown(true)}
//                         />
//                         <button
//                             className="btn btn-outline-secondary ml-2"
//                             onClick={() => setShowDropdown(!showDropdown)}
//                         >
//                             <AiFillCaretDown />
//                         </button>
//                         <div className="dropdown">
//                             {showDropdown && filteredEquipmentList.length > 0 && (
//                                 <ul className="dropdown-menu show">
//                                     {filteredEquipmentList.map((equipment, index) => (
//                                         <li key={index} className="dropdown-item" onClick={() => handleEquipmentSelect(equipment)}>
//                                             {equipment.name}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </div>
//                     </div>
//                     <div className="col-md-4 d-flex align-items-center"></div>
//                     <div className="col-md-1 px-2 d-flex align-items-center mx-4">
//                         <button className="btn btn-outline-danger" onClick={() => onDelete(index)}><FaTrashAlt /></button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export function BanListItemPost({ onDelete, initialItem, type, index, onItemChange }) {
    const [itemName, setItemName] = useState('');
    const [itemList, setItemList] = useState([]);
    const [filteredItemList, setFilteredItemList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(initialItem);
    const [showDropdown, setShowDropdown] = useState(false);

    const fetchItems = async () => {
        try {
            let data;
            if (type === 'class') {
                data = await getClasses('', '');
            } else if (type === 'race') {
                data = await getRaces('', '');
            } else if (type === 'spell') {
                data = await getSpells('', '', '', '');
            }

            const allFetchedItems = [
                ...(data.results || []).map(item => ({ ...item, source: 'external' }))
            ];
            allFetchedItems.sort((a, b) => a.name.localeCompare(b.name));
            setItemList(allFetchedItems);
            setFilteredItemList(allFetchedItems);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleInputChange = (e) => {
        const input = e.target.value;
        setItemName(input);
        const filtered = itemList.filter(item =>
            item.name.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredItemList(filtered);
        setShowDropdown(true);
    };

    const handleItemSelect = async (item) => {
        setSelectedItem(item);
        setItemName(item.name);
        setShowDropdown(false);
        onItemChange(item, index);
    };

    if (selectedItem != null) {
        return (
            <div className="rounded equipmentBoard p-3 my-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                            {selectedItem.name}
                        </div>
                        <div className="col-md-1 px-5 d-flex align-items-center mx-5">
                            <button className="btn btn-outline-danger ml-2" onClick={() => onDelete(index)}><FaTrashAlt /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded equipmentBoard p-3 my-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`Type to search ${type}s`}
                            value={itemName}
                            onChange={handleInputChange}
                            onFocus={() => setShowDropdown(true)}
                        />
                        <button
                            className="btn btn-outline-secondary ml-2"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <AiFillCaretDown />
                        </button>
                        {showDropdown && filteredItemList.length > 0 && (
                            <ul className="dropdown-menu show w-100">
                                <div className="dropdown-list">
                                    {filteredItemList.map((item, index) => (
                                        <li key={index} className="dropdown-item" onClick={() => handleItemSelect(item)}>
                                            {item.name}
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        )}
                    </div>
                    <div className="col-md-4 d-flex align-items-center"></div>
                    <div className="col-md-1 px-2 d-flex align-items-center mx-4">
                        <button className="btn btn-outline-danger" onClick={() => onDelete(index)}><FaTrashAlt /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

//====================================================================
export function CharacterListItemPost({ onDelete, initialItem, index, onItemChange, characterList }) {
    const [characterName, setCharacterName] = useState('');
    const [filteredCharacterList, setFilteredCharacterList] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(initialItem);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        setFilteredCharacterList(characterList);
    }, [characterList])

    const handleInputChange = (e) => {
        const input = e.target.value;
        setCharacterName(input);
        const filtered = characterList.filter(character =>
            character.author.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredCharacterList(filtered);
        setShowDropdown(true);
    };

    const handleCharacterSelect = async (character) => {
        let characterInfo = character;
        if (!character.author) {
            const response = await getCharInfo(character.index);
            characterInfo = response;
        }
        setSelectedCharacter(characterInfo);
        setCharacterName(characterInfo.name);
        setShowDropdown(false);
        onItemChange(characterInfo, index);
    };

    if (selectedCharacter != null) {
        return (
            <div className="rounded equipmentBoard p-3 my-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                            {selectedCharacter.name}
                        </div>
                        <div className="col-md-1 px-5 d-flex align-items-center mx-5">
                            <button className="btn btn-outline-danger ml-2" onClick={() => onDelete(index)}><FaTrashAlt /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded equipmentBoard p-3 my-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Player"
                            value={characterName}
                            onChange={handleInputChange}
                            onFocus={() => setShowDropdown(true)}
                        />
                        <button
                            className="btn btn-outline-secondary ml-2"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <AiFillCaretDown />
                        </button>
                        {showDropdown && filteredCharacterList.length > 0 && (
                            <ul className="dropdown-menu show w-100">
                                <div className="dropdown-list">
                                    {filteredCharacterList.map((character, index) => (
                                        <li key={index} className="dropdown-item" onClick={() => handleCharacterSelect(character)}>
                                            {character.name}
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        )}
                    </div>
                    <div className="col-md-4 d-flex align-items-center"></div>
                    <div className="col-md-1 px-2 d-flex align-items-center mx-4">
                        <button className="btn btn-outline-danger" onClick={() => onDelete(index)}><FaTrashAlt /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function HomebrewListItemPost({ onDelete, initialItem, type, index, onItemChange, itemList }) {
    const [itemName, setItemName] = useState('');
    const [filteredItemList, setFilteredItemList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(initialItem);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        setFilteredItemList(itemList);
    }, [itemList]);

    const handleInputChange = (e) => {
        const input = e.target.value;
        setItemName(input);
        const filtered = itemList.filter(item =>
            item.name.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredItemList(filtered);
        setShowDropdown(true);
    };

    const handleItemSelect = async (item) => {
        const itemInfo = item;

        setSelectedItem(itemInfo);
        setItemName(itemInfo.name);
        setShowDropdown(false);
        onItemChange(itemInfo, index);
    };

    if (selectedItem != null) {
        return (
            <div className="rounded equipmentBoard p-3 my-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                            {selectedItem.name}
                        </div>
                        <div className="col-md-1 px-5 d-flex align-items-center mx-5">
                            <button className="btn btn-outline-danger ml-2" onClick={() => onDelete(index)}><FaTrashAlt /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded equipmentBoard p-3 my-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`Type to search ${type}`}
                            value={itemName}
                            onChange={handleInputChange}
                            onFocus={() => setShowDropdown(true)}
                        />
                        <button
                            className="btn btn-outline-secondary ml-2"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <AiFillCaretDown />
                        </button>
                        {showDropdown && filteredItemList.length > 0 && (
                            <ul className="dropdown-menu show w-100">
                                <div className="dropdown-list">
                                    {filteredItemList.map((item, index) => (
                                        <li key={index} className="dropdown-item" onClick={() => handleItemSelect(item)}>
                                            {item.name}
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        )}
                    </div>
                    <div className="col-md-4 d-flex align-items-center"></div>
                    <div className="col-md-1 px-2 d-flex align-items-center mx-4">
                        <button className="btn btn-outline-danger" onClick={() => onDelete(index)}><FaTrashAlt /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
