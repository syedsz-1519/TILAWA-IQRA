import { Router, Request, Response } from 'express'

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
router.get('/api/languages/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    // Mock implementation - replace with actual database query
    const languageSettings = {
      userId,
      preferredLanguage: 'ur',
      learningLanguages: ['ur', 'en', 'hi'],
      nativeLanguage: 'ur',
      transliterationStyle: 'roman',
    }

    res.json({
      success: true,
      data: languageSettings,
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
router.post('/api/languages/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { preferredLanguage, learningLanguages, transliterationStyle } = req.body

    // Validation
    if (!preferredLanguage) {
      return res.status(400).json({ error: 'preferredLanguage is required' })
    }

    if (!Array.isArray(learningLanguages)) {
      return res.status(400).json({ error: 'learningLanguages must be an array' })
    }

    // Mock implementation - replace with actual database update
    const updated = {
      userId,
      preferredLanguage,
      learningLanguages,
      transliterationStyle: transliterationStyle || 'roman',
      updatedAt: new Date(),
    }

    res.json({
      success: true,
      message: 'Language settings updated',
      data: updated,
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
router.get('/api/quran/translations/:surah/:ayah', async (req: Request, res: Response) => {
  try {
    const { surah, ayah } = req.params
    const language = (req.query.language as string) || 'en'

    const surahNum = parseInt(surah)
    const ayahNum = parseInt(ayah)

    // Validation
    if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) {
      return res.status(400).json({ error: 'Invalid surah number' })
    }

    if (isNaN(ayahNum) || ayahNum < 1) {
      return res.status(400).json({ error: 'Invalid ayah number' })
    }

    // Mock data - replace with actual database query
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
})

/**
 * GET /api/quran/search
 * Search Quran in specified language
 */
router.get('/api/quran/search', async (req: Request, res: Response) => {
  try {
    const { q, language } = req.query

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query is required' })
    }

    const lang = (language as string) || 'en'

    // Mock search results
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
router.get('/api/languages/:userId/progress/:language', async (req: Request, res: Response) => {
  try {
    const { userId, language } = req.params

    // Mock data
    const progress = {
      userId,
      language,
      totalAyahsRead: 150,
      totalSurahsCompleted: 5,
      lastReadSurah: 2,
      lastReadAyah: 286,
      masteredAyahs: 50,
      reviewNeededAyahs: 25,
      streakDays: 7,
      lastActivity: new Date(),
    }

    res.json({
      success: true,
      data: progress,
    })
  } catch (error) {
    console.error('Error fetching language progress:', error)
    res.status(500).json({ error: 'Failed to fetch progress' })
  }
})

export default router
