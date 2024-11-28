import React from 'react';

interface ScoreDisplayerInputProps {
  score: number | string;
  title: string;
  onScoreChange: (newScore: number | string) => void;
}

const ScoreDisplayerInput: React.FC<ScoreDisplayerInputProps> = ({ score, title, onScoreChange }) => {
  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScore = e.target.value;
    if (newScore === '' || !isNaN(Number(newScore))) {
      onScoreChange(newScore === '' ? '' : Math.min(parseInt(newScore, 10), 20));
    }
  };

  const modifier = (typeof score === 'number' && score > 0) ? Math.floor((score - 10) / 2) : '-';
  
  return (
    <div className="score-displayer">
      <div className="score-title">{title[0].toUpperCase() + title.slice(1)}</div>
      <div className="score-value">
        <input
          type={ score == null ?  "number" : "text"}
          value={score != 0 && !isNaN(score as number) ? score : ""}
          onChange={handleScoreChange}
          className="score-input"
          placeholder="-"
        />
      </div>
      <div className="score-modifier">
        {modifier}
      </div>
    </div>
  );
};

export default ScoreDisplayerInput;
