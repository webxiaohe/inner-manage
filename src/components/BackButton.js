import React, {Component} from 'react';
import { Button, Row, Col } from 'antd';
class BackButton extends Component {
    backClick = () => {
        window.history.back();
    }
    render () {
        return (
            <Row justify="end" type="flex">
                <Col span={6}>
                    <Button type="primary" size="small" icon="left" onClick={this.backClick}>返回</Button>
                </Col>
                
            </Row>
        )
    }
}
export default BackButton;