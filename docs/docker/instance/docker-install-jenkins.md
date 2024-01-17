# docker安装jenkins

## 运行容器

执行以下命令

``` bash
# 搜索Jenkins
docker search jenkins

# jenkins镜像为官方镜像，docker hub中提到已经弃用[deprecated]，推荐使用jenkins/jenkins
docker pull jenkins/jenkins[:latest]
```

``` bash
docker run -d -u root --name=jenkins \
    --restart=always \
    -p 8080:8080 -p 50000:50000 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v $(which docker):/usr/bin/docker \
    -v $(which docker-compose):/usr/bin/docker-compose \
    -v /srv/jenkins/opt:/var/jenkins_home \
    jenkins/jenkins
```

* `-v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/bin/docker` 将jenkins容器内的docker命令指向了宿主机，结合`-u root`在容器中才有权限执行docker命令
* `-v $(which docker-compose):/usr/bin/docker-compose \` 容器内的docker-compose命令指向宿主机
* `-v /srv/jenkins/opt:/var/jenkins_home` 将docker里jenkins工作目录`/var/jenkins_home`挂载到宿主机的`/srv/jenkins/var/jenkins_home`
  > `-v jenkins:/var/jenkins_home` 将docker里jenkins工作目录`/var/jenkins_home`挂载到本地容器卷`/var/lib/docker/volumes`下面的`jenkins`目录

此时如果访问8080端口是访问不了的，我们查看日志可以看到一段代码

> cannot touch '/var/jenkins_home/copy_reference_file.log': Permission denied

大概意思就是没有权限访问映射工作目录，因为jenkins容器中jenkins用户id为1000，而本地用户权限为root，所以把当前目录的拥有者赋值给uid 1000，再启动"jenkins"容器就一切正常了

```bash
chown -R 1000 /srv/jenkins/opt
```

## 初始密码

首次打开Jenkins页面后需要输入初始密码，默认账号为admin

可以通过日志查看

```sh
docker logs jenkins
```

如果日志太多不方便查找，也可以在`/var/jenkins_home/secrets/initialAdminPassword`文件中查看

由于我们做了工作目录映射，所以直接在宿主机中可以找到该文件

登录后可以新建一个用户，也可以默认使用当前admin账户，可以安装所有推荐的插件

## 相关链接

* [安装Jenkins](https://www.jenkins.io/zh/doc/book/installing/)
* [jenkins 容器环境中调用docker](https://juejin.cn/post/7219899306946199610)
* [Docker中启动jenkins容器，并在jenkins中使用docker 命令，解决docker command not found](https://blog.csdn.net/zsd498537806/article/details/81132522)
* [Docker-in-Docker: Jenkins CI 内部如何运行 docker](https://blog.csdn.net/fly910905/article/details/117254938)
* [Using Docker-in-Docker for your CI or testing environment? Think twice.](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/)
