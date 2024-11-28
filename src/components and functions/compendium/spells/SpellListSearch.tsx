import { useState, useEffect } from 'react';
import { SpellListItem } from '../../assetsForDesign/ListItems.tsx';
import { SpellFilter } from '../../assetsForDesign/FiltersMenu.tsx';
import { SpellListHeader } from '../../assetsForDesign/ListHeaders.tsx';
import Pagination from '../../assetsForDesign/Pagination.tsx';
import { getHomebrewSpellInfo, getSpells, getSpellInfo } from "../../FetchLogic.tsx";
import DDoneLoading from '../../assetsForDesign/DDoneLoading.js';

export default function SpellListSearch({ isHomebrew }) {
    const [allItems, setAllItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');


    useEffect(() => {
        fetchItemsFromApi();
    }, []);

    const fetchItemsFromApi = async () => {
        setIsLoading(true);
        setLoadingMessage('Fetching spells, please wait...');
        try {
            const homebrewData = await getHomebrewSpellInfo();
            const data = await getSpells('', '', '', '');

            const allFetchedItems = [
                ...(data.results || []).map(item => ({ ...item, source: 'core' })),
                ...homebrewData.map(item => ({ ...item, source: 'homebrews' }))
            ];

            // Sort items alphabetically by name
            allFetchedItems.sort((a, b) => a.name.localeCompare(b.name));
            setAllItems(allFetchedItems);
            if (isHomebrew){
                setFilteredItems(allFetchedItems.filter(item => item.source == 'homebrews'));
            }
            else {
                setFilteredItems(allFetchedItems);
            }

        } catch (error) {
            try {
                const data = await getSpells('', '', '', '');
                const allItems = [
                    ...(data.results || []).map(item => ({ ...item, source: 'core' })),
                ];
                allItems.sort((a, b) => a.name.localeCompare(b.name));
                setAllItems(allItems);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        } finally {
            setTimeout(() => { setIsLoading(false) }, 500);
        }
    };

    const handleFilterChange = (filterData) => {
        filterItems(filterData);
    };

    const filterItems = async (filterData) => {
        setIsLoading(true);
        setLoadingMessage('Filtering spells, please wait...');
        setCurrentPage(1);

        let filtered = allItems;

        if (filterData.name) {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(filterData.name.toLowerCase()));
        }

        if (filterData.level) {
            filtered = filtered.filter(item => item.level.toString() === filterData.level);
        }

        if (filterData.school) {
            const response = await getSpells('', '', filterData.school.toLowerCase(), '');
            console.log(response)
            const schoolSpellIndices = new Set(response.results.map(spell => spell.index));

            console.log(schoolSpellIndices)

            filtered = filtered.filter(spell => schoolSpellIndices.has(spell.index) || (spell.school && spell.school.index === filterData.school.toLowerCase()));
        }

        if (filterData.spellClass) {
            const classSpells = await getSpells('', '', '', filterData.spellClass.toLowerCase());
            const classSpellIndices = new Set(classSpells.results.map(spell => spell.index));

            filtered = filtered.filter(item => classSpellIndices.has(item.index) || (item.classes && item.classes.includes(filterData.spellClass)));

        }
        if (filterData.source) {
                filtered = filtered.filter(item => item.source == filterData.source.toLowerCase());
        }

        setFilteredItems(filtered);
        setIsLoading(false);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setIsLoading(true);
        setTimeout(() => { setIsLoading(false) }, 500);
    };

    const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <SpellFilter onSpellFilterChange={handleFilterChange} isHomebrew={isHomebrew} />
                    <br />
                    <SpellListHeader />
                    <ul className="custom-list">
                        {currentItems.map((item, index) => (
                            <li key={index}>
                                <CreateItem item={item} />
                            </li>
                        ))}
                    </ul>
                    <br />
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

function CreateItem({ item }) {
    const [itemInfo, setItemInfo] = useState(null);

    useEffect(() => {
        if (item && item.source === 'core') {
            fetchSpellInfo(item.index);
        } else {
            setItemInfo(item);
        }
    }, [item]);

    const fetchSpellInfo = async (spellIndex) => {
        try {
            const data = await getSpellInfo(spellIndex);
            setItemInfo(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!itemInfo || itemInfo == null) {
        return null;
    }

    return (
        <SpellListItem itemInfo={itemInfo} />
    );
}
