'use client'
import { Gallery } from "next-gallery"
import { useEffect, useState } from "react";


const widths = [500, 1000, 1600]
const ratios = [2.2, 4, 6, 8]

export default function MyGallery({event}) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`/api/gallery?event=${event}`);
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <Gallery {...{ images, widths, ratios, gap:"4px" }} />
    )
}