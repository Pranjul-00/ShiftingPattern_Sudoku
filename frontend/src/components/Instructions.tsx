import React, { useState, useEffect } from 'react';
import { PatternInfo } from '../types';
import { api } from '../services/api';
import './Instructions.css';

const Instructions: React.FC = () => {
  const [patternInfo, setPatternInfo] = useState<PatternInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatternInfo = async () => {
      try {
        const data = await api.getPatternInfo();
        setPatternInfo(data);
      } catch (error) {
        console.error('Error fetching pattern info:', error);
        // Fallback data if API fails
        setPatternInfo({
          title: "Sudoku Shifting Pattern Challenge",
          description: "Master the unique shifting pattern to create a valid Sudoku grid",
          rules: [
            {
              group: "Columns 1-3",
              start_number: 1,
              details: [
                "Col 1: Place 1 at row 1, 2 at row 2, ..., 9 at row 9",
                "Col 2: Place 1 at row 4, 2 at row 5, ..., wrapping to top",
                "Col 3: Place 1 at row 7, 2 at row 8, ..., wrapping to top"
              ]
            },
            {
              group: "Columns 4-6",
              start_number: 2,
              details: [
                "Col 4: Place 2 at row 1, 3 at row 2, ..., wrapping after 9",
                "Col 5: Place 2 at row 4, 3 at row 5, ..., wrapping around",
                "Col 6: Place 2 at row 7, 3 at row 8, ..., wrapping around"
              ]
            },
            {
              group: "Columns 7-9",
              start_number: 3,
              details: [
                "Col 7: Place 3 at row 1, 4 at row 2, ..., wrapping after 9",
                "Col 8: Place 3 at row 4, 4 at row 5, ..., wrapping around",
                "Col 9: Place 3 at row 7, 4 at row 8, ..., wrapping around"
              ]
            }
          ],
          note: "This creates a valid Sudoku where no number repeats in any row, column, or 3×3 box!"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatternInfo();
  }, []);

  if (loading) {
    return (
      <div className="instructions">
        <div className="loading">Loading instructions...</div>
      </div>
    );
  }

  if (!patternInfo) {
    return (
      <div className="instructions">
        <div className="error">Failed to load instructions</div>
      </div>
    );
  }

  return (
    <div className="instructions">
      <h1>{patternInfo.title}</h1>
      <p>{patternInfo.description}:</p>
      <ol>
        {patternInfo.rules.map((rule, index) => (
          <li key={index}>
            <strong>{rule.group}:</strong> Start with number {rule.start_number}
            <ul>
              {rule.details.map((detail, detailIndex) => (
                <li key={detailIndex}>{detail}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p><em>{patternInfo.note}</em></p>
    </div>
  );
};

export default Instructions;
