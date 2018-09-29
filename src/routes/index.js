import React, {Component} from 'react';
import {Switch, Route } from 'react-router';
import Role from '../views/Role'
import User from '../views/User';
import System from '../views/System';
import Permission from '../views/Permission';
import EditRole from '../components/editRole';
import EditUser from '../components/editUser';
import EditPermis from '../components/editPermis';
import EditSystem from '../components/editSystem';
import Center from '../views/Center';
class RouterConfig extends Component {
    render () {
        return (
            <Switch>
                <Route path="/app" exact component={User} />
                <Route path="/app/user" exact component={EditUser} />
                <Route path="/app/role" exact component={Role} />
                <Route path="/app/role/edit" exact component={EditRole} />
                <Route path="/app/permission" exact component={Permission} />
                <Route path="/app/permission/edit" exact component={EditPermis} />
                <Route path="/app/system" exact component={System} />
                <Route path="/app/system/edit" exact component={EditSystem} />
                <Route path="/app/mycenter" exact component={Center} />
            </Switch>
        )
    }
}
export default RouterConfig;