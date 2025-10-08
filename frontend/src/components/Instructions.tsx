import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PatternInfo } from '../types';
import { api } from '../services/api';

const InstructionsContainer = styled.div`
  background: rgba(139, 69, 19, 0.2);
  border: 2px solid #8b4513;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  flex: 1;
  max-width: 500px;
`;

const Title = styled.h1`
  color: #dc143c;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-top: 0;
  font-size: 1.5rem;
`;

const OrderedList = styled.ol`
  color: #f4e6d7;
  padding-left: 1.2rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const UnorderedList = styled.ul`
  margin: 0.5rem 0;
  padding-left: 1rem;
  
  li {
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
  }
`;

const Paragraph = styled.p`
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const Emphasis = styled.em`
  color: #dc143c;
  font-weight: bold;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 2rem;
  color: #f4e6d7;
  font-style: italic;
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc143c;
  font-style: italic;
`;

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
      <InstructionsContainer>
        <LoadingText>Loading instructions...</LoadingText>
      </InstructionsContainer>
    );
  }

  if (!patternInfo) {
    return (
      <InstructionsContainer>
        <ErrorText>Failed to load instructions</ErrorText>
      </InstructionsContainer>
    );
  }

  return (
    <InstructionsContainer>
      <Title>{patternInfo.title}</Title>
      <Paragraph>{patternInfo.description}:</Paragraph>
      <OrderedList>
        {patternInfo.rules.map((rule, index) => (
          <ListItem key={index}>
            <strong>{rule.group}:</strong> Start with number {rule.start_number}
            <UnorderedList>
              {rule.details.map((detail, detailIndex) => (
                <li key={detailIndex}>{detail}</li>
              ))}
            </UnorderedList>
          </ListItem>
        ))}
      </OrderedList>
      <Paragraph><Emphasis>{patternInfo.note}</Emphasis></Paragraph>
    </InstructionsContainer>
  );
};

export default Instructions;
