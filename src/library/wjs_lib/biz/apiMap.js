/**
 * ddn官网接口列表
 */
let config = require('./api')();
 //登录验证
//  config.apiValidateUrl = config.resolveUrl("/passport/validate");
// 获取角色列表
config.RoleListUrl = config.resolveUrl("/role/findAll");
// 获取用户列表
config.UserListUrl = config.resolveUrl("/usersSearch/findAll");
// 获取权限列表
config.PermisListUrl = config.resolveUrl("/permission/findAll");
// 获取系统列表
config.SystemListUrl = config.resolveUrl("/bizSystem/findAll");
// 获取角色详情
config.RoleDetailUrl = config.resolveUrl('/role/getOne');
// 角色编辑中获取系统列表
config.SystemList = config.resolveUrl('/bizSystem/findAll');
// 添加角色
config.RoleAddUrl = config.resolveUrl('/role/new');
// 编辑角色
config.RoleUpdateUrl = config.resolveUrl('/role/update');
// 获取角色权限
config.RolePermisUrl = config.resolveUrl('/api/permission/getRolePermissions');
// 给角色添加权限
config.RolePermisAddUrl = config.resolveUrl('/api/permission/addArr');
// 冻结用户
config.UserFreezeUrl = config.resolveUrl('/api/user/freezeUser');
// 获取用户角色
config.UserRoleUrl = config.resolveUrl('/role/getRolesAndSelfRole');
// 给用户设置角色
config.UserRoleAddUrl = config.resolveUrl('/userRoles/new');
// 获取权限详情
config.PermisDetailUrl = config.resolveUrl('/api/permission/getOne');
//权限编辑中获取所有系统
config.PermisSystemListUrl = config.resolveUrl('/bizSystem/findAll');
// 修改权限
config.PermisUpdateUrl = config.resolveUrl('/permission/update');
// 添加权限
config.PermisAddUrl = config.resolveUrl('/permission/new');
// 获取系统详情
config.SystemDetailUrl = config.resolveUrl('/bizSystem/findOne');
// 修改系统
config.SystemUpdateUrl = config.resolveUrl('/bizSystem/update');
// 添加系统
config.SystemAddUrl = config.resolveUrl('/bizSystem/new');
// 修改当前登录信息
config.CenterUpdateUrl = config.resolveUrl('/api/user/updataAvatarOrNickName');

export { config } ;