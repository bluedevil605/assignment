import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 p-6 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="text-sm text-slate-500">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="mt-2 text-sm font-medium text-indigo-600 hover:underline">
        Back to home
      </Link>
    </main>
  );
}
