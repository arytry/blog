import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import { bar } from './configs'

export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: 'Stack',
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
            // placeholder: '搜索文档'
        })
    ],

    theme: defaultTheme({
        logo: '/assets/img/logo.png',

        repo: 'arytry/stack',
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
