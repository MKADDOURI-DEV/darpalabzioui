'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary opacity-20">
              404
            </h1>
          </div>
        </div>

        <h2 className="text-2xl font-medium text-onBackground mb-2">
          Page Not Found
        </h2>

        <p className="text-onBackground/70 mb-8">
          The page you're looking for doesn't exist. Let's get you back!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>

            Go Back
          </button>

          <button
            type="button"
            onClick={handleGoHome}
            className="inline-flex items-center justify-center gap-2 border border-border bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.954a.75.75 0 0 1 1.28.53v5.174c3.95.295 7.5 2.63 9.066 6.39.173.416-.22.852-.637.696a9.75 9.75 0 0 0-8.429.508v3.096a.75.75 0 0 1-1.28.53L2.25 12Z"
              />
            </svg>

            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
