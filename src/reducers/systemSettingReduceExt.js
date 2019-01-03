import { message } from 'antd';


let lessNodesAppended;
export const updateTheme = primaryColor => {

    // Determine if the component is remounted
    if (!primaryColor) {
        return;
    }
    const hideMessage = message.loading('正在编译主题！', 0);
    function buildIt() {
        if (!window.less) {
            return;
        }
        setTimeout(() => {
            window.less
                .modifyVars({
                    '@primary-color': primaryColor,
                })
                .then(() => {
                    hideMessage();
                })
                .catch(() => {
                    message.error('Failed to update theme');
                    hideMessage();
                });
        }, 200);
    }
    if (!lessNodesAppended) {
        // insert less.js and color.less
        const lessStyleNode = document.createElement('link');
        const lessConfigNode = document.createElement('script');
        const lessScriptNode = document.createElement('script');
        lessStyleNode.setAttribute('rel', 'stylesheet/less');
        lessStyleNode.setAttribute('href', '/color.less');
        lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `;
        lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';
        lessScriptNode.async = true;
        lessScriptNode.onload = () => {
            buildIt();
            lessScriptNode.onload = null;
        };
        document.body.appendChild(lessStyleNode);
        document.body.appendChild(lessConfigNode);
        document.body.appendChild(lessScriptNode);
        lessNodesAppended = true;
    } else {
        buildIt();
    }
};