import{_ as s,c as a,o as n,e}from"./app-0TPXc-ei.js";const l={},t=e(`<h1 id="docker安装mysql" tabindex="-1"><a class="header-anchor" href="#docker安装mysql"><span>docker安装mysql</span></a></h1><p>拉取镜像</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">docker</span> pull mysql</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>安装并运行容器</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">--name</span> mysql <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">--restart</span> always <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span></span>
<span class="line">    mysql</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>-p 3306:3306</code> 映射容器服务的<code>3306</code>端口到宿主机的<code>3306</code>端口</li><li><code>MYSQL_ROOT_PASSWORD=123456</code> 设置<code>MySQL</code>服务<code>root</code>用户的密码</li></ul><p>接下来就可以通过<code>MySQL</code>客户端工具（如：<code>HeidiSQL</code>）连接<code>MySQL</code>服务了</p><p>当然，我们也可以通过命令连接</p><p>首先进入容器</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mysql <span class="token function">bash</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>通过<code>root</code>用户连接，然后输入密码</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span></span>
<span class="line"></span>
<span class="line">Enter password:</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来就可以执行sql语句命令了</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="line">mysql<span class="token operator">&gt;</span> <span class="token keyword">select</span> host<span class="token punctuation">,</span><span class="token keyword">user</span><span class="token punctuation">,</span>plugin<span class="token punctuation">,</span>authentication_string <span class="token keyword">from</span> mysql<span class="token punctuation">.</span><span class="token keyword">user</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,14),i=[t];function c(p,r){return n(),a("div",null,i)}const d=s(l,[["render",c],["__file","docker-install-mysql.html.vue"]]),u=JSON.parse('{"path":"/docker/instance/docker-install-mysql.html","title":"docker安装mysql","lang":"zh-CN","frontmatter":{},"headers":[],"git":{},"filePathRelative":"docker/instance/docker-install-mysql.md"}');export{d as comp,u as data};