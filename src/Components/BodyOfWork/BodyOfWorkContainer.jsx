import { Button, Col, Collapse, List, Row } from 'antd';
import { cloneDeep, findIndex, get, isEmpty, omit } from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchBodyOfWorkByUserId, updateResourceByUserId } from '../../Actions/ResourceAction';
import { PageLayout } from '../Layout/PageLayout';
import { Loader } from '../Loader/Loader';
import { CONFIG } from '../../Constants/ResourcesConstant';
import { getFieldsValueFromAtributes } from '../../Utils/common-methods';
import { Link } from 'react-router-dom';

const BodyOfWorkComponent = (props) => {
  const [loading, setloading] = useState(false);
  const [bowResourceToUpdate, setbowResourceToUpdate] = useState({});
  const [bodyOfWorkUserResource, setbodyOfWorkUserResource] = useState({});

  const userId = props.match.params.id;
  const { Panel } = Collapse;

  useEffect(() => {
    setloading(true);
    props
      .fetchBodyOfWorkByUserId(userId)
      .then((res) => {
        const data = res.data[0] || {};
        const fields = getFieldsValueFromAtributes(data.attributes || [], [
          CONFIG.SAVED_POST_LINKS_CONSTANT
        ]);
        setbowResourceToUpdate(data);
        setbodyOfWorkUserResource(fields);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
      });
  }, []);

  const onDeleteSavedPostClick = (item) => {
    const bow = cloneDeep(bowResourceToUpdate);
    bow.attributes = bow.attributes.filter(
      (attr) =>
        !['template', 'userId', 'currentIndex', 'Instances Allowed'].includes(
          attr.attribute.keyName
        )
    );
    bow.attributes.unshift({
      attribute: {
        keyName: 'actionsAllowed',
        keyValue: 'update'
      }
    });
    bow.resourceId = bow.resourceId;

    const userPostAttribute = bow.attributes.find(
      (p) => p.attribute.keyName === 'Saved Post Links'
    );
    const index = get(userPostAttribute, 'attribute.keyValues').indexOf(item);
    if (index > -1) {
      get(userPostAttribute, 'attribute.keyValues', []).splice(index, 1);
    }
    setloading(true);
    props.updateResourceByUserId(omit(bow, ['mode']), userId).then((res) => {
      const data = res.data || {};
      const fields = getFieldsValueFromAtributes(data.attributes || [], [
        CONFIG.SAVED_POST_LINKS_CONSTANT
      ]);
      setbowResourceToUpdate(data);
      setbodyOfWorkUserResource(fields);
      setloading(false);
    });
  };

  const renderSavedPostLinks = () => {
    return (
      <Panel header='Saved Links' key='1'>
        <List
          renderItem={(item, index) => {
            return (
              <List.Item
                actions={[
                  <Button
                    type='danger'
                    onClick={() => {
                      onDeleteSavedPostClick(item);
                    }}>
                    Delete
                  </Button>
                ]}>
                <Link to={item}>Link {index + 1}</Link>
              </List.Item>
            );
          }}
          dataSource={bodyOfWorkUserResource[CONFIG.SAVED_POST_LINKS_CONSTANT]}></List>
      </Panel>
    );
  };

  const onDeleteSavedNotesClick = (item) => {
    const bow = cloneDeep(bowResourceToUpdate);
    bow.attributes = bow.attributes.filter(
      (attr) =>
        !['template', 'userId', 'currentIndex', 'Instances Allowed'].includes(
          attr.attribute.keyName
        )
    );
    bow.attributes.unshift({
      attribute: {
        keyName: 'actionsAllowed',
        keyValue: 'update'
      }
    });
    bow.resourceId = bow.resourceId;

    const userPostAttribute = bow.attributes.find(
      (p) => p.attribute.keyName === CONFIG.SAVED_POST_NOTES_CONSTANT
    );
    const index = findIndex(get(userPostAttribute, 'attribute.keyValues'), { postId: item.postId });
    if (index > -1) {
      get(userPostAttribute, 'attribute.keyValues', []).splice(index, 1);
    }
    setloading(true);
    props.updateResourceByUserId(omit(bow, ['mode']), userId).then((res) => {
      const data = res.data || {};
      const fields = getFieldsValueFromAtributes(data.attributes || [], [
        CONFIG.SAVED_POST_LINKS_CONSTANT
      ]);
      setbowResourceToUpdate(data);
      setbodyOfWorkUserResource(fields);
      setloading(false);
    });
  };

  const renderSavedPostNotes = () => {
    return (
      <Panel header='Saved Notes' key='2'>
        <List
          renderItem={(item, index) => {
            return (
              <List.Item
                actions={[
                  <Button
                    type='danger'
                    onClick={() => {
                      onDeleteSavedNotesClick(item);
                    }}>
                    Delete
                  </Button>
                ]}>
                <Link to={item}>{item.note}</Link>
              </List.Item>
            );
          }}
          dataSource={bodyOfWorkUserResource[CONFIG.SAVED_POST_NOTES_CONSTANT]}></List>
      </Panel>
    );
  };

  const renderBOW = () => {
    return (
      <Collapse defaultActiveKey={['1']} accordion>
        {!isEmpty(bodyOfWorkUserResource[CONFIG.SAVED_POST_LINKS_CONSTANT]) &&
          renderSavedPostLinks()}
        {!isEmpty(bodyOfWorkUserResource[CONFIG.SAVED_POST_NOTES_CONSTANT]) &&
          renderSavedPostNotes()}
      </Collapse>
    );
  };

  return (
    <PageLayout
      {...props}
      content={
        loading ? (
          <Loader></Loader>
        ) : (
          <Row style={{ width: '100%' }}>
            <Col span={24}>
              {isEmpty(bodyOfWorkUserResource) ? `You don't have any saved Items` : renderBOW()}
            </Col>
          </Row>
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    bowLoading: state.resources.postTemplate || {}
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchBodyOfWorkByUserId: (userId) => dispatch(fetchBodyOfWorkByUserId(userId)),
  updateResourceByUserId: (resource, id) => dispatch(updateResourceByUserId(resource, id))
});

export const BodyOfWorkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BodyOfWorkComponent);
