import {
    Router
} from "express";

const router = Router();


router.get("/api/tasks/:listId", authController.signup_get);
router.post('/api/tasks', authController.signup_post);
router.put('/api/tasks/:id', authController.login_get);

router.delete('/api/tasks/:id', authController.login_post);

export default router