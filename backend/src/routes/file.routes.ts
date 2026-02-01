import { Router, Response } from 'express';
import { upload } from '../middleware/upload';
import { requireAuth } from '../middleware/auth';
import { FileService } from '../services/file.service';
import { AuthRequest } from '../middleware/auth';

const router = Router();

router.use(requireAuth);

// Profile image upload
router.post('/profile', upload.single('image'), async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No image provided' });

        const file = req.file as any;
        await FileService.updateUserProfileImage(req.user!.userId, file.path);

        return res.status(200).json({ url: file.path });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// Property image upload
router.post('/property/:id', upload.array('images', 5), async (req: AuthRequest, res: Response) => {
    try {
        const files = req.files as any[];
        if (!files || files.length === 0) return res.status(400).json({ error: 'No images provided' });

        const results = await Promise.all(
            files.map(file => FileService.addPropertyImage(req.params.id as string, file.path, file.filename))
        );

        return res.status(201).json(results);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// Unit image upload
router.post('/unit/:id', upload.array('images', 5), async (req: AuthRequest, res: Response) => {
    try {
        const files = req.files as any[];
        if (!files || files.length === 0) return res.status(400).json({ error: 'No images provided' });

        const results = await Promise.all(
            files.map(file => FileService.addUnitImage(req.params.id as string, file.path, file.filename))
        );

        return res.status(201).json(results);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
