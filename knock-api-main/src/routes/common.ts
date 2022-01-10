import express from 'express'

import { getHealthStatus, getPresignedUrl } from '../controllers/common'

const commonRouter = express.Router()

commonRouter.get('/health', getHealthStatus)
commonRouter.get('/presigned-url', getPresignedUrl)

export default commonRouter
