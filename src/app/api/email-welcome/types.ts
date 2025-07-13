
export interface RequestBody {
    email: string;
    username: string;
    message: string;
}
// 1. Define proper response types
type ResendSuccess = {
    from?: string;
    to?: string[];
    subject?: string;
    html?: unknown
};
export type ResendError = {
    name: string;
    message: string;
    statusCode: number;
};

export type ResendResponse =
    | { data: ResendSuccess; error?: never }
    | { data?: never; error: ResendError };

export type EmailResponse = {
    id: string;
    from: string;
    to: string[];
    subject: string;
    html: string;
};