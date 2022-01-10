import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import { JWT_SECRET, JWT_LIFETIME, PRIVATE_KEY_ENCRYPT_KEYPHRASE } from '../config/constants'

const SECRET = JWT_SECRET || "default_secret";
export interface TokenPayload {
  id: string;
  email: string;
  fname: string;
  lname: string;
  role: {
    description: string;
  };
}

export const generateToken = (
  payload: any,
  expiresIn = JWT_LIFETIME
): string => jwt.sign(payload, SECRET, { expiresIn });

export const verifyToken = (token: string): any => jwt.verify(token, SECRET);

export const hasPermission = (
  resourceOwnerId: number,
  requestOwnerId: number
) => resourceOwnerId === requestOwnerId;

const getIV = () => crypto.randomBytes(12)

export const encryptKey = (plainText: string) => {
  // For `aes-256-gcm` algorithm, key must be 32 bytes.
  const key = crypto.createHash('sha256').update(PRIVATE_KEY_ENCRYPT_KEYPHRASE).digest('base64').substr(0, 32)
  const iv = getIV()
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv, {
    authTagLength: 16,
  })
  let encryptedMessage = cipher.update(plainText)
  encryptedMessage = Buffer.concat([encryptedMessage, cipher.final()])
  return Buffer.concat([iv, encryptedMessage, cipher.getAuthTag()]).toString('base64')
}

export const decryptKey = (cipherText: string) => {
  // For `aes-256-gcm` algorithm, key must be 32 bytes.
  const key = crypto.createHash('sha256').update(PRIVATE_KEY_ENCRYPT_KEYPHRASE).digest('base64').substr(0, 32)
  const cipher = Buffer.from(cipherText, 'base64')
  const authTag = cipher.slice(-16)
  const iv = cipher.slice(0, 12)
  const encryptedMessage = cipher.slice(12, -16)
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv, {
    authTagLength: 16,
  })
  decipher.setAuthTag(authTag)
  let messagetext = decipher.update(encryptedMessage)
  return Buffer.concat([messagetext, decipher.final()]).toString()
}
