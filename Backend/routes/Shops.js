import express from 'express'
import { getNearbyShops, getNearbyPestControl } from '../controllers/shopsController.js'

const router = express.Router()

router.post('/nearby-shops', getNearbyShops)
router.post('/nearby-pest-control', getNearbyPestControl)

export default router
