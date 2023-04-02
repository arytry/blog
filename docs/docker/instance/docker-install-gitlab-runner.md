# docker安装gitlab-runner

::: tip 提示
理想情况下，不应将GitLab Runner与GitLab安装在同一台机器上。
:::

## 安装

```bash
docker pull gitlab/gitlab-runner
```

```bash
docker run -itd --name gitlab-runner \
    --restart always \
    -v /srv/gitlab-runner/etc:/etc/gitlab-runner \
    -v /var/run/docker.sock:/var/run/docker.sock \
    gitlab/gitlab-runner
```

## docker-compose

1. [安装docker-compose](https://docs.docker.com/compose/install/)

   ```bash
   # unbuntu
   apt install docker-compose
   ```

2. 创建`docker-compose.yml`文件

   ```yaml
   version: '3.3'

   services:
     gitlab-runner:
       network_mode: bridge # do not create new network
       image: 'gitlab/gitlab-runner'
       container_name: gitlab-runner
       restart: always
       volumes:
         - /srv/gitlab-runner/etc:/etc/gitlab-runner
         - /var/run/docker.sock:/var/run/docker.sock
   ```

3. 确保与`docker-compose.yml`文件在同一目录下并启动它

   ```bash
   docker compose up -d
   ```

## 注册gitlab-runner

一个Runner可以特定于某个项目，也可以在GitLab CI中服务于任何项目。服务于所有项目的Runner称为`Shared Runner`

### 获取令牌

* `Shared Runner` Admin Area> Overview > Runners
* `Group Runner` Group > CI/CD > Runners
* `Specific Runners` Project > Settings > CI/CD > Runners > Specific runners

如果你是GitLab实例管理员的话，你可以注册一个Shared Runner

### Register

进入容器执行注册命令

```bash
docker exec -it gitlab-runner gitlab-runner register
```

接下来会依次要求输入以下信息

```bash
Enter the GitLab instance URL (for example, https://gitlab.com/):
http://192.168.37.128/

Enter the registration token:
2uHJuR-A8c97bvc2yAxh

Enter a description for the runner:
[f0f33d68c59a]: docker-runner

Enter tags for the runner (comma-separated):
v1

Registering runner... succeeded                     runner=x8b5fALJ
Enter an executor: virtualbox, docker+machine, kubernetes, custom, docker, docker-ssh, parallels, shell, ssh, docker-ssh+machine:
docker

Enter the default Docker image (for example, ruby:2.6):
alpine:latest

Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
```

以上是通过手动一步一步设置，这种操作相对比较麻烦一些，下面我们根据参数指定注册过程需要的数据直接配置，参数根据需要自行修改

```bash
gitlab-runner register \
  --non-interactive \
  --url "http://192.168.37.128/" \
  --registration-token "2uHJuR-A8c97bvc2yAxh" \
  --executor "docker" \
  --docker-image alpine:latest \
  --description "docker-runner" \
  --maintenance-note "Free-form maintainer notes about this runner" \
  --tag-list "docker,aws" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"
```

如果是在`Docker`容器中运行的runner，注册命令的结构还可以类似于这样

```bash
docker run -itd --name gitlab-runner \
  --restart always \
  -v /srv/gitlab-runner/etc:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "http://192.168.37.128/" \
  --registration-token "2uHJuR-A8c97bvc2yAxh" \
  --description "docker-runner" \
  --maintenance-note "Free-form maintainer notes about this runner" \
  --tag-list "docker,aws" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"
```

### docker in docker

```bash
gitlab-runner register -n \
   --url http://192.168.37.128/ \
   --registration-token GR1348941YfXHiANyYGSk7a6SzsiK \
   --executor docker \
   --description "My Docker Runner" \
   --docker-image "alpine:latest" \
   --docker-privileged
```

### docker套接字绑定

```bash
gitlab-runner register \
   --url http://192.168.37.128/ \
   --registration-token GR1348941YfXHiANyYGSk7a6SzsiK \
   --executor docker \
   --description "My Docker Runner" \
   --docker-image "docker:latest" \
   --docker-volumes /var/run/docker.sock:/var/run/docker.sock
```

到这里就注册成功了，我们可以在gitlab的`Runners`界面看到增加了一个runner

## 相关链接

* [Install GitLab Runner](https://docs.gitlab.com/runner/install/ 'Install GitLab Runner')
* [Registering runners](https://docs.gitlab.com/runner/register/ 'Registering runners')
