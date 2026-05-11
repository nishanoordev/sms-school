import { Router } from 'express';
import { 
  getAllGalleryItems, 
  createGalleryItem, 
  updateGalleryItem,
  deleteGalleryItem 
} from '../controllers/galleryController';

const router = Router();

router.get('/', getAllGalleryItems);
router.post('/', createGalleryItem);
router.put('/:id', updateGalleryItem);
router.delete('/:id', deleteGalleryItem);

export default router;
