/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useCurrentProductId } from './ProductIDContext';

const CurrentStyles = React.createContext();
const ActiveStyleId = React.createContext();
const PreviewStyleId = React.createContext();

function getStyle(styles, id) {
  return (styles) ? styles.find((i) => i.style_id === id) || styles[0] : null;
}

function useCurrentStyles() { return React.useContext(CurrentStyles); }

function useActiveStyle() {
  const [activeId, setActiveId] = React.useContext(ActiveStyleId);
  const currStyles = React.useContext(CurrentStyles);

  const [activeStyle, setActiveStyle] = [getStyle(currStyles, activeId), setActiveId];
  return { activeStyle, setActiveStyle };
}

function usePreviewStyle() {
  const [previewId, setPreviewId] = React.useContext(PreviewStyleId);
  const currStyles = React.useContext(CurrentStyles);

  const [previewStyle, setPreviewStyle] = [getStyle(currStyles, previewId), setPreviewId];
  return { previewStyle, setPreviewStyle };
}

function StylesProvider({ children }) {
  const [currentStyles, setCurrentStyles] = React.useState();
  const [activeStyleId, setActiveStyleId] = React.useState();
  const [previewStyleId, setPreviewStyleId] = React.useState();
  const { currentProductId } = useCurrentProductId();

  React.useEffect(() => {
    if (currentProductId) {
      axios({ method: 'get', url: `http://localhost:3100/products/${currentProductId}/styles` })
        .then(({ data }) => { setCurrentStyles(data.results); })
        .catch(() => setCurrentStyles([]));
    }
  }, [currentProductId]);

  React.useEffect(() => {
    if (currentStyles && currentStyles[0]?.style_id) {
      setActiveStyleId(currentStyles[0].style_id);
    }
  }, [currentStyles]);

  React.useEffect(() => {
    setPreviewStyleId(activeStyleId);
  }, [activeStyleId]);

  return (
    <CurrentStyles.Provider value={currentStyles}>
      <ActiveStyleId.Provider value={[activeStyleId, setActiveStyleId]}>
        <PreviewStyleId.Provider value={[previewStyleId, setPreviewStyleId]}>
          { children }
        </PreviewStyleId.Provider>
      </ActiveStyleId.Provider>
    </CurrentStyles.Provider>
  );
}

StylesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  useActiveStyle,
  usePreviewStyle,
  useCurrentStyles,
  StylesProvider,
};
