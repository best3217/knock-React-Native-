import { Request, Response } from 'express'
import HttpStatus from 'http-status-codes'
import { v4 as uuid } from 'uuid'

import { generatePresignedUrl } from '../helpers/file-uploader'

export const getHealthStatus = (_: Request, res: Response): void => {
  res.end('I am OK')
}

export const getPresignedUrl = async (req: Request, res: Response) => {
  try {
    const { fileName, contentType = 'image/jpeg' } = <
      { fileName: string; contentType: string }
    >req.query

    if (!fileName) {
      throw new Error('File name is required.')
    }

    const id = uuid()
    const url = await generatePresignedUrl(`${id}_${fileName}`, contentType)
    return res.json({ url: url[0], path: `${id}_${fileName}` })
  } catch (err) {
    console.log(err)
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Failed to generate presigned url. Please try again.' })
  }
}

