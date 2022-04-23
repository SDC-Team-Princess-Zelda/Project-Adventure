import React, {
  useState, useEffect, useContext, createContext,
} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Console from '../../../Console';
import { useCurrentProductId } from '../../../contexts/ProductIDContext';

const RelatedContext = createContext();

export function useRelated() {
  return useContext(RelatedContext);
}

export function RelatedProvider({ children }) {
  const [related, setRelatedInfo] = useState();
  const { currentProductId } = useCurrentProductId();

  useEffect(() => {
    if (currentProductId) {
      axios({
        method: 'get',
        url: `http://localhost:3100/products/${currentProductId}/related`,
      })
        .then(({ data }) => {
          setRelatedInfo(data);
        })
        .catch((err) => Console.log('ERROR in RelatedContext', err));
    }
  }, [currentProductId]);

  return (
    <RelatedContext.Provider value={related}>
      { children }
    </RelatedContext.Provider>
  );
}

RelatedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
