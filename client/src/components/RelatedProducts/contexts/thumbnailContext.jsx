/* eslint-disable react/prop-types */
import {
  React, useContext, useState, useEffect, createContext,
} from 'react';
import axios from 'axios';
import Console from '../../../Console';
import { useRelated } from './RelatedContext';

const ThumbnailContext = createContext();

export function useThumbnail() {
  return useContext(ThumbnailContext);
}
export function ThumbnailProvider({ children }) {
  const related = useRelated();

  const [thumbnailInformation, setThumbnailInformation] = useState([]);

  useEffect(() => {
    if (related) {
      Promise.all(related.map((number) => axios({
        method: 'get',
        url: `http://localhost:3100/products/${number}/styles`,
      })))
        .then((data) => {
          setThumbnailInformation({ data });
        })
        .catch((err) => Console.log('there was an ERROR in Thumbnail', err));
    }
  }, [related]);

  return (
    <ThumbnailContext.Provider value={thumbnailInformation}>
      { children }
    </ThumbnailContext.Provider>
  );
}

export default ThumbnailContext;
