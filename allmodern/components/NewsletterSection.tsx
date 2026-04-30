export default function NewsletterSection() {
  return (
    <section className="bg-slate-950 text-white py-16 sm:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center rounded-[36px] border border-white/10 bg-white/5 p-8 sm:p-12 shadow-2xl shadow-slate-950/20">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-orange-400">Stay in the loop</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Get the latest arrivals, sales, and design edits.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Subscribe for exclusive access to new collections, styling tips, and curated home design inspiration.
            </p>
          </div>

          <form className="space-y-4 rounded-[28px] border border-white/10 bg-slate-900/80 p-6 text-sm shadow-xl shadow-slate-950/20 sm:p-8">
            <label className="block text-sm font-semibold uppercase tracking-[0.24em] text-slate-300" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-bold uppercase tracking-[0.24em] text-white transition hover:bg-orange-500"
            >
              Join now
            </button>
            <p className="text-xs leading-5 text-slate-500">
              Get 10% off your first order when you subscribe.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
