import { PageHero } from '@/components/page-hero'
import { BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Tajweed Quiz | TILAWA',
  description: 'Test your tajweed knowledge with interactive quizzes',
}

export default function TajweedQuizPage() {
  const quizzes = [
    { id: 1, title: 'Noon Sakinah & Tanween', difficulty: 'Beginner', questions: 10 },
    { id: 2, title: 'Madd Rules', difficulty: 'Intermediate', questions: 15 },
    { id: 3, title: 'Qalqalah & Heavy Letters', difficulty: 'Intermediate', questions: 12 },
    { id: 4, title: 'Assimilation Rules', difficulty: 'Advanced', questions: 20 },
  ]

  return (
    <>
      <main className="min-h-screen bg-background">
        <PageHero
          icon={BookOpen}
          eyebrow="Test Your Knowledge"
          title="Tajweed Quiz"
          description="Master the rules of beautiful Quran recitation through interactive practice"
        />

        <section className="mx-auto max-w-5xl px-4 py-16">
          <div className="grid gap-4 md:grid-cols-2">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{quiz.title}</h3>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {quiz.difficulty}
                  </span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{quiz.questions} questions</p>
                <button className="w-full rounded-lg bg-primary py-2 font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                  Start Quiz
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-lg border border-border bg-card/50 p-8">
            <h2 className="mb-4 text-2xl font-bold">How to Use</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Choose a quiz based on your level</li>
              <li>• Answer questions about tajweed rules with examples</li>
              <li>• Get instant feedback and explanations</li>
              <li>• Track your progress and improve over time</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}
