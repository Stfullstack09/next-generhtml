async function getData(id: string) {
    const res = await fetch(`https://backoffice.nodemy.vn/api/blogs/${id}`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    return res.json();
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const posts = await fetch(
        "https://backoffice.nodemy.vn/api/blogs?poplate=*"
    );

    const data = await posts.json();

    const dataBuild = data.data.map((item: any) => ({
        slug: item.attributes.slug,
    }));

    console.log(dataBuild);

    return dataBuild;
}

interface IPage {
    params: {
        slug: string;
    };
}

export default async function Page({ params }: IPage) {
    const data = await getData(params.slug);

    console.log(data);

    return (
        <main>
            <div
                dangerouslySetInnerHTML={{
                    __html: data?.data?.attributes?.content,
                }}
            ></div>
        </main>
    );
}
