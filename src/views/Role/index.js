import React, {Component} from 'react';
import { Table, Divider, Button, Form, Row, Col, message } from 'antd';
import DialogPermis from '@/components/DialogPermis';
import LimitText from '@/components/LimitText';
import { request, biz } from '../../library/wjs';
const bizApi = biz.api;
class Role extends Component {
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
        request.getWithCookie(bizApi.RoleListUrl, pageParams).then((data) => {
            if(data.code === 0) {
                let dataSource = [];
                let dataArray = data.data.data;
                dataArray.map((value) => {
                    dataSource.push({
                        key: value.Id,
                        name: value.Name,
                        desc: value.Desc,
                        isAdmin: value.IsAdmin,
                        adminName: value.IsAdminName,
                        bizSystemId: value.BizSystemId,
                        bizSystemName: value.BizSystemName
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
        this.props.history.push('/app/role/edit', {key: record.key})
    }
    deleteRole (record) {
        message.warning("暂时不能删除");
    }
    handleSearch = (e) => {
        e.preventDefault();
    }
    addRole = () => {
        this.props.history.push('/app/role/edit')
    }
    render () {
        const { data, current, total, pageSize } = this.state;
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '角色类型',
                dataIndex: 'adminName',
                key: 'isAdmin',
            },{
                title: '系统',
                dataIndex: 'bizSystemName',
                key: 'bizSystemId',
            },{
                title: '描述',
                dataIndex: 'desc',
                key: 'desc',
                render: (text, record) => (
                    <LimitText text={text} len={20} placement={'top'}/>
                )
            }, {
                title: '操作',
                key: 'action',
                width: 180,
                render: (text, record) => (
                    <span>
                        <Button type="primary" icon="edit" size="small" ghost onClick={this.editRole.bind(this, record)}/>
                        <Divider type="vertical" />
                        <Button type="danger" icon="delete" size="small" ghost onClick={this.deleteRole.bind(this, record)}/>
                        <Divider type="vertical" />
                        <DialogPermis id={record.key} bizSystemId={record.bizSystemId}/>
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
                    pagination = {{showQuickJumper:true,current,total,pageSize,onChange:this.changePage}}
                />
            </div>
        )
    }
}
export default Role;