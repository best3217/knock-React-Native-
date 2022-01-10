import { EMAIL_CONFIGURATION } from '../config/constants'

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(EMAIL_CONFIGURATION.apiKey)

export const buttonStyle = 'display: inline-block; min-width: 120px; height: 32px; '
  + 'background-color: #6418C3; border-color: #6418C3; border-radius: 3px; '
  + 'font-weight: 700; color: #fff; text-align: center; vertical-align: middle; '
  + 'line-height: 32px; text-decoration: none; cursor: pointer;'

export const sendEmail = async (
  toAddress: string,
  subject: string,
  message: string
) => {
  const fullMessage = '<img src="https://www.doortoken.org/images/logo.png" alt="Door" width="52" height="52" style="display: block;" /><br/>'
    + `${message}<br/><br/><hr/>`
    + 'Door Token Support<br/><br/>'
    + 'Due to increasing volume of emails, our response time may be delayed. '
    + 'Please use our Support Channel on Telegram for all questions: '
    + '<a href="https://t.me/doortokenchat">https://t.me/doortokenchat</a><br/><br/>'
    + 'If you are new to Door, please use our F.A.Q. website to learn more about how it works: '
    + '<a href="https://doortoken.gitbook.io/door-token/">https://doortoken.gitbook.io/door-token</a>'

  const msg = {
    to: toAddress,
    from: {
      email: EMAIL_CONFIGURATION.from,
      name: 'Door Support Team'
    },
    subject: subject,
    text: fullMessage,
    html: fullMessage,
  }
  try {
    await sgMail.send(msg);
    return true;
  }catch(err: any){
    console.error(err)
    console.log(err.body);
    return false;
  }
}
