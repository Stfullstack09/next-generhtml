import { Suspense } from "react";
import Detail from "../Test";

async function getData(id: string) {
    const res = await fetch(`https://backoffice.nodemy.vn/api/blogs/${id}`, {
        next: {
            revalidate: 30,
        },
    });

    return res.json();
}

async function getDataPhoto() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=15`
    );

    return res.json();
}

// Return a list of `params` to populate the [slug] dynamic segment
/* 

generateStaticParams = getStaticPath vs getStaticProps

{ cache: "no-store" } => getServerSideProps

*/

export async function generateStaticParams() {
    const posts = await fetch(
        "https://backoffice.nodemy.vn/api/blogs?poplate=*"
    );

    const data = await posts.json();

    const dataBuild = data.data.map((item: any) => ({
        slug: item.attributes.slug,
    }));

    return dataBuild;

    /* 
    [
        {
            slug :'/1'
        },
        {
            slug :'/2'
        },
        {
            slug :'/3'
        }
    ]
    
    */
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
            <Detail />
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
            </Suspense>
        </main>
    );
}
