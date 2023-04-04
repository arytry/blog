# service name和container name

我们在定义docker-compose.yml文件里面经常会有service name和container name，这两者有什么区别呢？

## 基本概念

1. 一个service可以拥有一个或多个container
2. container是docker的概念，因此我们在docker域里面，处理的是container
3. service是docker-compose概念， 因此我们在docker-compose域里面，才处理的是service(当然docker-compose也能处理container)

* 同时定义service name和container name

  ```yml
  version: '2'

  services:
    nginxservice:
      image: nginx
      container_name: nginx
  ```

  ```bash
  $ docker-compose up

  $ docker ps
  CONTAINER ID   IMAGE   COMMAND                  CREATED          STATUS         PORTS    NAMES
  de5ce2bcf891   nginx   "/docker-entrypoint.…"   53 seconds ago   Up 5 seconds   80/tcp   nginx


  $ docker-compose stop nginxservice
  Stopping nginx ... done

  $ docker-compose start nginxservice
  Starting nginx ... done

  $ docker-compose stop nginx
  ERROR: No such service: nginx

  $ docker-compose start nginx
  ERROR: No such service: nginx
  ```

  可以看到docker-compose start/stop处理的service name，而不是container name

* 只定义service name

  ```yml
  version: '2'

  services:
    nginxservice:
      image: nginx
  ```

  ```bash
  $ docker-compose up

  $ docker ps
  CONTAINER ID   IMAGE   COMMAND                  CREATED          STATUS         PORTS    NAMES
  de5ce2bcf891   nginx   "/docker-entrypoint.…"   53 seconds ago   Up 5 seconds   80/tcp   srv_nginxservice_1
  ```

  运行起来后可以看到docker-compose自动给container分配了一个名字

  其格式为：<当前工作路径名>\_&lt;servicename&gt;_&lt;sequencenumber&gt;

  sequencenumber是干什么用的呢，我们看后面的例子

* 定义多个container name

  我们一次启动5个linuxservice containers：

  ```bash
  docker-compose up --scale nginxservice=5
  Creating network "srv_default" with the default driver
  Creating srv_nginxservice_1 ...
  Creating srv_nginxservice_2 ...
  Creating srv_nginxservice_3 ...
  Creating srv_nginxservice_4 ...
  Creating srv_nginxservice_5 ...
  Creating srv_nginxservice_1 ... done
  Creating srv_nginxservice_2 ... done
  Creating srv_nginxservice_3 ... done
  Creating srv_nginxservice_4 ... done
  Creating srv_nginxservice_5 ... done
  Attaching to srv_nginxservice_3, srv_nginxservice_2, srv_nginxservice_4, srv_nginxservice_1, srv_nginxservice_5


  $ docker ps
  CONTAINER ID   IMAGE   COMMAND                  CREATED          STATUS         PORTS    NAMES
  de5ce2bcf891   nginx   "/docker-entrypoint.…"   53 seconds ago   Up 5 seconds   80/tcp   srv_nginxservice_1
  c1371a78d7f9   nginx   "/docker-entrypoint.…"   53 seconds ago   Up 5 seconds   80/tcp   srv_nginxservice_2
  7a8e2954b267   nginx   "/docker-entrypoint.…"   53 seconds ago   Up 5 seconds   80/tcp   srv_nginxservice_3
  f31f0c18d169   nginx   "/docker-entrypoint.…"   53 seconds ago   Up 5 seconds   80/tcp   srv_nginxservice_4
  6fc546cb5a3d   nginx   "/docker-entrypoint.…"   53 seconds ago   Up 5 seconds   80/tcp   srv_nginxservice_5
  ```

  这个例子中我们看到service有5个container被创建出来，每一container的sequence是从1开始累加。

  ::: warning 注意
  docker-compose stop/start会对5个container一起操作
  :::
