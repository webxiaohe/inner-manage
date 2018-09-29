import React, {Component} from 'react';
import { Tooltip } from 'antd';
import tool from '@/library/tool';
class LimitText extends Component {
    render () {
        let { placement, text, len } = this.props;
        return (
            <Tooltip placement={placement} title={text}>
                <span className="single-ellipsis">{tool.limitLength(text, len)}</span>
            </Tooltip>
        )
    }
}
export default LimitText;