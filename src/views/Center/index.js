import React, {Component} from 'react';
import { Form, Input, Button, Upload, Icon, Modal, message } from 'antd';
import BackButton from '../../components/BackButton';
import { request, biz } from '../../library/wjs';
const bizApi = biz.api;
const FormItem = Form.Item;
class Center extends Component {
    constructor (props) {
        super(props);
        this.state = {
            fileList: [],
            previewVisible: false,
            previewImage: ''
        }
    }
    componentDidMount () {
        let { location: {state} } = this.props;
        state && this.getDetail(state.key)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { previewImage } = this.state;
        let { location: {state}, form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (state) {
                    values.Avatar = previewImage;
                    request.postWithCookie(bizApi.CenterUpdateUrl, Object.assign({},values,{id: state.infor.id})).then((data) => {
                        if(+data.code === 0) {
                            message.success(data.message || '修改角色成功');
                        }else{
                            message.error(data.message || '修改角色失败');
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
    getDetail = () => {
        let { form, location: {state} } = this.props;
        if(state) {
            const inforObj = state.infor;
            const fileList = [];
            fileList.push({
                uid: inforObj.id,
                key: inforObj.id,
                url: inforObj.avatar
            })
            this.setState({
                fileList: fileList,
                previewImage: inforObj.avatar
            })
            form.setFieldsValue({
                NickName: inforObj.nickname,
                email: inforObj.email,
                Avatar: {
                    fileList: fileList
                }
            })
        }
    }
    render () {
        const { previewVisible, previewImage, fileList } = this.state;
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
                    <FormItem {...formItemLayout} label="姓名">
                        {
                            getFieldDecorator('NickName',{
                                rules: [
                                    {required: true, message: '请填写姓名'}
                                ]
                            })(<Input/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="邮箱">
                        {
                            getFieldDecorator('email')(<Input disabled={true}/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="头像">
                        {
                            getFieldDecorator('Avatar')(
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
const wrapCenter = Form.create()(Center)
export default wrapCenter;