'use strict';

module.exports = core;

const path = require('path');
const semver = require('semver');
const colors = require('colors/safe');
const userHome = require('user-home');
const pathExists = require('path-exists').sync;
const commander = require('commander');
//require: .js/.json/.node
//.js -> module.exports/exports
//.json -> JSON.parse
//.node -> C++ AddOns(process.dlopen)
//any -> .js
const pkg = require('../package.json');
const log = require('@shr-cli/log');
const init = require('@shr-cli/init');
const constant = require('./const');

const program = new commander.Command();

async function core() {
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRoot();
    checkUserHome();
    //checkInputArgs();
    checkEnv();
    await checkGlobalUpdate();
    registerCommand();
  } catch (e) {
    log.error(e.message);
  }
}

function registerCommand() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false);

  program
    .command('init [projectName]')
    .option('-f, --force', '是否强制初始化项目')
    .action(init);
  program.on('option:debug', function () {
    if (program.opts().debug) {
      process.env.LOG_LEVEL = 'verbose';
    } else {
      process.env.LOG_LEVEL = 'info';
    }
    log.level = process.env.LOG_LEVEL;
  });

  //对未知的命令监听
  program.on('command:*', function (obj) {
    const availableCommands = program.commands.map((cmd) => cmd.name);
    console.log(colors.red('未知的命令：' + obj[0]));
    if (availableCommands.length > 0) {
      console.log(colors.red('可用命令：' + availableCommands.join(',')));
    }
  });

  program.parse(process.argv);

  if (program.args && program.args.length < 1) {
    program.outputHelp();
  }
}

async function checkGlobalUpdate() {
  //1.获取当前版本号和模块名
  const currentVersion = pkg.version;
  const npmName = pkg.name;
  //2.调用npm API，获取所有版本号
  const { getNpmSemverVersion } = require('@shr-cli/get-npm-info');
  const lastVersion = await getNpmSemverVersion(currentVersion, npmName);
  if (lastVersion && semver.gt(lastVersion, currentVersion)) {
    log.warn(
      '更新提示',
      colors.yellow(
        `请手动更新 ${npmName}, 当前版本：${currentVersion}, 最新版本：${lastVersion} 更新命令：npm install -g ${npmName}`
      )
    );
  }
  //3.提取所有版本号，比对哪些版本号是大于当前版本号shr

  //4.获取最新的版本号，提示用户更新到该版本
}

function checkEnv() {
  const dotenv = require('dotenv');
  const dotenvPath = path.resolve(userHome, '.env');
  if (pathExists(dotenvPath)) {
    dotenv.config({
      path: dotenvPath
    });
  }
  createDefaultConfig();
  log.verbose('环境变量', process.env.CLI_HOME_PATH);
}

function createDefaultConfig() {
  const cliConfig = {
    home: userHome
  };
  if (process.env.CLI_HOME) {
    cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME);
  } else {
    cliConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME);
  }
  process.env.CLI_HOME_PATH = cliConfig.cliHome;
}

function checkInputArgs() {
  const minimist = require('minimist');
  const args = minimist(process.argv.slice(2));
  checkArgs(args);
}

function checkArgs(args) {
  if (args.debug) {
    process.env.LOG_LEVEL = 'verbose';
  } else {
    process.env.LOG_LEVEL = 'info';
  }
  log.level = process.env.LOG_LEVEL;
}

function checkUserHome() {
  if (!userHome || !pathExists(userHome)) {
    throw new Error(colors.red('当前登录用户主目录不存在！'));
  }
}

function checkRoot() {
  const rootCheck = require('root-check');
  rootCheck();
}

function checkPkgVersion() {
  log.notice('cli', pkg.version);
}

function checkNodeVersion() {
  //第一步，获取当前Node版本号
  const currentVersion = process.version;
  //第二步，比对最低版本号
  const lowestVersion = constant.LOWEST_NODE_VERSION;
  if (!semver.gte(currentVersion, lowestVersion)) {
    throw new Error(
      colors.red(`shr-cli 需要安装 v${lowestVersion}以上版本的Node.js`)
    );
  }
}
