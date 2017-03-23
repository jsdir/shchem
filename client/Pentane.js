import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Pentane = (props) => (
  <SvgIcon {...props}>
    <path d="M0 10 L12 0 L24 10 L17 20 L7 20 Z" fill="none" stroke="black"/>
  </SvgIcon>
);


Pentane = pure(Pentane);
Pentane.displayName = 'Pentane';
Pentane.muiName = 'SvgIcon';

export default Pentane;
