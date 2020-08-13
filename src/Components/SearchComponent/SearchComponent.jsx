import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Input, Select } from 'antd';
import { SearchResultComponent } from './SearchResultComponent';
import { Option } from 'antd/lib/mentions';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { fetchUsersBySearchString } from '../../Actions/UserAction';

const optionsData = [
  'Profile Summary',
  'Personal Details',
  'Contact Details',
  'Address / Location',
  'Interest Details',
  'Hobbies',
  'Professional Details'
];
export const SearchComponent = (props) => {
  const [showSearchResult, setshowSearchResult] = useState(false);
  const [selectedCategory, setselectedCategory] = useState('Profile Summary');
  const [searchString, setsearchString] = useState('');
  const dropRef = React.createRef();
  const inputRef = useRef(null);

  const handleChange = (value) => {
    setselectedCategory(value);
    props.fetchUsersBySearchString({
      categories: value,
      searchStr: searchString
    });
  };
  const onSearchTextChange = (event, value) => {
    if (event.target.value) {
      setsearchString(event.target.value);
      props.fetchUsersBySearchString({
        categories: selectedCategory,
        searchStr: event.target.value
      });
      setshowSearchResult(true);
    }
  };

  const handleShowResultPopUp = (e) => {
    if (!isEmpty(inputRef.current) && inputRef.current.contains(e.target)) {
      return;
    }
    setshowSearchResult(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleShowResultPopUp, false);
    return () => {
      document.removeEventListener('mousedown', handleShowResultPopUp, false);
    };
  }, []);

  return (
    <Row ref={inputRef} style={{ width: '100%' }}>
      <Col span={10} offset={1}>
        <Select
          style={{ width: '100%' }}
          placeholder='Please select'
          defaultValue={selectedCategory}
          onChange={handleChange}>
          {optionsData.map((op, i) => (
            <Option key={i.toString(36) + i} value={op}>
              {op}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={12} offset={1}>
        <Input placeholder='search' onChange={onSearchTextChange}></Input>
      </Col>
      {showSearchResult && (
        <Col span={24} style={{ width: '400px', height: '500px', background: 'lightgray' }}>
          {isEmpty(props.users) ? (
            <div>No records Found...</div>
          ) : (
            <SearchResultComponent
              users={props.users || []}
              onDecline={(p) => {
                console.log('declined', p);
              }}
              onAccept={(p) => {
                console.log('accepted', p);
              }}></SearchResultComponent>
          )}
        </Col>
      )}
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.search.usersBySearchString
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUsersBySearchString: (obj) => dispatch(fetchUsersBySearchString(obj))
});

export const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
