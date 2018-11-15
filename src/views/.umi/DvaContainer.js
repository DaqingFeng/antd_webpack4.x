import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());

app.model({ namespace: 'global', ...(require('D:/Nodejs/ant-design-pro-master/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('D:/Nodejs/ant-design-pro-master/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('D:/Nodejs/ant-design-pro-master/src/models/login.js').default) });
app.model({ namespace: 'project', ...(require('D:/Nodejs/ant-design-pro-master/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('D:/Nodejs/ant-design-pro-master/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('D:/Nodejs/ant-design-pro-master/src/models/user.js').default) });
app.model({ namespace: 'register', ...(require('D:/Nodejs/ant-design-pro-master/src/pages/User/models/register.js').default) });
app.model({ namespace: 'activities', ...(require('D:/Nodejs/ant-design-pro-master/src/pages/Dashboard/models/activities.js').default) });
app.model({ namespace: 'chart', ...(require('D:/Nodejs/ant-design-pro-master/src/pages/Dashboard/models/chart.js').default) });
app.model({ namespace: 'monitor', ...(require('D:/Nodejs/ant-design-pro-master/src/pages/Dashboard/models/monitor.js').default) });
app.model({ namespace: 'form', ...(require('D:/Nodejs/ant-design-pro-master/src/pages/Forms/models/form.js').default) });
app.model({ namespace: 'rule', ...(require('D:/Nodejs/ant-design-pro-master/src/pages/List/models/rule.js').default) });
app.model({ namespace: 'profile', ...(require('D:/Nodejs/ant-design-pro-master/src/pages/Profile/models/profile.js').default) });
app.model({ namespace: 'error', ...(require('D:/Nodejs/ant-design-pro-master/src/pages/Exception/models/error.js').default) });
app.model({ namespace: 'geographic', ...(require('D:/Nodejs/ant-design-pro-master/src/pages/Account/Settings/models/geographic.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
