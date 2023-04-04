# 网络配置

## 未显示声明

docker-compose中未显式声明，会生成默认的网络

```yml
version: "3.4"
services:
  redis-web:
    image: redis-web:1.0
    container_name: redis-web
    restart: always
    environment:
      REDIS_HOST: redis-app
    ports:
      - 8001:8001
    depends_on:
      - redis-app
  redis-app:
    image: redis:latest
    container_name: redis-app
    restart: always
```

启动的容器会被加入`srv_default`中，其中`srv`为`docker-compose`文件所在的父文件夹名

```yml
[root@vm02 test]# docker network ls
be43cf4b2125        srv_default         bridge              local
```

## networks关键字自定义网络

```yml
version: '3.4'
services:
  web-1:
    image: redis-web:1.0
    container_name: web1
    networks:
      - front
      - back
  redis:
    image: redis
    container_name: redisdb
    networks:
      - back

networks:
  front:
    driver: bridge
  back:
    driver: bridge
    driver_opts:
      foo: "1"
      bar: "2"
```

```bash
[root@vm02 network-test]# docker network ls
NETWORK ID          NAME                 DRIVER              SCOPE
ca9419193d95        srv_back             bridge              local
7c38ab9beba4        srv_front            bridge              local
```

## 使用现有网络

新建一个network

```bash
docker network create net-a --driver bridge
```

```yml
version: '3.4'
services:
  web-1:
    image: redis-web:1.0
    container_name: web1
  redis:
    image: redis
    container_name: redisdb
networks:
  default:
    external:
      name: net-a
```

## network_mode

下面的docker-compose将不会生成新的网络

```yml
version: '3.4'
services:
  web-1:
    network_mode: bridge
    image: redis-web:1.0
    container_name: web1
  redis:
    network_mode: bridge
    image: redis
    container_name: redisdb
```

## 相关链接

[docker-compose网络配置](https://www.jianshu.com/p/347831f72d1c 'docker-compose网络配置')
