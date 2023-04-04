---
title: docker安装elasticsearch
date: 2020-08-09 21:24:20
categories:
- elasticsearch
tags:
- elasticsearch
---

## 安装ElasticSearch

* 拉取镜像

[docker仓库](https://hub.docker.com/_/elasticsearch)里面没有`latest`标签，目前最新版本是`8.5.1`

``` bash
docker pull elasticsearch:8.5.1
```

* 构建容器
  
首先新建网络（对于连接到同一网络上的其他服务(例如`Kibana`)很有用）

``` bash
docker network create elastic
```

开始构建`elasticsearch`容器

``` bash
docker run -it --name elasticsearch \
  --net elastic \
  --restart always \
  -p 9200:9200 \
  -p 9300:9300 \
  # -v /srv/elasticsearch/config:/usr/share/elasticsearch/config \
  -e "discovery.type=single-node" \
  elasticsearch:8.5.1
```

::: warning 提醒
从`Elasticsearch 8.0`开始默认启用了安全性，也就是启用了TLS加密，在访问时需要带`https`

访问记得带https

访问记得带https

访问记得带https
:::

在docker中启动单节点`Elasticsearch`集群，会自动进行以下安全配置：

* 为传输层和`HTTP`层生成证书和密钥。
* 传输层安全 (TLS) 配置设置被写入`elasticsearch.yml`.
* 为`elastic`用户生成密码。
* 为`Kibana`生成一个注册令牌。

容器运行起来后，密码和注册令牌仅在第一次启动`Elasticsearch`的控制台显示，所以这里不建议后台运行容器(`-d`)

当然通过查看输出日志也能得到相关信息

```bash
docker logs -f elasticsearch
```

访问<https://localhost:9200>, 输入`elastic / 密码`验证，密码就是刚才屏幕上显示的，我们也可以进入容器通过`bin/elasticsearch-reset-password -u elastic`命令来重置密码。

* 配置跨域

首先进入容器

``` bash
docker exec -it elasticsearch /bin/bash
```

修改配置信息

``` bash
# 修改elasticsearch.yml文件
vim config/elasticsearch.yml

# 在最后面加入跨域配置
http.cors.enabled: true #开启跨域访问支持，默认为false
http.cors.allow-origin: "*" #跨域访问允许的域名地址，(允许所有域名)以上使用正则
```

* 重启容器

由于修改了配置信息，需要重启才能生效

``` bash
docker restart elasticsearch
```

## 安装Kibana

kibana 是一款适用于 es 的 数据可视化和管理工具, 可以提供实时的直方图、线形图、饼状图和地图

支持用户安全权限体系, 支持各种纬度的插件, 通常搭配 es、logstash 一起使用

* 拉取镜像
  
  `kibana`的版本最好与`elasticsearch`保持一致, 避免发生不必要的错误
  
  ```bash
  docker pull kibana:8.5.1
  ```

* 安装容器
  
  为了方便管理，与`elasticsearch`使用同一网络

  ```bash
  docker run --name kibana --net elastic -p 5601:5601 kibana:8.5.1
  ```

  现在浏览器访问`5601`端口，启动成功

### 配置Kibana

  进入系统后可以手动配置，也可以直接输入`token`进行配置

  在这里我们直接采用`token`配置方式，这里的token就是在第一次运行`elasticsearch`容器时出现的用于配置`kibana`的token
  
  下一步`kibana`要求输入验证码，验证码可以通过两种方式获得
  
  和`elasticsearch`一样，验证码此时会在控制台输出，我们可以通过查看日志获得

  ```bash
  docker logs -f kibana
  ```
  
  或者进入`kibana`容器执行`bin/kibana-verification-code`命令获得

  ```bash
  # 进入容器
  docker exec -it kibana /bin/bash

  # 获取验证码
  bin/kibana-verification-code
  ```

  输入验证码后，接下来会进入一个登录界面，这里就是使用上面提到的`elastic/密码`账号登录即可，登录成功后我们也可以在系统里面编辑个人信息中修改密码等

## 安装ElasticSearch-Head

> `ElasticSearch-Head`是一个管理界面，可以查看ElasticSearch的相关信息

这只是为了方便用户查看的一个GUI工具，对开发人员来说并不是必需的

### Google Chrome插件

如果安装了Google Chrome浏览器，可以直接安装`ElasticSearch-Head`插件即可使用，非常方便，推荐此方法

### Docker

拉取镜像

``` bash
docker pull mobz/elasticsearch-head:5
```

运行并部署

``` bash
docker run -d --name es_admin -p 9100:9100 mobz/elasticsearch-head:5
```

> 通过访问`9100`端口就可以查看管理界面，然后在文本框输入`elasticsearch`的访问地址（`9200`端口），点击连接即可看到相关信息

## 相关链接

[Docker 简单部署 ElasticSearch](https://www.cnblogs.com/jianxuanbing/p/9410800.html 'Docker 简单部署 ElasticSearch')

[ElasticSearch入门 附.Net Core例子](https://www.cnblogs.com/CoderAyu/p/9601991.html 'ElasticSearch入门 附.Net Core例子')
