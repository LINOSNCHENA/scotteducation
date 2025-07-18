import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Footer from "./childs/Footer";
import Header from "./childs/Headers";
import { Post } from "./childs/Model.posts";
import Image from "next/image";

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <>
      <Head>
        <title>{post.title} | UniAdmit Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <Header />

      <div className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <Image src={post.imageUrl} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-8" />

          <div className="flex items-center text-gray-500 text-sm mb-6">
            <span className="mr-4">{post.date}</span>
            <span className="mr-4 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{post.category}</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">{post.title}</h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>

            <div className="mb-8">
              {/* In a real app, this would be your actual post content */}
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus
                ut eleifend nibh porttitor. Ut in nulla enim.
              </p>
              <p className="mb-4">
                Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus
                massa, ut blandit odio.
              </p>
              <h2 className="text-2xl font-bold mt-8 mb-4">Section Heading</h2>
              <p>
                Proin convallis mi ac felis pharetra aliquam. Curabitur dignissim accumsan rutrum. In arcu magna, aliquet vel pretium et, molestie et arcu. Mauris lobortis nulla et
                felis ullamcorper bibendum.
              </p>
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // In a real app, you would fetch all post slugs from your API or CMS
  const paths = [
    { params: { slug: "10-essential-tips-for-successful-university-application" } },
    { params: { slug: "how-to-write-compelling-personal-statement" } },
    { params: { slug: "navigating-scholarships-and-financial-aid-options" } },
  ];

  return {
    paths,
    fallback: false, // Show 404 for unknown slugs
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // In a real app, you would fetch the post data based on the slug
  const posts: Post[] = [
    {
      id: "1",
      title: "10 Essential Tips for a Successful University Application",
      excerpt: "Applying to university can be overwhelming, but with the right approach, you can stand out from the crowd.",
      content: "Full content here...",
      date: "June 15, 2023",
      category: "Admission Tips",
      readTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      slug: "10-essential-tips-for-successful-university-application",
    },
    {
      id: "2",
      title: "How to Write a Compelling Personal Statement",
      excerpt: "Your personal statement is your opportunity to speak directly to admissions officers.",
      content: "Full content here...",
      date: "June 8, 2023",
      category: "Application Essays",
      readTime: "4 min read",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      slug: "how-to-write-compelling-personal-statement",
    },
    {
      id: "3",
      title: "Navigating Scholarships and Financial Aid Options",
      excerpt: "Higher education can be expensive, but there are numerous funding options available.",
      content: "Full content here...",
      date: "June 1, 2023",
      category: "Financial Aid",
      readTime: "6 min read",
      imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      slug: "navigating-scholarships-and-financial-aid-options",
    },
  ];

  const post = posts.find((p) => p.slug === params?.slug);

  return {
    props: {
      post,
    },
    revalidate: 60, // Regenerate the page every 60 seconds
  };
};
