import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, _file) => {
        let folder = 'rental_management';

        // Dynamically assign folder based on the upload type
        if (req.path.includes('property')) folder += '/properties';
        else if (req.path.includes('unit')) folder += '/units';
        else if (req.path.includes('profile')) folder += '/profiles';

        return {
            folder: folder,
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
            transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
        };
    },
});

export const upload = multer({ storage: storage });
