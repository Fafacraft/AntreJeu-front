import * as Sentry from '@sentry/react';

function initializeSentry() {
  if (!import.meta.env.VITE_SENTRY_DSN) {
    console.warn('Sentry DSN is not defined. Sentry will not be initialized.');
    return;
  }

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

function ErrorButton() {
  return (
    <button
      onClick={() => {
        // Send a log before throwing the error
        Sentry.logger.info('User triggered test error', {
          action: 'test_error_button_click',
        });
        // Send a test metric before throwing the error
        Sentry.metrics.count('test_counter', 1);
        throw new Error('This is your first error!');
      }}
    >
      Break the world
    </button>
  );
}

export { initializeSentry, ErrorButton };
