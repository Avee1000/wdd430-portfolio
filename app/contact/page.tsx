export default function Contact() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-black text-4xl font-bold mb-4">Contact</h1>
        <p className="text-lg text-gray-700">Get in touch for collaboration, hiring, or project inquiries.</p>
      </section>

      <section className="space-y-8">
        <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Email</h2>
          <p className="text-gray-700">Your email address goes here.</p>
        </article>

        <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">LinkedIn / Social</h2>
          <p className="text-gray-700">Links to LinkedIn, GitHub, or portfolio profiles.</p>
        </article>

        <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Message</h2>
          <p className="text-gray-700">A short note or contact form can be added here later.</p>
        </article>
      </section>
    </main>
  );
}
