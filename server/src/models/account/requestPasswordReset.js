import { FormatEmail } from '../../util';
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
    // try to send it otherwise you know... error.
    try {
      const send = await ctx.sendEmail(emailParams);
      return{
        code: "OK",
        success: true,
        message: "Check your email for a reset link"
      }
    } catch (e) {
      console.log(e)
      return {
        code: "INPUT_ERROR",
        success: false,
        message: "Email could not be sent"
      }
    }
}