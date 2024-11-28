/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { CharListItem } from '../assetsForDesign/ListItems.js';
import DDoneLoading from '../assetsForDesign/DDoneLoading.js';
import { getChars } from '../FetchLogic.js';
import { useUser } from '../../UserContext.js';


export default function CharListSearch() {
    const { user } = useUser();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');


    useEffect(() => {
        fetchItemsFromApi();
    }, []);

    const fetchItemsFromApi = async () => {
        setIsLoading(true);
        setLoadingMessage('Fetching character list, please wait...');
        try {
            const data = await getChars(user[0].username);
            console.log(data);
            setItems(data);
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
                    <div className="row">
                        <div className="col-md-3 my-5" >
                            <CreateItem item={null} />
                        </div>
                        {items.map((item, index) => (
                            <div className="col-md-3 my-5" key={index}>
                                <CreateItem item={item} index={index} />
                            </div>
                        ))}
                    </div>
                    <br />
                    <br />
                </div>
            </div>
            <DDoneLoading isLoading={isLoading} message={loadingMessage} />
        </div>
    );


}

function CreateItem({ item }: any) {

    return (
        <CharListItem itemInfo={item} />
    );
}