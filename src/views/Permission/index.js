import React, {Component} from 'react';
import { Table, Divider, Button, Form, Row, Col, message } from 'antd';
import LimitText from '@/components/LimitText';
import { request, biz } from '../../library/wjs';
const bizApi = biz.api;
class Permission extends Component {
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
    editPermis (record) {
        this.props.history.push('/app/permission/edit', {key: record.key})
    }
    deletePermis (record) {
        message.warning('暂时不能删除');
    }
    changePage = (page,pageSize) => {
        this.setState({
            current: page
        })
        this.getData({curPage: page, pageSize: pageSize});
    }
    addPermis = () => {
        this.props.history.push('/app/permission/edit');
    }
    getData (pageParams) {
        request.getWithCookie(bizApi.PermisListUrl, pageParams).then((data) => {
            if (+data.code === 0) {
                let dataSource = [];
                let dataArray = data.data.data;
                dataArray.map((value) => {
                    dataSource.push({
                        key: value.Id,
                        name: value.Name,
                        desc: value.Desc,
                        bizSystemId: value.BizSystemId,
                        bizSystemName: value.BizSystemName,
                        path: value.Path,
                        type: value.Type,
                        typeName: value.TypeName, 
                        verb: value.Verb,
                        exact: value.Exact,
                        exactName: value.ExactName
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
    render () {
        const { data, current, total, pageSize } = this.state;
        const columns = [
            {
                title: '权限名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '所属系统',
                dataIndex: 'bizSystemName',
                key: 'bizSystemId',
            }, {
                title: '权限类型',
                dataIndex: 'typeName',
                key: 'type',
            }, {
                title: '是否严格',
                dataIndex: 'exactName',
                key: 'exact',
            }, {
                title: '路径',
                dataIndex: 'path',
                key: 'path',
                render: (text) => {
                    return text || '……'
                }
            }, {
                title: '描述',
                dataIndex: 'desc',
                key: 'desc',
                render: (text) => (
                    <LimitText text={text} len={20} placement={'top'}/>
                )
            }, {
                title: 'Action',
                key: 'action',
                width: 120,
                render: (text, record) => (
                    <span>
                        <Button type="primary" icon="edit" size="small" onClick={this.editPermis.bind(this, record)}/>
                        <Divider type="vertical" />
                        <Button type="danger" icon="delete" size="small" onClick={this.deletePermis.bind(this, record)}/>
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
                                <Button type="primary" icon="plus" onClick={this.addPermis}>添加</Button>
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
export default Permission;