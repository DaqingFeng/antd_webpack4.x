import React from 'react';
import RenderAuthorized from '../../components/Authorized';
import { getAuthority } from '../../utils/authority';
import { Redirect } from 'react-router';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);

const authorityHoc = ({ children, authorized }) => (
  <Authorized authority={authorized} noMatch={<Redirect to="/user/login" />}>
    {children}
  </Authorized>
);
export default authorityHoc;