import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import GridContent from './GridContent';
import styles from './index.less';
import MenuContext from '../../views/layouts/MenuContext';

const pagewrapperMargin = {
  normal:
  {
    margin: '-24px -24px 0',
  },
  tabs: {
    margin: '-16px -24px 0px',
  }
}

const PageHeaderWrapper = ({ children, contentWidth, usingTabs, wrapperClassName, top, ...restProps }) => (
  <div style={usingTabs ? pagewrapperMargin.tabs : pagewrapperMargin.normal} className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {value => (
        <PageHeader
          wide={contentWidth === 'Fixed'}
          home={<FormattedMessage id="menu.home" defaultMessage="Home" />}
          {...value}
          key="pageheader"
          {...restProps}
          linkElement={Link}
          itemRender={item => {
            if (item.locale) {
              return <FormattedMessage id={item.locale} defaultMessage={item.name} />;
            }
            return item.name;
          }}
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);
export default connect((state) => ({
  usingTabs: state.systemSettingReduce.usingTabs,
  contentWidth: state.systemSettingReduce.contentWidth
}))(PageHeaderWrapper);