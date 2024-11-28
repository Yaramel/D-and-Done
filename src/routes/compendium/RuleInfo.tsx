import { useState, useEffect } from 'react';
import RuleInfoboard from '../../components and functions/compendium/rules/RuleInfoboard';
import { getRuleInfo } from '../../components and functions/FetchLogic'; // Assuming you have this function already defined

export default function RuleInfo() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    const [ruleData, setRuleData] = useState(null);

    useEffect(() => {
        const currentPath = window.location.pathname.toLocaleLowerCase();
        const rulePath = currentPath.replace("/rules/", "");
        getRuleInfo(rulePath)
            .then(ruleData => {
                setRuleData(ruleData);
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });
    }, []); // Trigger effect when currentPath or rulePath changes

    return (
        <>
            <header>
                {ruleData && <RuleInfoboard ruleData={ruleData} />}
            </header>
        </>
    );
}
