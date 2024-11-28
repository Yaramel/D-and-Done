/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { RaceListItem } from '../../assetsForDesign/ListItems.js';
import { RaceListHeader } from '../../assetsForDesign/ListHeaders.tsx';
import DDoneLoading from '../../assetsForDesign/DDoneLoading.js';
import { getRaceInfo, getRaces } from '../../FetchLogic.tsx';

export default function RaceListSearch() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');


    useEffect(() => {
        fetchItemsFromApi();
    }, []);

    const fetchItemsFromApi = async () => {
        setIsLoading(true);
        setLoadingMessage('Fetching races list, please wait...');
        try {
            const data = await getRaces('', '');
            setItems(data.results.filter(item => (!item.url.includes('-1') && !item.url.includes('-2') && !item.url.includes('-3'))));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setTimeout(() => { setIsLoading(false) }, 500);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">

                    <RaceListHeader />
                    <ul className="custom-list">
                        {items.map((item, index) => (
                            <li key={index}>
                                <CreateItem item={item} filter={{
                                    name: '',
                                    raceCategory: ''
                                }} index={index} />
                            </li>
                        ))}
                    </ul>

                    <br />
                </div>
            </div>
            <DDoneLoading isLoading={isLoading} message={loadingMessage} />

        </div>
    );
}

function CreateItem({ item }: any) {
    const [itemInfo, setItemInfo] = useState(null);

    useEffect(() => {
        fetchRaceInfo(item.index);
    }, [item.index]);

    const fetchRaceInfo = async (raceIndex: any) => {
        try {
            const data = await getRaceInfo(raceIndex);
            setItemInfo(data);
        } catch (error) {
            console.error('Error fetching race info:', error);
        }
    };

    if (!itemInfo) {
        return null; // Handle case where itemInfo is not yet loaded
    }

    return (
        <RaceListItem itemInfo={itemInfo} />
    );
}