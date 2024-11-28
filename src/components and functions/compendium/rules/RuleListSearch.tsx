/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { RuleListItem } from '../../assetsForDesign/ListItems.tsx';
import { RuleFilter } from '../../assetsForDesign/FiltersMenu.tsx';
import { RuleListHeader } from '../../assetsForDesign/ListHeaders.tsx';
import Pagination from '../../assetsForDesign/Pagination.tsx';
import { getHomebrewRuleInfo, getRules, getRuleInfo, getCat } from "../../FetchLogic.tsx";
import DDoneLoading from '../../assetsForDesign/DDoneLoading.js';

export default function RuleListSearch() {
    const [items, setItems] = useState<any[]>([]);
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [catInfo, setCatInfo] = useState<{ [fieldName: string]: string[] }>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filter, setFilter] = useState({
        name: '',
        ruleClass: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    useEffect(() => {
        fetchItemsFromApi();
    }, []);

    const fetchItemsFromApi = async () => {
        setIsLoading(true);
        setLoadingMessage('Fetching rules, please wait...');
        try {
            const data = await getRules('', '', catInfo);
            const homebrewData = await getHomebrewRuleInfo('', '', '');

            const allItems = [
                ...(data.results || []).map(item => ({ ...item, source: 'external' })),
                ...homebrewData.map(item => ({ ...item, source: 'restdb' }))
            ];

            // Sort items alphabetically by name
            allItems.sort((a, b) => a.name.localeCompare(b.name));

            setItems(allItems);
            setFilteredItems(allItems);
        } catch (error) {
            try {
                const data = await getRules('', '', catInfo);
    
                const allItems = [
                    ...(data.results || []).map(item => ({ ...item, source: 'external' })),
                ];
    
                // Sort items alphabetically by name
                allItems.sort((a, b) => a.name.localeCompare(b.name));
    
                setItems(allItems);
                setFilteredItems(allItems);
            } catch (error) {
                console.error(error)
            }
        } finally {
            setTimeout(() => { setIsLoading(false) }, 500);
        }
    };

    useEffect(() => {
        async function fetchData() {
            const catData = await getCat();
            setCatInfo(catData);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (catInfo) {
            console.log("Updated catInfo:", catInfo);
        }
    }, [catInfo]);

    useEffect(() => {
        filterItems();
    }, [filter, items]);

    const filterItems = async () => {
        setIsLoading(true);
        let filtered = items;

        if (filter.name) {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(filter.name.toLowerCase()));
        }

        if (filter.ruleClass) {

           filtered = filtered.filter(item => catInfo[filter.ruleClass].includes(item.name));
        }

        // Sort items alphabetically by name
        filtered.sort((a, b) => a.name.localeCompare(b.name));

        setFilteredItems(filtered);
        setCurrentPage(1);
        setTimeout(() => { setIsLoading(false) }, 500);
    };

    async function handleFilterChange(filterData: { name: string; ruleClass: string; }) {
        setFilter({
            name: filterData.name,
            ruleClass: filterData.ruleClass == "Using Ability" ? "Using Ability Scores" : filterData.ruleClass
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
                    <RuleFilter onRuleFilterChange={handleFilterChange} />
                    <br />
                    <RuleListHeader />
                    <ul className="custom-list">
                        {currentItems.map((item, index) => (
                            <li key={index}>
                                <CreateItem item={item} catInfo={catInfo} index={index} />
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

function CreateItem({ item, catInfo }: any) {
    const [itemInfo, setItemInfo] = useState(null);

    useEffect(() => {
        if (item.source === 'external') {
            fetchRuleInfo(item.index);
        } else {
            setItemInfo(item);
        }
    }, [item.index]);

    const fetchRuleInfo = async (ruleIndex: any) => {
        try {
            const data = await getRuleInfo(ruleIndex);
            setItemInfo(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!itemInfo) {
        return null; // Handle case where itemInfo is not yet loaded
    }

    return (
        <RuleListItem itemInfo={itemInfo} catInfo={catInfo} />
    );
}
