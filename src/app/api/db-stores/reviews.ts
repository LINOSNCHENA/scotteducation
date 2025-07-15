//
// Reviews  api

import { API_DBASE_STORES } from "@/app/utils/Branding/ApiRoutes";
import { formatDateZM } from '@/app/utils/Functions';
import { supabase } from "@/lib/supabase";
import { IOrderRequest } from "@/types/models.eshop";
import { IReview, ISubscription, IVisit } from "@/types/Models.subscriptions";
import { create } from 'zustand';

const TableName1 = 'reviews_pascal';
const TableName2 = 'subscriptions_pascal';
const TableName3 = 'orders_pascal';

interface StatusResult {
    signed: IReview[];
    finalCount: number;
    finalDate: string | null;
    error: string | null;
}

interface StatusResultExtended extends StatusResult {
    subscription: ISubscription[];
    visitation: IVisit[];
    orders: IOrderRequest[];
}

interface CounterState {
    counter: number;
    loading: boolean;
    error: string | null;
    fetchCounter: () => Promise<void>;
    incrementCounter: (value: number) => Promise<void>;
    statusRecords: () => Promise<StatusResult>;
    subscription: ISubscription[];
    visitation: IVisit[];
    orders: IOrderRequest[];
    getRecords: () => Promise<StatusResultExtended>;
}

export const useReviewStore = create<CounterState>((set) => ({
    counter: 0,
    loading: false,
    error: null,
    subscription: [],
    visitation: [], orders: [],

    fetchCounter: async () => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(API_DBASE_STORES);
            if (!res.ok) throw new Error('Failed to fetch counter');
            const data = (await res.json()) as { counter: number };
            set({ counter: data.counter, loading: false });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unexpected error';
            set({ error: message, loading: false });
        }
    },

    statusRecords: async () => {
        try {
            const { data, error: fetchError } = await supabase
                .from(TableName1)
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) {
                console.error('Error fetching reviews:', fetchError);
                return { signed: [], finalCount: 0, finalDate: null, error: fetchError.message };
            }

            const sorted = (data || []).slice().sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });

            const finalDate = formatDateZM(sorted[0]?.created_at) || null;
            const finalCount = sorted.length;

            return {
                signed: sorted,
                finalCount,
                finalDate,
                error: null
            };
        } catch (error) {
            console.error('Unexpected error:', error);
            return {
                signed: [],
                finalCount: 0,
                finalDate: null,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    },

    getRecords: async () => {

        try {
            const { data: d1, error: fetchError1 } = await supabase
                .from(TableName1)
                .select('*')
                .order('created_at', { ascending: false });
            const { data: d2, error: fetchError2 } = await supabase
                .from(TableName2)
                .select('*')
                .order('created_at', { ascending: false });
            const { data: d3, error: fetchError3 } = await supabase
                .from(TableName3)
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError1 || fetchError2 || fetchError3) {
                // Pick the first error message available
                const errorMsg =
                    fetchError1?.message || fetchError2?.message || fetchError3?.message || 'Unknown error';
                console.error('Error fetching records:', errorMsg);
                return {
                    signed: [],
                    finalCount: 0,
                    finalDate: null,
                    error: errorMsg,
                    subscription: [],
                    visitation: [],
                    orders: [],
                };
            }

            const finalCount = d1?.length ?? 0;
            const finalDate = d1?.[0]?.created_at ? formatDateZM(d1[0].created_at) : null;

            return {
                signed: d1 || [],
                finalCount,
                finalDate,
                error: null,
                subscription: d2 || [],
                visitation: [], // You might want to fetch this from another table if needed
                orders: d3 || [],
            };
        } catch (error) {
            console.error('Unexpected error:', error);
            return {
                signed: [],
                finalCount: 0,
                finalDate: null,
                error: error instanceof Error ? error.message : 'Unknown error',
                subscription: [],
                visitation: [],
                orders: [],
            };
        }
    },


    incrementCounter: async (value: number) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch('/api/db-stores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value }),
            });
            if (!res.ok) throw new Error('Failed to update counter');
            const data = (await res.json()) as { counter: number };
            set({ counter: data.counter, loading: false });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unexpected error';
            set({ error: message, loading: false });
        }
    },
}));
