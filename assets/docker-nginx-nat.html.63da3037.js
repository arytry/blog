import{_ as a,r as e,o,c as t,b as n,d as i,a as c,e as p}from"./app.8bbedbe7.js";const l={},r=p(`<h1 id="docker-nginx添加端口映射" tabindex="-1"><a class="header-anchor" href="#docker-nginx添加端口映射" aria-hidden="true">#</a> docker nginx添加端口映射</h1><div class="custom-container tip"><p class="custom-container-title">提示</p><p><strong>一般我们通过docker运行nginx容器的时候，都只会将<code>80</code>或者<code>443</code>端口映射到宿主机，因为不知道后期在实现反向代理的时候具体会指定什么端口号，所以大部分时候会在后期修改端口映射</strong></p></div><p>假如在运行容器时执行的命令如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># -p 80:80  端口映射：容器80端口映射到宿主机的80端口</span>
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> nginx <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">-v</span> /etc/nginx/conf.d:/etc/nginx/conf.d <span class="token parameter variable">-d</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们想实现反向代理，代理监听端口只有80端口才能被访问，因为非80端口没有做宿主机映射，即便实现了反向代理，外部也不能通过该端口访问到容器内的代理地址。如果需要被外部访问，可以有以下几种方式：</p><h2 id="移除容器然后添加端口映射重新运行" tabindex="-1"><a class="header-anchor" href="#移除容器然后添加端口映射重新运行" aria-hidden="true">#</a> 移除容器然后添加端口映射重新运行</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 停止容器。删除容器之前必需先停止</span>
<span class="token function">docker</span> stop nginx

<span class="token function">docker</span> <span class="token function">rm</span> nginx

<span class="token comment"># -p 9797:9797  假设9797就是我们实现反向代理需要监听的端口</span>
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> nginx <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">-p</span> <span class="token number">9797</span>:9797 <span class="token parameter variable">-v</span> /etc/nginx/conf.d:/etc/nginx/conf.d <span class="token parameter variable">-d</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改容器配置添加端口映射" tabindex="-1"><a class="header-anchor" href="#修改容器配置添加端口映射" aria-hidden="true">#</a> 修改容器配置添加端口映射</h2><h3 id="首先找到容器id" tabindex="-1"><a class="header-anchor" href="#首先找到容器id" aria-hidden="true">#</a> 首先找到容器ID</h3><p>执行命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># nginx 容器名称</span>
<span class="token function">docker</span> inspect nginx

<span class="token comment"># 或者</span>

<span class="token function">docker</span> <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;Id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;c7d153b66564a7cb2157d8582d4018d60882ac144192174e92302f1c8c380b43&quot;</span><span class="token punctuation">,</span> <span class="token comment">// hash_of_the_container</span>
        <span class="token property">&quot;Created&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2020-08-21T09:41:36.597993005Z&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/docker-entrypoint.sh&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;nginx&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;-g&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;daemon off;&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;State&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
...

<span class="token comment">// 或者</span>

CONTAINER ID        IMAGE          ...        NAMES
c7d153b66564        nginx          ...        nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="停止容器" tabindex="-1"><a class="header-anchor" href="#停止容器" aria-hidden="true">#</a> 停止容器</h3><blockquote><p><strong>修改之前一定要先停掉容器，否则自动还原</strong></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> stop nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="修改配置文件hostconfig-json和config-v2-json" tabindex="-1"><a class="header-anchor" href="#修改配置文件hostconfig-json和config-v2-json" aria-hidden="true">#</a> 修改配置文件<code>hostconfig.json</code>和<code>config.v2.json</code></h3><p>容器路径一般在<code>/var/lib/docker/containers/</code>目录下面</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /var/lib/docker/containers/c7d153b66564a7cb2157d8582d4018d60882ac144192174e92302f1c8c380b43 <span class="token comment"># container id</span>
<span class="token function">vim</span> hostconfig.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>找到如下配置节点</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;PortBindings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;80/tcp&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;HostIp&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;HostPort&quot;</span><span class="token operator">:</span> <span class="token string">&quot;80&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>键盘按下<code>i</code>切换为文本输入模式，添加映射端口</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;PortBindings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;80/tcp&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;HostIp&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;HostPort&quot;</span><span class="token operator">:</span> <span class="token string">&quot;80&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;9797/tcp&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;HostIp&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;HostPort&quot;</span><span class="token operator">:</span> <span class="token string">&quot;9797&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
...

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改完成后按下<code>ESC</code>,然后输入<code>:wq</code>保存文件并退出编辑模式</p><p>然后同路径下打开<code>config.v2.json</code>文件，找到<code>ExposedPorts</code>节点并添加映射端口</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;ExposedPorts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;80/tcp&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;9797/tcp&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="保存、退出、重启容器" tabindex="-1"><a class="header-anchor" href="#保存、退出、重启容器" aria-hidden="true">#</a> 保存、退出、重启容器</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl restart docker.service <span class="token comment"># 重启docker服务</span>
<span class="token function">docker</span> start nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关链接" tabindex="-1"><a class="header-anchor" href="#相关链接" aria-hidden="true">#</a> 相关链接</h2>`,29),d={href:"https://www.cnblogs.com/chengshuai5421/p/13544614.html",title:"Docker给nginx添加端口映射",target:"_blank",rel:"noopener noreferrer"};function u(v,k){const s=e("ExternalLinkIcon");return o(),t("div",null,[r,n("p",null,[n("a",d,[i("Docker给nginx添加端口映射"),c(s)])])])}const b=a(l,[["render",u],["__file","docker-nginx-nat.html.vue"]]);export{b as default};
