import Link from "next/link";
import { Card, CardHeader, CardBody } from "@heroui/card";
import Image from "next/image"
import React from "react";

export default function MovieCard({ movie_thumbnail, movie_title, source, setLoadedImagesCount }: 
    {
        movie_thumbnail: string,
        movie_title: string,
        source: string,
        setLoadedImagesCount: React.Dispatch<React.SetStateAction<number>>
    }
) {
    let sources: Map<string, string> = new Map([
        ["local", "http://localhost:8080" + movie_thumbnail],
        ['sb', 'data:image/png;base64,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']
    ])

return (
    <>
        <Link href={`/movies/${movie_title}`} className="pb-3">
            <Card className="py-1 px-3 shadow rounded-xl border border-gray-200 flex flex-col bg-gray-100">
                <CardHeader className="pt-2">
                    <p className="text-tiny uppercase font-bold text-red-500 z-0">{movie_title}</p>
                </CardHeader>
                <CardBody className="py-2 overflow-visible">
                    <Image
                    placeholder="empty"
                    priority
                    width={240}
                    height={135}
                    alt="Card background"
                    className="object-cover"
                    src={sources.get(source)!}
                    onLoad={() => setLoadedImagesCount((prevCount: number) => prevCount + 1)}
                    />
                </CardBody>
            </Card>
        </Link>
    </>
);
}
