import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useMeta } from '../../../contexts/ReviewMeta';
import RatingBar from './RatingBar';

export default function RatingList({ toggleFilter }) {
  const starList = [];
  // let totalCT = 0;

  const currentMeta = useMeta();
  if (currentMeta) {
    const { ratings, totalCT } = currentMeta;
    const starArray = [5, 4, 3, 2, 1];

    starArray.forEach((key) => {
      const currentCT = Number(ratings[key]);
      if (Number.isNaN(currentCT)) {
        starList.push({ id: key, decimal: 0 });
      } else {
        starList.push({ id: key, decimal: currentCT / totalCT });
      }
    });
  }

  return (
    <Ratings>
      {starList.map((item) => {
        const scorePerct = Math.floor((item.decimal) * 100).toString().concat('%');
        return (
          <RatingBar
            key={item.id}
            scorePerct={scorePerct}
            id={item.id.toString()}
            data-testid="ratingBar"
            toggleFilter={toggleFilter}
          />
        );
      })}
    </Ratings>
  );
}

// Style components
const Ratings = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-right: 3rem;
`;

RatingList.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
};
