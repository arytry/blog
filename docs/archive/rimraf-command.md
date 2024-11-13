# rimraf命令

> `rimraf`是节点的深度删除模块(如`rm -rf`)

在`Windows`系统中删除文件夹（包含文件）时经常会碰到文件正在使用无法删除的问题，这很是让人头疼，不过使用`rimraf`命令删除就可以解决这个问题。

要在Windows命令工具中执行该命令可以通过`npm`或者`yarn`包安装，当然前提是已经安装了`npm`或者`yarn`包，安装方法网上很多这里就不再赘述

```sh
npm i rimraf -g

# 或者
yarn add rimraf global
```

这样就可以在Windows系统中执行`rimraf`命令了

::: tip 提示

如果系统中安装了`git`的话，通过`git bash`就可以执行该命令而不需要另外安装

但是每次要删除文件夹还需要打开`git bash`，相对`Windows Terminal`或者`Windows Command`来说其实也很是繁琐
:::
