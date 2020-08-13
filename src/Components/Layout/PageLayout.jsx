import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';

import { ErrorBoundary } from '../common/ErrorBoundary';
import { HeaderContainerComponent } from '../header/container';
import { isHeaderCollapsed } from '../../selectors/headerSelectors';
import { isManager } from '../../selectors/userProfileSelector';

import { iff } from '../../utils/iff';
import { MainSider } from './mainSider/mainSider';

/****** Drawer Icons *********/

// import cropsMenu from '../../public/crops.svg';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  height: 100%;
  min-height: 100%;
`;

const StyledContent = styled(Content)`
  background-color: #e5e5e5;
  overflow-y: hidden;
  overflow-x: hidden;
  padding: 0px;
`;

export const PageLayout = (props) => {
  // const { t } = useTranslation();
  const isCollapsed = useSelector(isHeaderCollapsed);
  const isRoleManager = useSelector(isManager);
  return (
    <StyledLayout>
      <MainSider isRoleManager={isRoleManager} />
      <Layout>
        <ErrorBoundary fromHeader={true}>
          <HeaderContainerComponent
            isCollapsed={isCollapsed}
            header={props.header}
            currentPage={props.currentPage}
          />
        </ErrorBoundary>

        <StyledContent>
          <ErrorBoundary fromHeader={false}>{iff(!!props.content, props.content)}</ErrorBoundary>
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

PageLayout.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node.isRequired,
  currentPage: PropTypes.string
};
