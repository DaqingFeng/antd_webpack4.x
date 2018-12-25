import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import Exception from '../../components/Exception';

const Exception500 = ({ intl }) => (
  <Exception
    type="500"
    desc={intl.formatMessage({ id: 'app.exception.description.500' })}
    linkElement={Link}
    backText={intl.formatMessage({ id: 'app.exception.back' })}
  />
);

Exception500.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Exception500);
