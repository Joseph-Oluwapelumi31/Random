'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-16 bg-[#080d12] text-center">
      <p className="text-[#0bc5ea] text-sm font-semibold uppercase tracking-widest mb-3">Something went wrong</p>
      <p className="text-white font-heading text-2xl font-bold mb-4 max-w-lg">This page could not be loaded.</p>
      <p className="text-[#94a3b8] text-sm mb-8 max-w-md break-words">
        {process.env.NODE_ENV === 'development' && error?.message ? error.message : 'Please try again, or refresh the page.'}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="btn-exec px-6 py-3 rounded-xl text-sm font-semibold"
      >
        Try again
      </button>
    </div>
  );
}
