/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CurrentProductId = React.createContext();
const CurrentProduct = React.createContext();
const ProductIDContext = React.createContext();

function useCurrentProduct() {
  const [currentProduct, setCurrentProduct] = React.useContext(CurrentProduct);
  return { currentProduct, setCurrentProduct };
}

function useCurrentProductId() {
  const [currentProductId, setCurrentProductId] = React.useContext(CurrentProductId);
  return { currentProductId, setCurrentProductId };
}

function ProductProvider({ productId, children }) {
  const [currentProductId, setCurrentProductId] = React.useState();
  const [currentProduct, setCurrentProduct] = React.useState();

  React.useEffect(() => {
    setCurrentProductId(productId);
  }, []);

  React.useEffect(() => {
    if (currentProductId) {
      axios({ method: 'get', url: `http://localhost:3100/products/${currentProductId}` })
        .then(({ data }) => {
          setCurrentProduct(data);
        })
        .catch(() => setCurrentProduct(null));
    }
  }, [currentProductId]);

  return (
    <ProductIDContext.Provider value={productId}>
      <CurrentProductId.Provider value={[currentProductId, setCurrentProductId]}>
        <CurrentProduct.Provider value={[currentProduct, setCurrentProduct]}>
          { children }
        </CurrentProduct.Provider>
      </CurrentProductId.Provider>
    </ProductIDContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
  productId: PropTypes.number.isRequired,
};

export {
  ProductIDContext,
  ProductProvider,
  useCurrentProduct,
  useCurrentProductId,
};
