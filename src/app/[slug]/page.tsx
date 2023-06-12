import Image from "next/image";
import { Suspense } from "react";

async function getData(id: string) {
    const res = await fetch(`https://backoffice.nodemy.vn/api/blogs/${id}`, {
        next: { tags: ["post"] },
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    return res.json();
}

async function getDataPhoto() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=15`
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    return res.json();
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const posts = await fetch(
        "https://backoffice.nodemy.vn/api/blogs?poplate=*",
        { next: { revalidate: 0 } }
    );

    const data = await posts.json();

    const dataBuild = data.data.map((item: any) => ({
        slug: item.attributes.slug,
    }));

    return dataBuild;
}

interface IPage {
    params: {
        slug: string;
    };
}

export default async function Page({ params }: IPage) {
    const data = await getData(params.slug);
    const dataPhoto = await getDataPhoto();

    return (
        <main>
            <div
                dangerouslySetInnerHTML={{
                    __html: data?.data?.attributes?.content,
                }}
            ></div>
            <Suspense fallback={<div>Loading...</div>}>
                <ul>
                    {dataPhoto.map((album: any) => (
                        <li key={album.id}>
                            {
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={album.url} alt="" />
                            }
                        </li>
                    ))}
                </ul>
                {/* <Albums promise={dataPhoto} /> */}
            </Suspense>
        </main>
    );
}

// Albums Component
async function Albums({ promise }: { promise: Promise<any[]> }) {
    // Wait for the albums promise to resolve
    const albums = await promise;

    return (
        <ul>
            {albums.map((album: any) => (
                <li key={album.id}>
                    {
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={album.url} alt="" />
                    }
                </li>
            ))}
        </ul>
    );
}
