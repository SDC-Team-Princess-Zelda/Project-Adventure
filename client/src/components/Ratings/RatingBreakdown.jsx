import React from 'react';
import RatingOverview from './RatingOverview';
import RatingList from './RatingList';
import { RatingBreakdownContainer } from '../Styles/RatingSection.styled';
import { ReviewProvider } from './ReviewContext';

export default function RatingBreakdown() {
  return (
    <ReviewProvider>
      <RatingBreakdownContainer>
        <RatingOverview />
        <RatingList />
        {/* <FactorList /> */}
      </RatingBreakdownContainer>
    </ReviewProvider>
  );
}
