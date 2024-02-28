import{_ as i,r,o as l,c,b as n,d as s,a as e,e as t}from"./app.521b9759.js";const o={},p=t(`<h1 id="docker安装gitlab-runner" tabindex="-1"><a class="header-anchor" href="#docker安装gitlab-runner" aria-hidden="true">#</a> docker安装gitlab-runner</h1><div class="custom-container tip"><p class="custom-container-title">提示</p><p>理想情况下，不应将GitLab Runner与GitLab安装在同一台机器上。</p></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull gitlab/gitlab-runner
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">--name</span> gitlab-runner <span class="token punctuation">\\</span>
    <span class="token parameter variable">--restart</span> always <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /srv/gitlab-runner/etc:/etc/gitlab-runner <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /var/run/docker.sock:/var/run/docker.sock <span class="token punctuation">\\</span>
    gitlab/gitlab-runner
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> docker-compose</h2>`,6),u={href:"https://docs.docker.com/compose/install/",target:"_blank",rel:"noopener noreferrer"},d=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># unbuntu</span>
<span class="token function">apt</span> <span class="token function">install</span> <span class="token function">docker-compose</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,1),v=t(`<li><p>创建<code>docker-compose.yml</code>文件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.3&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">gitlab-runner</span><span class="token punctuation">:</span>
    <span class="token key atrule">network_mode</span><span class="token punctuation">:</span> bridge <span class="token comment"># do not create new network</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&#39;gitlab/gitlab-runner&#39;</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> gitlab<span class="token punctuation">-</span>runner
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /srv/gitlab<span class="token punctuation">-</span>runner/etc<span class="token punctuation">:</span>/etc/gitlab<span class="token punctuation">-</span>runner
      <span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/var/run/docker.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>确保与<code>docker-compose.yml</code>文件在同一目录下并启动它</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> compose up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>`,2),k=t(`<h2 id="注册gitlab-runner" tabindex="-1"><a class="header-anchor" href="#注册gitlab-runner" aria-hidden="true">#</a> 注册gitlab-runner</h2><p>一个Runner可以特定于某个项目，也可以在GitLab CI中服务于任何项目。服务于所有项目的Runner称为<code>Shared Runner</code></p><h3 id="获取令牌" tabindex="-1"><a class="header-anchor" href="#获取令牌" aria-hidden="true">#</a> 获取令牌</h3><ul><li><code>Shared Runner</code> Admin Area&gt; Overview &gt; Runners</li><li><code>Group Runner</code> Group &gt; CI/CD &gt; Runners</li><li><code>Specific Runners</code> Project &gt; Settings &gt; CI/CD &gt; Runners &gt; Specific runners</li></ul><p>如果你是GitLab实例管理员的话，你可以注册一个Shared Runner</p><h3 id="register" tabindex="-1"><a class="header-anchor" href="#register" aria-hidden="true">#</a> Register</h3><p>进入容器执行注册命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> gitlab-runner gitlab-runner register
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来会依次要求输入以下信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Enter the GitLab instance URL <span class="token punctuation">(</span>for example, https://gitlab.com/<span class="token punctuation">)</span>:
http://192.168.37.128/

Enter the registration token:
2uHJuR-A8c97bvc2yAxh

Enter a description <span class="token keyword">for</span> the runner:
<span class="token punctuation">[</span>f0f33d68c59a<span class="token punctuation">]</span>: docker-runner

Enter tags <span class="token keyword">for</span> the runner <span class="token punctuation">(</span>comma-separated<span class="token punctuation">)</span>:
v1

Registering runner<span class="token punctuation">..</span>. succeeded                     <span class="token assign-left variable">runner</span><span class="token operator">=</span>x8b5fALJ
Enter an executor: virtualbox, docker+machine, kubernetes, custom, docker, docker-ssh, parallels, shell, ssh, docker-ssh+machine:
<span class="token function">docker</span>

Enter the default Docker image <span class="token punctuation">(</span>for example, ruby:2.6<span class="token punctuation">)</span>:
alpine:latest

Runner registered successfully. Feel <span class="token function">free</span> to start it, but <span class="token keyword">if</span> it&#39;s running already the config should be automatically reloaded<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上是通过手动一步一步设置，这种操作相对比较麻烦一些，下面我们根据参数指定注册过程需要的数据直接配置，参数根据需要自行修改</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gitlab-runner register <span class="token punctuation">\\</span>
  --non-interactive <span class="token punctuation">\\</span>
  <span class="token parameter variable">--url</span> <span class="token string">&quot;http://192.168.37.128/&quot;</span> <span class="token punctuation">\\</span>
  --registration-token <span class="token string">&quot;2uHJuR-A8c97bvc2yAxh&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--executor</span> <span class="token string">&quot;docker&quot;</span> <span class="token punctuation">\\</span>
  --docker-image alpine:latest <span class="token punctuation">\\</span>
  <span class="token parameter variable">--description</span> <span class="token string">&quot;docker-runner&quot;</span> <span class="token punctuation">\\</span>
  --maintenance-note <span class="token string">&quot;Free-form maintainer notes about this runner&quot;</span> <span class="token punctuation">\\</span>
  --tag-list <span class="token string">&quot;docker,aws&quot;</span> <span class="token punctuation">\\</span>
  --run-untagged<span class="token operator">=</span><span class="token string">&quot;true&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--locked</span><span class="token operator">=</span><span class="token string">&quot;false&quot;</span> <span class="token punctuation">\\</span>
  --access-level<span class="token operator">=</span><span class="token string">&quot;not_protected&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是在<code>Docker</code>容器中运行的runner，注册命令的结构还可以类似于这样</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">--name</span> gitlab-runner <span class="token punctuation">\\</span>
  <span class="token parameter variable">--restart</span> always <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> /srv/gitlab-runner/etc:/etc/gitlab-runner <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> /var/run/docker.sock:/var/run/docker.sock <span class="token punctuation">\\</span>
  gitlab/gitlab-runner register <span class="token punctuation">\\</span>
  --non-interactive <span class="token punctuation">\\</span>
  <span class="token parameter variable">--executor</span> <span class="token string">&quot;docker&quot;</span> <span class="token punctuation">\\</span>
  --docker-image alpine:latest <span class="token punctuation">\\</span>
  <span class="token parameter variable">--url</span> <span class="token string">&quot;http://192.168.37.128/&quot;</span> <span class="token punctuation">\\</span>
  --registration-token <span class="token string">&quot;2uHJuR-A8c97bvc2yAxh&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--description</span> <span class="token string">&quot;docker-runner&quot;</span> <span class="token punctuation">\\</span>
  --maintenance-note <span class="token string">&quot;Free-form maintainer notes about this runner&quot;</span> <span class="token punctuation">\\</span>
  --tag-list <span class="token string">&quot;docker,aws&quot;</span> <span class="token punctuation">\\</span>
  --run-untagged<span class="token operator">=</span><span class="token string">&quot;true&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--locked</span><span class="token operator">=</span><span class="token string">&quot;false&quot;</span> <span class="token punctuation">\\</span>
  --access-level<span class="token operator">=</span><span class="token string">&quot;not_protected&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-in-docker" tabindex="-1"><a class="header-anchor" href="#docker-in-docker" aria-hidden="true">#</a> docker in docker</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gitlab-runner register <span class="token parameter variable">-n</span> <span class="token punctuation">\\</span>
   <span class="token parameter variable">--url</span> http://192.168.37.128/ <span class="token punctuation">\\</span>
   --registration-token GR1348941YfXHiANyYGSk7a6SzsiK <span class="token punctuation">\\</span>
   <span class="token parameter variable">--executor</span> <span class="token function">docker</span> <span class="token punctuation">\\</span>
   <span class="token parameter variable">--description</span> <span class="token string">&quot;My Docker Runner&quot;</span> <span class="token punctuation">\\</span>
   --docker-image <span class="token string">&quot;alpine:latest&quot;</span> <span class="token punctuation">\\</span>
   --docker-privileged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker套接字绑定" tabindex="-1"><a class="header-anchor" href="#docker套接字绑定" aria-hidden="true">#</a> docker套接字绑定</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gitlab-runner register <span class="token punctuation">\\</span>
   <span class="token parameter variable">--url</span> http://192.168.37.128/ <span class="token punctuation">\\</span>
   --registration-token GR1348941YfXHiANyYGSk7a6SzsiK <span class="token punctuation">\\</span>
   <span class="token parameter variable">--executor</span> <span class="token function">docker</span> <span class="token punctuation">\\</span>
   <span class="token parameter variable">--description</span> <span class="token string">&quot;My Docker Runner&quot;</span> <span class="token punctuation">\\</span>
   --docker-image <span class="token string">&quot;docker:latest&quot;</span> <span class="token punctuation">\\</span>
   --docker-volumes /var/run/docker.sock:/var/run/docker.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到这里就注册成功了，我们可以在gitlab的<code>Runners</code>界面看到增加了一个runner</p><h2 id="相关链接" tabindex="-1"><a class="header-anchor" href="#相关链接" aria-hidden="true">#</a> 相关链接</h2>`,20),b={href:"https://docs.gitlab.com/runner/install/",title:"Install GitLab Runner",target:"_blank",rel:"noopener noreferrer"},m={href:"https://docs.gitlab.com/runner/register/",title:"Registering runners",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.cnblogs.com/xxred/p/11548254.html",target:"_blank",rel:"noopener noreferrer"};function h(f,q){const a=r("ExternalLinkIcon");return l(),c("div",null,[p,n("ol",null,[n("li",null,[n("p",null,[n("a",u,[s("安装docker-compose"),e(a)])]),d]),v]),k,n("ul",null,[n("li",null,[n("a",b,[s("Install GitLab Runner"),e(a)])]),n("li",null,[n("a",m,[s("Registering runners"),e(a)])]),n("li",null,[n("a",g,[s("gitlab-runner 的 executors 之 docker"),e(a)])])])])}const _=i(o,[["render",h],["__file","docker-install-gitlab-runner.html.vue"]]);export{_ as default};
