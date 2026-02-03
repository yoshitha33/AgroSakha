import {
  Upload,
  Leaf,
  Eye,
  Camera,
  AlertCircle,
  CheckCircle,
  Loader,
  Info,
} from 'lucide-react'
import Layout from '../components/Layout'
import { useState, useRef } from 'react'
import { detectPest } from '../services/pestService'

export default function PestDetection() {

  // Data arrays
  const recentDetections = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=150&fit=crop',
      title: 'Aphids',
      subtitle: 'Harmful insect (aphid) detection detected',
      time: '2 days ago',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop',
      title: 'Leaf Miner',
      subtitle: 'Leaf mining harmful insects detected',
      time: '3 days ago',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=150&fit=crop',
      title: 'Whitefly',
      subtitle: 'Dangerous harmful insects',
      time: '5 days ago',
    },
  ]

  const actionCards = [
    {
      icon: Upload,
      title: 'Upload Crop Image',
      subtitle: 'Easily upload crop details in the efficient plant virus',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: Leaf,
      title: 'AI Analysis',
      subtitle: 'Get instant insights from intelligent pest identification',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: Eye,
      title: 'Get Results',
      subtitle: 'Receive detailed detection results and recommendations',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ]

  // Upload state & handlers
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setResult(null)
      setError(null)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  const analyzeImage = async () => {
    if (!selectedImage) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
      const base64 = await toBase64(selectedImage)
      console.log('Sending image for pest detection...');
      const res = await detectPest(base64)
      console.log('Pest detection response:', res);
      setResult(res)
    } catch (err) {
      console.error('Pest detection error:', err);
      setError(typeof err === 'string' ? err : err.error || err.message || 'Failed to detect pest')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                🐛 Plant Disease Detection
              </span>
            </h1>
            <p className="text-gray-600">
              Upload a photo of your plant leaf to detect diseases using AI-powered analysis
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">How it works:</p>
              <p>Our AI model analyzes leaf images to identify common plant diseases. For best results, take clear photos in good lighting with the leaf filling most of the frame.</p>
            </div>
          </div>

          {/* Main Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 transition-colors">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              
              {previewUrl ? (
                <div className="mb-6">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto rounded-lg max-h-64 object-contain border border-gray-200 shadow-md"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Upload Plant Leaf Image
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Drag & drop or click to select • Supports: JPG, PNG, WEBP
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleUploadClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                  type="button"
                >
                  <Upload className="w-5 h-5" />
                  {previewUrl ? 'Change Image' : 'Choose Image'}
                </button>
                
                {previewUrl && (
                  <button
                    onClick={analyzeImage}
                    disabled={loading}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      loading
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                    type="button"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Eye className="w-5 h-5" />
                        Analyze Image
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-800">Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Result Display */}
          {result && !error && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-green-500">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Detection Complete</h3>
                  <p className="text-sm text-gray-600">Analysis results from AI model</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Disease Detected</p>
                  <p className="text-lg font-semibold text-gray-900">{result.label || 'Unknown'}</p>
                </div>
                
                {typeof result.confidence === 'number' && (
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Confidence Level</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-lg font-semibold text-gray-900">{result.confidence.toFixed(2)}%</p>
                      <div className="flex-1 ml-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                            style={{ width: `${Math.min(result.confidence, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-gray-600 mb-1">Image Type</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {result.isLeaf ? '✓ Leaf Image' : '✗ Not a Leaf'}
                  </p>
                </div>
              </div>

              {/* Recommendations */}
              {result.label && result.label.toLowerCase().includes('healthy') === false && (
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">💡 Recommendations</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Consult with an agricultural expert for treatment options</li>
                    <li>• Remove and destroy affected leaves to prevent spread</li>
                    <li>• Monitor other plants for similar symptoms</li>
                    <li>• Consider appropriate fungicides or pesticides if confirmed</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* How to Use Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {actionCards.map((card, idx) => {
              const Icon = card.icon
              return (
                <div key={idx} className={`${card.bgColor} rounded-xl p-6 border border-gray-200`}>
                  <Icon className={`w-10 h-10 ${card.iconColor} mb-4`} />
                  <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.subtitle}</p>
                </div>
              )
            })}
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-600" />
              Best Practices for Accurate Detection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Good Lighting</h4>
                  <p className="text-sm text-gray-600">
                    Take photos in natural daylight for clearest visibility of symptoms
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Clear Focus</h4>
                  <p className="text-sm text-gray-600">
                    Ensure the leaf fills most of the frame and is in sharp focus
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Single Leaf</h4>
                  <p className="text-sm text-gray-600">
                    Photograph individual leaves showing symptoms clearly
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Multiple Angles</h4>
                  <p className="text-sm text-gray-600">
                    Take photos from different angles for better analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
