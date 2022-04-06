import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ProductIDContext } from './ProductIDContext';

const ReviewContext = React.createContext();
ReviewContext.displayName = 'RatingData';

export function useMeta() {
  return useContext(ReviewContext);
}

// Context has reviewMeta received from API plus converted avgRating and total rating count
export function ReviewProvider({ children }) {
  const productId = useContext(ProductIDContext);
  const [reviewMeta, setReviewMeta] = useState(null);

  function convertRating(data) {
    let totalRating;
    let avgRating = 0;
    let totalCT = null;
    const { ratings } = data;
    Object.keys(ratings).forEach((key) => {
      const currentCT = Number(ratings[key]);
      totalRating = key * currentCT;
      totalCT += currentCT;
    });
    avgRating = Math.round((totalRating / totalCT) * 10) / 10;
    return { avgRating, totalCT };
  }

  useEffect(() => {
    let newData;
    axios({
      method: 'get',
      url: 'http://localhost:3000/reviews/meta',
      params: {
        product_id: productId,
      },
    })
      .then(({ data }) => {
        newData = data;
        const RatingDetails = convertRating(data);
        newData.avgRating = RatingDetails.avgRating;
        newData.totalCT = RatingDetails.totalCT;
        setReviewMeta(newData);
      })
      .catch(() => setReviewMeta(null));
  }, [productId]);

  return (
    <ReviewContext.Provider value={reviewMeta}>
      { children }
    </ReviewContext.Provider>
  );
}

ReviewProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
