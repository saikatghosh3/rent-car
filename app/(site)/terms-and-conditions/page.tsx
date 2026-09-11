import siteContent from '@/data/site-content.json'

export default function TermsAndConditions() {
  const { title, lastUpdated, sections } = siteContent.terms

  return (
    <main className="mx-auto max-w-4xl px-5 py-16 lg:px-6">
      <p className="badge">Legal</p>
      <h1 className="mt-3 text-4xl font-bold text-navy">{title}</h1>
      <p className="mt-3 text-sm text-slate-400">
        Last updated: {lastUpdated}
      </p>
      <div className="mt-10 flex flex-col gap-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold text-navy">{section.heading}</h2>
            <p className="mt-3 leading-7 text-slate-600">{section.content}</p>
          </section>
        ))}
      </div>
    </main>
  )
}