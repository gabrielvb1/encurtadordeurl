import express from 'express';
import urls from '../controller/urls.js';
import loginUsers from '../controller/userLogin.js'
import { tokenMiddleware } from '../middlewares/tokenMiddleware.js';
import { loginMiddleware } from '../middlewares/loginMiddleware.js';
import { signUpSchema, loginSchema } from '../schemas/userSchema.js';

export const router = express();
router.post('/signup', loginMiddleware(signUpSchema), loginUsers.signUpUser)
router.post('/login', loginMiddleware(loginSchema), loginUsers.loginUser)


router.post('/shorturl', tokenMiddleware, urls.createShortUrl)
router.get('/urls/users', tokenMiddleware, urls.getUserUrls)
router.put('/urls/shorturl', tokenMiddleware, urls.updateOriginalUrl);
router.delete('/urls/:shortId', tokenMiddleware, urls.deleteUrl)

router.post('/urls/redirect', tokenMiddleware, urls.redirectToOriginalUrl);

export default router