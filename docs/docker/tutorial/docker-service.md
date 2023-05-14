# docker服务管理

## daemon.json

docker配置文件，如果刚安装完docker该文件应该是不存在的，需要手动`vi(m) daemon.json`创建，位于`/etc/docker`目录下面

``` json
{
    // docker镜像源，官方镜像地址如果不能下载可更换
    "registry-mirrors": [
        "https://21kbir7t.mirror.aliyuncs.com",
        "https://docker.mirrors.ustc.edu.cn/",
        "https://reg-mirror.qiniu.com",
        "https://hub-mirror.c.163.com",
        "http://f1361db2.m.daocloud.io"
    ],

    "insecure-registries":["192.168.222.135:5000"],
    "log-driver": "json-file",
    "log-opts":
    {
        // 日志最大文件为10m
        "max-size": "10m",
        "max-file": "5"
    }
}

```

修改了配置文件后需要重启服务

```bash
systemctl daemon-reload
systemctl restart docker
```

## 远程管理

docker支持远程管理，比如portainer连接，需要开启2375端口

### 修改docker.service

```bash
vim /lib/systemd/system/docker.service

# 找到ExecStart参数并替换为下面代码
ExecStart=/usr/bin/dockerd -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375
```

> *实际有三种方法可以修改，具体实现方式可自行Google*

## docker服务

### 启动

```bash
systemctl start docker
```

### 重启

``` bash
systemctl restart docker.service # 重启docker服务
```

::: warning 提醒
重启后所有的docker容器都退出了，需要重新启动

要解决此问题只需要修改容器参数`--restart=always`即可
:::

### 查看运行状态

```bash
systemctl status docker
```

### 开机自启动

```bash
systemctl enable docker
```

## 常见问题

服务器重启后报：`Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?`

翻译过来就是：`无法连接到Docker守护进程在unix:///var/run/ Docker .sock。docker守护进程正在运行吗?`

这个主要的问题就是`docker`没有启动起来导致的

启动docker并查看运行状态是否成功

```bash
systemctl start docker
systemctl status docker
```

看到running的标志，就是运行成功了

为了避免日后重启再次出现类似情况，增加一个开机自动启动docker即可

```bash
systemctl enable docker
```
