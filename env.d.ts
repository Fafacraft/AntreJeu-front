/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string;
  // Add other custom environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
