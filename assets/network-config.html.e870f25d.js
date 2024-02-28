import{_ as a,r as e,o as t,c as l,b as n,d as i,a as p,e as c}from"./app.521b9759.js";const o={},u=c(`<h1 id="网络配置" tabindex="-1"><a class="header-anchor" href="#网络配置" aria-hidden="true">#</a> 网络配置</h1><h2 id="未显示声明" tabindex="-1"><a class="header-anchor" href="#未显示声明" aria-hidden="true">#</a> 未显示声明</h2><p>docker-compose中未显式声明，会生成默认的网络</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.4&quot;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis-web</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>web<span class="token punctuation">:</span><span class="token number">1.0</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>web
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">REDIS_HOST</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>app
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8001<span class="token punctuation">:</span><span class="token number">8001</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis<span class="token punctuation">-</span>app
  <span class="token key atrule">redis-app</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>app
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动的容器会被加入<code>srv_default</code>中，其中<code>srv</code>为<code>docker-compose</code>文件所在的父文件夹名</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>root@vm02 test<span class="token punctuation">]</span><span class="token comment"># docker network ls</span>
be43cf4b2125        srv_default         bridge              local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="networks关键字自定义网络" tabindex="-1"><a class="header-anchor" href="#networks关键字自定义网络" aria-hidden="true">#</a> networks关键字自定义网络</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.4&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web-1</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>web<span class="token punctuation">:</span><span class="token number">1.0</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> web1
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> front
      <span class="token punctuation">-</span> back
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redisdb
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> back

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">front</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge
  <span class="token key atrule">back</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge
    <span class="token key atrule">driver_opts</span><span class="token punctuation">:</span>
      <span class="token key atrule">foo</span><span class="token punctuation">:</span> <span class="token string">&quot;1&quot;</span>
      <span class="token key atrule">bar</span><span class="token punctuation">:</span> <span class="token string">&quot;2&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@vm02 network-test<span class="token punctuation">]</span><span class="token comment"># docker network ls</span>
NETWORK ID          NAME                 DRIVER              SCOPE
ca9419193d95        srv_back             bridge              <span class="token builtin class-name">local</span>
7c38ab9beba4        srv_front            bridge              <span class="token builtin class-name">local</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用现有网络" tabindex="-1"><a class="header-anchor" href="#使用现有网络" aria-hidden="true">#</a> 使用现有网络</h2><p>新建一个network</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> network create net-a <span class="token parameter variable">--driver</span> bridge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.4&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web-1</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>web<span class="token punctuation">:</span><span class="token number">1.0</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> web1
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redisdb
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">default</span><span class="token punctuation">:</span>
    <span class="token key atrule">external</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> net<span class="token punctuation">-</span>a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="network-mode" tabindex="-1"><a class="header-anchor" href="#network-mode" aria-hidden="true">#</a> network_mode</h2><p>下面的docker-compose将不会生成新的网络</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.4&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web-1</span><span class="token punctuation">:</span>
    <span class="token key atrule">network_mode</span><span class="token punctuation">:</span> bridge
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>web<span class="token punctuation">:</span><span class="token number">1.0</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> web1
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">network_mode</span><span class="token punctuation">:</span> bridge
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redisdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关链接" tabindex="-1"><a class="header-anchor" href="#相关链接" aria-hidden="true">#</a> 相关链接</h2>`,17),r={href:"https://www.jianshu.com/p/347831f72d1c",title:"docker-compose网络配置",target:"_blank",rel:"noopener noreferrer"};function d(k,v){const s=e("ExternalLinkIcon");return t(),l("div",null,[u,n("p",null,[n("a",r,[i("docker-compose网络配置"),p(s)])])])}const b=a(o,[["render",d],["__file","network-config.html.vue"]]);export{b as default};
