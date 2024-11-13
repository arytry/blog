import{_ as e,c as a,o as s,e as n}from"./app-0TPXc-ei.js";const r={},c=n(`<h1 id="docker安装portainer" tabindex="-1"><a class="header-anchor" href="#docker安装portainer"><span>docker安装portainer</span></a></h1><p><code>portainer</code>是管理docker容器和镜像的可视化工具</p><h2 id="安装运行" tabindex="-1"><a class="header-anchor" href="#安装运行"><span>安装运行</span></a></h2><p>目前docker中的<code>portainer</code>包含CE（Community Edition，社区版）和EE（Enterprise Edition，企业版）两个版本，我们拉取免费的CE版即可</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">docker</span> pull portainer/portainer-ce</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>运行容器</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span><span class="token operator">=</span>portainer <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-p</span> <span class="token number">8000</span>:8000 <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-v</span> /var/run/docker.sock:/var/run/docker.sock <span class="token punctuation">\\</span></span>
<span class="line">    portainer/portainer-ce</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后访问<code>http://宿主机ip:9000</code>地址就可以打开portainer管理界面，首次登录需要设置登录密码</p><p>登录成功后系统默认为我们推荐了<code>local</code>环境，只需要点击进入即可管理本机docker</p><h2 id="连接管理" tabindex="-1"><a class="header-anchor" href="#连接管理"><span>连接管理</span></a></h2><p>如果只需要管理本机docker，可以直接选择<code>local</code>即可</p><p>如果还需要管理远程主机docker，那么首先需要开启<strong>远程主机docker的2375端口</strong></p><h3 id="开启docker远程端口" tabindex="-1"><a class="header-anchor" href="#开启docker远程端口"><span>开启docker远程端口</span></a></h3><h4 id="修改docker-service" tabindex="-1"><a class="header-anchor" href="#修改docker-service"><span>修改docker.service</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">vim</span> /lib/systemd/system/docker.service</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 找到ExecStart参数并替换为下面代码</span></span>
<span class="line"><span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/bin/dockerd <span class="token parameter variable">-H</span> unix:///var/run/docker.sock <span class="token parameter variable">-H</span> tcp://0.0.0.0:2375</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>实际有三种方法可以修改，具体实现方式可自行Google</p></div><div class="custom-container danger"><p class="custom-container-title">风险</p><p><code>ExecStart</code>公开2375端口意味着放开了RemoteApi权限，有病毒注入风险</p></div><h4 id="重启docker服务" tabindex="-1"><a class="header-anchor" href="#重启docker服务"><span>重启docker服务</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">systemctl daemon-reload</span>
<span class="line">systemctl restart <span class="token function">docker</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="远程连接" tabindex="-1"><a class="header-anchor" href="#远程连接"><span>远程连接</span></a></h3><p>访问portainer，选择左侧菜单<code>environments</code>，然后点击添加环境，<code>Environment type</code>选择<code>Docker</code></p><ul><li><code>Name</code> docker名称，管理列表中展示管理</li><li><code>Environment URL</code> 远程docker地址，端口默认是<code>2375</code></li></ul><div class="custom-container warning"><p class="custom-container-title">备注</p><p><code>portainer</code>不同版本命名有差异，本教程以当前最新版本<code>2.9.2</code>为准</p></div>`,23),i=[c];function l(t,o){return s(),a("div",null,i)}const p=e(r,[["render",l],["__file","docker-install-portainer.html.vue"]]),h=JSON.parse('{"path":"/docker/instance/docker-install-portainer.html","title":"docker安装portainer","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"安装运行","slug":"安装运行","link":"#安装运行","children":[]},{"level":2,"title":"连接管理","slug":"连接管理","link":"#连接管理","children":[{"level":3,"title":"开启docker远程端口","slug":"开启docker远程端口","link":"#开启docker远程端口","children":[]},{"level":3,"title":"远程连接","slug":"远程连接","link":"#远程连接","children":[]}]}],"git":{},"filePathRelative":"docker/instance/docker-install-portainer.md"}');export{p as comp,h as data};