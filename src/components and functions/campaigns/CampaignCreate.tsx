/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import BreadcrumbNav from "../assetsForDesign/BreabcrumbNav";
import DDoneLoading from '../assetsForDesign/DDoneLoading';
import DDoneTextInput from '../assetsForDesign/DDoneTextInput';
import { useUser } from '../../UserContext'; // Import useUser
import DDoneTextArea from '../assetsForDesign/DDoneTextArea';
import DDoneDropdown from '../assetsForDesign/DDoneDropdown';
import DDoneButton from '../assetsForDesign/DDoneButton';
import { getChars, getHomebrewRuleInfo, getHomebrewSpellInfo, postCampaignInfo } from "../FetchLogic";
import { ConfirmationPopUp, InformationPopUp } from "../assetsForDesign/DDoneConfirmation";
import { BanListTablePost, CharacterListTablePost, HomebrewListTablePost } from "../assetsForDesign/Tables"; // Import the new HomebrewListTablePost component

export default function CampaignCreate() {
    const { user } = useUser();
    const [characterList, setCharacterList] = useState([]);
    const [filteredCharacterList, setFilteredCharacterList] = useState([]);

    const fetchCharacters = async () => {
        try {
            const data = await getChars();
            console.log(data);
            const allFetchedItems = [
                ...(data || [])
            ];
            allFetchedItems.sort((a, b) => a.name.localeCompare(b.name));
            setCharacterList(allFetchedItems);
            setFilteredCharacterList(allFetchedItems);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    const [name, setName] = useState('');
    const [index, setIndex] = useState('');
    const handleNameChange = (value: string) => {
        setName(value);
        setIndex((value + "-by-" + user[0].username).replace(/\s+/g, "-").toLowerCase());
    };

    const [isPrivate, setIsPrivate] = useState(false);
    const handlePrivacyChange = () => {
        setIsPrivate(!isPrivate);
    };

    const [playersNum, setPlayersNum] = useState<string | null>(null);
    const handlePlayersNumChange = (value: string) => {
        if (value === "") {
            setPlayersNum(null);
            return;
        }
        setPlayersNum((Math.min(20, parseInt(value))).toString());
    };

    const [desc, setDesc] = useState('');
    const handleDescChange = (value: string) => {
        setDesc(value);
    };

    const themeOptions = ['Distopic', 'Futuristic', 'High-Fantasy', 'Lovecraftian', 'Medieval', 'Steampunk', 'Victorian', 'Western', 'Other'];
    const [theme, setTheme] = useState('');
    const handleThemeChange = (value: string) => {
        setTheme(value);
    };

    const [characters, setCharacters] = useState([]);
    const handleCharactersChange = (updatedCharacters) => {
        setCharacters(updatedCharacters);
    };

    const [homebrewRules, setHomebrewRules] = useState([]);
    const handleHomebrewRulesChange = (updatedHomebrewRules) => {
        setHomebrewRules(updatedHomebrewRules);
    };

    const [homebrewSpells, setHomebrewSpells] = useState([]);
    const handleHomebrewSpellsChange = (updatedHomebrewSpells) => {
        setHomebrewSpells(updatedHomebrewSpells);
    };

    const [banClasses, setBanClasses] = useState([]);
    const handleBanClassesChange = (updatedBan) => {
        setBanClasses(updatedBan);
    };

    const [banSpells, setBanSpells] = useState([]);
    const handleBanSpellsChange = (updatedBan) => {
        setBanSpells(updatedBan);
    };

    const [banRaces, setBanRaces] = useState([]);
    const handleBanRacesChange = (updatedBan) => {
        setBanRaces(updatedBan);
    };

    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isError, setError] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showWarn, setShowWarn] = useState(false);

    const handleConfirmSave = () => {
        setShowConfirmation(false);
        handleSave();
    };

    const handleCancelSave = () => {
        setShowConfirmation(false);
    };

    const handleCancelWarn = () => {
        setShowWarn(false);
    };

    const showSuccessMessage = (message, url) => {
        setSuccessMessage(message);
        setTimeout(() => {
            window.location.href = url;
        }, 1000);
    };

    const showFailMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setShowConfirmation(false);
        }, 1000);
    };

    const [spellItems, setSpellItems] = useState([]);
    const [ruleItems, setRuleItems] = useState([]);

    const fetchSpellItems = async () => {
        try {
            const data = await getHomebrewSpellInfo();

            const allFetchedItems = [
                ...(data || []).map(item => ({ ...item, source: 'external' }))
            ];
            allFetchedItems.sort((a, b) => a.name.localeCompare(b.name));
            setSpellItems(allFetchedItems);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchRuleItems = async () => {
        try {
            const data = await getHomebrewRuleInfo('', '', '');
            console.log(data);

            const allFetchedItems = [
                ...(data || []).map(item => ({ ...item, source: 'external' }))
            ];
            allFetchedItems.sort((a, b) => a.name.localeCompare(b.name));
            setRuleItems(allFetchedItems);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchSpellItems();
        fetchRuleItems();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        const nameCheck = (name !== "");
        const playersNumCheck = (!(playersNum === "" || playersNum === null));
        const descCheck = (desc !== "");

        const info: any = {
            name: name,
            master: user[0].username,
            index: index,
            characters: characters,
            isPrivate: isPrivate,
            playersNum: playersNum,
            homebrews: {
                rules: homebrewRules,
                spells: homebrewSpells
            },
            ban: {
                classes: banClasses,
                spells: banSpells,
                races: banRaces
            },
            desc: desc,
            theme: theme.toLocaleLowerCase()
        };

        if (nameCheck && playersNumCheck && descCheck) {
            try {
                await postCampaignInfo(info);
                setLoading(false);
                setSuccess(true);
                showSuccessMessage('Campaign Created Successfully!', '/campaigns');
            } catch (error) {
                setLoading(false);
                setError(true);
                showFailMessage('Error while posting');
                setTimeout(() => {
                    setError(false);
                }, 1500);
            }
        } else {
            setLoading(false);
            setShowConfirmation(false);
            setShowWarn(true);
        }
    };


    let themeUrl = `/src/assets/themes/nocampaign.png`;
    if (theme != "") {
        themeUrl = `/src/assets/themes/${theme.toLowerCase()}.png`;
    }

    const filterCharacters = () => {
        console.log(banClasses);
        const banClassesIndex = banClasses.map(el => el?.index.toLowerCase());
        const banSpellsIndex = banSpells.map(el => el?.index.toLowerCase());
        const banRacesIndex = banRaces.map(el => el?.index.toLowerCase());

        setFilteredCharacterList(characterList.filter(
            el => (
                !banClassesIndex.includes(el.char_class?.toLowerCase()) &&
                !banRacesIndex.includes(el.race?.toLowerCase()) &&
                !el.spells.some(spell => banSpellsIndex.includes(spell.index.toLowerCase()))
            )
        ));
    };

    useEffect(() => {
        filterCharacters()
    }, [banClasses, banRaces, banSpells]);


    const nopUrl = `/src/assets/nop.png`;
    if (!user || !user[0].isMaster) {
        return (
            <div className="text-center background-camp-image"

                style={{
                    backgroundImage: `url(${nopUrl})`,
                    color: 'white',
                    
                }}>
                <h1 style={{ marginTop: "25%", filter: "drop-shadow(1px 1px 1px black) drop-shadow(-1px -1px 1px black)" }}>Please log in as Master to create a new campaign.</h1>
            </div>
        );
    }

    return (
        <div className="even-section " >
            <ul className="custom-list">
                <li>
                    <BreadcrumbNav />
                    <br />
                    <div className="container">
                        <h1 className="container titleText">Create Your Campaign</h1>
                    </div>
                </li>
            </ul>

            <ul className="custom-list ">
                <li>
                    <div className="container " >
                        <div className="panel-body inf-content rounded p-5 spellBoard background-camp-image-with-opacity"
                            style={{
                                backgroundImage: `url(${themeUrl})`,
                                color: 'white',
                                overflow: "visible"
                            }}>
                            <div className="">
                                <div className="container mobile-margin">
                                    <h4>Campaign Name:*</h4>
                                    <DDoneTextInput
                                        width="100%"
                                        placeholder="Enter your Campaign Name"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                    <br />
                                    <div className="row">
                                        <div className="col-md-4 mobile-margin">
                                            <strong>Privacy</strong>
                                            <DDoneDropdown
                                                width="110px"
                                                height="30px"
                                                options={['Public', 'Private']}
                                                value={isPrivate ? 'Private' : 'Public'}
                                                onChange={handlePrivacyChange}
                                            />
                                        </div>
                                        <div className="col-md-5 mx-2 mobile-margin">
                                            <strong>Number of Players</strong>
                                            <DDoneTextInput
                                                width="130px"
                                                placeholder="nº"
                                                value={playersNum}
                                                isNumber={true}
                                                onChange={handlePlayersNumChange}
                                            />
                                        </div>
                                        <div className="col-md-1 desktop-margin mobile-margin">
                                            <strong>Setting</strong>
                                            <DDoneDropdown
                                                width="150px"
                                                height="30px"
                                                options={themeOptions}
                                                value={theme}
                                                onChange={handleThemeChange}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>

                            <br />


                            <section className="container m-3">
                                <hr className="my-5 separator" style={{ borderWidth: "3px" }} />
                                <h4>Homebrew List</h4>
                                <div className="col-md-12 my-5">
                                <h5>Rules</h5>
                                    <HomebrewListTablePost
                                        itemList={ruleItems}
                                        type="rule"
                                        onItemsUpdate={handleHomebrewRulesChange}
                                    />
                                </div>
                                <div className="col-md-12 my-5">
                                <h5>Spells</h5>
                                    <HomebrewListTablePost
                                        itemList={spellItems}
                                        type="spell"
                                        onItemsUpdate={handleHomebrewSpellsChange}
                                    />
                                </div>
                            </section>
                            <section className="container m-3">
                                <hr className="my-5 separator" style={{ borderWidth: "3px" }} />
                                <h4>Ban List</h4>
                                <div className="col-md-12 my-5">
                                    <strong>Classes</strong>
                                    <BanListTablePost
                                        type="class"
                                        onItemsUpdate={handleBanClassesChange}
                                    />
                                </div>
                                <div className="col-md-12 my-5">
                                    <strong>Spells</strong>
                                    <BanListTablePost
                                        type="spell"
                                        onItemsUpdate={handleBanSpellsChange}
                                    />
                                </div>
                                <div className="col-md-12 my-5">
                                    <strong>Races</strong>
                                    <BanListTablePost
                                        type="race"
                                        onItemsUpdate={handleBanRacesChange}
                                    />
                                </div>
                            </section>
                            <section className="container m-3">
                                <hr className="my-5 separator" style={{ borderWidth: "3px" }} />
                                <h5>Characters List</h5>
                                <div className="col-md-12 my-5">
                                    <CharacterListTablePost
                                        characterList={filteredCharacterList}
                                        onItemsUpdate={handleCharactersChange}
                                        charAmount={playersNum}
                                    />
                                </div>
                            </section>
                            <section className="container m-3">
                                <hr className="my-5 separator" style={{ borderWidth: "3px" }} />
                                <strong>Description</strong>
                                <DDoneTextArea
                                    width="100%"
                                    height={10}
                                    placeholder="Write your campaign's Description"
                                    value={desc}
                                    onChange={handleDescChange}
                                />
                            </section>
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
                    message="Are you sure you want to create this campaign?"
                    onConfirm={handleConfirmSave}
                    onCancel={handleCancelSave}
                />
            )}
            {isLoading && (
                <DDoneLoading
                    isLoading={isLoading}
                    isOK={isSuccess}
                    isFail={isError}
                    message={isLoading ? 'Saving...' : (isSuccess ? successMessage : 'Failed to save')}
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
