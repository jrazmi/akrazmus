import _ from "lodash";

export const CurrentUser = (props) => {
    if(props.currentUser && props.currentUser.me){
        return new UserObject(props.currentUser.me);
    }
    return null;
}

export class UserObject {
    constructor(me){
        this.id = me.id;
        this.first_name = me.first_name;
        this.last_name = me.last_name;
        this.email = me.email;
        this.globalPermissions = me.globalPermissions;
    }

    hasGlobalPermission(perm) {
        return _.includes(this.globalPermissions, perm);
    }
}