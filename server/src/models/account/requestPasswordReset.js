import { FormatEmail } from '../../util';
import { ses } from '../../util/aws';
import { EmailRPR } from '../../util/templates/EmailRPR';
import jsonwebtoken from 'jsonwebtoken';

export const requestPasswordReset = async ( root, args, ctx, info ) => {
    // Load user from formatted email
    const formattedEmail = FormatEmail(args.email);
    const user = await ctx.loaders.user.email.load(formattedEmail);

    //set Generic Invalid Credential error
    const credAuthError = { code: "DOES_NOT_EXIST", success: false, message: "Could not find matching user with these credentials"};

    //if not user return GIC
    if(!user){
        return credAuthError
    }
    const resetToken = jsonwebtoken.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: '1h'
    });

    const templateParams = {
        link: `${args.link}?token=${resetToken}`,
        user: user
    }

    // construct email parameters
    const emailParams = {
        Destination: {
            ToAddresses: [user.email]
          },
          Message: {
            Body: {
              Text: {
                Charset: "UTF-8",
                Data: EmailRPR("text", templateParams)
              },
              Html: {
                Charset: "UTF-8",
                Data: EmailRPR("html", templateParams)
              }
            },
            Subject: {
              Charset: "UTF-8",
              Data: "Request Password Reset"
            }
          },
          Source: process.env.FROM_EMAIL
    }
    
    const sendEmail = await ses.sendEmail(emailParams).promise();

    return{
        code: "OK",
        success: true,
        message: "Check your email for a reset link"
    }
}