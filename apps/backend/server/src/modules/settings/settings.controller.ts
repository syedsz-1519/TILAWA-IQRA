import { Request, Response } from 'express'
import { SettingsService } from './settings.service'
import { sendSuccess } from '../../utils/response'
import { asyncHandler } from '../../utils/asyncHandler'

const service = new SettingsService()

export const getLanguagesHandler = asyncHandler(async (_req: Request, res: Response) => {
  const languages = await service.getSupportedLanguages()
  sendSuccess(res, { supported: languages })
})
