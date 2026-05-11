import { Router } from 'express';
import { 
  getAllGalleryItems, 
  createGalleryItem, 
  deleteGalleryItem 
} from '../controllers/galleryController';

const router = Router();

router.get('/', getAllGalleryItems);
router.post('/', createGalleryItem);
router.delete('/:id', deleteGalleryItem);

export default router;
