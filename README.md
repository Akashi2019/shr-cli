## shr-cli
### 基于lerna的脚手架初始化

#### 初始化项目

```bash
npm init -y
```

#### 安装lerna

```bash
npm i lerna -D
```

#### 初始化lerna项目

```bash
lerna init
```

#### 创建package

```bash
lerna create core
lerna create utils
```

#### 安装依赖

```bash
lerna add
```

#### 安装软链

```bash
lerna link
```

#### 执行shell脚本

```bash
lerna exec
```

#### 执行npm命令

```bash
lerna npm
```

#### 清空依赖

```bash
lerna clean
```

#### 重装依赖

```bash
lerna bootstrap
```

#### 版本设置

```bash
lerna version
```

#### 查看上个版本依赖的所有变更

```bash
lerna changed
```

#### 查看diff

```bash
lerna diff
```

#### 项目发布

```bash
lerna publish
```

### 脚手架拆包策略

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

### core模块技术方案

![](.\assets\core.png)
