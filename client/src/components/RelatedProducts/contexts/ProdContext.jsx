/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import {
  React, useContext, useState, useEffect, createContext,
} from 'react';
import axios from 'axios';
import Console from '../../../Console';
import { useRelated } from './RelatedContext';

const ProdContext = createContext();

export function useProd() {
  return useContext(ProdContext);
}
export function ProdProvider({ children }) {
  const related = useRelated();
  const [relatedInformation, setRelatedInformation] = useState([]);
  const [ratingsMeta, setRatingsMeta] = useState();

  useEffect(() => {
    if (related) {
      Promise.all(related.map((number) => axios({
        method: 'get',
        url: `http://localhost:3100/products/${number}`,
      })))
        .then((data) => {
          setRelatedInformation({ data });
        })
        .catch((err) => Console.log('there was an ERROR in Prod', err));
    }
  }, [related]);

  function convertRating(data) {
    let totalRating = 0;
    let avgRating = 0;
    let totalCT = null;
    const { ratings } = data;
    Object.keys(ratings).forEach((key) => {
      const currentCT = Number(ratings[key]);
      totalRating += key * currentCT;
      totalCT += currentCT;
    });
    avgRating = Math.round((totalRating / totalCT) * 10) / 10;
    return { avgRating, totalCT };
  }

  useEffect(() => {
    let newData;
    if (related) {
      Promise.all(related.map((number) => axios({
        method: 'get',
        url: '/reviews/meta',
        params: {
          product_id: number,
        },
      })))
        .then((data) => {
          const testArray = [];
          Promise.all(data.map((item) => {
            if (item) {
              newData = item.data;
              const RatingDetails = convertRating(newData);
              newData.avgRating = RatingDetails.avgRating;
              newData.totalCT = RatingDetails.totalCT;
              testArray.push(newData.avgRating);
              setRatingsMeta(testArray);
            }
          }));
        })
        .catch(() => setRatingsMeta(null));
    }
  }, [related]);

  return (
    <ProdContext.Provider value={{ relatedInformation, ratingsMeta }}>
      { children }
    </ProdContext.Provider>
  );
}

export default ProdContext;
