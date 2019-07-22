import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-east-1'
})

const ses = new AWS.SES({apiVersion: '2010-12-01'});


// init send function for test mocking
export const sendEmail = async(params) => {
    return await ses.sendEmail(params).promise()
};


