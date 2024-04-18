import{_ as n,o as s,c as e,e as a}from"./app.8bbedbe7.js";const i={},c=a(`<h1 id="service-name和container-name" tabindex="-1"><a class="header-anchor" href="#service-name和container-name" aria-hidden="true">#</a> service name和container name</h1><p>我们在定义docker-compose.yml文件里面经常会有service name和container name，这两者有什么区别呢？</p><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h2><ol><li>一个service可以拥有一个或多个container</li><li>container是docker的概念，因此我们在docker域里面，处理的是container</li><li>service是docker-compose概念， 因此我们在docker-compose域里面，才处理的是service(当然docker-compose也能处理container)</li></ol><ul><li><p>同时定义service name和container name</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;2&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">nginxservice</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker-compose</span> up

$ <span class="token function">docker</span> <span class="token function">ps</span>
CONTAINER ID   IMAGE   COMMAND                  CREATED          STATUS         PORTS    NAMES
de5ce2bcf891   nginx   <span class="token string">&quot;/docker-entrypoint.…&quot;</span>   <span class="token number">53</span> seconds ago   Up <span class="token number">5</span> seconds   <span class="token number">80</span>/tcp   nginx


$ <span class="token function">docker-compose</span> stop nginxservice
Stopping nginx <span class="token punctuation">..</span>. <span class="token keyword">done</span>

$ <span class="token function">docker-compose</span> start nginxservice
Starting nginx <span class="token punctuation">..</span>. <span class="token keyword">done</span>

$ <span class="token function">docker-compose</span> stop nginx
ERROR: No such service: nginx

$ <span class="token function">docker-compose</span> start nginx
ERROR: No such service: nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到docker-compose start/stop处理的service name，而不是container name</p></li><li><p>只定义service name</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;2&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">nginxservice</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker-compose</span> up

$ <span class="token function">docker</span> <span class="token function">ps</span>
CONTAINER ID   IMAGE   COMMAND                  CREATED          STATUS         PORTS    NAMES
de5ce2bcf891   nginx   <span class="token string">&quot;/docker-entrypoint.…&quot;</span>   <span class="token number">53</span> seconds ago   Up <span class="token number">5</span> seconds   <span class="token number">80</span>/tcp   srv_nginxservice_1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行起来后可以看到docker-compose自动给container分配了一个名字</p><p>其格式为：&lt;当前工作路径名&gt;_&lt;servicename&gt;_&lt;sequencenumber&gt;</p><p>sequencenumber是干什么用的呢，我们看后面的例子</p></li><li><p>定义多个container name</p><p>我们一次启动5个linuxservice containers：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">--scale</span> <span class="token assign-left variable">nginxservice</span><span class="token operator">=</span><span class="token number">5</span>
Creating network <span class="token string">&quot;srv_default&quot;</span> with the default driver
Creating srv_nginxservice_1 <span class="token punctuation">..</span>.
Creating srv_nginxservice_2 <span class="token punctuation">..</span>.
Creating srv_nginxservice_3 <span class="token punctuation">..</span>.
Creating srv_nginxservice_4 <span class="token punctuation">..</span>.
Creating srv_nginxservice_5 <span class="token punctuation">..</span>.
Creating srv_nginxservice_1 <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating srv_nginxservice_2 <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating srv_nginxservice_3 <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating srv_nginxservice_4 <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating srv_nginxservice_5 <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Attaching to srv_nginxservice_3, srv_nginxservice_2, srv_nginxservice_4, srv_nginxservice_1, srv_nginxservice_5


$ <span class="token function">docker</span> <span class="token function">ps</span>
CONTAINER ID   IMAGE   COMMAND                  CREATED          STATUS         PORTS    NAMES
de5ce2bcf891   nginx   <span class="token string">&quot;/docker-entrypoint.…&quot;</span>   <span class="token number">53</span> seconds ago   Up <span class="token number">5</span> seconds   <span class="token number">80</span>/tcp   srv_nginxservice_1
c1371a78d7f9   nginx   <span class="token string">&quot;/docker-entrypoint.…&quot;</span>   <span class="token number">53</span> seconds ago   Up <span class="token number">5</span> seconds   <span class="token number">80</span>/tcp   srv_nginxservice_2
7a8e2954b267   nginx   <span class="token string">&quot;/docker-entrypoint.…&quot;</span>   <span class="token number">53</span> seconds ago   Up <span class="token number">5</span> seconds   <span class="token number">80</span>/tcp   srv_nginxservice_3
f31f0c18d169   nginx   <span class="token string">&quot;/docker-entrypoint.…&quot;</span>   <span class="token number">53</span> seconds ago   Up <span class="token number">5</span> seconds   <span class="token number">80</span>/tcp   srv_nginxservice_4
6fc546cb5a3d   nginx   <span class="token string">&quot;/docker-entrypoint.…&quot;</span>   <span class="token number">53</span> seconds ago   Up <span class="token number">5</span> seconds   <span class="token number">80</span>/tcp   srv_nginxservice_5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子中我们看到service有5个container被创建出来，每一container的sequence是从1开始累加。</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>docker-compose stop/start会对5个container一起操作</p></div></li></ul>`,5),r=[c];function t(o,l){return s(),e("div",null,r)}const d=n(i,[["render",t],["__file","service-name-and-container-name.html.vue"]]);export{d as default};
