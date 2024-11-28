/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { MagicItemListItem } from '../../assetsForDesign/ListItems.tsx';
import { MagicItemFilter } from '../../assetsForDesign/FiltersMenu.tsx';
import { MagicItemListHeader } from '../../assetsForDesign/ListHeaders.tsx';
import Pagination from '../../assetsForDesign/Pagination.tsx';
import DDoneLoading from '../../assetsForDesign/DDoneLoading.js';
import { getMagicItemInfo, getMagicItem } from "../../FetchLogic.tsx";


export default function MagicItemListSearch() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filter, setFilter] = useState({
        name: '',
        category: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');


    useEffect(() => {
        fetchItemsFromApi();
    }, []);

    const fetchItemsFromApi = async () => {
        setIsLoading(true);
        setLoadingMessage('Fetching spells, please wait...');
        try {
            const data = await getMagicItem(filter.name, '');
            setItems(data.results.filter(item => (!item.url.includes('-1') && !item.url.includes('-2') && !item.url.includes('-3'))));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setTimeout(() => { setIsLoading(false) }, 500);
        }
    };

    const handleFilterChange = async (filterText: { name: string; category: string; }) => {
        setIsLoading(true);
        setLoadingMessage('Fetching spells, please wait...');
        setCurrentPage(1);
        try {
            setFilter({
                name: filterText.name,
                category: filterText.category
            });
            const filteredData = await getMagicItem(filterText.name, '');
            filteredData.results = filteredData.results.filter(item => (!item.url.includes('-1') && !item.url.includes('-2') && !item.url.includes('-3')));
            setItems(filteredData.results);

            // Populate classItems only if filterText.class is not empty
            if (filterText.category != '') {
                // Fetch magicItem info for each item and filter by class

                const fetchMagicItemData = async (category, name) => {
                    const magicItemFilteredByCat = await getMagicItem('', category.replace(" ", "-").toLowerCase());
                    if (name !== '') {
                        console.log(magicItemFilteredByCat);
                        return magicItemFilteredByCat.equipment.filter(item => (!item.url.includes('-1') && !item.url.includes('-2') && !item.url.includes('-3')) && item.index.includes(name.replace(" ", "-").toLowerCase()) && item.url.includes("magic-items"));
                    } else {
                        console.log(magicItemFilteredByCat);
                        return magicItemFilteredByCat.equipment.filter(item => (!item.url.includes('-1') && !item.url.includes('-2') && !item.url.includes('-3')) && item.name.includes('') && item.url.includes("magic-items"));
                    }
                };

                // Call the fetchMagicItemData function and await its result
                const itemsFilter = await fetchMagicItemData(filterText.category, filterText.name);
                setItems(itemsFilter);

                // return magicItemInfo.results;

            }
        } catch (error) {
            console.error('Error fetching magicItem:', error);
        }
        finally {
            setTimeout(() => { setIsLoading(false) }, 500);
        }
    };


    const paginate = (pageNumber: React.SetStateAction<number>) => {setCurrentPage(pageNumber); setIsLoading(true); setTimeout(() => { setIsLoading(false) }, 500)};
    const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">

                    <MagicItemFilter onMagicItemFilterChange={handleFilterChange} />
                    <br />
                    <MagicItemListHeader />
                    <ul className="custom-list">
                        {currentItems.map((item, index) => (
                            <li key={index}>
                                <CreateItem item={item} filter={filter} index={index} />
                            </li>
                        ))}
                    </ul>

                    <br />

                    <Pagination items={items}
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
    const [itemInfo, setItemInfo] = useState(null);

    useEffect(() => {
        fetchMagicItemInfo(item.index);
    }, [item.index]);

    const fetchMagicItemInfo = async (magicItemIndex: any) => {
        try {
            const data = await getMagicItemInfo(magicItemIndex);
            setItemInfo(data);
        } catch (error) {
            console.error('Error fetching magicItem info:', error);
        }
    };

    if (!itemInfo) {
        return null; // Handle case where itemInfo is not yet loaded
    }

    return (
        <MagicItemListItem itemInfo={itemInfo} />
    );
}