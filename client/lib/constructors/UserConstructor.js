import _ from "lodash";

export const CurrentUser = (props) => {

    // allows for various levels of destructuring
    // probably standardize
    if(props.me) {
        return new UserObject(props.me);
    }
    if(props.currentUser && props.currentUser.me){
        return new UserObject(props.currentUser.me);
    }
    if(props.currentUser && props.currentUser.currentUser && props.currentUser.currentUser.me) {
        return new UserObject(props.currentUser.currentUser.me);
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