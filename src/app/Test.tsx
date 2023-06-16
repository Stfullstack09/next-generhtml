"use client";

import React, { useState } from "react";

interface IProp {}

const Detail: React.FC<IProp> = ({}) => {
    const [a, setA] = useState<number>(1);

    return (
        <div>
            <h1>{a}</h1>
            <button onClick={() => setA((prev) => prev + 1)}>
                Click meeeeeeeeeeeee
            </button>
            12334441233444123344412334441233444123344412334441233444123344412334441233444123344412334441233444123344412334441233444123344412334441233444123344412334441233444123344412334441233444123344412334441233444123344412334441233444123344412334441233444
        </div>
    );
};

export default Detail;
