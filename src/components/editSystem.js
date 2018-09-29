import React, {Component} from 'react';
import { Form, Input, Button, Upload, Icon, Modal, message } from 'antd';
import BackButton from './BackButton';
import { request, biz } from '../library/wjs';
const bizApi = biz.api;
const FormItem = Form.Item;
class EditSystem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: []
        }
    }
    componentDidMount () {
        let { location: {state} } = this.props;
        state && this.getDetail(state.key)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { location: {state}, form } = this.props;
        let { previewImage } = this.state;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.logo = previewImage;
                if (state) {
                    request.postWithCookie(bizApi.SystemUpdateUrl, Object.assign({},values,{id: state.key})).then((data) => {
                        if(+data.code !== 0) {
                            message.error(data.message || '修改系统失败');
                        }else{
                            message.success(data.message || '修改系统成功');
                            this.props.history.push('/app/system');
                        }
                    })
                } else {
                    request.postWithCookie(bizApi.SystemAddUrl, values).then((data) => {
                        if(+data.code !== 0) {
                            message.error(data.message || '添加系统失败');
                        }else{
                            message.success(data.message || '添加系统成功');
                            this.props.history.push('/app/system'); 
                        }
                    })
                }
            }
        });
    }
    handleCancel = () => {
        this.setState({ 
            previewVisible: false
        })
    }
    handlePreview = () => {
        this.setState({
            previewVisible: true,
        });
    }
    getDetail = (id) => {
        let {form} = this.props;
        request.getWithCookie(bizApi.SystemDetailUrl, {id: id}).then((data) => {
            if (data.code === 0) {
                const itemObj = data.data;
                const fileList = [];
                fileList.push({
                    key: itemObj.Id,
                    uid: itemObj.Id,
                    url: itemObj.Logo,
                    thumbUrl: itemObj.Logo
                })
                this.setState({
                    previewImage: itemObj.Logo,
                    fileList: fileList
                })
                form.setFieldsValue({
                    name: itemObj.Name,
                    logo: {
                        fileList: fileList
                    },
                    title: itemObj.Title,
                    secret: itemObj.Secret,
                    RegisterAgreement: itemObj.RegisterAgreement,
                })
            } else {
                message.error(data.message || '请求失败！');
            }
        })
    }
    normFile = (e) => {
        let fileList = [];
        fileList[0] = e.file;
        this.setState({
            fileList
        })
        e.file.response && this.setState({
            previewImage: e.file.response.url
        });
    }
    render () {
        const { form: {getFieldDecorator} } = this.props;
        const { previewVisible, previewImage, fileList } = this.state;
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
                    <FormItem {...formItemLayout} label="系统名称">
                        {
                            getFieldDecorator('name',{
                                rules: [
                                    {required: true, message: '请填写系统名称'}
                                ]
                            })(<Input/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="系统标题">
                        {
                            getFieldDecorator('title',{
                                rules: [
                                    {required: true, message: '请填写中文系统标题'}
                                ]
                            })(<Input placeholder="请填写中文系统标题"/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="系统标识">
                        {
                            getFieldDecorator('secret',{
                                rules: [
                                    {required: true, message: '请填写系统标识'}
                                ]
                            })(<Input />)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="用户协议">
                        {
                            getFieldDecorator('RegisterAgreement',{
                                rules: [
                                    {required: true, message: '请填写用户协议'}
                                ]
                            })(<Input />)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="Logo">
                        {
                            getFieldDecorator('logo',{
                                rules: [
                                    {required: true, message: '请上传Logo'}
                                ]
                            })(
                                <div className="clearfix">
                                    <Upload 
                                        name="logo" 
                                        action="http://47.92.0.84:7070/api/upload" 
                                        listType="picture-card" 
                                        fileList={fileList} 
                                        onPreview={this.handlePreview} 
                                        onChange={this.normFile}
                                    >
                                        <Icon type="plus" />
                                        <div className="ant-upload-text">Upload</div>
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            )
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
const wrapEditSystem = Form.create()(EditSystem)
export default wrapEditSystem;