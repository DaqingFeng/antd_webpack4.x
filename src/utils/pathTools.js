// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
// eslint-disable-next-line import/prefer-default-export
export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}
// Conversion router to menu.
export const menuFormatter = (data, parentPath = '', parentName) => {
  if (!Array.isArray(data))
    return;
  return data.map(item => {
    let locale = 'menu';
    if (parentName && item.name) {
      locale = `${parentName}.${item.name}`;
    } else if (item.name) {
      locale = `menu.${item.name}`;
    } else if (parentName) {
      locale = parentName;
    }
    const result = {
      ...item,
      locale
    };
    if (item.routes) {
      const children = menuFormatter(item.routes, `${parentPath}${item.path}/`, locale);
      // Reduce memory usage
      result.children = children;
    }
    delete result.routes;
    return result;
  });
}

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
export const getBreadcrumbNameMap = () => {
  const routerMap = {};
  const mergeMenuAndRouter = data => {
    if (!Array.isArray(data)) {
      return;
    }
    data.forEach(menuItem => {
      if (menuItem.children) {
        mergeMenuAndRouter(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  mergeMenuAndRouter(this.getMenuData());
  return routerMap;
}