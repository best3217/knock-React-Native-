import { Request, Response } from 'express'
import HttpStatus from 'http-status-codes'
import { Op } from 'sequelize'
import { APP_MAIN_URL } from '../config/constants'
import { TokenPayload, generateToken } from '../security'
import { generateSignedUrl } from '../helpers/file-uploader'
import { editProfileValidationSchema } from "../validation"
import { EUserRole } from '../types'
import {
  User,
  UserRole,
} from '../models'

import { sendEmail, buttonStyle } from '../helpers/email'

export const getLoggedInUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findOne({
      where: {
        id: req.body?.tokenPayload?.id,
        is_deleted: false,
      }, include: ['role']
    })
    res.json({
      id: user.id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      address1: user.address1,
      address2: user.address2,
      city: user.city,
      state: user.state,
      zip: user.zip,
      country: user.country,
      default_zip: user.default_zip,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: {
        id: user.role.id,
        description: user.role.description
      },
      email_verified: user.is_email_verified || false,
      phone_verified: user.is_phone_verified || false,
      verified: user.verified || 0,
      is_locked: user.is_locked,
      target_entire_us: user.target_entire_us,
      target_state: user.target_state,
      target_city: user.target_city,
    })
  } catch (error) {
    console.error("Get user: ", error);
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Something is wrong. PLease try again." });
  }
}

export const getUserById = async (req: Request, res: Response): Promise<any> => {
  const { role: { description: userRole } } = <TokenPayload>req.body.tokenPayload;
  if (userRole !== EUserRole.ADMIN  ) {
    return res.status(HttpStatus.UNAUTHORIZED)
  }

  try {
    const user:any  = await User.findOne({
      where: {
        id: req.params.id
      },     
    })
    if (user?.verify_attachments) {
      for(let index=0; index< user.verify_attachments.length; index ++){
        const _url = await generateSignedUrl(user.verify_attachments[index].attachment_url);
        user.verify_attachments[index].attachment_url = _url[0];
      }
    }
    return res.json(user)
  } catch (error) {
    console.error(error)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Something is wrong. Please try again.' })
  }
}

// Update profile of a current user.
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = <TokenPayload>req.body.tokenPayload
    const body = await editProfileValidationSchema.validate(req.body, {
      abortEarly: false
    })
    const user = await User.findByPk(id)
    user.fname = body.fname
    user.lname = body.lname
    user.address1 = body.address1
    user.address2 = body.address2
    user.city = body.city
    user.state = body.state
    user.zip = body.zip
    user.country = body.country
    await user.save()

    return res.status(HttpStatus.OK).json(user)
  } catch (err) {
    console.error(err)
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Can not update user. Please try again." })
  }
}

// Update user information by admins.
export const updateUser = async (req: Request, res: Response) => {
  const { role: { description: userRole } } = <TokenPayload>req.body.tokenPayload
  if (userRole !== EUserRole.ADMIN  ) {
    return res.status(HttpStatus.UNAUTHORIZED)
  }

  try {
    const { fname, lname, email, phone, address1, address2, city, state, zip, country,
      default_zip, verified, is_email_verified, is_phone_verified,
      withdraw_per_day, withdraw_per_month } = req.body

    // Send email if user is verified.
    const user: any = await User.findOne({ where: { id:  req.params.id} });
    if ((user.verified == 0 || user.verified == 2) && verified == true) {
      const emailContent = `Your account was verified!`
      await sendEmail(user.email, "Account Verified!", emailContent)

      // createNotification(NOTI_TYPE_USER_VERIFIED, user.id)
    }

    const response = await User.update({
      fname,
      lname,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      default_zip,
      verified: verified ? 1 : 0,
      is_email_verified: is_email_verified ? 1 : 0,
      is_phone_verified: is_phone_verified ? 1 : 0,
      withdraw_per_day,
      withdraw_per_month,
    }, {
      where: {
        id: req.params.id
      }
    })
    return res.status(HttpStatus.OK).json(response)
  } catch (err) {
    console.error(err)
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Failed to update user. Please try again.' })
  }
}

export const searchUsers = async (req: Request, res: Response): Promise<any> => {
  const { role: { description: userRole } } = <TokenPayload>req.body.tokenPayload
  if (userRole !== EUserRole.ADMIN  ) {
    return res.status(HttpStatus.UNAUTHORIZED)
  }

  try {
    const { page = 1, limit = 10, range_start = '', range_end = '', search, verified = null,
      sortBy = 'createdAt', sortOrder = 'DESC' } = req.query

    let dateFilter = {}
    if (range_start && range_end) {
      dateFilter = {
        createdAt: {
          [Op.gte]: range_start,
          [Op.lt]: range_end,
        },
      }
    }

    let searchOption = {}
    if (search) {
      searchOption = {
        [Op.or]: {
          fname: {
            [Op.like]: `%${search}%`
          },
          lname: {
            [Op.like]: `%${search}%`
          },
          email: {
            [Op.like]: `%${search}%`
          }
        }
      }
    }

    if (verified === 'false') {
      searchOption = {
        ...searchOption,
        verified: 2,
        is_email_verified: 1,
        is_phone_verified: 1,
        is_deleted: false,
      }
    } else if (verified === 'true') {
      searchOption = {
        ...searchOption,
        verified: 1,
      }
    }

    let orderOption
    if (sortBy === 'name') {
      orderOption = [
        ['fname', sortOrder],
        ['lname', sortOrder],
      ]
    } else {
      orderOption = [[sortBy, sortOrder]]
    }

    const response = await User.findAndCountAll({
      where: {
        ...searchOption,
        ...dateFilter,
      },
      include: [
        {
          model: UserRole,
          as: 'role',
          where: {
            description: EUserRole.USER,
          }
        },
      ],
      attributes: ['id', 'fname', 'lname', 'verified', 'is_deleted', 'createdAt'],
      order: orderOption,
      limit: Number(limit),
      offset: Number(limit) * (Number(page) - 1),
    })

    return res.json(response)
  } catch (error) {
    console.error("Get users by search: ", error)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Something is wrong. Please try again." })
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { role: { description: userRole } } = <TokenPayload>req.body.tokenPayload;
  if (userRole !== EUserRole.ADMIN  ) {
    return res.status(HttpStatus.UNAUTHORIZED)
  }

  try {
    await User.update({
      is_deleted: true
    }, {
      where:{id: req.params.id},
    })

    return res.json({ message: "User removed successfully!"});
  } catch (err) {
    console.log("deleteUser", err);
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Can not delete user. Please try again." });
  }
}

export const activateUser = async (req: Request, res: Response): Promise<any> => {
  const { role: { description: userRole } } = <TokenPayload>req.body.tokenPayload;
  if (userRole !== EUserRole.ADMIN  ) {
    return res.status(HttpStatus.UNAUTHORIZED)
  }

  try {
    await User.update({
      is_deleted: false
    }, {
      where: { id: req.params.id },
    })
    return res.json({ message: "User activated successfully!"})
  } catch (err) {
    console.log("deleteUser", err);
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Can not delete user. Please try again." });
  }
}

export const updateVerificationDocuments = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const authInfo = <TokenPayload>req.body.tokenPayload;

    // For pending users, files can be skipped to preserve existing ones.
    if (body.files.length) {
      // await UserVerificationAttachment.destroy({
      //   where: {
      //     frn_userid: authInfo.id,
      //   },
      // })

      // await UserVerificationAttachment.bulkCreate(
      //   body.files.map((x: { fileName: string; path: string }) => ({
      //     frn_userid: authInfo.id,
      //     attachment_url: x.path,
      //     file_name: x.fileName
      //   }))
      // )
    }

    await User.update({
      address1: body.address1,
      address2: body.address2,
      city: body.city,
      state: body.state,
      zip: body.zip,
      verified: 2,
    }, {
      where: {
        id: authInfo.id,
      },
    })

    // // Create the lead zipcode.
    // const UserLeadZipcodeList: any = await UserLeadZipcode.findAll({
    //   where: {
    //     frn_userid: authInfo.id,
    //     zipcode: body.zip
    //   },
    // });

    // if (!UserLeadZipcodeList || UserLeadZipcodeList.length == 0) {
    //   await UserLeadZipcode.create({
    //     frn_userid: authInfo.id,
    //     zipcode: body.zip
    //   });
    // }

    // Send email to admin when user submitted verify request.
    const admin: any = await User.findOne({ where: { frn_user_roleid: 1 } })

    const emailContent = `User ${authInfo.fname} ${authInfo.lname} requests identity verification. `
      + `<a href="${APP_MAIN_URL}/#/admin/edit-user/${authInfo.id}" style="${buttonStyle}">Review</a>`
    await sendEmail(admin.email, 'Review Identity Verification', emailContent)

    // createNotification(NOTI_TYPE_USER_VERIFY_REQUEST, admin.id, {
    //   id: authInfo.id
    // })

    return res.json({ message: 'Uploaded verification documents successfully.'})
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Unabled upload verification documents. Please try again.' })
  }
}

export const getVerificationDocs = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id: userId } = <TokenPayload>req.body.tokenPayload

    // const docs =  await UserVerificationAttachment.findAll({
    //   where: {
    //     frn_userid: userId,
    //   },
    // })

    // const files: any = await Promise.all(docs.map(async (doc: any) => {
    //   const urls = await generateSignedUrl(doc.attachment_url)
    //   return Object.assign(doc, {
    //     attachment_url: urls[0],
    //   })
    // }))

    // return res.json({
    //   files,
    // })
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Could not retrieve verification documents' })
  }
}

export const lockUser = async (req: Request, res: Response): Promise<any> => {
  const { role: { description: userRole } } = <TokenPayload>req.body.tokenPayload

  // Non-admin users cannot access this.
  if (userRole !== EUserRole.ADMIN  ) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'You are not authorized.' })
  }

  try {
    await User.update({
      is_locked: true,
    }, {
      where: {
        id: req.params.id,
      },
    })

    return res.json({})
  } catch (err) {
    console.log(err)
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Failed to lock user. Please try again' })
  }
}

export const unlockUser = async (req: Request, res: Response): Promise<any> => {
  const { role: { description: userRole } } = <TokenPayload>req.body.tokenPayload

  // Non-admin users cannot access this.
  if (userRole !== EUserRole.ADMIN  ) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'You are not authorized.' })
  }

  try {
    await User.update({
      is_locked: false,
    }, {
      where: {
        id: req.params.id,
      },
    })


    return res.json({})
  } catch (err) {
    console.log(err)
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Failed to unlock user. Please try again' })
  }
}

export const loginAsUser = async (req: Request, res: Response): Promise<any> => {
  const { role: { description: userRole } } = <TokenPayload>req.body.tokenPayload

  // Non-admin users cannot access this.
  if (userRole !== EUserRole.ADMIN  ) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'You are not authorized.' })
  }

  try {
    const user = await User.findByPk(req.params.id, { include: ['role'] })

    const token = generateToken({
      id: user.id,
      email: user.email,
      phone: user.phone,
      fname: user.fname,
      lname: user.lname,
      role: user.role,
      email_verified: user.is_email_verified || false,
      phone_verified: user.is_phone_verified || false,
    })

    return res.json({ token })
  } catch (err) {
    console.log(err)
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Failed to login as user. Please try again.' })
  }
}

// Reject user's verification request.
export const rejectUser = async (req: Request, res: Response): Promise<any> => {
  const { role: { description: userRole } } = <TokenPayload>req.body.tokenPayload

  // Non-admin users cannot access this.
  if (userRole !== EUserRole.ADMIN  ) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'You are not authorized.' })
  }

  try {
    const user = await User.findByPk(req.params.id)
    user.verified = 0
    await user.save()

    await sendEmail(user.email, 'Your verification request denied', req.body.reason);

    return res.json({})
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Failed to deny user verification. Please try again' })
  }
}

export const exportUsers = async (req: Request, res: Response): Promise<any> => {
  const { role: { description: userRole } } = <TokenPayload>req.body.tokenPayload;
  if (userRole !== EUserRole.ADMIN  ) {
    return res.status(HttpStatus.UNAUTHORIZED)
  }

  try {
    const response = await User.findAll({
      order: [['createdAt', 'DESC']],
    })

    return res.json(response)
  } catch (error) {
    console.log(error)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Something is wrong. Please try again.' })
  }
}

export const getDocsV2 = async (req: Request, res: Response): Promise<any> => {
  try {
    // const attachments =  await UserVerificationAttachment.findAll({
    //   where: {
    //     frn_userid: req.params.id,
    //   },
    // })

    // const images: any[] = []
    // for (let i = 0; i < attachments.length; i += 1) {
    //   const url = await generateSignedUrl(attachments[i].attachment_url)
    //   images.push(url[0])
    // }
    // return res.json(images)
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Could not retrieve verification documents' })
  }
}
