import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import styled from 'styled-components';


// should retrieve all related products from initial product page
// map each individual card with all the information

export default function Individualcard({ product }) {
  return (
    <div>
      <CardText>
        <p>{product.category}</p>
        <p>{product.name}</p>
        <p>
          $
          {product.default_price}
        </p>
        <p>CSS rating with stars</p>
      </CardText>
    </div>
  );
}

const IndCard = styled.div`
  border-style: solid;
  border-width: 2px;
  width: fit-content;
  margin-right: 30px;
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 0 15px 0 15px;
  &:hover {
    box-shadow: 0 8px 16px 0;
  }
`;

const CardText = styled.div`
  padding-left: 1px;
`;

export {
  Individualcard,
  IndCard,
};
