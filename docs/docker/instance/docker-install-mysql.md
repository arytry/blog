# docker安装mysql

拉取镜像

```bash
docker pull mysql
```

安装并运行容器

```bash
docker run -itd \
    --name mysql \
    --restart always \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=123456 \
    mysql
```

* `-p 3306:3306` 映射容器服务的`3306`端口到宿主机的`3306`端口
* `MYSQL_ROOT_PASSWORD=123456` 设置`MySQL`服务`root`用户的密码

接下来就可以通过`MySQL`客户端工具（如：`HeidiSQL`）连接`MySQL`服务了

当然，我们也可以通过命令连接

首先进入容器

```bash
docker exec -it mysql bash
```

通过`root`用户连接，然后输入密码

```bash
mysql -u root -p

Enter password:
```

接下来就可以执行sql语句命令了

```sql
mysql> select host,user,plugin,authentication_string from mysql.user;
```
