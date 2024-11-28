/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { EquipmentListItem } from '../../assetsForDesign/ListItems.tsx';
import { EquipmentFilter } from '../../assetsForDesign/FiltersMenu.tsx';
import { EquipmentListHeader } from '../../assetsForDesign/ListHeaders.tsx';
import Pagination from '../../assetsForDesign/Pagination.tsx';
import DDoneLoading from '../../assetsForDesign/DDoneLoading.js';
import { getEquipment, getEquipmentInfo } from "../../FetchLogic.tsx";

export default function EquipmentListSearch() {
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
            const data = await getEquipment(filter.name, '');
            setItems(data.results);
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
            const filteredData = await getEquipment(filterText.name, '');
            setItems(filteredData.results);

            // Populate classItems only if filterText.class is not empty
            if (filterText.category != '') {
                // Fetch equipment info for each item and filter by class

                const fetchEquipmentData = async (category, name) => {
                    const equipmentFilteredByCat = await getEquipment('', category.replace(" ","-").toLowerCase());
                    if (name !== '') {
                        return equipmentFilteredByCat.equipment.filter(item => item.name.includes(name.toLowerCase()) && !item.url.includes("magic-items"));
                    } else {
                        return equipmentFilteredByCat.equipment.filter(item => item.name.includes('') && !item.url.includes("magic-items"));
                    }
                };
                
                // Call the fetchEquipmentData function and await its result
                const itemsFilter = await fetchEquipmentData(filterText.category, filterText.name);
                setItems(itemsFilter);

                // return equipmentInfo.results;
    
            }
        } catch (error) {
            console.error('Error fetching equipment:', error);
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

                    <EquipmentFilter onEquipmentFilterChange={(args:any) => handleFilterChange(args)} />
                    <br />
                    <EquipmentListHeader />
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
        <EquipmentListItem itemInfo={itemInfo} />
    );
}