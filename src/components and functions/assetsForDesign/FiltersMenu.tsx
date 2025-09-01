/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import DDoneTextInput from './DDoneTextInput.tsx';
import DDoneDropdown from './DDoneDropdown.tsx';
import DDoneImageToggle from './DDoneImageToggle.tsx';
import DDoneButton from './DDoneButton.tsx';

interface SpellFilterProps {
    onSpellFilterChange: (filters: { name: string; level: string; school: string; spellClass: string, source: string}) => void;
    isHomebrew?:  boolean;
}

interface RuleFilterProps {
    onRuleFilterChange: (filters: { name: string; ruleClass: string }) => void;
}

interface MagicItemFilterProps {
    onMagicItemFilterChange: (filters: { name: string; category: string }) => void;
}

interface EquipmentFilterProps {
    onEquipmentFilterChange: (filters: { name: string, category: string }) => void;
}

interface CampFilterProps {
    onCampFilterChange: (filters: { name: string, author:string, campTheme: string }) => void;
    isYours: boolean;
    isPlayer?: boolean;
    campTheme: string;


}

export const SpellFilter: React.FC<SpellFilterProps> = ({ onSpellFilterChange, isHomebrew }) => {
    console.log(isHomebrew);
    const [filterText, setFilterText] = useState('');
    const [spellLevel, setSpellLevel] = useState('');
    const [spellSchool, setSpellSchool] = useState('');
    const [spellClass, setSpellClass] = useState('');
    const [source, setSource] = useState('');

    const handleFilterChange = () => {
        onSpellFilterChange({
            name: filterText,
            level: spellLevel,
            school: spellSchool,
            spellClass: spellClass,
            source: source,
        });
    };

    const handleSelectSchool = (school: string) => {
        setSpellSchool(school);
    };

    const handleSelectLevel = (level: string) => {
        if (level === 'Cantrip') {
            setSpellLevel('0');
        } else {
            setSpellLevel(level);
        }
    };

    const handleSelectSource = (source: string) => {
        setSource(source);
    };

    const getLevelLabel = (level: string) => {
        if (level === '') return 'Any Level';
        if (level === '0') return 'Cantrip';
        if (level === '1') return '1st level';
        if (level === '2') return '2nd level';
        if (level === '3') return '3rd level';
        return `${level}th level`;
    };

    const filterReset = () => {
        setFilterText('');
        setSpellLevel('');
        setSpellSchool('');
        setSpellClass('');
        setSource('');
        setSelectedClass(null);

        onSpellFilterChange({
            name: '',
            level: '',
            school: '',
            spellClass: '',
            source: '',
        });
    };

    const filterClass = (spellClass: string) => {
        setSpellClass(spellClass);

        onSpellFilterChange({
            name: filterText,
            level: spellLevel,
            school: spellSchool,
            spellClass: spellClass,
            source: source,
        });
    };

    const classOptions = ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'];

    const [selectedClass, setSelectedClass] = useState<string|null>('');

    const handleToggle = (cls: string) => () => {
        if (selectedClass === cls) {
            filterClass('');
            setSelectedClass(null);
        } else {
            filterClass(cls);
            setSelectedClass(cls);
        }
    };

    const sourceOptions = ['Any Source', 'Core', 'Homebrews'];



    const levelOptions = ['Any Level', 'Cantrip', ...Array.from({ length: 9 }, (_, i) => `${i + 1}`)];
    const schoolOptions = ['Any School', 'Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];

    
    useEffect(() => {
        console.log("effect", isHomebrew)
        if (isHomebrew) {
            setSource('Homebrews');
            onSpellFilterChange({
                name: '',
                level: '',
                school: '',
                spellClass: '',
                source: 'homebrews',
            });
            handleFilterChange();
        }
        handleFilterChange();
    }, []);

    return (
        <ul className="custom-list">
            <li>
                <div className="rounded filterBoard container">
                    <section className="container m-3">
                        <br />
                        <h6 className="titleText">Available for: </h6>
                        <div className="row align-items-center justify-content-center">
                            {classOptions.map((cls) => (
                                <div key={cls} className="col-mx-2 d-flex align-items-center text-center custom-link">
                                    <div className="py-3 text-center">
                                        <DDoneImageToggle
                                            imageName={cls.toLowerCase()}
                                            label={cls}
                                            isSelected={selectedClass === cls}
                                            onToggle={handleToggle(cls)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <br />
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="row justify-content-around">
                                <div className="col-md-3 d-flex align-items-center mobile-margin">
                                    <DDoneTextInput
                                        width="100%"
                                        placeholder="Enter Spell Name"
                                        value={filterText}
                                        onChange={(value) => setFilterText(value)}
                                        onKeyPress={(e) => { if (e.key === 'Enter') handleFilterChange(); }}
                                    />
                                </div>
                                <div className="col-md-2 d-flex align-items-center mobile-margin">
                                    <DDoneDropdown
                                        width="200px"
                                        height="32px"
                                        options={levelOptions}
                                        value={getLevelLabel(spellLevel)}
                                        onChange={(value) => handleSelectLevel(value === 'Any Level' ? '' : value)}
                                    />
                                </div>
                                <div className="col-md-2 d-flex align-items-center mobile-margin">
                                    <DDoneDropdown
                                        width="200px"
                                        height="32px"
                                        options={schoolOptions}
                                        value={spellSchool || 'Any School'}
                                        onChange={(value) => handleSelectSchool(value === 'Any School' ? '' : value)}
                                    />
                                </div>
                                <div className="col-md-2 d-flex align-items-center mobile-margin" >
                                    <DDoneDropdown
                                        width="170px"
                                        height="32px"
                                        options={sourceOptions}
                                        value={source || 'Any Source'}
                                        onChange={(value) => handleSelectSource(value === 'Any Source' ? '' : value)}
                                    />
                                </div>
                                <div className="col-md-2 d-flex flex-column align-items-center mobile-margin">
                                    <DDoneButton
                                        width="100px"
                                        height={2}
                                        onClick={() => handleFilterChange()}
                                        text="Filter"
                                    />
                                    {/* <button className="btn btn-outline-info w-100" onClick={handleFilterChange}>Filter</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-10"></div>
                            <div className="col-md-2 align-items-center mobile-reset">
                                <div className="titleText mx-3 clickable" style={{ fontSize: 'small' }} onClick={() => filterReset()}>Reset Filter</div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </li>
        </ul>
    );
};

export const RuleFilter: React.FC<RuleFilterProps> = ({ onRuleFilterChange }) => {
    const [filterText, setFilterText] = useState('');
    const [ruleClass, setRuleClass] = useState('');

    const handleFilterChange = () => {
        onRuleFilterChange({
            name: filterText,
            ruleClass: ruleClass,
        });
    };

    const handleSelectClass = (ruleClass: string) => {
        setRuleClass(ruleClass);
    };

    function filterReset() {
        setFilterText('');
        setRuleClass('');

        onRuleFilterChange({
            name: '',
            ruleClass: '',
        });
    }

    const ruleCategories = ['Any Category', 'Adventuring', 'Appendix', 'Combat', 'Equipment', 'Spellcasting', 'Using Ability'];

    return (
        <ul className="custom-list">
            <li>
                <div className="rounded filterBoard container">
                    <br />

                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="row justify-content-around">
                                <div className="col-md-4 d-flex align-items-center">
                                    <DDoneTextInput
                                        width="600px"
                                        placeholder="Search by rule name"
                                        value={filterText}
                                        onChange={(value) => setFilterText(value)}
                                        onKeyPress={(e) => { if (e.key === 'Enter') handleFilterChange(); }}
                                    />
                                </div>

                                <div className="col-md-2 d-flex align-items-center">
                                    <DDoneDropdown
                                        width="200px"
                                        height="32px"
                                        options={ruleCategories}
                                        value={ruleClass || 'Any Category'}
                                        onChange={(value) => handleSelectClass(value === 'Any Category' ? '' : value)}
                                    />
                                </div>

                                <div className="col-md-2 d-flex flex-column align-items-center">
                                    <DDoneButton
                                        width="100px"
                                        height={2}
                                        onClick={() => handleFilterChange()}
                                        text="Filter"
                                    />
                                    {/* <button className="btn btn-outline-info w-100" onClick={handleFilterChange}>
                                        Filter
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-9"></div>
                            <div className="col-md-2 mx-4 align-items-around">
                                <div className="mx-3 align-items-around">
                                    <div className="titleText mx-4 clickable" style={{ fontSize: 'small' }} onClick={filterReset}>
                                        Reset Filter
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />
                </div>
            </li>
        </ul>
    );
}

export const MagicItemFilter: React.FC<MagicItemFilterProps> = ({ onMagicItemFilterChange }) => {
    const [filterText, setFilterText] = useState('');
    const [magicItemCategory, setMagicItemCategory] = useState('Any Category');

    const filterReset = () => {
        setFilterText('');
        setMagicItemCategory('');

        onMagicItemFilterChange({
            name: '',
            category: '',
        });
    };


    const handleFilterChange = () => {
        onMagicItemFilterChange({
            name: filterText,
            category: magicItemCategory
        });
    };

    const options = ['Any Category', 'Armor', 'Wondrous Items', 'Weapon'];

    return (
        <ul className="custom-list">
            <li>
                <div className="rounded filterBoard container">
                    <br />

                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className='row justify-content-around'>
                                <div className='col-md-4 d-flex align-items-center'>
                                    <DDoneTextInput
                                        width="300px"
                                        placeholder="Enter magic item name"
                                        value={filterText}
                                        onChange={(value) => setFilterText(value)}
                                        onKeyPress={(e) => { if (e.key === 'Enter') handleFilterChange(); }}
                                    />
                                </div>
                                <div className='col-md-3 d-flex align-items-center'>
                                    <DDoneDropdown
                                        width="170px"
                                        height="33px" // Number of lines for the dropdown
                                        options={options}
                                        value={magicItemCategory}
                                        onChange={(value) => setMagicItemCategory(value)}
                                    />
                                </div>
                                <div className='col-md-2 d-flex align-items-center'>
                                    <DDoneButton
                                        width="100px"
                                        height={2}
                                        onClick={() => handleFilterChange()}
                                        text="Filter"
                                    />
                                    {/* <button className="btn btn-primary mt-2" onClick={handleFilterChange}>Filter</button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-9"></div>
                            <div className="col-md-2 mx-3 align-items-around">
                                <div className="mx-3 align-items-around">
                                    <div className="titleText mx-4 clickable" style={{ fontSize: 'small' }} onClick={filterReset}>
                                        Reset Filter
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />

                </div>
            </li>
        </ul>
    );
};



export const EquipmentFilter: React.FC<EquipmentFilterProps> = ({ onEquipmentFilterChange }) => {
    const [filterText, setFilterText] = useState('');
    const [equipmentCategory, setEquipmentCategory] = useState('Any Category');


    const filterReset = () => {
        setFilterText('');
        setEquipmentCategory('');

        onEquipmentFilterChange({
            name: '',
            category: '',
        });
    };

    const handleFilterChange = () => {
        onEquipmentFilterChange({
            name: filterText,
            category: equipmentCategory
        });
    };

    const options = ['Any Category', 'Adventuring Gear', 'Armor', 'Mounts and Vehicles', 'Tools', 'Weapon'];

    return (
        <ul className="custom-list">
            <li>
                <div className="rounded filterBoard container">
                    <br />

                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className='row justify-content-around'>
                                <div className='col-md-4 d-flex align-items-center'>
                                    <DDoneTextInput
                                        width="300px"
                                        placeholder="Enter equipment name"
                                        value={filterText}
                                        onChange={(value) => setFilterText(value)}
                                        onKeyPress={(e) => { if (e.key === 'Enter') handleFilterChange(); }}
                                    />
                                </div>
                                <div className='col-md-3 d-flex align-items-center'>
                                    <DDoneDropdown
                                        width="200px"
                                        height="33px"
                                        options={options}
                                        value={equipmentCategory}
                                        onChange={(value) => setEquipmentCategory(value)}
                                    />
                                </div>
                                <div className='col-md-2 d-flex align-items-center'>
                                    <DDoneButton
                                        width="100px"
                                        height={2}
                                        onClick={() => handleFilterChange()}
                                        text="Filter"
                                    />
                                    {/* <button className="btn btn-primary mt-2" onClick={handleFilterChange}>Filter</button> */}
                                </div>
                            </div >
                        </div>
                    </div >


                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-9"></div>
                            <div className="col-md-2 mx-3 align-items-around">
                                <div className="mx-3 align-items-around">
                                    <div className="titleText mx-4 clickable" style={{ fontSize: 'small' }} onClick={filterReset}>
                                        Reset Filter
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
{/* ola */}
                    <br />

                </div >
            </li>
        </ul>
    );
};


export function CampaignFilter ({ onCampFilterChange , isYours, isPlayer }:Partial<CampFilterProps>) {
    const [filterText, setFilterText] = useState('');
    const [filterText2, setFilterText2] = useState('');
    const [campTheme, setCampTheme] = useState('');

    const handleFilterChange = () => {
        onCampFilterChange({
            name: filterText,
            author: filterText2,
            campTheme: campTheme,
        });
    };

    const handleSelectTheme = (campTheme: string) => {
        setCampTheme(campTheme);
    };

    function filterReset() {
        setFilterText('');
        setCampTheme('');

        onCampFilterChange({
            name: '',
            author:'',
            campTheme: '',
        });
    }

    const campThemes = ['Any Setting', 'Distopic', 'Futuristic', 'High-Fantasy', 'Lovecraftian', 'Medieval', 'Steampunk', 'Victorian', 'Western', 'Other'];

    return (
        <ul className="custom-list">
            <li>
                <div className="rounded filterBoard container">
                    <br />

                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="row justify-content-around">
                                {(!isYours || isPlayer) && <div className="col-md-4 d-flex align-items-center mobile-margin">
                                    <DDoneTextInput
                                        width="600px"
                                        placeholder="Search Master Name"
                                        value={filterText2}
                                        onChange={(value) => setFilterText2(value)}
                                        onKeyPress={(e) => { if (e.key === 'Enter') handleFilterChange(); }}
                                    />
                                </div>}

                                <div className="col-md-4 d-flex align-items-center mobile-margin">
                                    <DDoneTextInput
                                        width="600px"
                                        placeholder="Search Campaign Name"
                                        value={filterText}
                                        onChange={(value) => setFilterText(value)}
                                        onKeyPress={(e) => { if (e.key === 'Enter') handleFilterChange(); }}
                                    />
                                </div>

                                <div className="col-md-2 d-flex align-items-center mobile-margin">
                                    <DDoneDropdown
                                        width="200px"
                                        height="32px"
                                        options={campThemes}
                                        value={campTheme || 'Any Setting'}
                                        onChange={(value) => handleSelectTheme(value === 'Any Setting' ? '' : value)}
                                    />
                                </div>

                                <div className="col-md-2 d-flex flex-column align-items-center mobile-margin">
                                    <DDoneButton
                                        width="100px"
                                        height={2}
                                        onClick={() => handleFilterChange()}
                                        text="Filter"
                                    />
                                    {/* <button className="btn btn-outline-info w-100" onClick={handleFilterChange}>
                                        Filter
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {(isYours && !isPlayer) && <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-9"></div>
                            <div className="col-md-2 mx-4 align-items-around mobile-reset">
                                <div className="mx-3 align-items-around">
                                    <div className="titleText mx-4 clickable" style={{ fontSize: 'small' }} onClick={filterReset}>
                                        Reset Filter
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {(!isYours || isPlayer) && <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-10"></div>
                            <div className="col-md-2 align-items-around mobile-reset mobile-reset">
                                <div className="align-items-around">
                                    <div className="titleText mx-4 clickable" style={{ fontSize: 'small' }} onClick={filterReset}>
                                        Reset Filter
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

                    <br />
                </div>
            </li>
        </ul>
    );
}