import{_ as a,c as e,o as n,e as s}from"./app-0TPXc-ei.js";const c={},o=s(`<h1 id="rimraf命令" tabindex="-1"><a class="header-anchor" href="#rimraf命令"><span>rimraf命令</span></a></h1><blockquote><p><code>rimraf</code>是节点的深度删除模块(如<code>rm -rf</code>)</p></blockquote><p>在<code>Windows</code>系统中删除文件夹（包含文件）时经常会碰到文件正在使用无法删除的问题，这很是让人头疼，不过使用<code>rimraf</code>命令删除就可以解决这个问题。</p><p>要在Windows命令工具中执行该命令可以通过<code>npm</code>或者<code>yarn</code>包安装，当然前提是已经安装了<code>npm</code>或者<code>yarn</code>包，安装方法网上很多这里就不再赘述</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">npm</span> i rimraf <span class="token parameter variable">-g</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或者</span></span>
<span class="line"><span class="token function">yarn</span> <span class="token function">add</span> rimraf global</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就可以在Windows系统中执行<code>rimraf</code>命令了</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>如果系统中安装了<code>git</code>的话，通过<code>git bash</code>就可以执行该命令而不需要另外安装</p><p>但是每次要删除文件夹还需要打开<code>git bash</code>，相对<code>Windows Terminal</code>或者<code>Windows Command</code>来说其实也很是繁琐</p></div>`,7),i=[o];function d(r,t){return n(),e("div",null,i)}const m=a(c,[["render",d],["__file","rimraf-command.html.vue"]]),p=JSON.parse('{"path":"/archive/rimraf-command.html","title":"rimraf命令","lang":"zh-CN","frontmatter":{},"headers":[],"git":{},"filePathRelative":"archive/rimraf-command.md"}');export{m as comp,p as data};