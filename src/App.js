import React, { Component } from 'react';
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
import SiderMenu from './components/SiderMenu';
import wjs from './library/wjs';
import './App.css';
import Routers from './routes';
import logoSrc from './views/Home/logo.png';
const { Header, Sider, Content } = Layout;
class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			collapsed: false,
			userInfo: {},
			selectedKeys: ''
		};
	}
	componentDidMount () {
		if (wjs.auth.isLogined()) {
			this.setState({
				userInfo: wjs.auth.getLoginedUser()
			})
			this.setSelectKey();
		} else {
			setTimeout(() => {
				if (!wjs.auth.isLogined()) window.location.href = wjs.sso.getLoginPage();
			}, 500)
		}
	}
	setSelectKey = () => {
		const { pathname } = this.props.location;
		let selectKey = '';
		if (/\/app\/role(\/edit(\/)?|(\/)?)?$/g.test(pathname)) {
			selectKey = '2';
		} else if (/\/app\/permission(\/edit(\/)?|(\/)?)?$/g.test(pathname)) {
			selectKey = '3';
		} else if (/\/app\/system(\/edit(\/)?|(\/)?)?$/g.test(pathname)) {
			selectKey = '4';
		}else {
			selectKey = '1';
		}
		this.setState({
			selectedKeys:selectKey
		})
	}
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}
	menuClick = (e) => {
		this.setState({
            selectedKeys: e.key
        });
	}
	linkMyCenter = () => {
		const { userInfo } = this.state;
		this.props.history.push('/app/mycenter', {infor: userInfo})
	}
	render() {
		const { selectedKeys, userInfo } = this.state;
		const userMenu = (
			<Menu >
				<Menu.Item onClick={this.linkMyCenter}>
					<Icon type="idcard"/>
					<span>个人中心</span>
				</Menu.Item>
				<Menu.Item onClick={wjs.sso.logOut}>
					<Icon type="logout"/>
					<span>退出登录</span>
				</Menu.Item>
			</Menu>
		)
	  	return (
			<Layout style={{minHeight: '100%'}}>
				<Sider
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
				>
					<div className="logo">
						<img alt="logo" src={logoSrc}></img>
					</div>
					<SiderMenu menuClick={this.menuClick} selectedKeys={selectedKeys}/>
				</Sider>
				<Layout style={{minWidth: '1000px'}}>
					<Header style={{ background: '#fff', padding: 0 }}>
						<div className="header-container">
							<Icon
								className="trigger"
								type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
								onClick={this.toggle}
							/>
							{
								wjs.auth.isLogined() && (
									<div className="header-right-container">
										<Dropdown overlay={userMenu}>
											<a className="ant-dropdown-link">
												<Avatar size="large" icon="user" src={userInfo.avatar} />
											</a>
										</Dropdown>
									</div>
								)
							}
						</div>
					</Header>
					<Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
						<Routers />
					</Content>
				</Layout>
			</Layout>
		);
	}
  }
export default App;