import React from 'react';
import styled from 'styled-components';
import { patternInfo } from '../data/patternInfo';

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


const Instructions = () => {
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
