/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { ClassListItem } from '../../assetsForDesign/ListItems.js';
import { ClassListHeader } from '../../assetsForDesign/ListHeaders.tsx';
import DDoneLoading from '../../assetsForDesign/DDoneLoading.js';
import { getClassInfo, getClasses } from '../../FetchLogic.tsx';

export default function ClassListSearch() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');


    useEffect(() => {
        fetchItemsFromApi();
    }, []);

    const fetchItemsFromApi = async () => {
        setIsLoading(true);
        setLoadingMessage('Fetching classes, please wait...');
        try {
            const data = await getClasses('', '');
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

                    <ClassListHeader />
                    <ul className="custom-list">
                        {items.map((item, index) => (
                            <li key={index}>
                                <CreateItem item={item} filter={{
                                    name: '',
                                    classCategory: ''
                                }
                                } index={index} />
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
        fetchClassInfo(item.index);
    }, [item.index]);

    const fetchClassInfo = async (classIndex: any) => {
        try {
            const data = await getClassInfo(classIndex);
            setItemInfo(data);
        } catch (error) {
            console.error('Error fetching class info:', error);
        }
    };

    if (!itemInfo) {
        return null; // Handle case where itemInfo is not yet loaded
    }

    return (
        <ClassListItem itemInfo={itemInfo} />
    );
}
