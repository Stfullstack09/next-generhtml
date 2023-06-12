async function getData() {
    const res = await fetch(
        "http://14.225.210.141:8081/api/v1/app/get-detail-post?id=5"
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    return res.json();
}

export default async function Page() {
    const data = await getData();

    console.log(data);

    return (
        <main>
            <div
                dangerouslySetInnerHTML={{
                    __html: data?.data?.contentHTML,
                }}
            ></div>
        </main>
    );
}
