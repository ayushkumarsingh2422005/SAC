/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
            'via.placeholder.com',
        ],
    },
};

export default nextConfig;
