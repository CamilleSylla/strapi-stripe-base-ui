import { UploadFile } from "@/schema/__strapiGql__/graphql";
import Image from "next/image";
import { useMemo } from "react";

export default function StrapiImage({ image, format }: { image: UploadFile; format: 'large' | 'small' | 'medium' | 'thumbnail' }) {

    const imageUrl = useMemo(() => {
        if(!image?.formats){
            return image?.url || "/vercel.svg" 
        }
        const availableFormats = image.formats !== null ?  Object.keys(image?.formats) : null;
        if (availableFormats?.includes(format)){
            return image.formats[format].url
        } else {
            return image?.url || "/vercel.svg" 
        }
    }, [image, format])

    return (
        <div className="relative w-full h-full">
            <Image fill objectFit="cover" alt={image?.alternativeText as string} src={imageUrl}/>
        </div>
    )
}

