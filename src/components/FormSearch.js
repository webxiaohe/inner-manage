import React, {Component} from 'react';
import {Form, Row, Col, Input, Button} from 'antd';
const FormItem = Form.Item;
class FormSearch extends Component {
    getFields () {
        const { form: {getFieldDecorator}, searchList } = this.props;
        const children = [];
        for (let i = 0; i < searchList.length; i++) {
            children.push(
                <Col span={6} key={i}>
                    <FormItem label={searchList[i].name}>
                        {getFieldDecorator(searchList[i].fieldname)(
                            <Input />
                        )}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }
    handleSearch = (e) => {
        e.preventDefault();
        let { form, handleSearch } = this.props;
        let value = {};
        form.validateFields((err,values) => {
            for (let i in values) {
                if (values[i]) {
                    value[i] = values[i];
                }
            }
            handleSearch(err, value);
        })
    }
    handleReset = () => {
        let { form } = this.props;
        form.resetFields();
    }
    render () {
        return (
            <Form 
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={24} type="flex">
                    {this.getFields()}
                    <Col span={6} style={{paddingTop:'4px'}}>
                        <Button type="primary" htmlType="submit" icon="search">搜索</Button>
                        <Button type="primary" htmlType="submit" icon="retweet" style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
const wrapFormSearch = Form.create()(FormSearch);
export default wrapFormSearch;