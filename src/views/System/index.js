import React, {Component} from 'react';
import { Table, Divider, Button, Form, Row, Col, message, Avatar} from 'antd';
import LimitText from '@/components/LimitText';
import { request, biz } from '../../library/wjs';
const bizApi = biz.api;
class System extends Component {
    constructor (props) {
        super(props);
        this.state = {
            datas: [],
            current: 1,
            pageSize: 5,
            total: 0
        }
    }
    componentDidMount () {
        let { current, pageSize } = this.state;
        this.getData({curPage: current, pageSize: pageSize});
    }
    changePage = (page,pageSize) => {
        this.setState({
            current: page
        })
        this.getData({curPage: page, pageSize: pageSize});
    }
    getData (pageParams) {
        request.getWithCookie(bizApi.SystemList, pageParams).then((data) => {
            if(data.code === 0) {
                let dataSource = [];
                let dataArray = data.data.data;
                dataArray.map((value) => {
                    dataSource.push({
                        key: value.Id,
                        name: value.Name,
                        logo: value.Logo,
                        registerAgreement: value.RegisterAgreement,
                        title: value.Title,
                        secret: value.Secret
                    })
                })
                this.setState({
                    data: dataSource,
                    total: data.data.count
                })
            } else {
                message.error(data.message || '请求失败！');
            }
        })
    }
    editRole (record) {
        this.props.history.push('/app/system/edit', {key: record.key})
    }
    deleteRole (record) {
        message.warning("暂时不能删除");
    }
    addRole = () => {
        this.props.history.push('/app/system/edit')
    }
    render () {
        const { data, current, total, pageSize } = this.state;
        const columns = [
            {
                title: '系统名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '系统标题',
                dataIndex: 'title',
                key: 'title',
                render: (text) => {
                    if (text) {
                        text = JSON.parse(text);
                        text = `${text.zh} | ${text.en} | ${text.ja}`;
                        return (
                            <LimitText text={text} len={20} placement={'top'}/>
                        )
                    }
                }
            },{
                title: '图标',
                dataIndex: 'logo',
                key: 'logo',
                render: (text) => {
                    if (text) {
                        return <Avatar src={text}/>
                    }
                    return <Avatar icon="user"/>
                }
            },{
                title: '系统标识',
                dataIndex: 'secret',
                key: 'secret',
            },{
                title: '用户协议',
                dataIndex: 'registerAgreement',
                key: 'registerAgreement',
                render: (text, record) => (
                    <LimitText text={text} len={25} placement={'top'}/>
                )
            }, {
                title: '操作',
                key: 'action',
                width: 120,
                render: (text, record) => (
                    <span>
                        <Button type="primary" icon="edit" size="small" ghost onClick={this.editRole.bind(this, record)}/>
                        <Divider type="vertical" />
                        <Button type="danger" icon="delete" size="small" ghost onClick={this.deleteRole.bind(this, record)}/>
                    </span>
                ),
            }
        ];
        return (
            <div className="content-container">
                <div className="form-container">
                    <Form> 
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" icon="plus" onClick={this.addRole}>添加</Button>
                            </Col>
                        </Row> 
                    </Form>
                </div>
                <Table 
                    columns={columns} 
                    dataSource={data}
                    pagination = {{current,total,pageSize,onChange:this.changePage}}
                />
            </div>
        )
    }
}
export default System;