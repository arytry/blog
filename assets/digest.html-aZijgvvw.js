import{_ as s,c as n,o as a,e as t}from"./app-0TPXc-ei.js";const p={},e=t(`<h1 id="摘要算法" tabindex="-1"><a class="header-anchor" href="#摘要算法"><span>摘要算法</span></a></h1><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>摘要算法又称<strong>哈希算法</strong>、<strong>散列算法</strong>。它通过一个函数，把任意长度的数据转换为一个长度固定的数据串（通常用16进制的字符串表示）</p><p>这个过程是不可逆的，因此严格意义上来说<strong>摘要算法不属于加密算法</strong></p><p>常见的摘要算法有MD5、SHA1等</p><h2 id="md5" tabindex="-1"><a class="header-anchor" href="#md5"><span>MD5</span></a></h2><p>MD5（Message Digest Algorithm 5）中文名为<code>消息摘要算法第五版</code></p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="line"><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">MD5Hash</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytes<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name"><span class="token keyword">var</span></span> hash <span class="token operator">=</span> MD5<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token class-name"><span class="token keyword">var</span></span> hashBytes <span class="token operator">=</span> hash<span class="token punctuation">.</span><span class="token function">ComputeHash</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">// 转换为十六进制字符串</span></span>
<span class="line">    <span class="token class-name"><span class="token keyword">var</span></span> hashHex <span class="token operator">=</span> BitConverter<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span>hashBytes<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token string">&quot;-&quot;</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> hashHex<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sha1" tabindex="-1"><a class="header-anchor" href="#sha1"><span>SHA1</span></a></h2><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="line"><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">MD5Hash</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytes<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name"><span class="token keyword">var</span></span> hash <span class="token operator">=</span> SHA1<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token class-name"><span class="token keyword">var</span></span> hashBytes <span class="token operator">=</span> hash<span class="token punctuation">.</span><span class="token function">ComputeHash</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">// 转换为十六进制字符串</span></span>
<span class="line">    <span class="token class-name"><span class="token keyword">var</span></span> hashHex <span class="token operator">=</span> BitConverter<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span>hashBytes<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token string">&quot;-&quot;</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> hashHex<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>小技巧</summary><p>以下两种方式都可以将字节数组转换为十六进制字符串</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="line"><span class="token class-name"><span class="token keyword">var</span></span> hashHex <span class="token operator">=</span> BitConverter<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span>hashBytes<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token string">&quot;-&quot;</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="line"><span class="token class-name"><span class="token keyword">var</span></span> hashHex <span class="token operator">=</span> hashBytes<span class="token punctuation">.</span><span class="token function">Aggregate</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">(</span>current<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token interpolation-string"><span class="token string">$&quot;</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">current</span><span class="token punctuation">}</span></span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">next</span><span class="token format-string"><span class="token punctuation">:</span>X2</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></details>`,11),c=[e];function l(o,i){return a(),n("div",null,c)}const r=s(p,[["render",l],["__file","digest.html.vue"]]),k=JSON.parse('{"path":"/algorithms/encryption/digest.html","title":"摘要算法","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"MD5","slug":"md5","link":"#md5","children":[]},{"level":2,"title":"SHA1","slug":"sha1","link":"#sha1","children":[]}],"git":{},"filePathRelative":"algorithms/encryption/digest.md"}');export{r as comp,k as data};
