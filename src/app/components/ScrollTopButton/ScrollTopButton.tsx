'use client';
export const ScrollTopButton = () => {
  return (
    <button
      className="w-12 h-12 text-xs fixed right-3 bottom-20 md:right-5 md:bottom-5 rounded-full border-2 border-slate-300 flex justify-center items-center bg-white shadow-lg transition-all hover:shadow-xl hover:border-slate-500 z-50"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <p>TOP</p>
    </button>
  );
};
