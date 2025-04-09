import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './aws';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function uploadFileToS3(path, file, bucketName) {
    const key = `${path}/${Date.now()}-${file.name}`;
    
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        ContentType: file.type,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return {
        key,
        signedUrl,
        name: file.name,
        type: file.type,
        size: file.size
    };
}

export async function getFileUrl(key, bucketName) {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return signedUrl;
}

export async function deleteFileFromS3(key, bucketName) {
    try {
        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
        });

        await s3Client.send(command);
        return true;
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        throw error;
    }
} 