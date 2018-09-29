import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';
import config from '../routes/config';
import { biz } from '../library/wjs';
const menus = config.menus;
class SiderMenu extends Component {
    static defaultProps = {
        permiss : ['ebook_admin']
    }
    constructor (props) {
        super(props);
    }
    componentWillMount () {
        biz.permission.refreshPageParams(this.props.permiss,this);
    }
    sessionStore() {
        let self = this;
        if(this.state) {
            for(let i=0;i<self.props.permiss.length;i++){
                sessionStorage.setItem(self.props.permiss[i],this.state[self.props.permiss[i]])
            }
        }
        
    }
    renderMenuItem = (item) => {
        if (this.state && this.state.ebook_admin === 1) {
            return (
                <Menu.Item key={item.key}>
                    <Link to={item.path}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
            )

        }
    }
    render () {
        this.sessionStore();
        const { menuClick, selectedKeys } = this.props;
        return (
            <Menu theme="dark" mode="inline" onClick={menuClick} selectedKeys={[selectedKeys]}>
                {
                    menus && menus.map (item => item.isMenu && this.renderMenuItem(item))
                }
            </Menu>
        )
    }
}
export default SiderMenu;