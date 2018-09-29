import React, {Component} from 'react';
import { Form, Input, Button, Radio, Select, message } from 'antd';
import BackButton from './BackButton';
import { request, biz } from '../library/wjs';
const bizApi = biz.api;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
class EditRole extends Component {
    constructor (props) {
        super(props);
        this.state = {
            systemList: []
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
                    request.postWithCookie(bizApi.RoleUpdateUrl, Object.assign({},values,{id: state.key})).then((data) => {
                        if(+data.code !== 0) {
                            message.error('修改角色失败');
                        }else{
                            message.success('修改角色成功');
                            this.props.history.push('/app');
                        }
                    })
                } else {
                    request.postWithCookie(bizApi.RoleAddUrl, values).then((data) => {
                        if(+data.code !== 0) {
                            message.error('添加角色失败');
                        }else{
                            message.success('添加角色成功');
                            this.props.history.push('/app');
                        }
                    })
                }
            }
        });
    }
    getSystemItem = () => {
        request.getWithCookie(bizApi.SystemList).then((data) => {
            if(+data.code === 0) {
                this.setState({
                    systemList: data.data.data
                })
            }
        })
    }
    getDetail = (id) => {
        let {form} = this.props;
        request.postWithCookie(bizApi.RoleDetailUrl, {Id: id}).then((data) => {
            const itemObj = data.data;
            if (data.code === 0) {
                form.setFieldsValue({
                    name: itemObj.Name,
                    bizSystemId: itemObj.BizSystemId,
                    desc: itemObj.Desc,
                    isAdmin: itemObj.IsAdmin + ''
                })
            }
        })
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
        return (
            <div className="form-container pt-40">
                <BackButton />
                <Form onSubmit={this.handleSubmit} className="mt-40">
                    <FormItem {...formItemLayout} label="角色名称">
                        {
                            getFieldDecorator('name',{
                                rules: [
                                    {required: true, message: '请填写角色名称'}
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
                    <FormItem {...formItemLayout} label="是否是管理员">
                        {
                            getFieldDecorator('isAdmin', {
                                rules: [
                                    {required: true, message: '请选择是否是管理员'}
                                ]
                            })(
                                <RadioGroup>
                                    <Radio value="1">是</Radio>
                                    <Radio value="0">否</Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
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
const wrapEditRole = Form.create()(EditRole)
export default wrapEditRole;