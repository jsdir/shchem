import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Hexane = (props) => (
  <SvgIcon {...props}>
    <path d="M0 9 L7 0 L17 0 L24 9 L17 18 L7 18 Z" fill="none" stroke="black"/>
  </SvgIcon>
);


Hexane = pure(Hexane);
Hexane.displayName = 'Hexane';
Hexane.muiName = 'SvgIcon';

export default Hexane;
