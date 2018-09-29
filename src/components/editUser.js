import React, {Component} from 'react';
import { Form, Input, Button, Select, Upload, Icon, message } from 'antd';
import BackButton from './BackButton';
import { FetchPost,FetchGet } from '../service/service';
const FormItem = Form.Item;
const Option = Select.Option;
class EditUser extends Component {
    constructor (props) {
        super(props);
        this.state = {
            systemList: [],
            fileList: []
        }
    }
    componentWillMount () {
        let { location: {state} } = this.props;
        this.getRolesItem();
        state && this.getDetail(state.key)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { location: {state}, form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (state) {
                    let avatarList = values.avatar.fileList;
                    let avatarObj = {}
                    if (avatarList.length > 1) {
                        avatarObj = avatarList[avatarList.length - 1];
                    } else {
                        avatarObj = avatarList[0]
                    }
                    const params = {
                        nickname: values.name,
                        avatar: avatarObj.thumbUrl
                    };
                    FetchPost('/api/user/updataAvatarOrNickName', Object.assign({},params,{id: state.key})).then((data) => {
                        if(+data.code !== 0) {
                            message.error('修改角色失败');
                        }else{
                            message.success('修改角色成功');
                            this.props.history.push('/app/user');
                        }
                    })
                }
            }
        });
    }
    getRolesItem = () => {
        FetchGet('/role/findAll').then((data) => {
            if(+data.code === 0) {
                this.setState({
                    systemList: data.data.data
                })
            }
        })
    }
    getDetail = (id) => {
        let { form } = this.props;
        FetchGet('/user/getUserById', {id: id}).then((data) => {
            if (data.code === 0) {
                const itemObj = data.data;
                const roleIds = [];
                const fileList = [];
                itemObj.roles && itemObj.roles.map((item) => {
                    roleIds.push(item.Id);
                })
                fileList.push({
                    uid: itemObj.id,
                    url: itemObj.avatar,
                    thumbUrl: itemObj.avatar
                })
                this.setState({
                    fileList: fileList
                })
                form.setFieldsValue({
                    name: itemObj.nickname,
                    email: itemObj.email,
                    roleIds: roleIds,
                    avatar: {
                        fileList: fileList
                    }
                })
            }
        })
    }
    render () {
        const { systemList, fileList } = this.state;
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
                    <FormItem {...formItemLayout} label="用户名">
                        {
                            getFieldDecorator('name',{
                                rules: [
                                    {required: true, message: '请填写用户名'}
                                ]
                            })(<Input/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="选择角色" hasFeedback={true}>
                        {
                            getFieldDecorator('roleIds', {
                                rules: [
                                    {required: true, message: '请选择角色'}
                                ]
                            })(
                                <Select placeholder="请选择角色" mode="multiple">
                                    {
                                        systemList.length > 0 && systemList.map((item) => {
                                            return <Option value={item.Id} key={item.Id}>{item.Name}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="请选择头像">
                        {fileList.length > 0 &&
                            getFieldDecorator('avatar')(
                                <Upload name="logo" action="//jsonplaceholder.typicode.com/posts/" listType="picture" defaultFileList={[...fileList]}>
                                    <Icon type="upload" />
                                </Upload>
                            )
                        }
                        {fileList.length <= 0 &&
                            getFieldDecorator('avatar')(
                                <Upload name="logo" action="//jsonplaceholder.typicode.com/posts/" listType="picture" fileList={[...fileList]}>
                                    <Icon type="upload" />
                                </Upload>
                            )
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="邮箱">
                        {
                            getFieldDecorator('email')(<Input disabled={true}/>)
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
const wrapEditUser = Form.create()(EditUser)
export default wrapEditUser;