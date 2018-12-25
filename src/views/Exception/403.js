import React from 'react';
import { Link } from 'react-router-dom';
import Exception from '../../components/Exception';
import { injectIntl, intlShape } from 'react-intl';

const Exception403 = ({ intl }) => (
    <Exception
      type="403"
      desc={intl.formatMessage({ id: 'app.exception.description.403' })}
      linkElement={Link}
      backText={intl.formatMessage({ id: 'app.exception.back' })}
    />
);
Exception403.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Exception403);
