// 作为 Layout子组件 展示, 并为左侧菜单显示的路由
exports.appRouter = [
    {
        id: '1',
        apiKey: '',
        title: '系统管理',
        children: [
            {
                id: '1',
                apiKey: '',
                title: '角色列表',
            },
            {
                id: '2',
                apiKey: '',
                title: '组织架构',
            },
            {
                id: '3',
                apiKey: '',
                title: '用户列表',
            },
        ],
    },
];