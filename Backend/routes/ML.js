import express from 'express'
import { marketPrices, cropRecommendation, fertilizerRecommendation, pestDetect } from '../controllers/mlController.js'

const router = express.Router()

router.post('/market-prices', marketPrices)
router.post('/crop-recommendation', cropRecommendation)
router.post('/fertilizer-recommendation', fertilizerRecommendation)
router.post('/pest-detection', pestDetect)

export default router
