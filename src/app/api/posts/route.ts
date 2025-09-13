import { TABLE_POST } from "@/app/utils/Branding/ApiRoutes";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";


export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Await the entire params object
        const { id } = await context.params;

        const postData = await request.json();

        // Validate the incoming data
        if (!id || !postData.title || !postData.content) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from(TABLE_POST)
            .update(postData)
            .eq('id', id);

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const { error } = await supabase
            .from(TABLE_POST)
            .delete()
            .eq('id', id);

        return error
            ? NextResponse.json({ error: error.message }, { status: 500 })
            : NextResponse.json({ success: true });

    } catch (err) {
        console.error('Delete error:', err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    const { data, error } = await supabase
        .from(TABLE_POST)
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}