#!/usr/bin/env node 
// 让index.js可以使用shell调用(执行)
// 快速开发命令行工具的包
const program = require('commander');
// shelljs调用系统命令
const shell = require('shelljs');
const download = require('git-clone');
// spwan启动子进程的输出流和错误流
const {spawn} = require('child_process');
// open模块打开浏览器
const open = require('open');

program.version('1.0.0')
// command 定义命令
program.command('new <name>')
  .description('创建项目')
  .action(name => {
    let giturl = 'https://github.com/vuejs/vue-next-webpack-preview.git'
    download(giturl, `./${name}`, () => {
      shell.rm('-rf',`./${name}/.git`)
      shell.cd(name)
      shell.exec('npm install')
      console.log(`创建项目${name}成功
                  cd ${name}进入项目
                  mycli run ${name}启动项目
                  mycli start ${name}预览项目`)
    })
  })
program.command('run')
  .description('运行项目') // 运行命令的提示文本
  .action(() => { // 执行命令的动作
    // shell.exec('npm run dev')
    // spwan启动子进程的输出流和错误流 输出到主进程上 方便我们查看运行信息
    let cp = spawn('npm',['run','dev'])
    cp.stdout.pipe(process.stdout)
    cp.stderr.pipe(process.stderr)
    cp.on('close',()=>{
      // console.log('启动项目成功')
    })
    console.log('运行项目')
  })
program.command('start')
  .description('预览项目')
  .action(() => {
    open('http://localhost:8080')
    console.log('预览项目 http://localhost:8080')
  })
// 解析命令行传入的参数
program.parse(process.argv)