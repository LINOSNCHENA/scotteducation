// types/resend.d.ts

declare module 'resend' {
    export interface ICreateEmailResponse {
        id: string;
        data?: {
            id: string;
        };
        error?: {
            name: string;
            message: string;
        };

    }

    export class Resend {
        constructor(apiKey: string);
        emails: {
            send(params: unknown): Promise<ICreateEmailResponse>;
        };
    }
}