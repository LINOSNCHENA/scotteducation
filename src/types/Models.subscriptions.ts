
export interface IReview {
    id?: string; // UUID
    name: string;
    location: string;
    review: string;
    rating: number;
    avatar_url: string;
    created_at: string;
}

export interface ISubscription {
    id?: string; // UUID
    name: string;
    email: string;
    location?: string | null;
    subscribed_at?: string | null; // ISO 8601 timestamp string
    address?: Record<string, string> | null; // JSONB type
    district: string; // default 'PBA'
    compound: string; // default 'MZE'
    unsubscribed: string; // default 'No'
}

export interface IVisit {
    id?: string;
    ip: string;
    city?: string;
    country?: string;
    region?: string;
    latitude?: number;
    longitude?: number;
    user_agent?: string;
    created_at: string;
    asn: string,
    device_id: string,
}

export interface IContactFormEmailProps {
    username: string;
    senderEmail: string;
    subject: string;
    message: string;
}

export type IResendSendEmailResult = {
    data?: {
        id: string;
    };
    error?: {
        name: string;
        message: string;
    };
};

export interface IOrderRequest {
    plan_title: string;
    plan_price: string;
    plan_bill: number;
    plan_features: string[];
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
    requirements?: string;
    created_at: string;
    status?: string;
    id?: string; // UUID
}
