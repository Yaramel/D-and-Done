import React from 'react';

interface ScoreDisplayerProps {
  score: number;
  title: string;
}

const ScoreDisplayer: React.FC<ScoreDisplayerProps> = ({ score, title }) => {
  const modifier = Math.floor((score - 10) / 2);
  const modifierString = modifier >= 0 ? `+${modifier}` : `${modifier}`;

  return (
    <div className="score-displayer">
      <div className="score-title">{title}</div>
      <div className="score-value">
        {score}
      </div>
      <div className="score-modifier">
        {modifierString}
      </div>
    </div>
  );
};

export default ScoreDisplayer;