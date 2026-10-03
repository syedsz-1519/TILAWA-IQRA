import { RefreshTokenModel } from '../modules/auth/auth.model'
import { logger } from '../config/logger'

export async function runTokenCleanupJob(): Promise<void> {
  try {
    const now = new Date()
    const result = await RefreshTokenModel.deleteMany({
      $or: [{ expiresAt: { $lt: now } }, { isRevoked: true }],
    })

    logger.info(`[Job: TokenCleanup] Cleaned up ${result.deletedCount || 0} expired or revoked refresh tokens.`)
  } catch (error) {
    logger.error({ error }, '[Job: TokenCleanup] Error executing token cleanup job')
  }
}
