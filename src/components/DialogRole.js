import React, {Component} from 'react';
import { Modal, Button, Transfer, message } from 'antd';
import { request, biz } from '../library/wjs';
const bizApi = biz.api;
class DialogRole extends Component {
    constructor (props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: [],
            targetKeys: [],
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
        this.getRole(this.props.id);
    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    }
    getRole = (id) => {
        request.postWithCookie(bizApi.UserRoleUrl, {userId:id}).then((data) => {
            if (+data.code === 0) {
                let dataObj = data.data;
                let dataSource = [];
                let targetKeys = [];
                dataObj.roles.map((item) => {
                    dataSource.push({
                        key: item.Id + '',
                        title: item.Name,
                        userId: item.Id
                    })
                })
                dataObj.selfRoles.map((item) => {
                    targetKeys.push(item.RoleId + '')
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
    okCallback = () => {
        let { targetKeys } = this.state;
        let { id } = this.props;
        if (id) {
            request.postWithCookie(bizApi.UserRoleAddUrl, {
                userId: id,
                roleIds: targetKeys
            }).then((data) => {
                if (+data.code === 0) {
                    message.success(data.message || '设置成功');
                } else {
                    message.error(data.message || '设置失败');
                }
            })
        }
        this.setState({
            visible: false,
        });
    }
    render () {
        let { dataSource, targetKeys } = this.state;
        return (
            <div className="inline-block">
                <Button type="primary" ghost onClick={this.showModal} icon="setting" size="small" />
                <Modal
                    title="设置角色"
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
                        render={item => item.title}
                        titles={['可选', '当前用户']}
                    />
                </Modal>
            </div>
        )
    }
}
export default DialogRole;