
import RuleInfoboardHomebrew from '../../components and functions/homebrew/HomebrewRuleCreate';
import { useEffect } from 'react';


export default function RuleInfoHomebrew() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
  return (
      <>
          <header>
              <RuleInfoboardHomebrew />
          </header>
      </>
  );
}