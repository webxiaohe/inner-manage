import React, {Component} from 'react';
import { Modal, Button, Transfer, message} from 'antd';
import { request, biz } from '../library/wjs';
const bizApi = biz.api;
class DialogPermis extends Component {
    constructor (props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: [],
            targetKeys: []
        }

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
        this.getPermis(this.props.id);
    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    }
    okCallback = () => {
        let { targetKeys } = this.state;
        let { id, bizSystemId } = this.props;
        if (id) {
            request.postWithCookie(bizApi.RolePermisAddUrl, {
                roleId: id,
                permissionIds: targetKeys,
                bizSystemId: bizSystemId
            }).then((data) => {
                if (+data.code === 0) {
                    message.success('设置成功');
                } else {
                    message.error(data.message || '设置失败！');
                }
            })
        }
        this.setState({
            visible: false,
        });
    }
    getPermis = (id) => {
        request.postWithCookie(bizApi.RolePermisUrl, {roleId:id}).then((data) => {
            if (+data.code === 0) {
                let dataObj = data.data;
                let dataSource = [];
                let targetKeys = [];
                dataObj.permissions.map((item) => {
                    dataSource.push({
                        key: item.Id + '',
                        title: item.Name,
                        path: item.Path
                    })
                })
                dataObj.rolePermissions.map((item) => {
                    targetKeys.push(item.PermissionId + '')
                })
                this.setState({
                    dataSource: dataSource, 
                    targetKeys: targetKeys
                });
            }
        })
    }
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    }
    
    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    }
    render () {
        let { dataSource, targetKeys } = this.state;
        return (
            <div className="inline-block">
                <Button type="primary" ghost onClick={this.showModal} icon="setting" size="small" />
                <Modal
                    title="设置权限"
                    visible={this.state.visible}
                    onOk={this.okCallback}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <Transfer
                        dataSource={dataSource}
                        showSearch
                        filterOption={this.filterOption}
                        targetKeys={targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title || item.path}
                        titles={['可选', '当前角色']}
                    />
                </Modal>
            </div>
        )
    }
}
export default DialogPermis;