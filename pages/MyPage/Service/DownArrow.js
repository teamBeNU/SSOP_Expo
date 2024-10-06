import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DownArrow = (props) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <Path d="M10 13L5 7.84656L5.82136 7L10 11.3069L14.1786 7L15 7.84656L10 13Z" fill="#949494" />
  </Svg>
);

export default DownArrow;