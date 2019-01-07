import lsStorage from './lsStorage';
import { SystemAuthorityKey, UserAuthorityKey } from './globalVariables'

// use localStorage to 
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? lsStorage.get(SystemAuthorityKey) : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return lsStorage.set(SystemAuthorityKey, JSON.stringify(proAuthority));
}


export function getUserAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? lsStorage.get(UserAuthorityKey) : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['guest'];
}

export function setUserAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return lsStorage.set(UserAuthorityKey, JSON.stringify(proAuthority));
}

