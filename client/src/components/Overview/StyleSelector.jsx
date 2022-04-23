import React from 'react';
import styled from 'styled-components';

import { FiCheck } from 'react-icons/fi';

import { usePreviewStyle, useCurrentStyles, useActiveStyle } from '@Contexts/StylesProvider';

import useTracking from '@Contexts/ClickTracker';

function StyleSelector() {
  const currentStyles = useCurrentStyles();
  const { previewStyle } = usePreviewStyle();
  const { trackEvent } = useTracking({ widget: 'Style Selector' });

  const { activeStyle, setActiveStyle } = useActiveStyle();
  const { setPreviewStyle } = usePreviewStyle();

  const handleStyleThumbnailClick = (styleId) => {
    console.log(styleId);
    setActiveStyle(styleId);
    trackEvent({ element: `Thumbnail ${styleId} Clicked` });
  };
  const handleStyleThumbnailMouseOver = (styleId) => setPreviewStyle(styleId);
  const handleStyleThumbnailMouseOut = () => setPreviewStyle(activeStyle.style_id);

  return (
    <StyleSelectorContainer>
      <strong>STYLE &gt; </strong>
      {previewStyle && previewStyle.name.toUpperCase()}

      {/* Only display the style selector if there is more than one style to choose from */}
      {(currentStyles.length > 1) && (
        <Thumbnails>
            {currentStyles.map((style) => (
              <Thumbnail
                thumbnail={style.photos[0].thumbnail_url}
                key={style.style_id}
                onClick={() => handleStyleThumbnailClick(style.style_id)}
                onMouseOver={() => handleStyleThumbnailMouseOver(style.style_id)}
                onMouseOut={() => handleStyleThumbnailMouseOut()}
              >
                {(style.style_id === activeStyle.style_id)
                && <SelectedThumbnail><FiCheck size={15} /></SelectedThumbnail>}
              </Thumbnail>
            ))}
        </Thumbnails>
      )}

    </StyleSelectorContainer>
  );
}

const Thumbnails = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  gap: 15px;
  max-width: 350px;
  padding: 10px 0;
`;

const SelectedThumbnail = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  right: -3px;
  top: -3px;
  background: #4CAF50;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.offWhite};;
  & > * {
    position: absolute;
    top: 3px;
    left: 2px;
  }
`;

const Thumbnail = styled.a`
  height: 69px;
  width: 69px;
  border-radius: 50%;
  background: ${(props) => (props.thumbnail ? `url(${props.thumbnail})` : props.theme.colors.background)};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease-in-out;
  }
  &:active {
    transform: scale(0.99);
    transition: transform 0.06s ease-in-out;
  }
  transition: transform 0.1s ease-in-out;
`;

const StyleSelectorContainer = styled.section`
  padding: 10px 0;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 0.9em;
`;

export default StyleSelector;
