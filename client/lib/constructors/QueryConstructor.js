import base64 from 'base-64';
import _ from 'lodash';


// construct query elements and marshall them for formik/pagination.
export class CurrentQuery {
    constructor(props){
        this.query = props.query ? props.query : null;
    }

    sayHi = () => {
        console.log(this.query);
    }


}


