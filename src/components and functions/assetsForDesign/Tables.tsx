import { useState, useEffect } from 'react';
import {BanListItemPost,  SpellListItemPost, EquipmentListItemPost, CharacterListItemPost, HomebrewListItemPost } from './ListItems.tsx'; // Import the SpellListItemPost component

import DDoneButton from './DDoneButton.tsx';

export function SpellListTablePost({ charClass, charLevel, spellAmount, onSpellItemsUpdate, spellList }) {
    const [spellItems, setSpellItems] = useState([]);
    const [tableKey, setTableKey] = useState(0);

    useEffect(() => {
        console.log('Spell items updated:', spellItems);
        onSpellItemsUpdate(spellItems); // Call the callback function to update the parent state
    }, [spellItems]);

    // Handler to update spellItems when a spell is changed
    const handleSpellChange = (spell, index) => {
        const newSpellItems = [...spellItems];
        newSpellItems[index] = spell;
        setSpellItems(newSpellItems);
        console.log('spell change')
    };

    // Handler to add a new spell to spellItems
    const handleAdd = () => {
        setSpellItems([...spellItems, null]);
        console.log('handle add')
    };

    // Handler to delete a spell from spellItems
    const handleDelete = (index) => {
        const newSpellItems = spellItems.filter((_, i) => i !== index);
        setSpellItems(newSpellItems);
    };

    // useEffect to re-render the table whenever spellItems changes
    useEffect(() => {
        console.log('use effect')
        // Incrementing tableKey to trigger re-render
        setTableKey((prevKey) => prevKey + 1);
    }, [spellItems]);

    // Render spell items and add spell button
    return (
        <div key={tableKey}>
            {spellItems.map((spell, index) => (
                <SpellListItemPost
                    key={index}
                    index={index}
                    initialSpell={spell}
                    spellList={spellList}
                    onDelete={() => handleDelete(index)}
                    onSpellChange={handleSpellChange}
                    charClass={charClass}
                    charLevel={charLevel}
                />
            ))}
            <br />
            {spellItems.length < spellAmount && <DDoneButton
                width="100px"
                height={2}
                onClick={handleAdd}
                text="Add Spell"
                disabled={spellItems.length > 0 && spellItems[spellItems.length - 1] === null}
            />
            }
        </div>
    );
}

//====================================================================

export function EquipmentListTablePost({ cat, onEquipmentItemsUpdate }) {
    const [equipmentItems, setEquipmentItems] = useState([]);
    const [tableKey, setTableKey] = useState(0);
    const [equipMax, setEquipMax] = useState(0);
    const [isMaxOut, setIsMaxOut] = useState(false);

    // Set the equipMax based on the cat prop
    useEffect(() => {
        if (cat === "weapon") {
            setEquipMax(2);
        } else if (cat === "armor") {
            setEquipMax(1);
        } else {
            setEquipMax(0);
        }
    }, [cat]);

    // Check if the max equipment limit is reached
    useEffect(() => {
        if (!equipmentItems.includes(null)) {
            const equippedCount = equipmentItems.filter(equipment => equipment.isEquiped && equipment.index != "shield").length;
            setIsMaxOut(equippedCount >= equipMax);
        }
    }, [equipmentItems, equipMax]);

    const handleEquipmentChange = (equipment, index) => {
        const newEquipmentItems = [...equipmentItems];
        newEquipmentItems[index] = equipment;
        setEquipmentItems(newEquipmentItems);
    };

    useEffect(() => {
        onEquipmentItemsUpdate(equipmentItems);
    }, [equipmentItems, onEquipmentItemsUpdate]);

    useEffect(() => {
        // Incrementing tableKey to trigger re-render
        setTableKey((prevKey) => prevKey + 1);
    }, [equipmentItems]);

    const handleAdd = () => {
        setEquipmentItems([...equipmentItems, null]);
    };

    const handleDelete = (index) => {
        const newEquipmentItems = equipmentItems.filter((_, i) => i !== index);
        setEquipmentItems(newEquipmentItems);
    };


    return (
        <div key={tableKey}>
            {equipmentItems.map((equipment, index) => (
                <EquipmentListItemPost
                    key={index}
                    onDelete={() => handleDelete(index)}
                    initialEquipment={equipment}
                    cat={cat}
                    index={index}
                    onEquipmentChange={handleEquipmentChange}
                    isMaxOut={isMaxOut && !equipment?.isEquiped}
                />
            ))}
            <br />
            <DDoneButton
                width="150px"
                height={2}
                onClick={handleAdd}
                text="Add Equipment"
                disabled={equipmentItems.length > 0 && equipmentItems[equipmentItems.length - 1] === null}
            />
        </div>
    );
}

//====================================================================

export function BanListTablePost({ type, onItemsUpdate }) {
    const [items, setItems] = useState([]);
    const [tableKey, setTableKey] = useState(0);

    useEffect(() => {
        onItemsUpdate(items); // Call the callback function to update the parent state
    }, [items]);

    const handleItemChange = (item, index) => {
        const newItems = [...items];
        newItems[index] = item;
        setItems(newItems);
    };

    const handleAdd = () => {
        setItems([...items, null]);
    };

    const handleDelete = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    useEffect(() => {
        setTableKey((prevKey) => prevKey + 1);
    }, [items]);

    return (
        <div key={tableKey}>
            {items.map((item, index) => (
                <BanListItemPost
                    key={index}
                    index={index}
                    initialItem={item}
                    onDelete={() => handleDelete(index)}
                    onItemChange={handleItemChange}
                    type={type}
                />
            ))}
            <br />
            <DDoneButton
                width="100px"
                height={2}
                onClick={handleAdd}
                text={`Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                disabled={items.length > 0 && items[items.length - 1] === null}
            />
        </div>
    );
}

//====================================================================

export function CharacterListTablePost({ onItemsUpdate, charAmount, characterList }) {
    const [items, setItems] = useState([]);
    const [tableKey, setTableKey] = useState(0);

    useEffect(() => {
        onItemsUpdate(items); // Call the callback function to update the parent state
    }, [items]);

    const handleItemChange = (item, index) => {
        const newItems = [...items];
        newItems[index] = item;
        setItems(newItems);
    };

    const handleAdd = () => {
        setItems([...items, null]);
    };

    const handleDelete = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    useEffect(() => {
        setTableKey((prevKey) => prevKey + 1);
    }, [items]);

    return (
        <div key={tableKey}>
            {items.map((item, index) => (
                <CharacterListItemPost
                    characterList={characterList}
                    key={index}
                    index={index}
                    initialItem={item}
                    onDelete={() => handleDelete(index)}
                    onItemChange={handleItemChange}
                />
            ))}
            <br />
            {items.length < charAmount && <DDoneButton
                width="150px"
                height={2}
                onClick={handleAdd}
                text="Add Character"
                disabled={items.length > 0 && items[items.length - 1] === null}
            />}
        </div>
    );
}

export function HomebrewListTablePost({ type, onItemsUpdate, itemList }) {
    const [items, setItems] = useState([]);
    const [tableKey, setTableKey] = useState(0);

    useEffect(() => {
        onItemsUpdate(items);
    }, [items]);

    const handleItemChange = (item, index) => {
        const newItems = [...items];
        newItems[index] = item;
        setItems(newItems);
    };

    const handleAdd = () => {
        setItems([...items, null]);
    };

    const handleDelete = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    useEffect(() => {
        setTableKey((prevKey) => prevKey + 1);
    }, [items]);

    return (
        <div key={tableKey}>
            {items.map((item, index) => (
                <HomebrewListItemPost
                    itemList={itemList}
                    key={index}
                    index={index}
                    initialItem={item}
                    onDelete={() => handleDelete(index)}
                    onItemChange={handleItemChange}
                    type={type}
                />
            ))}
            <br />
            <DDoneButton
                width="100px"
                height={2}
                onClick={handleAdd}
                text={`Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                disabled={items.length > 0 && items[items.length - 1] === null}
            />
        </div>
    );
}