"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface IRes<T> {
    data: {
        errCode: number;
        msg: string;
        data: T;
    };
}

export default async function Detail() {
    const [detail, setDetail] = useState<any>({});

    useEffect(() => {
        const Fetch = async () => {
            try {
                const Res: IRes<any> = await axios.get(
                    "http://14.225.210.141:8081/api/v1/app/get-detail-post?id=4"
                );

                if (Res.data.errCode === 0) {
                    setDetail(Res.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        Fetch();
    }, []);

    return (
        <main>
            {detail && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: detail?.contentHTML,
                    }}
                ></div>
            )}
        </main>
    );
}
