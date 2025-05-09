import express from 'express';
import cors from 'cors';
import apicontroller from '../controller/apicontroller.js';

const router = express.Router();

const corsOptions = {
    origin: ["http://localhost:5173", "http://192.168.18.170:5173", "http://103.182.174.9:9100"],
    credentials: true
};

router.use(cors(corsOptions));
router.use(express.json());
router.get('/alldata', apicontroller.alldata);
router.get('/getDetail/:id', apicontroller.getDetail);
router.post('/fundtransfer', apicontroller.transferFunds);
router.post('/login',apicontroller.login)
router.post('/register',apicontroller.register)

export default router;
