/// <reference types="vite/client" />
/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface ImportMetaEnv {
    readonly VITE_FIREBASE_API_KEZ: string;
    readonly VITE_FIREBASE_DOMAIZ: string;
    readonly VITE_DATABASE_URL: string;//3
    readonly VITE_FIREBASE_PROJECT_ID: string;
    readonly VITE_FIREBASE_STORAGE_BUCKET: string;
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    readonly VITE_FIREBASE_APP_ID: string;//7
    readonly VITE_FIREBASE_MEASUREMENT_ID: string;

    // other env vars...
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEZ: string;

    readonly VITE_SUPABASE_ANON_KEZ2: string;
    readonly VITE_SUPABASE_URL2: string;

    readonly RESENT_API_KEZ1: string;

    // Add more env vars here as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}