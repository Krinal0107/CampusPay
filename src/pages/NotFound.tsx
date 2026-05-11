import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Zap } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Zap className="h-8 w-8 text-primary" />
      </div>
      <h1 className="mb-2 font-heading text-4xl font-bold text-foreground">404</h1>
      <p className="mb-8 text-muted-foreground">Page not found</p>
      <Link
        to="/"
        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[var(--shadow-gold)]"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
