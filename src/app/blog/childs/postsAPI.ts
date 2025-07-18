import { supabase } from "@/lib/supabase";
import { Post } from "./Model.posts";

// // API Functions 
// export async function getPosts(): Promise<Post[]> {
//     // const { data, error } = await supabase
//     //     .from('posts')
//     //     .select('*');
//     // console.log(data)


//     let { data: posts, error } = await supabase
//         .from('posts')
//         .select('*')


//     if (error) throw new Error(error.message);
//     return posts;
// }

export async function getPosts(): Promise<Post[]> {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false }); // Added sorting as example

    console.log(posts);

    if (error) {
        throw new Error(error.message);
    }

    // Type assertion if you're confident about the shape
    return posts as Post[];

    // OR safer alternative with runtime validation:
    // return validatePosts(posts);
}