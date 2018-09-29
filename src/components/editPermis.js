import React, {Component} from 'react';
import { Form, Input, Button, Radio, Select, message } from 'antd';
import BackButton from './BackButton';
import { request, biz } from '../library/wjs';
const bizApi = biz.api;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
class EditPermis extends Component {
    constructor (props) {
        super(props);
        this.state = {
            systemList: [],
            fileList: [],
            isShowRelate: true
        }
    }
    componentDidMount () {
        let { location: {state} } = this.props;
        this.getSystemItem();
        state && this.getDetail(state.key)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { location: {state}, form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (state) {
                    request.postWithCookie(bizApi.PermisUpdateUrl, Object.assign({},values,{id: state.key})).then((data) => {
                        if(+data.code !== 0) {
                            message.error(data.message || '修改权限失败');
                        }else{
                            message.success(data.message || '修改权限成功');
                            this.props.history.push('/app/permission');
                        }
                    })
                } else {
                    request.postWithCookie(bizApi.PermisAddUrl, values).then((data) => {
                        if(+data.code !== 0) {
                            message.error(data.message || '添加权限失败');
                        }else{
                            message.success(data.message || '添加权限成功');
                            this.props.history.push('/app/permission');
                        }
                    })
                }
            }
        });
    }
    getSystemItem = () => {
        request.getWithCookie(bizApi.PermisSystemListUrl).then((data) => {
            if(+data.code === 0) {
                this.setState({
                    systemList: data.data.data
                })
            }
        })
    }
    getDetail = (id) => {
        let { form } = this.props;
        request.getWithCookie(bizApi.PermisDetailUrl, {Id: id}).then((data) => {
            if (data.code === 0) {
                const itemObj = data.data;
                form.setFieldsValue({
                    name: itemObj.Name,
                    bizSystemId: itemObj.BizSystemId,
                    desc: itemObj.Desc,
                    path: itemObj.Path,
                    verb: itemObj.Verb,
                    type: itemObj.Type + '',
                    exact: itemObj.Exact + ''
                })
                if (+itemObj.Type === 1) {
                    this.setState({
                        isShowRelate: false
                    })
                }
            }
        })
    }
    changeRadio = (e) => {
        const value = e.target.value;
        if (+value === 1) {
            this.setState({
                isShowRelate: false
            })
        } else if (+value === 0) {
            this.setState({
                isShowRelate: true
            })
        }
    }
    render () {
        const { systemList } = this.state;
        const { form: {getFieldDecorator} } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const relateType = () => {
            return (
                <div>
                     <FormItem {...formItemLayout} label="请求方式" hasFeedback={true}>
                        {
                            getFieldDecorator('verb',{
                                rules: [
                                    {required: true, message: '请选择请求方式'}
                                ]
                            })(
                                <Select placeholder="请选择请求方式">
                                    <Option value="GET">GET</Option>
                                    <Option value="POST">POST</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="是否严格">
                        {
                            getFieldDecorator('exact', {
                                rules: [
                                    {required: true, message: '请勾选是否严格'}
                                ]
                            })(
                                <RadioGroup>
                                    <Radio value="1">是</Radio>
                                    <Radio value="0">否</Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="路径">
                        {
                            getFieldDecorator('path', {
                                rules: [
                                    {required: true, message: '请填写路径'}
                                ]
                            })(<Input/>)
                        }
                    </FormItem>
                </div>
            )
        }
        return (
            <div className="form-container pt-40">
                <BackButton />
                <Form onSubmit={this.handleSubmit} className="mt-40">
                    <FormItem {...formItemLayout} label="权限名称">
                        {
                            getFieldDecorator('name',{
                                rules: [
                                    {required: true, message: '请填写权限名称'}
                                ]
                            })(<Input/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="所属系统" hasFeedback={true}>
                        {
                            getFieldDecorator('bizSystemId', {
                                rules: [
                                    {required: true, message: '请选择所属系统'}
                                ]
                            })(
                                <Select placeholder="请选择管理端">
                                    {
                                        systemList.length > 0 && systemList.map((item) => {
                                            return <Option value={item.Id} key={item.Id}>{item.Name}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="权限类型">
                        {
                            getFieldDecorator('type', {
                                rules: [
                                    {required: true, message: '请选择权限类型'}
                                ]
                            })(
                                <RadioGroup onChange={this.changeRadio}>
                                    <Radio value="1">界面布局权限</Radio>
                                    <Radio value="0">API访问权限</Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    {
                        this.state.isShowRelate && relateType()
                    }
                    <FormItem {...formItemLayout} label="角色描述">
                        {
                            getFieldDecorator('desc')(<Input />)
                        }
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const wrapEditPermis = Form.create()(EditPermis)
export default wrapEditPermis;