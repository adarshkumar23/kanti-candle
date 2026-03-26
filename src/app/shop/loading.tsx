export default function ShopLoading() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="px-6 md:px-12 lg:px-24 py-16 border-b border-[var(--color-border)]/20">
        <div className="skeleton h-3 w-24 rounded mb-4"></div>
        <div className="skeleton h-14 w-64 rounded mb-3"></div>
        <div className="skeleton h-4 w-48 rounded"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton aspect-square rounded-sm mb-6"></div>
              <div className="skeleton h-3 w-24 rounded mb-2"></div>
              <div className="skeleton h-6 w-40 rounded mb-2"></div>
              <div className="skeleton h-3 w-32 rounded mb-4"></div>
              <div className="skeleton h-4 w-20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
