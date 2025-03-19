import sharp from "sharp";

/**
 * Converts an image buffer to WebP unless it's a GIF or video.
 * @param {Buffer} fileBuffer - The input file buffer.
 * @param {string} mimeType - The MIME type of the file.
 * @returns {Promise<Buffer | null>} - The optimized WebP buffer, or null if skipping.
 */
export async function convertToWebP(fileBuffer, mimeType) {
    try {
        // Skip conversion for GIFs and video formats
        const skipTypes = ["image/gif", "video/mp4", "video/webm", "video/ogg", "gif"];
        if (skipTypes.includes(mimeType)) {
            console.log(`Skipping WebP conversion for ${mimeType}`);
            return null; // Return null so we can handle it separately
        }

        // Get metadata for dynamic compression
        const metadata = await sharp(fileBuffer).metadata();
        let quality = 80; // Default quality

        if (metadata.size > 5 * 1024 * 1024) quality = 60; // Large files → More compression
        else if (metadata.size > 2 * 1024 * 1024) quality = 70; // Medium files → Moderate compression

        return await sharp(fileBuffer).webp({ quality }).toBuffer();
    } catch (error) {
        console.error("Error converting image to WebP:", error);
        throw error;
    }
}
