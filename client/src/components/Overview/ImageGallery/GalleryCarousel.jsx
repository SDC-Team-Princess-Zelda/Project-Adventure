import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GalleryThumbnail from './GalleryThumbnail';

function GalleryCarousel({
  photos,
  activeIndex,
  maxSize,
  handleDownClick,
  handleUpClick,
}) {
  // const [viewportPosition, setViewportPosition] = useState(0);

  return (
    <Carousel>
      <UpArrow
        visible={activeIndex > 0}
        onClick={handleUpClick}
      >
        UP
      </UpArrow>
      <CarouselViewport size={maxSize}>
        <CarouselItems>
          {photos.map((photo, i) => (
            <GalleryThumbnail
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              isSelected={(activeIndex === i)}
              url={photo.url}
            />
          ))}
        </CarouselItems>
      </CarouselViewport>
      <DownArrow
        visible={activeIndex < (photos.length - 1)}
        onClick={handleDownClick}
      >
        DOWN
      </DownArrow>
    </Carousel>
  );
}

const Arrow = styled.div`
  text-align: center;
  height: 20px;
  background: ${(props) => props.theme.colors.primary};
  ${(props) => (!props.visible && 'visibility: hidden;')}
  &:hover {
    cursor: pointer;
  }
`;

const UpArrow = styled(Arrow)`

`;

const DownArrow = styled(Arrow)`

`;

const CarouselItems = styled.div`
  width: 100%;
`;

const Carousel = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: inline-block;
  width: 72px;
`;

const CarouselViewport = styled.div`
  width: 100%;
  height: ${((props) => props.size * 85)}px;
  overflow: hidden;
`;

GalleryCarousel.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeIndex: PropTypes.number,
  maxSize: PropTypes.number,
  handleDownClick: PropTypes.func.isRequired,
  handleUpClick: PropTypes.func.isRequired,
};

GalleryCarousel.defaultProps = {
  activeIndex: 0,
  maxSize: 3,
};

export default GalleryCarousel;
