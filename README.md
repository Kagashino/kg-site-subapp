# kg-site-subapp

基于 [kg-site](https://github.com/Kagashino/kg-site) 的子页面，由 kg-site 动态获取。

## 原理
kg-site 匹配子应用路由，路由容器组件发起异步请求，获取子应用的(css/js)文件，动态加载脚本；  
子应用入口文件监听父容器发出的DOM事件，将应用渲染到给定容器中。


## 用法
### 一、为你的项目起个名字
名称必须符合url规则，如`almanac` ，这将作为你的应用路径： `kgshino.com/subapp/almanac`。

### 二、编写入口文件
我们提供了 [插件](https://github.com/Kagashino/kg-site-subapp-controller)  控制子应用的启动与关闭时机。
安装依赖：
> npm i kg-site-subapp-controller 

修改项目入口文件，由直接渲染转为监听父应用事件：
```typescript jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { bootstrap } from 'kg-site-subapp-controller';
import App from './src/App';

bootstrap('almanac', {
  onLaunch (container) {
    ReactDOM.render(<App />, contaienr);
  },
  onClose (container) {
    ReactDOM.unmountComponentAtNode(container);
  },
  fallback () {
    // 当没有找到容器时（即脱离父应用html环境，按正常流程走）
    ReactDOM.render(<App />, document.getElementById('root'));
  }
})

```


### 三、提供 subapp-manifest 文件
配置项目 webpack ，使用 `webpack-manifest-plugin` 输出额外的 `subapp-manifest.json` 文件：
```
const ManifestPlugin = require('webpack-manifest-plugin');
const SUB_APP_NAME = require('package.json').name; // 如 kg-site-almanac

module.exports = {
    plugins: [
        new ManifestPlugin({
            fileName: 'subapp-manifest.json',
            filter: ({ path })=>/\.(js|css)$/.test(path),
            generate: (seed, files) => {
                const BASE_URL = process.env.BASE_URL;
                const VERSION = process.env.SUBAPP_VERSION ;
                return {
                    name: SUB_APP_NAME.replace(/^kg-site-/, ''),
                    title: SUB_APP_TITLE, // 中文应用名
                    version: VERSION,  // 版本号
                    baseUrl: BASE_URL,  // 资源地址
                    files: files.map(i=>i.path)
                };
            }
        }),
        // 指定全局应用名称
        // 原理是Webpack对这个变量进行字符串替换，所以记得加单/双引号
        new DefinePlugin({
            'process.env.SUB_APP_NAME': `"${SUB_APP_NAME}"`
        })
    ]
};

```
输出示例：
```
{
  "version": "test",
  "baseUrl": "http://localhost:3333",
  "files": [
    "/static/css/main.092941e2.chunk.css",
    "/static/js/main.6142acf2.chunk.js",
    "/static/js/runtime-main.2718f2d3.js",
    "/precache-manifest.65ff22476a3a0eb64a647956a247e3d1.js",
    "/service-worker.js"
  ]
}
```
字段解释：
 - `version`: 项目版本号
 - `baseUrl`: 项目静态文件地址
 - `files`: 项目静态文件路径（css/js）

### 四、推送代码仓库，创建合并请求
代码变更触发CI脚本，提取你的 `subapp-manifest.json` 到子应用入口文件管理服务中。

## 调试
可以自行拉取 [kg-site](https://github.com/Kagashino/kg-site) 代码调试。

## 注意

### 不要把应用放在根目录下
请使用单独文件夹，并确保项目名称唯一

### 将全局依赖标记为external
目前 kg-site 提供下列依赖：

|依赖|版本|全局变量名|
|:---:|:---:|:---:|
|react|16.13.1|React|
|react-dom|16.13.1|ReactDOM|
|vue|3.0-alpha|Vue|

本地开发可以关闭，打包构建时，将下列依赖标记为 `external` 以减小你的应用体积。配置方法示例：

```
module.exports = {
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'vue': 'Vue',
        'vuex': 'Vuex'
    }
}
```


## 待定项目

以下为未确定的需求：

### 线上调试环境
期望在 [kgshino.com](kgshino.com) 提供测试接口

### 配置持久化
由于配置文件尺寸不大，目前可将配置文件放入云函数中。

### 本地文件跨域
需要在 `webpack devServer` 配置 `cors` 响应头
