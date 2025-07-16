// src/app/api/reviews/reviews.service.ts
import { supabase } from "@/lib/supabase";
import { formatDateZM } from '@/app/utils/Functions';
import { IStudent, IUniversity } from "@/app/utils/education/Models.Universities";
import { IOrderRequest } from "@/types/models.eshop";
import { IReview, ISubscription, IVisit } from "@/types/Models.subscriptions";

// Constants for table names
const TABLES = {
    REVIEWS: 'reviews_pascal',
    SUBSCRIPTIONS: 'subscriptions_pascal',
    ORDERS: 'orders_pascal',
    UNIVERSITIES: 'universities',
    COURSES: 'courses',
    LEISURE_TRIPS: 'leisure_trips'
};

interface ReviewResult {
    reviews: IReview[];
    count: number;
    latestDate: string | null;
    error?: string;
}

interface ExtendedReviewResult extends ReviewResult {
    subscriptions: ISubscription[];
    visits: IVisit[];
    orders: IOrderRequest[];
    students?: IStudent[];
    universities?: IUniversity[];
}

export class ReviewService {
    /**
     * Fetches review records with basic statistics
     */
    static async getReviewStatus(): Promise<ReviewResult> {
        try {
            const { data, error } = await supabase
                .from(TABLES.REVIEWS)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const sorted = (data || []).sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );

            return {
                reviews: sorted,
                count: sorted.length,
                latestDate: sorted[0]?.created_at ? formatDateZM(sorted[0].created_at) : null
            };
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
            return {
                reviews: [],
                count: 0,
                latestDate: null,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Fetches all related records including subscriptions, visits, and orders
     */
    static async getAllRecords(): Promise<ExtendedReviewResult> {
        try {
            const [
                { data: reviews, error: reviewsError },
                { data: subscriptions, error: subsError },
                { data: orders, error: ordersError }
            ] = await Promise.all([
                supabase.from(TABLES.REVIEWS).select('*').order('created_at', { ascending: false }),
                supabase.from(TABLES.SUBSCRIPTIONS).select('*').order('created_at', { ascending: false }),
                supabase.from(TABLES.ORDERS).select('*').order('created_at', { ascending: false })
            ]);

            const error = reviewsError?.message || subsError?.message || ordersError?.message;
            if (error) throw new Error(error);

            return {
                reviews: reviews || [],
                count: reviews?.length || 0,
                latestDate: reviews?.[0]?.created_at ? formatDateZM(reviews[0].created_at) : null,
                subscriptions: subscriptions || [],
                orders: orders || [],
                visits: [] // TODO: Implement visit fetching if needed
            };
        } catch (error) {
            console.error('Failed to fetch all records:', error);
            return {
                reviews: [],
                count: 0,
                latestDate: null,
                subscriptions: [],
                orders: [],
                visits: [],
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Fetches reviews with related university and student data
     */
    static async getReviewsWithRelations(): Promise<ExtendedReviewResult> {
        try {
            const { data, error } = await supabase
                .from(TABLES.REVIEWS)
                .select(`
          *,
          student:students(*),
          university:universities(*)
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const reviews = data || [];
            const students = reviews.map(r => r.student).filter(Boolean) as IStudent[];
            const universities = reviews.map(r => r.university).filter(Boolean) as IUniversity[];

            return {
                reviews,
                count: reviews.length,
                latestDate: reviews[0]?.created_at ? formatDateZM(reviews[0].created_at) : null,
                students,
                universities,
                subscriptions: [],
                orders: [],
                visits: []
            };
        } catch (error) {
            console.error('Failed to fetch reviews with relations:', error);
            return {
                reviews: [],
                count: 0,
                latestDate: null,
                students: [],
                universities: [],
                subscriptions: [],
                orders: [],
                visits: [],
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }
}