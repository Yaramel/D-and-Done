/* eslint-disable @typescript-eslint/no-explicit-any */

//Table Original
const table1 = "https://tableofmanythings-8000.restdb.io/";
const key1 = '664dd625f13d107ff4c38386';

// //Table de Emergencia 1
// const table1 = "https://tableofmorethings-edae.restdb.io/";
// const key1 = '66759aedbe0bc81043eafcf7';

// //Table de Emergencia 2 - Yara
// const table1 = "https://tableofevemorethings-abb1.restdb.io/";
// const key1 = '6675b8f5be0bc805bfeb00c1';

// //Table de Emergencia 3 - Yara
// const table1 = "https://tableofinfinitthings-8b98.restdb.io/";
// const key1 = '6675bf02be0bc81942eb0158';

export async function getHomebrewRuleInfo(name?: string, category?: string, index?: string) {
    name = name || '';
    category = category || '';

    let address = '';

    if (name != '') {
        address = `${table1}rest/homebrew-rules?q={}&filter=${name}`;
    }
    else if (category !== '') {
        address = `${table1}rest/homebrew-rules?q={}&filter=${category}`;
    }
    else if (index !== '') {
        address = `${table1}rest/homebrew-rules?q={}&filter=${index}`;
    }
    else {
        address = `${table1}rest/homebrew-rules`;
    }

    try {
        const response = await fetch(address, {
            method: 'GET',
            headers: {
                'x-apikey': key1,
                'Content-Type': 'application/json' // Ensure Content-Type is correct
            }
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
}


//====================================================================
export async function postHomebrewRuleInfo(name: string, author: string, index: string, desc: string, category: string) {
    const info = {
        name: name,
        author: author,
        index: index,
        desc: desc,
        category: category
    };

    try {
        const response = await fetch(`${table1}rest/homebrew-rules`, {
            method: 'POST',
            headers: {
                'x-apikey': key1,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            throw new Error('Network response was not ok || ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

//====================================================================

export async function getRuleInfo(ruleIndex) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/rule-sections/${ruleIndex}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching from external API:', error);

        // Try fetching from RestDB
        try {
            const restDbResponse = await fetch(`${table1}rest/homebrew-rules?q={"index":"${ruleIndex}"}`, {
                method: 'GET',
                headers: {
                    'x-apikey': key1,
                    'Content-Type': 'application/json'
                }
            });
            if (!restDbResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await restDbResponse.json();
            if (data.length === 0) {
                throw new Error('Rule not found in RestDB');
            }
            return data[0]; // Assuming that the RestDB returns an array of results
        } catch (restDbError) {
            console.error('Error fetching from RestDB:', restDbError);
            throw restDbError;
        }
    }
}

//====================================================================
export async function getRules(name: string, ruleClass: string, catInfo: { [key: string]: string[] }) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/rule-sections?name=${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (ruleClass === '') {
            console.log("data");
            console.log(data);
            return data;
        } else {
            const filteredData = await filterCheck(data, catInfo, ruleClass);
            console.log("filtereddata");
            console.log(filteredData);
            return filteredData;
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

//====================================================================

export async function getHomebrewSpellInfo(index?: string) {

    let extraAdress = "";
    if(index){
        extraAdress = `?q={"index":"${index}"}`
    }

    const address = `${table1}rest/homebrew-spells${extraAdress}`;

    try {
        const response = await fetch(address, {
            method: 'GET',
            headers: {
                'x-apikey': key1,
                'Content-Type': 'application/json' // Ensure Content-Type is correct
            }
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if(index){
            console.log("data aqui ",data)
        }
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
}

//====================================================================
export const postHomebrewSpellInfo = async (
    name: string,
    author: string,
    index: string,
    level: number,
    school: object,
    duration: string,
    classes: object,
    casting_time: string,
    range: string,
    area_of_effect: object,
    components: object,
    attackType: string,
    dc: object,
    damage: object,
    damage_at_slot_level: object,
    desc: string
) => {
    const info = {
        name: name,
        author: author,
        index: index,
        level: level,
        school: school,
        duration: duration,
        classes: classes,
        casting_time: casting_time,
        range: range,
        area_of_effect: area_of_effect, // Ensure this is correctly named and passed
        components: components,
        attack_type: attackType,
        dc: dc,
        damage: damage,
        damage_at_slot_level: damage_at_slot_level,
        desc: desc
    };


    try {
        const response = await fetch(`${table1}rest/homebrew-spells`, {
            method: 'POST',
            headers: {
                'x-apikey': key1,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            throw new Error('Network response was not ok || ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
//====================================================================

export async function getSpellInfo(spellIndex) {

    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spellIndex}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();


    } catch (error) {
        console.error('Error fetching from external API:', error);

        // Try fetching from RestDB
        try {
            const restDbResponse = await fetch(`${table1}rest/homebrew-spells?q={"index":"${spellIndex}"}`, {
                method: 'GET',
                headers: {
                    'x-apikey': key1,
                    'Content-Type': 'application/json'
                }
            });
            if (!restDbResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await restDbResponse.json();
            if (data.length === 0) {
                throw new Error('Rule not found in RestDB');
            }
            return data[0]; // Assuming that the RestDB returns an array of results
        } catch (restDbError) {
            console.error('Error fetching from RestDB:', restDbError);
            throw restDbError;
        }
    }
}

//====================================================================

export async function getSpells(filterName?: string, filterLevel?: string, filterSchool?: string, spellClass?: string) {
    filterName = '' || filterName;
    filterLevel = null || filterLevel;
    filterSchool = null || filterSchool.toLowerCase();

    let address;
    let schoolAddress = '';

    if(filterSchool != ''){
        schoolAddress = `&school=${filterSchool}`
    }

    if (spellClass == '') {
        filterName = filterName.replace(/\s+/g, "-");
        address = `https://www.dnd5eapi.co/api/spells?name=${filterName}${schoolAddress}`;


        try {
            const response = await fetch(address);

            if (filterSchool && filterSchool != '') {
                address += `&school=${filterSchool}`;
            }

            if (filterLevel && filterLevel != '') {
                address += `&level=${filterLevel}`;
            }

            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    }
    else {
        address = `https://www.dnd5eapi.co/api/classes/${spellClass.toLowerCase()}/spells?${schoolAddress}`;

        console.log(address);

        try {
            const response = await fetch(address);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    }
}

//====================================================================
export async function getCharInfo(charIndex: string) {

    try {
        const restDbResponse = await fetch(`${table1}rest/characters?q={"index":"${charIndex}"}`, {
            method: 'GET',
            headers: {
                'x-apikey': key1,
                'Content-Type': 'application/json'
            }
        });
        if (!restDbResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await restDbResponse.json();
        if (data.length === 0) {
            throw new Error('Rule not found in RestDB');
        }
        return data[0]; // Assuming that the RestDB returns an array of results
    } catch (restDbError) {
        console.error('Error fetching from RestDB:', restDbError);
        throw restDbError;
    }
}

//====================================================================
export async function getChars(author?: string) {

    let extraAdress = "";
    if(author){
        extraAdress = `?q={"author":"${author}"}`

    }
    
    try {
        const restDbResponse = await fetch(`${table1}rest/characters${extraAdress}`, {

            method: 'GET',
            headers: {
                'x-apikey': key1,
                'Content-Type': 'application/json'
            }
        });
        if (!restDbResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await restDbResponse.json();
        if (data.length === 0) {
            throw new Error('Rule not found in RestDB');
        }
        return data; // Assuming that the RestDB returns an array of results
    } catch (restDbError) {
        console.error('Error fetching from RestDB:', restDbError);
        throw restDbError;
    }
}

//====================================================================

export const postCharInfo = async ({
    name,
    author,
    index,
    level,
    race,
    char_class,
    ability_scores,
    weapons,
    armors,
    iventory,
    spells,
    description,
    // picture?: HTMLImageElement
}:{
    name: string,
    author: string,
    index: string,
    level: number,
    race: string,
    char_class: string,
    ability_scores: object,
    weapons: object,
    armors: object,
    iventory: object,
    spells: object,
    description: string,
    // picture?: HTMLImageElement
}
) => {
    const info = {
        name: name,
        author: author,
        index: index,
        level: level,
        race: race,
        char_class: char_class,
        ability_scores: ability_scores,
        weapons: weapons,
        armors: armors,
        iventory: iventory,
        spells: spells,
        description: description,
        // picture: picture
    };


    try {
        const response = await fetch(`${table1}rest/characters`, {
            method: 'POST',
            headers: {
                'x-apikey': key1,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            throw new Error('Network response was not ok || ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

//====================================================================

export async function getCampaignInfo(campaignIndex: string) {

    try {
        const restDbResponse = await fetch(`${table1}rest/campaigns?q={"index":"${campaignIndex}"}`, {
            method: 'GET',
            headers: {
                'x-apikey': key1,
                'Content-Type': 'application/json'
            }
        });
        if (!restDbResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await restDbResponse.json();
        if (data.length === 0) {
            throw new Error('Rule not found in RestDB');
        }
        return data[0]; // Assuming that the RestDB returns an array of results
    } catch (restDbError) {
        console.error('Error fetching from RestDB:', restDbError);
        throw restDbError;
    }
}

//====================================================================

export async function getCampaigns(master?: string) {

    let extraAddress = "";
    if (master){
        extraAddress = `?q={"master":"${master}"}` 
    }

    try {
        const restDbResponse = await fetch(`${table1}rest/campaigns${extraAddress}`, {

            method: 'GET',
            headers: {
                'x-apikey': key1,
                'Content-Type': 'application/json'
            }
        });
        if (!restDbResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await restDbResponse.json();
        if (data.length === 0) {
            throw new Error('Rule not found in RestDB');
        }
        return data; // Assuming that the RestDB returns an array of results
    } catch (restDbError) {
        console.error('Error fetching from RestDB:', restDbError);
        throw restDbError;
    }
}

//====================================================================

export const postCampaignInfo = async ({
    name,
    master,
    index,
    characters,
    isPrivate,
    playersNum,
    homebrews,
    ban,
    desc,
    theme
}: {
    name: string,
    master: string,
    index: string,
    characters: object,
    isPrivate: boolean,
    playersNum: number,
    homebrews: object,
    ban: object,
    desc: string,
    theme: string
}) => {
    const info = {
        name: name,
        master: master,
        index: index,
        characters: characters,
        isPrivate: isPrivate,
        playersNum: playersNum,
        homebrews: homebrews,
        ban: ban,
        desc: desc,
        theme: theme
    };

    try {
        const response = await fetch(`${table1}rest/campaigns`, {
            method: 'POST',
            headers: {
                'x-apikey': key1,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            throw new Error('Network response was not ok || ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

//====================================================================


export async function getEquipment(filterName: string, equipmentCategory: string) {
    filterName = '' || filterName;

    let address = `https://www.dnd5eapi.co/api/equipment?name=${filterName}`;

    if (equipmentCategory != '') {
        equipmentCategory = equipmentCategory.replace(/\s+/g, "-")
        address = `https://www.dnd5eapi.co/api/equipment-categories/${equipmentCategory}`
    }

    try {
        const response = await fetch(address);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

//====================================================================
export function getEquipmentInfo(equipmentIndex: any) {
    return fetch(`https://www.dnd5eapi.co/api/equipment/${equipmentIndex}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');  
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}

//====================================================================
export async function getMagicItem(filterName: string, magicItemCategory: string) {
    filterName = '' || filterName;
    filterName = filterName.replace(/\s+/g, "-");

    let address = `https://www.dnd5eapi.co/api/magic-items?name=${filterName}`;

    if (magicItemCategory != '') {
        magicItemCategory = magicItemCategory.replace(/\s+/g, "-");
        address = `https://www.dnd5eapi.co/api/equipment-categories/${magicItemCategory}`
    }

    try {
        const response = await fetch(address);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

//====================================================================
export function getMagicItemInfo(magicItemIndex: any) {
    return fetch(`https://www.dnd5eapi.co/api/magic-items/${magicItemIndex}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}

// ============ CheckFilters

function filterCheck(items: any, catInfo: { [key: string]: string[] }, filterCat: string) {
    if (filterCat === "Using Ability") {
        filterCat += " Scores";
    }

    const returnArray: any[] = [];

    if (!catInfo[filterCat]) {
        console.error('Category not found:', filterCat);
        return { results: returnArray };
    }

    for (let i = 0; i < items.results.length; i++) {
        if (catInfo[filterCat].includes(items.results[i].name)) {
            returnArray.push(items.results[i]);
        }
    }

    return { results: returnArray };
}

//============================================

export async function getClasses(filterName?: string, classCategory?: string) {
    filterName = '' || filterName;
    filterName = filterName.replace(/\s+/g, "-");

    let address = `https://www.dnd5eapi.co/api/classes?name=${filterName}`;

    if (classCategory != '') {
        classCategory = classCategory.replace(/\s+/g, "-");
        address = `https://www.dnd5eapi.co/api/equipment-categories/${classCategory}`
    }

    try {
        const response = await fetch(address);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export function getClassInfo(classIndex: any) {
    return fetch(`https://www.dnd5eapi.co/api/classes/${classIndex}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}


//============================================

export async function getRaces(filterName?: string, raceCategory?: string) {
    filterName = '' || filterName;
    filterName = filterName.replace(/\s+/g, "-");

    let address = `https://www.dnd5eapi.co/api/races?name=${filterName}`;

    if (raceCategory != '') {
        raceCategory = raceCategory.replace(/\s+/g, "-");
        address = `https://www.dnd5eapi.co/api/equipment-categories/${raceCategory}`
    }

    try {
        const response = await fetch(address);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export function getRaceInfo(raceIndex: any) {
    return fetch(`https://www.dnd5eapi.co/api/races/${raceIndex}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}

export async function getCat() {
    console.log("getting cat");
    try {
        const externalResponse = await fetch(`https://www.dnd5eapi.co/api/rules`);
        if (!externalResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const externalData = await externalResponse.json();

        const resultsDict: { [key: string]: string[] } = {};

        for (const item of externalData.results) {
            const itemResponse = await fetch(`https://www.dnd5eapi.co/api/rules/${item.index}`);
            if (!itemResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const itemData = await itemResponse.json();
            const subsectionNames = itemData.subsections.map(subsection => subsection.name);
            resultsDict[item.name] = subsectionNames;
        }

        // Fetch homebrew categories from RestDB
        try {
            const homebrewResponse = await fetch(`${table1}rest/homebrew-rules`, {
                method: 'GET',
                headers: {
                    'x-apikey': key1,
                    'Content-Type': 'application/json'
                }
            });
            if (!homebrewResponse.ok) {
                // throw new Error('Network response was not ok');
            } else {
                const homebrewData = await homebrewResponse.json();
                homebrewData.forEach(item => {
                    if (resultsDict[item.category]) {
                        resultsDict[item.category].push(item.name);
                    } else {
                        resultsDict[item.category] = [item.name];
                    }
                });
            }
        } catch (error) { /* empty */ }
        console.log("resultsDict");
        console.log(resultsDict);
        return resultsDict;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // throw error;
    }
}