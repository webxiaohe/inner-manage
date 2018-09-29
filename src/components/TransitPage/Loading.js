/**
 * @param style 接收组件的自定义样式
 * @param color 接收组件的自定义颜色
 */
import React, {Component} from 'react';
import wjs from '../../library/wjs';

import './style/Loading.css'

class Loading extends Component{
    render () {
        var { style, color } = this.props;
        if (wjs.utils.isNullOrEmpty(color)) {
            color = "#9F9F9F";
        }
        return (
            <div style={style}>
                <div className="spinner">
                    <div className="rect1" style={{background: color}}></div>
                    <div className="rect2" style={{background: color}}></div>
                    <div className="rect3" style={{background: color}}></div>
                    <div className="rect4" style={{background: color}}></div>
                    <div className="rect5" style={{background: color}}></div>
                </div>
            </div>
        );
    }
}

export default Loading;