import { Row, Col } from 'antd';
import React from 'react';
import { PostDetailsWithMetaDataComponent } from './PostDetailsWithMetaDataComponent';

export const Postlistcomponent = (props) => {
  console.log('Postlistcomponent  >>', props);

  const onChangePost = (post) => {
    console.log('changed post >>', post);
  };

  return (
    <>
      {props.posts.map((post) => (
        <Col span={24}>
          <PostDetailsWithMetaDataComponent
            bodyOfWorkTemplate={props.bodyOfWorkTemplate}
            bodyOfWorkUserResource={props.bodyOfWorkUserResource}
            postDetails={post || {}}
            onChangePost={onChangePost}
            user={props.user}
            currentUserId={props.userId}></PostDetailsWithMetaDataComponent>
        </Col>
      ))}
    </>
  );
};
