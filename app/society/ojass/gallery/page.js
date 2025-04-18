'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MyGallery from "@/components/Gallery";

export default function Page() {

    return (
        <main className="min-h-screen bg-white">
            <Navbar whiteBg={true}/>
            <div className="h-20"></div>
            <MyGallery event={"ojass"}/>
            <Footer />
        </main>
    );
}
