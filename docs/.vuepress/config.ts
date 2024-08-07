import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import { bar } from './configs'

export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: '博客',
    description: '同步，分享，解决方案',
    head: [
        ['link', { rel: 'icon', href: '/assets/img/favicon.ico' }]
    ],
    // host: '127.0.0.1',
    // port: 33,
    // theme: 'antdocs',

    plugins: [
        searchPlugin({
            maxSuggestions: 10,
            locales: {
                "/": {
                    placeholder: '搜索'
                }
            }
        }),
        copyCodePlugin(),
    ],
    
    bundler: viteBundler(),

    theme: defaultTheme({
        logo: '/assets/img/logo.png',

        repo: 'arytry/blog',
        editLink: false,    // 展示 repo 的编辑路径
        // editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: false,
        // lastUpdatedText: '上次更新',

        contributors: false,
        // contributorsText: '贡献者',

        navbar: bar.navbar(),
        sidebar: bar.sidebar(),
        sidebarDepth: 4,
    })
})
