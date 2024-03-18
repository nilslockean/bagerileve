/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_POSTHOG_API_KEY: string;
	readonly BASIC_AUTH: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
