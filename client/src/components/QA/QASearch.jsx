// eslint-disable-next-line no-unused-vars
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Search({
  setSearchQuestionBody,
  searchQuesitonBody,
  setsubmitSearchQuestionBody,
}) {
  return (
    <SearchSection>
      <form onSubmit={((e) => {
        e.preventDefault();
        console.log(searchQuesitonBody);
        setsubmitSearchQuestionBody(searchQuesitonBody);
      })}
      >
        <label htmlFor="QASearchText">
          <span>Search Q & A: </span>
          <input
            type="text"
            name="QASearchText"
            value={searchQuesitonBody}
            id="QASearchText"
            onChange={(e) => { setSearchQuestionBody(e.target.value); }}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </SearchSection>
  );
}

const SearchSection = styled.section`
  background-color: ${(props) => props.theme.colors.light}
`;

Search.propTypes = {
  setSearchQuestionBody: PropTypes.func.isRequired,
  searchQuesitonBody: PropTypes.string.isRequired,
  setsubmitSearchQuestionBody: PropTypes.func.isRequired,
};
