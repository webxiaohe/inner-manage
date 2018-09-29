import React, {Component} from 'react';
import { Button } from 'antd';
import './home.css';
import wjs from '@/library/wjs';
class Home extends Component {
    toLogin () {
        if (wjs.auth.isLogined()) {
            window.location.href = '/app'
        } else {
            window.location.href = wjs.sso.getLoginPage();
        }
    }
    toRegister () {
        window.location.href = wjs.sso.getRegisterPage()
    }
    render () {
        return (
            <div className="home-container">
                <div className="home-content">
                    <div className="home-logo" />
                    <div className="home-btn-container px-40">
                        <Button type="primary" block className="mb-25" onClick={this.toLogin}>登录</Button>
                        <Button type="primary" block onClick={this.toRegister}>注册</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;