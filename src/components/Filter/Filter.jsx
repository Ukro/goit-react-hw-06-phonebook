import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ImCross } from 'react-icons/im';

import IconButton from '../IconButton';
import { FilterWrapper, Input, Label } from './Filter.styled';

import { getFilter } from 'redux/selectors';
import { setFilter, resetFilter } from 'redux/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onChange = e => dispatch(setFilter(e.target.value));

  return (
    <>
      <Label htmlFor="filter">Find contact by name:</Label>
      <FilterWrapper>
        <Input type="text" name="filter" value={filter} onChange={onChange} />
        {filter && (
          <IconButton
            color="#400080"
            type="button"
            aria-label="Clear filter"
            onClick={() => dispatch(resetFilter())}
          >
            <ImCross />
          </IconButton>
        )}
      </FilterWrapper>
    </>
  );
};

export default Filter;
