import React, {Component} from 'react';
import { Table, Divider, Button, Avatar, Modal, message } from 'antd';
import FormSearch from '@/components/FormSearch';
import DialogRole from '@/components/DialogRole';
import { request, biz } from '../../library/wjs';
const bizApi = biz.api;
const confirm = Modal.confirm;
class User extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            current: 1,
            pageSize: 5,
            total: 0
        }
    }
    componentDidMount () {
        let { current, pageSize } = this.state;
        this.getData({curPage: current, pageSize: pageSize});
    }
    // editUser (record) {
    //     this.props.history.push('/app/user/edit', {key: record.key})
    // }
    deleteUser (record) {
        message.warning("暂时不能删除");
    }
    freezeUser (record) {
        const active = record.state === -1 ? false : true;
        const { current, pageSize } = this.state;
        request.postWithCookie(bizApi.UserFreezeUrl, {Id: record.key,active:active}).then((data) => {
            if (+data.code === 0) {
                message.success(data.message || '成功');
                this.getData({curPage: current, pageSize: pageSize});
            } else {
                message.error(data.message || '失败');
            }
        })
    }
    showConfirm (record) {
        let that = this;
        let tipText = +record.state === 0 ? '是否要冻结' : '是否要解冻';
        confirm({
            title: tipText,
            onOk() {
                that.freezeUser(record);
            },
            onCancel() {},
        });
    }
    changePage = ( page, pageSize) => {
        this.setState({
            current: page
        })
        this.getData({curPage: page, pageSize: pageSize});
    }
    getData = (pageParams) => {
        request.getWithCookie(bizApi.UserListUrl, pageParams).then((data) => {
            if (+data.code === 0) {
                let dataSource = [];
                let dataArray = data.data.data;
                dataArray.map((value) => {
                    dataSource.push({
                        key: value.id,
                        name: value.nickname,
                        email: value.email,
                        avatar: value.avatar,
                        state: value.state,
                        stateName: value.stateName
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
    handleSearch = (err, values) => {
        if (!err) {
            let { pageSize } = this.state;
            this.getData(Object.assign(values, {curPage:1, pageSize}))
            this.setState({
                current: 1
            })
        }
    }
    render () {
        const { data, current, total, pageSize } = this.state;
        const searchList = [
            {
                name: '用户名',
                fieldname: 'nickname'
            }, {
                name: '邮箱',
                fieldname: 'email'
            }
        ]
        const columns = [
            {
                title: '用户名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },{
                title: '状态',
                dataIndex: 'stateName',
                key: 'state',
            }, {
                title: '头像',
                dataIndex: 'avatar',
                key: 'avatar',
                render: (text) => {
                    if (text) {
                        return <Avatar src={text}/>
                    }
                    return <Avatar icon="user"/>
                }
            }, {
                title: '操作',
                key: 'action',
                width: 180,
                render: (text, record) => (
                    <span>
                        <DialogRole id={record.key}/>
                        {/* <Button type="primary" ghost icon="edit" size="small" onClick={this.editUser.bind(this,record)}/> */}
                        <Divider type="vertical" />
                        <Button type="danger" ghost icon={record.state === -1 ? 'unlock' : 'lock'} size="small" onClick={this.showConfirm.bind(this,record)}/>
                        <Divider type="vertical" />
                        <Button type="danger" ghost icon="delete" onClick={this.deleteUser.bind(this, record)} size="small" />
                    </span>
                ),
            }
        ];
        return (
            <div className="content-container">
                <div className="form-container">
                    <FormSearch 
                        searchList={searchList} 
                        handleSearch={this.handleSearch}
                    />
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
export default User;