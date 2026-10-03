import { Schema, model, Document } from 'mongoose'

export interface ILanguage extends Document {
  code: string
  name: string
  nativeName: string
  direction: 'ltr' | 'rtl'
  isRtl: boolean
  flag?: string
  translatorName?: string
  isAvailable: boolean
  createdAt: Date
  updatedAt: Date
}

const languageSchema = new Schema<ILanguage>(
  {
    code: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    nativeName: { type: String, required: true },
    direction: { type: String, enum: ['ltr', 'rtl'], default: 'ltr' },
    isRtl: { type: Boolean, default: false },
    flag: { type: String },
    translatorName: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

export const LanguageModel = model<ILanguage>('Language', languageSchema)
