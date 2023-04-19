# docker安装consul

::: tip 提示
进入consul容器的命令是`/bin/sh`

```bash
docker exec -it consul /bin/sh
```

:::

端口说明

* `8500` http 端口，用于 http 接口和 web ui
* `8300` server rpc 端口，同一数据中心 consul server 之间通过该端口通信
* `8301` serf lan 端口，同一数据中心 consul client 通过该端口通信
* `8302` serf wan 端口，不同数据中心 consul server 通过该端口通信
* `8600` dns 端口，用于服务发现

## 单机单节点

```bash
docker run -d --restart=always -p 8500:8500 --name consul consul agent -server -bootstrap -ui -client='0.0.0.0'
```

* `-server`：设置为Server节点模式，默认为Client节点模式，这个和`-client`参数是不同的概念
  
  consul有Client和Server两种节点模式，它们的区别在[consul官网](https://www.hashicorp.com/blog/consul-announcement)中有这么一段话：

  > The only difference between servers and clients are that servers are the only components that store and replicate data.
  
  就是说Server节点比Client节点多了存储和复制数据的能力
  
  不管是Server还是Client，统称为Agent
  
  Client是相对无状态的，只负责转发RPC到Server，资源开销很少
  
  Server是一个有一组扩展功能的代理，这些功能包括参与Raft选举，维护集群状态，响应RPC查询，与其他数据中心交互WAN Gossip和转发查询给leader或者远程数据中心

  只有Server节点才能被选举为leader

  以下参数需要和`-server`配合使用，可以不设置

  * `-bootstrap`：启动模式，此模式下，节点可以选举自己为leader，一个datacenter只能有一个此模式启动的节点
  
    单节点需要启用，集群启动后，新启动的节点不建议使用这种模式

  * `-bootstrap-expect`：设定一个数据中心需要的server节点数，设置的数字必须和实际的server节点数匹配

    consul会等待直到数据中心下的server节点满足设定才会启动集群服务并选举leader

    不能和`-bootstrap`混用
  
* `-ui` 启用 UI 界面
* `-client` 指定client节点访问的IP，默认是`127.0.0.1`，`0.0.0.0`表示不限客户端IP
* `-retry-join` 指定要加入的节点地址（组建集群），后面可以跟其它节点的ip，（单机）也可以跟节点名称
  ::: warning 注意
  `-join` 已经被弃用，使用`-retry-join`替代
  :::
* `-node` 指定节点名称
* `-data-dir`：指定数据存放目录（**该目录必需存在，需提前创建好**）
* `-config-dir`：指定配置文件目录
* `-bind`：绑定的内部通讯地址，默认0.0.0.0，即，所有的本地地址，会将第一个可用的ip地址散播到集群中，如果有多个可用的ipv4，则consul启动报错。[::]ipv6，TCP UDP协议，相同的端口。防火墙配置。

## 集群安装

### 单机多节点

由于是一台机器，我们可以直接通过docker-compose安装

`docker-compose.yaml`如下：

```yaml
version: '3'

services:
  cs1: 
    image: consul
    command: agent -server -client=0.0.0.0 -bootstrap-expect=3 -node=cs1 -data-dir=/var/opt/consul
    volumes:
      - /srv/consul/cs1/etc:/etc/consul
      - /srv/consul/cs1/opt:/var/opt/consul
  cs2:
    image: consul
    command: agent -server -client=0.0.0.0 -retry-join=cs1 -node=cs2 -data-dir=/var/opt/consul
    volumes:
      - /srv/consul/cs2/etc:/etc/consul
      - /srv/consul/cs2/opt:/var/opt/consul
    depends_on:
      - cs1
  cs3:
    image: consul
    command: agent -server -client=0.0.0.0 -retry-join=cs1 -node=cs3 -data-dir=/var/opt/consul
    volumes:
      - /srv/consul/cs3/etc:/etc/consul
      - /srv/consul/cs3/opt:/var/opt/consul
    depends_on:
      - cs1
  cc1:
    image: consul
    command: agent -client=0.0.0.0 -retry-join=cs1 -ui -node=cc1 -data-dir=/var/opt/consul  
    ports:
      - 8500:8500
    volumes:
      - /srv/consul/cc1/etc:/etc/consul
      - /srv/consul/cc1/opt:/var/opt/consul
    depends_on:
      - cs2
      - cs3
```

### 多机集群

假设有以下服务器，环境如下：

|     服务器IP    |  节点类型   |   节点名称   |
| --------------- | ---------- | ------------ |
| 192.168.222.131 |   server   |  server-01   |
| 192.168.222.132 |   server   |  server-02   |
| 192.168.222.130 |   client   |  client-01   |

#### 运行节点

四台服务器分别运行节点

```bash
# 192.168.222.131
docker run --net host -d --restart=always --name consul consul agent -server -bootstrap-expect=2 -bind='192.168.222.131' -client='0.0.0.0' -node=server-01
# 192.168.222.132
docker run --net host -d --restart=always --name consul consul agent -server -bootstrap-expect=2 -bind='192.168.222.132' -client='0.0.0.0' -node=server-02 -retry-join=192.168.222.131
# 192.168.222.133
docker run --net host -d --restart=always --name consul consul agent -server -bootstrap-expect=2 -bind='192.168.222.133' -client='0.0.0.0' -node=server-03 -retry-join=192.168.222.131
# 更多server参照上面命令即可

# 192.168.222.130
docker run --net host -d --restart=always --name consul consul agent -ui -bind='192.168.222.130' -client='0.0.0.0' -node=client-01 -retry-join=192.168.222.131
```

::: danger 注意
由于docker默认使用内网ip通信，使得跨服务器无法找到并加入集群，目前采用的方式是通过使用host模式的网络连接类型，将容器与主机共享一个网络空间的方式

理想状态下的代码如下：

```bash
docker run -d --restart=always --name consul -p 8300:8300 -p 8301:8301 -p 8302:8302 -p 8600:8600 consul agent -server -bootstrap-expect=2 -client='0.0.0.0' -node=server-01
docker run -d --restart=always --name consul -p 8300:8300 -p 8301:8301 -p 8302:8302 -p 8600:8600 consul agent -server -bootstrap-expect=2 -client='0.0.0.0' -node=server-02 -retry-join=192.168.222.131

docker run -d --restart=always --name consul -p 8500:8500 -p 8300:8300 -p 8301:8301 -p 8302:8302 -p 8600:8600 consul agent -ui -client='0.0.0.0' -node=client-01 -retry-join=192.168.222.131
```

:::

#### 关联集群

其实`-retry-join`命令就已经关联了集群，如果没有该命令，我们还可以在server-02和server-03和client-01节点中输入以下命令建立集群关系

```bash
consul join 172.17.0.1
```

#### 集群状态

在任意一台服务器中输入以下命令可查看集群中所有节点信息

```bash
consul members
```

输出结果大致如下：

```bash
Node          Address          Status  Type    Build   Protocol  DC   Partition  Segment
d1efd5396188  172.17.0.1:8301  alive   server  1.15.1  2         dc1  default    <all>
74126f762ea9  172.17.0.2:8301  alive   server  1.15.1  2         dc1  default    <all>
2d1c480cc182  172.17.0.3:8301  alive   server  1.15.1  2         dc1  default    <all>
65e53ffb7df5  172.17.0.4:8301  alive   client  1.15.1  2         dc1  default    <default>
```

## 相关链接

[.NET Core + Consul：服务注册与发现](https://www.jianshu.com/p/4aaaee6e9ce1 '.NET Core + Consul：服务注册与发现')
