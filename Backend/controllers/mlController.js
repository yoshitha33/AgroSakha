import path from 'path'
import { fileURLToPath } from 'url'
import runPython from '../utils/pythonRunner.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mlDir = path.resolve(__dirname, '..', 'ml')

export async function marketPrices(req, res) {
  try {
    const script = path.join(mlDir, 'market_prices.py')
    const { state, cropType } = req.body || {}

    const payload = {
      state: state || 'AP',
      crop_type: cropType || null
    }

    console.log('[marketPrices] Fetching market prices...')
    const result = await runPython(script, payload, { timeoutMs: 15000 })
    console.log('[marketPrices] Got prices:', result.count, 'commodities')
    return res.json(result)
  } catch (err) {
    console.error('marketPrices error:', err)
    return res.status(500).json({ error: err.message || 'Failed to fetch market prices' })
  }
}

export async function cropRecommendation(req, res) {
  try {
    const script = path.join(mlDir, 'crop_recommend.py')
    const {
      nitrogen, phosphorus, potassium,
      pH, rainfall, temperature, humidity,
    } = req.body || {}

    const payload = {
      N: Number(nitrogen),
      P: Number(phosphorus),
      K: Number(potassium),
      ph: Number(pH),
      rainfall: Number(rainfall),
      temperature: Number(temperature),
      humidity: Number(humidity),
    }

    console.log('[cropRecommendation] Starting Python script...')
    const result = await runPython(script, payload, { timeoutMs: 30000 })
    console.log('[cropRecommendation] Got result:', result)
    return res.json(result)
  } catch (err) {
    console.error('cropRecommendation error:', err)
    return res.status(500).json({ error: err.message || 'Crop recommendation failed' })
  }
}

export async function fertilizerRecommendation(req, res) {
  try {
    const script = path.join(mlDir, 'fertilizer_recommend.py')
    const {
      temperature, humidity, moisture,
      soilType, cropType, nitrogen, potassium, phosphorous,
    } = req.body || {}

    const payload = {
      temp: Number(temperature),
      humid: Number(humidity),
      mois: Number(moisture),
      soil: soilType, // string label, Python will encode
      crop: cropType, // string label, Python will encode
      nitro: Number(nitrogen),
      pota: Number(potassium),
      phos: Number(phosphorous),
    }

    const result = await runPython(script, payload, { timeoutMs: 120000 })
    return res.json(result)
  } catch (err) {
    console.error('fertilizerRecommendation error:', err)
    return res.status(500).json({ error: err.message || 'Fertilizer recommendation failed' })
  }
}

export async function pestDetect(req, res) {
  try {
    const script = path.join(mlDir, 'plant_disease.py')
    const { imageBase64 } = req.body || {}
    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 is required' })
    }
    const result = await runPython(script, { imageBase64 }, { timeoutMs: 180000 })
    return res.json(result)
  } catch (err) {
    console.error('pestDetect error:', err)
    return res.status(500).json({ error: err.message || 'Pest detection failed' })
  }
}
