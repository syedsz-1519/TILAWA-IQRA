import { redirect } from 'next/navigation'

// Legacy route — kept so old links and bookmarks continue to work.
export default function HadithDuaPage() {
  redirect('/hadith-library')
}
