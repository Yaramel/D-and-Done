import { useState, useEffect } from 'react';
import CampaignInfoboard from '../../components and functions/campaigns/CampaignInfoboard';
import { getCampaignInfo } from '../../components and functions/FetchLogic';
import DDoneLoading from '../../components and functions/assetsForDesign/DDoneLoading';

export default function CampaignInfoPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
    const [isLoading, setIsLoading] = useState(false);
    const currentPath = window.location.pathname.toLocaleLowerCase();
    const campaignPath = currentPath.replace("/campaigns/", "");

    const loadingMessage = "Loading Campaign info";

    const [campaignData, setCampaignData] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getCampaignInfo(campaignPath)
            .then(campaignData => {
                setCampaignData(campaignData);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => setIsLoading(false));
    }, [currentPath, campaignPath]);

    // // Artificial char to not use the whole api fetchs:

    // const myJSON: campaignData = {
    //     "_id": "6675f41ad7ae8e2300001b0d",
    //     "name": "Curse of Strahd",
    //     "master": "yara",
    //     "index": "curse-of-strahd-by-yara",
    //     "characters": [
    //       {
    //         "_id": "6675f236d7ae8e2300001b09",
    //         "name": "Bardinho Boladao 2.0",
    //         "author": "yara",
    //         "index": "bardinho-boladao-2.0-by-yara",
    //         "level": 10,
    //         "race": "Elf",
    //         "char_class": "Bard",
    //         "weapons": [
    //           {
    //             "index": "greatclub",
    //             "isEquiped": true
    //           },
    //           {
    //             "index": "club",
    //             "isEquiped": false
    //           }
    //         ],
    //         "ability_scores": {
    //           "str": 10,
    //           "dex": 10,
    //           "con": 10,
    //           "int": 10,
    //           "wis": 10,
    //           "cha": 12
    //         },
    //         "armors": [
    //           {
    //             "index": "studded-leather-armor",
    //             "isEquiped": true
    //           },
    //           {
    //             "index": "padded-armor",
    //             "isEquiped": false
    //           }
    //         ],
    //         "iventory": [
    //           {
    //             "index": "acid-vial"
    //           },
    //           {
    //             "index": "blowgun-needle"
    //           }
    //         ],
    //         "spells": [
    //           {
    //             "index": "aaa-ath-arcane-augory-by-yara"
    //           },
    //           {
    //             "index": "animal-friendship"
    //           }
    //         ],
    //         "description": "Bardinho Boladinho"
    //       }
    //     ],
    //     "playersNum": 5,
    //     "isPrivate": false,
    //     "homebrews": {
    //       "rules": [
    //         {
    //           "_id": "6675f1b2d7ae8e2300001b07",
    //           "name": "Regra regrada",
    //           "author": "yara",
    //           "index": "regra-regrada-by-yara",
    //           "category": "Adventuring",
    //           "desc": "HAHAHA",
    //           "source": "external"
    //         }
    //       ],
    //       "spells": [
    //         {
    //           "_id": "6675f141d7ae8e2300001b06",
    //           "name": "Aaa Ath Arcane Augory",
    //           "author": "yara",
    //           "index": "aaa-ath-arcane-augory-by-yara",
    //           "school": {
    //             "index": "enchantment",
    //             "name": "Enchantment",
    //             "url": "/api/magic-school/Enchantment"
    //           },
    //           "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
    //           "level": 1,
    //           "classes": [
    //             "Bard"
    //           ],
    //           "area_of_effect": {
    //             "type": "cube",
    //             "size": "15"
    //           },
    //           "components": [
    //             "V",
    //             "S",
    //             "M"
    //           ],
    //           "attack_type": "Select",
    //           "dc": {
    //             "dc_type": {
    //               "index": "dex",
    //               "name": "DEX",
    //               "url": "/api/ability-scores/dex"
    //             }
    //           },
    //           "damage": {
    //             "damage_type": {
    //               "index": "psychic",
    //               "name": "Psychic",
    //               "url": "/api/damage-types/psychic"
    //             }
    //           },
    //           "damage_at_slot_level": [
    //             "2 d6"
    //           ],
    //           "duration": "Instantaneous",
    //           "casting_time": "Action",
    //           "range": "15 feet",
    //           "source": "external"
    //         }
    //       ]
    //     },
    //     "ban": {
    //       "classes": [
    //         {
    //           "index": "cleric",
    //           "name": "Cleric",
    //           "url": "/api/classes/cleric",
    //           "source": "external"
    //         },
    //         {
    //           "index": "druid",
    //           "name": "Druid",
    //           "url": "/api/classes/druid",
    //           "source": "external"
    //         }
    //       ],
    //       "spells": [
    //         {
    //           "index": "fireball",
    //           "name": "Fireball",
    //           "level": 3,
    //           "url": "/api/spells/fireball",
    //           "source": "external"
    //         }
    //       ],
    //       "races": [
    //         {
    //           "index": "half-orc",
    //           "name": "Half-Orc",
    //           "url": "/api/races/half-orc",
    //           "source": "external"
    //         }
    //       ]
    //     },
    //     "desc": "Vamo la matar um vampirinho muito malvado.",
    //     "theme": "lovecraftian",
    //     "_created": "2024-06-21T21:43:54.377Z",
    //     "_changed": "2024-06-21T21:43:54.377Z",
    //     "_createdby": "api",
    //     "_changedby": "api",
    //     "_version": 0
    //  }

    return (
        <>
            <header>
                {/* <CampaignInfoboard campaignData={myJSON} /> */}
                {campaignData && <CampaignInfoboard campaignData={campaignData} />}
            </header>
            <DDoneLoading isLoading={isLoading} message={loadingMessage} />
        </>
    );
}
