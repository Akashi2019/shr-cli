### Node项目如何支持ES Module

#### 1、模块化

- CMD/AMD/require.js

CommonJS

- 加载：require()
- 输出：module.exports /exports.x

ES Module

- 加载： import
- 输出：export default / export function/const

#### 2、通过webpack方式支持ES Module打包

```js
//node 无法执行
import utils from './utils';

utils();
```

##### 配置webpack

```bash
npm i webpack webpack-cli -D
```

```js
//webpack.config.js
const path = require('path');
module.exports = {
    entry: './bin/core.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'core.js'
    },
    mode: "development" //mode: "production" 
};
```

```json
//package.json
{
    "scripts": {
        "build": "webpack",
        "dev": "webpack -w" //webapck --watch
    }
}
```

##### 通过webpack支持node的内置库

```bash
npm i path-exists -S
```

```js
//utils.js
import pathExists from 'path-exists';

export function exists(p){
    return pathExists.sync(p);
}

//core.js
import path from 'path';
import { exists } from './utils';

console.log(path.resolve('.'));
console.log(exists(path.resolve('.')));

```

```json
//webpack.config.js
const path = require('path');
module.exports = {
    entry: './bin/core.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'core.js'
    },
    mode: "development", //mode: "production"
    target: "node"
};
```

##### 配置babel-loader支持低版本node

```bash
npm i -D babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime @babel/runtime-corejs3
```

```json
//webpack.config.js
const path = require('path');
module.exports = {
    entry: './bin/core.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'core.js'
    },
    mode: "development", //mode: "production"
    target: "node",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    corejs: 3,
                                    regenerator: true,
                                    useESModule: true,
                                    helper: true
                                }
                            ]
                        ]
                    }
                }                
            }
        ]
    }
};
```

#### 3、node原生支持ES Module

```bash
//先将所有js的后缀名改为mjs，然后执行加参数--experimental-modules 实验性参数
node --experimental-modules bin/index.mjs
```

