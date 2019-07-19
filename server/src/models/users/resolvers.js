export const user = async(root,args,ctx,info) => {
    return {id:1, email:"wee"}
}
export const users = async(root,args,ctx,info) => {
    return [{id:2, email:"wee"}]
}


export const Queries = {
    user,
    users
}

