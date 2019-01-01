import React from 'react';
import { Link } from 'react-router-dom';
import Exception from '../../components/Exception';
import { injectIntl, intlShape } from 'react-intl';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
const Exception403 = ({ intl }) => (
  <PageHeaderWrapper>
    <Exception
      type="403"
      desc={intl.formatMessage({ id: 'app.exception.description.403' })}
      linkElement={Link}
      backText={intl.formatMessage({ id: 'app.exception.back' })}
    />
  </PageHeaderWrapper>
);
Exception403.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Exception403);
