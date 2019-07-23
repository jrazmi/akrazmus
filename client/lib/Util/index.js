
// marshall mutation response(MMR)
// Should normalize responses from akrazmus gql server
export const MMR = async (response, returnName) => {

    // for network errors give generic code uh oh
    if(response.networkError && response.networkError.result && response.networkError.result.errors && response.networkError.result.errors.length > 0){
        return{
            code: "Uh Oh",
            success: false,
            message: response.networkError.result.errors[0].message
        }
    }

    // normalize when data isn't returned
    
    if(!response['data'] || !response['data'][returnName]){
        let message = "Invalid response";
        if(response.message) {
            message = response.message
        }
        return {
            code: "Uh Oh",
            success: false,
            message: message,
        }
    }
    
    return response['data'][returnName];
}


export const SubMut = async (mutation, payload) => {
    let response;
    try {
        response = await mutation({variables: {...payload}})
    } catch(e){
        response = e;
    }
    return response;
}