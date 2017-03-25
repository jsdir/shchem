import React, { PropTypes } from 'react'
import cx from 'classnames'

import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

const Compound = props => (
  <Card className={cx('Compound', {
    'Compound--selected': props.selected,
  })}>
    <CardHeader
      className="Compound__header"
      title={props.compound.name || 'title'}
      subtitle={`cid: ${props.compound.cid}`}
    />
    <CardMedia>
      <img src={props.compound.img} />
    </CardMedia>
    <CardText>
      info
    </CardText>
  </Card>
)

Compound.propTypes = {
  compound: PropTypes.shape({
    cid: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool,
}

export default Compound
