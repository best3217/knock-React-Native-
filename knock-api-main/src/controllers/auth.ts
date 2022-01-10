import { Request, Response } from 'express'
import HttpStatus from 'http-status-codes'
import crypto from 'crypto'

import { User } from '../models'
import { findUserByEmail } from '../services/user'
import { ISignupBody, EUserRole, ILoginBody, EUserRoleID } from '../types'
import { generateToken, TokenPayload, verifyToken } from '../security'
import { CRYPTO_SECRET, APP_MAIN_URL, TWILIO_CONFIGURATION, EMAIL_CONFIGURATION } from '../config/constants'
import { sendEmail, buttonStyle } from '../helpers/email'

// const client = require('twilio')(TWILIO_CONFIGURATION.accountSid, TWILIO_CONFIGURATION.authToken);

const getUserRoleId = (role: EUserRole) => {
  if (role === EUserRole.ADMIN) {
    return {
      id: EUserRoleID.ADMIN,
      description: role
    };
  }
  return {
    id: EUserRoleID.USER,
    description: EUserRole.USER
  };
}

export const login = async (req: Request, res: Response) => {
  console.log(req);
  const { email, password } = <ILoginBody>req.body
  try {
    const user = await findUserByEmail(email, true)

    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid username or password.' })
    } else if (user.is_deleted) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          message: `Your account has been de-activated. Contact ${EMAIL_CONFIGURATION.from}`,
        })
    }

    const hash = crypto.createHmac("sha512", CRYPTO_SECRET);
    
    if (hash.update(password).digest("hex") !== user.password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid username or password.' })
    } 
    
    user.save()

    const authInfo = {
      id: user.id,      
      email: user.email,
      phone: user.phone,
      name: user.name,      
      role: user.role,      
    }

    return res
      .status(HttpStatus.OK)
      .json({
        token: generateToken(authInfo),
        user: {
          ...authInfo,         
        },
      })
  } catch (err) {
    console.error(err)
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Failed to login. Please try again.' })
  }
}

export const signup = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const {
      email,
      name,
      password,
      role = EUserRole.USER,
      phone,
    } = <ISignupBody>req.body
    console.log('here');
    const userExists = await findUserByEmail(email)

    if (userExists) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'User already exists.' })
    }

    const userRole = getUserRoleId(role)

    const hash = crypto.createHmac("sha512", CRYPTO_SECRET)

    const user: any = await User.create({
      email,
      name,
      password: hash.update(password).digest("hex"),
      frn_user_roleid: userRole.id,
      phone,
      verified: 0,
    })

    const authInfo = {
      id: user.id,
      email: email,
      phone: user.phone,
      name: name,
      role: userRole,
    }

    const token = generateToken(authInfo)

    return res
      .status(HttpStatus.OK)
      .json({ token, user: { ...authInfo, verified: 0 } })
  } catch (err) {
    console.log(err)
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Failed to signup. Please try again.' })
  }
}

export const sendForgotPasswordLink = async (req: Request, res: Response) => {
  try {
    const { email } = <{ email: string }>req.body;
    if (!email) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: 'Email is required.' });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: 'User not found.' });
    }

    const authInfo: TokenPayload = {
      email: user.email,
      fname: user.fname,
      id: user.id,
      lname: user.lname,
      role: user.role
    };

    const emailToken = generateToken(authInfo, '3h')

    const message = `Please reset your password.<br /><br />`
      + `<a href="${APP_MAIN_URL}/#/auth/reset/${emailToken}" style="${buttonStyle}">Reset Password</a>`;
    await sendEmail(authInfo.email, 'Reset Password', message)

    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: "Password reset link sent." });
  } catch (err) {
    console.log(err);
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Can not send forgot email. Please try again." });
  }
}

export const verifyForgotPassword = async (req: Request, res: Response) => {
  try {
    const { password, token } = <{ token: string; password: string }>req.body;

    if (!token || !password) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Token and New password is required"
      });
    }

    const response: TokenPayload = await verifyToken(token);

    const hash = crypto.createHmac("sha512", CRYPTO_SECRET);
    const newPassword = hash.update(password).digest("hex");

    await User.update(
      { password: newPassword },
      { where: { email: response.email } }
    );

    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: "Password changed successfully." });
  } catch (err) {
    console.log(err);
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Can not reset password. Please try again." });
  }
}

export const resendEmailVerify = async (req: Request, res: Response) => {
  try {
    const authInfo = <TokenPayload>req.body.tokenPayload;
    const emailToken = generateToken(authInfo, '3h');

    const message = 'Please verify your email.<br/><br/>'
      + `<a href="${APP_MAIN_URL}/#/auth/email-verify/${emailToken}" style="${buttonStyle}">Verify Email</a>`
    await sendEmail(authInfo.email, 'Verify Email', message)

    return res.status(HttpStatus.OK).json({ success: true });
  } catch (err) {
    console.log(err);
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Can not resend email. Please try again." });
  }
}

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = <{ token: string }>req.body;
    if (!token) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Token is required" });
    }
    const response: TokenPayload = await verifyToken(token);

    await User.update({ is_email_verified: true }, { where: { email: response.email } });

    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: "Email verified" });
  } catch (err) {
    console.log(err);
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Can not verify email. Please try again." });
  }
}

export const requestEmailUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = <TokenPayload>req.body.tokenPayload
    const { email } = req.body

    if (!email) {
      return res.status(HttpStatus.BAD_REQUEST);
    }

    await User.update({
      email,
      is_email_verified: false,
    }, {
      where: { id },
    })

    const emailToken = generateToken({
      email,
    }, '10m')

    const message = 'Please verify your email.<br/><br/>'
      + `<a href="${APP_MAIN_URL}/#/auth/email-verify/${emailToken}" style="${buttonStyle}">Verify Email</a>`
    await sendEmail(email, 'Verify Email', message)

    return res.status(HttpStatus.OK).json({ success: true })
  } catch (err) {
    console.log(err)
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Failed to request email change. Please try again.' })
  }
}

// export const sendSMS = async (req: Request, res: Response) => {
//   const { id } = <TokenPayload>req.body.tokenPayload

//   const code = Math.floor((Math.random() * (9999 - 1000 + 1)) + 1000)

//   if (!req.body.number) {
//     return res
//       .status(HttpStatus.BAD_REQUEST)
//       .send({
//         message: 'You must supply a `number` to send the request to.',
//       })
//   }

//   try {
//     client.messages.create({
//       body: 'Door Token Code: ' + code.toString(),
//       from: TWILIO_CONFIGURATION.phoneNumber,
//       to: req.body.number,
//     }).then(async (message: any) => {
//       await User.update(
//         {
//           phone_verification_code: code,
//           phone: req.body.number,
//           is_phone_verified: false,
//         },
//         { where: { id } }
//       )
//       res.send({})
//     }).catch((error: any) => {
//       res.status(HttpStatus.BAD_REQUEST).send(error.message || 'Failed to send verification code.')
//     })
//   } catch (err: any) {
//     res.status(HttpStatus.BAD_REQUEST).send(err?.error_text)
//   }
// }

// export const verifySMS = async (req: Request, res: Response) => {
//   const { id } = <TokenPayload>req.body.tokenPayload;

//   // We require clients to submit a request id (for identification) and a code (to check).
//   if (!req.body.confirmCode) {
//     return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Confirm code does not exist.' })
//   }

//   try {
//     const user: any = await User.findByPk(id)
//     if (user.phone_verification_code.toString() == req.body.confirmCode.toString()) {
//       await User.update({
//         is_phone_verified: true,
//         phone_verification_code: 0,
//       }, { where: { id } })
//       res
//         .status(HttpStatus.OK)
//         .json({ success: true, message: 'Phone Verified Successfully.' })
//     }
//   } catch (err) {
//     console.log(err);
//     res
//       .status(HttpStatus.BAD_REQUEST)
//       .json({ message: 'Failed to verify code. Please try again.' })
//   }
// }

export const UpdateStep2 = async (req: Request, res: Response) => {
  const { id } = <TokenPayload>req.body.tokenPayload;
  const { is_consumer, is_advertiser, how_found } = req.body


  try {
    const user: any = await User.findByPk(id)

    await User.update({
      is_consumer,
      is_advertiser,
      how_found
    }, { where: { id } })
    res
      .status(HttpStatus.OK)
      .json({ success: true, message: 'Updated Successfully.' })
  } catch (err) {
    console.log(err);
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Failed. Please try again.' })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { id } = <TokenPayload>req.body.tokenPayload
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Please provide the current and new passwords.',
      })
    }

    const user = await User.findByPk(id)

    let hash = crypto.createHmac('sha512', CRYPTO_SECRET)
    const currentPasswordHash = hash.update(currentPassword).digest('hex')
    if (currentPasswordHash !== user.password) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'The current password is incorrect.',
      })
    }

    hash = crypto.createHmac('sha512', CRYPTO_SECRET)
    user.password = hash.update(newPassword).digest('hex')
    await user.save()

    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: 'Password changed successfully.' })
  } catch (err) {
    console.log(err)
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Failed to reset password. Please try again.' })
  }
}
