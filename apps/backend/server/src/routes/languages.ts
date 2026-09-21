import { Router, Request, Response } from 'express'
import { Language, User } from '../models'

const router = Router()

/**
 * GET /api/languages
 * Get all available languages
 */
router.get('/api/languages', async (_req: Request, res: Response) => {
  try {
    const languages = {
      supported: [
        { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
        { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
        { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
        { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
        { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
        { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
        { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
        { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
        { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
        { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
        { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر', flag: '🇮🇳' },
        { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
        { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '📚' },
        { code: 'en', name: 'English', nativeName: 'English', flag: '🌍' },
      ],
    }

    res.json({
      success: true,
      data: languages,
    })
  } catch (error) {
    console.error('Error fetching languages:', error)
    res.status(500).json({ error: 'Failed to fetch languages' })
  }
})

/**
 * GET /api/languages/:userId
 * Get user's language settings
 */
router.get('/api/languages/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId).select('preferredLanguage learningLanguages nativeLanguage')

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.json({
      success: true,
      data: {
        userId,
        preferredLanguage: user.preferredLanguage,
        learningLanguages: user.learningLanguages,
        nativeLanguage: user.nativeLanguage,
      },
    })
  } catch (error) {
    console.error('Error fetching user language settings:', error)
    res.status(500).json({ error: 'Failed to fetch language settings' })
  }
})

/**
 * POST /api/languages/:userId
 * Update user's language settings
 */
router.post('/api/languages/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params
    const { preferredLanguage, learningLanguages, transliterationStyle } = req.body

    // Validation
    if (!preferredLanguage) {
      res.status(400).json({ error: 'preferredLanguage is required' })
      return
    }

    if (!Array.isArray(learningLanguages)) {
      res.status(400).json({ error: 'learningLanguages must be an array' })
      return
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        preferredLanguage,
        learningLanguages,
      },
      { new: true, runValidators: true }
    ).select('preferredLanguage learningLanguages nativeLanguage')

    if (!updated) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.json({
      success: true,
      message: 'Language settings updated',
      data: {
        userId,
        preferredLanguage: updated.preferredLanguage,
        learningLanguages: updated.learningLanguages,
        transliterationStyle: transliterationStyle || 'roman',
        updatedAt: new Date(),
      },
    })
  } catch (error) {
    console.error('Error updating language settings:', error)
    res.status(500).json({ error: 'Failed to update language settings' })
  }
})

/**
 * GET /api/quran/translations/:surah/:ayah
 * Get Quran translation in specified language
 */
router.get(
  '/api/quran/translations/:surah/:ayah',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { surah, ayah } = req.params
      const language = (req.query.language as string) || 'en'

      const surahNum = parseInt(surah)
      const ayahNum = parseInt(ayah)

      // Validation
      if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) {
        res.status(400).json({ error: 'Invalid surah number' })
        return
      }

      if (isNaN(ayahNum) || ayahNum < 1) {
        res.status(400).json({ error: 'Invalid ayah number' })
        return
      }

      // Mock data - can be replaced with actual Quran API or database
      const translation = {
        surahNumber: surahNum,
        ayahNumber: ayahNum,
        language,
        arabicText: 'بسم الله الرحمن الرحيم',
        translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
        translationAuthor: 'Pickthall',
        transliterationRoman: 'Bismillahir-rahmanir-rahim',
        transliterationNative: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      }

      res.json({
        success: true,
        data: translation,
      })
    } catch (error) {
      console.error('Error fetching translation:', error)
      res.status(500).json({ error: 'Failed to fetch translation' })
    }
  }
)

/**
 * GET /api/quran/search
 * Search Quran in specified language
 */
router.get('/api/quran/search', async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, language } = req.query

    if (!q || typeof q !== 'string') {
      res.status(400).json({ error: 'Search query is required' })
      return
    }

    const lang = (language as string) || 'en'

    // Mock search results - can be replaced with actual Quran API or database
    const results = [
      {
        surahNumber: 1,
        ayahNumber: 1,
        arabicText: 'بسم الله الرحمن الرحيم',
        translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
        language: lang,
      },
    ]

    res.json({
      success: true,
      data: results,
      count: results.length,
    })
  } catch (error) {
    console.error('Error searching Quran:', error)
    res.status(500).json({ error: 'Failed to search Quran' })
  }
})

/**
 * GET /api/languages/:userId/progress/:language
 * Get user's progress in a specific language
 */
router.get(
  '/api/languages/:userId/progress/:language',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, language } = req.params

      const progress = await Language.findOne({
        userId,
        language,
      })

      if (!progress) {
        // Return default progress if not found
        res.json({
          success: true,
          data: {
            userId,
            language,
            totalAyahsRead: 0,
            totalSurahsCompleted: 0,
            lastReadSurah: 1,
            lastReadAyah: 0,
            masteredAyahs: 0,
            reviewNeededAyahs: 0,
            streakDays: 0,
            lastActivity: null,
          },
        })
        return
      }

      res.json({
        success: true,
        data: progress,
      })
    } catch (error) {
      console.error('Error fetching language progress:', error)
      res.status(500).json({ error: 'Failed to fetch progress' })
    }
  }
)

export default router
