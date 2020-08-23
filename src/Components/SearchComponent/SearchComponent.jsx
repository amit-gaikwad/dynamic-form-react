import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Input, Select } from 'antd';
import { SearchResultComponent } from './SearchResultComponent';
import { Option } from 'antd/lib/mentions';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import {
  fetchUsersBySearchString,
  sendConnectionRequest,
  getsentConnectionRequest,
  setBlurBackground
} from '../../Actions/UserAction';

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

  useEffect(() => {
    props.setBlurBackground(showSearchResult);
  }, [showSearchResult]);

  const handleShowResultPopUp = (e) => {
    if (!isEmpty(inputRef.current) && inputRef.current.contains(e.target)) {
      return;
    }
    setshowSearchResult(false);
  };

  useEffect(() => {
    props.getsentConnectionRequest({
      userId: props.userId
    });
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
        <Col
          span={24}
          style={{
            width: '400px',
            height: '500px',
            background: '#f3f6f8',
            border: '1px solid black'
          }}>
          {isEmpty(props.users) ? (
            <div>No records Found...</div>
          ) : (
            <SearchResultComponent
              sendConnectedUser={props.sendConnectedUser}
              users={props.users || []}
              onDecline={(p) => {}}
              onAccept={(p, user) => {
                props.sendConnectionRequest({
                  userIdFrom: props.userId,
                  userIdTo: user.userId,
                  notificationAbout: 'Connection'
                });
              }}></SearchResultComponent>
          )}
        </Col>
      )}
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.search.usersBySearchString,
    sendConnectedUser: state.userReducer.sendConnectedUser
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUsersBySearchString: (obj) => dispatch(fetchUsersBySearchString(obj)),
  sendConnectionRequest: (obj) => dispatch(sendConnectionRequest(obj)),
  getsentConnectionRequest: (obj) => dispatch(getsentConnectionRequest(obj)),
  setBlurBackground: (value) => dispatch(setBlurBackground(value))
});

export const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
