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
        this.name = me.name;
        this.email = me.email;
    }

    sayHi(){
        return `Hi ${this.name}`;
    }

    
}