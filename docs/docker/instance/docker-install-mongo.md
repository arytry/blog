# docker安装mongo

拉取镜像，默认是最新版本`mongo:latest`

```bash
docker pull mongo[:latest]
```

如果要安装其它版本，可以用`search`命令来查看可用版本

```bash
docker search mongo
```

运行并启动容器

```bash
docker run -itd \
    --name mongo \
    --restart always \
    -p 27017:27017 \
    -v /srv/mongo/db:/data/db \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=123456 \
    mongo
```

* `-v /srv/mongo/db:/data/db` 数据文件映射到宿主机的`/srv/mongo/db`
* `-e MONGO_INITDB_ROOT_USERNAME=admin` 初始账号为：admin
* `-e MONGO_INITDB_ROOT_PASSWORD=123456` 初始密码为：123456

::: tip 提示
mongo的配置文件位置为`/data/configdb`，数据文件位置为`/data/db`，如果需要备份可以将它们映射到宿主机的指定目录
:::

现在就可以通过[Robo](https://robomongo.org/ 'Robo')、[Compass](https://www.mongodb.com/products/compass 'Compass')等客户端工具连接到mongo数据库了

## 相关链接

* [在.NET Core中使用MongoDB明细教程(1):驱动基础及文档插入](https://www.cnblogs.com/yilezhu/p/13493195.html)
