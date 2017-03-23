import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Butane = (props) => (
  <SvgIcon {...props}>
    <rect x="2" y="0" height="20" width="20" fill="none" stroke="black"/>
  </SvgIcon>
);


Butane = pure(Butane);
Butane.displayName = 'Butane';
Butane.muiName = 'SvgIcon';

export default Butane;
