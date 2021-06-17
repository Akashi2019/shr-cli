### shr-cli
#### 基于lern你以后一年后的脚手架初始化

```js
//初始化项目
npm init -y

//安装lerna
npm i lerna -D

//初始化lerna项目
lerna init

//创建package
lerna create core
lerna create utils

//安装依赖
lerna add

//安装软链
lerna link

//执行shell脚本
lerna exec

//执行npm命令
lerna npm

//清空依赖
lerna clean

//重装依赖
lerna bootstrap

//版本设置
lerna version

//查看上个版本依赖的所有变更
lerna changed

//查看diff
lerna diff

//项目发布
lerna publish
```

#### 脚手架拆包策略

- 核心流程： core
- 命令：commands
  - 初始化
  - 发布
  - 清除缓存
- 模型层：models
  - Command 命令
  - Project 项目
  - Component 组件
  - Npm 模块
  - Git 仓库
- 支撑模块：utils
  - Git 操作
  - 云构建
  - 工具方法
  - API 请求
  - Git API

#### 脚手架架构技术

![](.\assets\jiagou.png)

#### core模块技术方案
![](.\assets\core.png)

##### 所需npm包

import-local： 优先从本地加载安装包

semver：版本比对

colors：改变字体颜色

root-check:  降级权限user-home: 检查用户主目录

path-exists: 判断文件目录是否存在

minimist：参数解析

dotenv: 检查环境变量

axios： 异步请求

url-join：拼接url

```bash
lerna add import-local semver colors root-check user-home path-exists minimist dotenv axios url-join core/cli/
```
#### 基于Commander完成脚手架命令注册和命令执行过程开发

- 如何设计高性能脚手架
- Node多进程开发
- javascript面向对象的实战技巧

**关键词**

- 高性能/可扩展的脚手架 - 利用缓存提升脚手架性能并解耦业务逻辑
- 面向对象 - 利用Class完成javascript面向对象编程
- Node多进程 - 深入Node多进程原理

##### 图解高性能脚手架架构设计方法

##### 封装通用的Package和Command类

##### 基于缓存 + Node多进程实现动态命令加载和执行

##### 将业务逻辑和脚手架框架彻底解耦
