export default {
    menus: [
        {path: '/app', isMenu: true, title: '用户', icon: 'user', key: '1', component: 'User'},
        {path: '/app/role', isMenu: true, title: '角色', icon: 'team', key: '2', component: 'Role'},
        {path: '/app/permission', isMenu: true, title: '权限', icon: 'key', key: '3', component: 'Permission'},
        {path: '/app/system', isMenu: true, title: '系统', icon: 'appstore', key: '4', component: 'System'},
    ]
}