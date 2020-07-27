import Spin from 'antd/lib/spin';
import styled from 'styled-components';

export const StyledSpin = styled(Spin)`
  right: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: #222222ab;
  z-index: 9999;

  /*********Overrie css classes**/
  .ant-spin-dot {
    position: absolute;
    display: inline-block;
    font-size: 20px;
    width: 1em;
    height: 1em;
    top: 45%;
  }
  .ant-spin.ant-spin-show-text .ant-spin-text {
    display: block;
    top: 52%;
    position: absolute;
    left: 2%;
    right: 0;
  }
`;
