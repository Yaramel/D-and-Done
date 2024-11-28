/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';

import { useUser } from '../../UserContext.tsx';
import { getCampaigns } from '../FetchLogic.tsx';


import { CampaignListItem } from '../assetsForDesign/ListItems.tsx';
import { CampaignFilter } from '../assetsForDesign/FiltersMenu.tsx';

import DDoneLoading from '../assetsForDesign/DDoneLoading.tsx';

import Pagination from '../assetsForDesign/Pagination.tsx';


export default function CampaignListSearch({ isYours }) {
    const dummy = [
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "lovecraftian",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "high-fantasy",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "medieval",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "futuristic",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "lovecraftian",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "western",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "steampunk",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "lovecraftian",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "lovecraftian",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "lovecraftian",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "lovecraftian",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "lovecraftian",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "lovecraftian",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "lovecraftian",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },
        {
            "_id": "6675f41ad7ae8e2300001b0d",
            "name": "Curse of Strahd",
            "master": "yara",
            "index": "curse-of-strahd-by-yara",
            "characters": [
                {
                    "_id": "6675f236d7ae8e2300001b09",
                    "name": "Bardinho Boladao 2.0",
                    "author": "yara",
                    "index": "bardinho-boladao-2.0-by-yara",
                    "level": 10,
                    "race": "Elf",
                    "char_class": "Bard",
                    "weapons": [
                        {
                            "index": "greatclub",
                            "isEquiped": true
                        },
                        {
                            "index": "club",
                            "isEquiped": false
                        }
                    ],
                    "ability_scores": {
                        "str": 10,
                        "dex": 10,
                        "con": 10,
                        "int": 10,
                        "wis": 10,
                        "cha": 12
                    },
                    "armors": [
                        {
                            "index": "studded-leather-armor",
                            "isEquiped": true
                        },
                        {
                            "index": "padded-armor",
                            "isEquiped": false
                        }
                    ],
                    "iventory": [
                        {
                            "index": "acid-vial"
                        },
                        {
                            "index": "blowgun-needle"
                        }
                    ],
                    "spells": [
                        {
                            "index": "aaa-ath-arcane-augory-by-yara"
                        },
                        {
                            "index": "animal-friendship"
                        }
                    ],
                    "description": "Bardinho Boladinho"
                }
            ],
            "playersNum": 5,
            "isPrivate": false,
            "homebrews": {
                "rules": [
                    {
                        "_id": "6675f1b2d7ae8e2300001b07",
                        "name": "Regra regrada",
                        "author": "yara",
                        "index": "regra-regrada-by-yara",
                        "category": "Adventuring",
                        "desc": "HAHAHA",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "_id": "6675f141d7ae8e2300001b06",
                        "name": "Aaa Ath Arcane Augory",
                        "author": "yara",
                        "index": "aaa-ath-arcane-augory-by-yara",
                        "school": {
                            "index": "enchantment",
                            "name": "Enchantment",
                            "url": "/api/magic-school/Enchantment"
                        },
                        "desc": "An amazing amorphus augory aflicts any adult around an appointed area.",
                        "level": 1,
                        "classes": [
                            "Bard"
                        ],
                        "area_of_effect": {
                            "type": "cube",
                            "size": "15"
                        },
                        "components": [
                            "V",
                            "S",
                            "M"
                        ],
                        "attack_type": "Select",
                        "dc": {
                            "dc_type": {
                                "index": "dex",
                                "name": "DEX",
                                "url": "/api/ability-scores/dex"
                            }
                        },
                        "damage": {
                            "damage_type": {
                                "index": "psychic",
                                "name": "Psychic",
                                "url": "/api/damage-types/psychic"
                            }
                        },
                        "damage_at_slot_level": [
                            "2 d6"
                        ],
                        "duration": "Instantaneous",
                        "casting_time": "Action",
                        "range": "15 feet",
                        "source": "external"
                    }
                ]
            },
            "ban": {
                "classes": [
                    {
                        "index": "cleric",
                        "name": "Cleric",
                        "url": "/api/classes/cleric",
                        "source": "external"
                    },
                    {
                        "index": "druid",
                        "name": "Druid",
                        "url": "/api/classes/druid",
                        "source": "external"
                    }
                ],
                "spells": [
                    {
                        "index": "fireball",
                        "name": "Fireball",
                        "level": 3,
                        "url": "/api/spells/fireball",
                        "source": "external"
                    }
                ],
                "races": [
                    {
                        "index": "half-orc",
                        "name": "Half-Orc",
                        "url": "/api/races/half-orc",
                        "source": "external"
                    }
                ]
            },
            "desc": "Vamo la matar um vampirinho muito malvado.",
            "theme": "lovecraftian",
            "_created": "2024-06-21T21:43:54.377Z",
            "_changed": "2024-06-21T21:43:54.377Z",
            "_createdby": "api",
            "_changedby": "api",
            "_version": 0
        },


    ]

    console.log(isYours)
    const { user } = useUser(); 

    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
    const [filter, setFilter] = useState({
        name: '',
        author: '',
        campTheme: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    // const [items, setItems] = useState(dummy);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItemsFromApi();
    }, []);

    const fetchItemsFromApi = async () => {
        setIsLoading(true);
        setLoadingMessage('Fetching campaign list, please wait...');
        let data;
        try {
            if (isYours && user[0].isMaster) {
                data = await getCampaigns(user[0].username);
            }
            else { //is lobby or not master
                data = await getCampaigns();
            }
            console.log(data)
             if (isYours && !user[0].isMaster) { //no lobby no master
             data = data.filter(campaign => campaign.characters.some(character => character.author.toLowerCase() === user[0].username.toLowerCase()))
            }
    
            setItems(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };


    
    useEffect(() => {
        filterItems();
    }, [filter, items]);

    const filterItems = async () => {
        setIsLoading(true);
        let filtered = items;

        if (filter.name) {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(filter.name.toLowerCase()));
            console.log(items);
        }

        if (filter.author) {
            filtered = filtered.filter(item => item.master.toLowerCase().includes(filter.author.toLowerCase()));
            console.log(items);
        }

        if (filter.campTheme) {
            filtered = filtered.filter(item => item.theme == filter.campTheme.toLowerCase());
        }

        // Sort items alphabetically by name
        filtered.sort((a, b) => a.name.localeCompare(b.name));

        setFilteredItems(filtered);
        setCurrentPage(1);
        setTimeout(() => { setIsLoading(false) }, 500);
    };

    async function handleFilterChange(filterData: { name: string; author: string; campTheme: string; }) {
        setFilter({
            name: filterData.name,
            author: filterData.author,
            campTheme: filterData.campTheme
        });
    }

    const paginate = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
        setIsLoading(true);
        setTimeout(() => { setIsLoading(false) }, 500);
    };

    const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                <CampaignFilter onCampFilterChange={(args:any) => handleFilterChange(args)}
                isYours={isYours} 
                isPlayer={user && !user[0].isMaster}/>
                <br />
                    <div className="row">
                        {user && user[0].isMaster && isYours && <div className="col-md-3 my-3" >
                            <CreateItem item={null} />
                        </div>}

                        {items.length > 0 && currentItems.map((item, index) => (
                            <div className="col-md-3 my-3" key={index}>
                                <CreateItem item={item} index={index} />
                            </div>
                        ))}
                    </div>


                </div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <br/>
                <br/>
                <br/>
                <br/>
            <Pagination items={filteredItems}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                    </div>
            </div>
            <DDoneLoading isLoading={isLoading} message={loadingMessage} />
        </div>
    );
}

function CreateItem({ item }: any) {
    return (
        <CampaignListItem itemInfo={item} />
    );
}
