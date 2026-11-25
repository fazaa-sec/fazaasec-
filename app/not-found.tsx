export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <p className="font-mono text-neon">404</p>
        <h1 className="mt-3 text-4xl font-bold">Nothing here.</h1>
        <a href="/" className="btn-primary mt-8">
          Back to home
        </a>
      </div>
    </main>
  );
}
