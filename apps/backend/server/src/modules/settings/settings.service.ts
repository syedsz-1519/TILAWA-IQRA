import { LanguageModel } from './settings.model'

const DEFAULT_LANGUAGES = [
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl', isRtl: true, flag: '🇵🇰', translatorName: 'Jalandhri / Kanzul Imaan' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', direction: 'ltr', isRtl: false, flag: '🇮🇳', translatorName: 'Kanzul Imaan' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', direction: 'ltr', isRtl: false, flag: '🇧🇩', translatorName: 'Kanzul Imaan' },
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr', isRtl: false, flag: '🌍', translatorName: 'Sahih International' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl', isRtl: true, flag: '🇸🇦', translatorName: 'Madani Mushaf' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', direction: 'ltr', isRtl: false, flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', direction: 'ltr', isRtl: false, flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', direction: 'ltr', isRtl: false, flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', direction: 'ltr', isRtl: false, flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', direction: 'ltr', isRtl: false, flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', direction: 'ltr', isRtl: false, flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', direction: 'ltr', isRtl: false, flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', direction: 'ltr', isRtl: false, flag: '🇮🇳' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر', direction: 'rtl', isRtl: true, flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', direction: 'ltr', isRtl: false, flag: '🇮🇳' },
]

export class SettingsService {
  async getSupportedLanguages() {
    let languages = await LanguageModel.find({ isAvailable: true }).lean()
    if (!languages || languages.length === 0) {
      return DEFAULT_LANGUAGES
    }
    return languages
  }
}
