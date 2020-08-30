import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Input, Select, Spin } from 'antd';
import { SearchResultComponent } from './SearchResultComponent';
import { Option } from 'antd/lib/mentions';
import { isEmpty, get, first } from 'lodash';
import { connect } from 'react-redux';
import {
  fetchUsersBySearchString,
  sendConnectionRequest,
  getsentConnectionRequest,
  setBlurBackground
} from '../../Actions/UserAction';

let setTimeoutId = 0;
export const SearchComponent = (props) => {
  const [showSearchResult, setshowSearchResult] = useState(false);
  const [selectedCategory, setselectedCategory] = useState('');
  const [optionsData, setOptionsData] = useState([]);
  const [searchString, setsearchString] = useState('');
  const dropRef = React.createRef();
  const inputRef = useRef(null);

  const handleChange = (value) => {
    setselectedCategory(value);
    props.fetchUsersBySearchString({
      userId: props.userId,
      categories: value,
      searchStr: searchString
    });
  };
  const onSearchTextChange = (event) => {
    const value = event.target.value;
    setsearchString(value);
    if (setTimeoutId) {
      clearTimeout(setTimeoutId);
    }
    setTimeoutId = setTimeout(() => {
      props.fetchUsersBySearchString({
        userId: props.userId,
        categories: selectedCategory,
        searchStr: value
      });
      setshowSearchResult(true);
    }, 500);
  };

  useEffect(() => {
    props.setBlurBackground(showSearchResult);
  }, [showSearchResult]);

  useEffect(() => {
    const attributes = get(props, 'systemTemplates.attributes');
    if (!isEmpty(attributes)) {
      const searchAttribute =
        (attributes || []).find((a) => a.attribute.keyName === 'search') || {};
      const options = get(searchAttribute, 'attribute.keyValues', []);
      setOptionsData(options);
      console.log('options', options);
      setselectedCategory(options[0]);
    }
  }, [props.systemTemplates]);

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
          value={selectedCategory}
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
          {props.usersBySearchStringLoading ? (
            <Spin size='large' style={{ margin: 250 }}></Spin>
          ) : (
            <>
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
                  }}
                  userId={props.userId}></SearchResultComponent>
              )}
            </>
          )}
        </Col>
      )}
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.search.usersBySearchString,
    sendConnectedUser: state.userReducer.sendConnectedUser,
    usersBySearchStringLoading: state.search.usersBySearchStringLoading,
    systemTemplates: state.resources.systemTemplates
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUsersBySearchString: (obj) => dispatch(fetchUsersBySearchString(obj)),
  sendConnectionRequest: (obj) => dispatch(sendConnectionRequest(obj)),
  getsentConnectionRequest: (obj) => dispatch(getsentConnectionRequest(obj)),
  setBlurBackground: (value) => dispatch(setBlurBackground(value))
});

export const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
