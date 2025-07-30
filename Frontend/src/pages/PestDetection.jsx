import {
  Home,
  Bug,
  Cloud,
  DollarSign,
  HelpCircle,
  Building,
  Upload,
  Leaf,
  Eye,
  ChevronRight,
  Camera,
} from 'lucide-react'
import Layout from '../components/Layout'
import { useState, useRef } from 'react'

export default function PestDetection() {
  // Sidebar data for this page
  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Bug, label: 'Pest Detection', active: true },
    { icon: Cloud, label: 'Weather', active: false },
    { icon: DollarSign, label: 'Market Prices', active: false },
    { icon: HelpCircle, label: 'Expert Helpline', active: false },
    { icon: Building, label: 'Government Schemes', active: false },
  ]

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
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  return (
    <Layout pageTitle="Pest Detection" sidebarItems={sidebarItems}>
      {/* Upload Section */}
      <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center mb-8">
        <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Drag & drop your image here or click to upload
        </h3>
        <p className="text-gray-500 mb-6">
          Supporting: jpg, jpeg, png, webp, tiff
        </p>

        {previewUrl && (
          <div className="mb-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="mx-auto rounded-lg h-40 object-contain"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={handleUploadClick}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          type="button"
        >
          Upload Image
        </button>
      </div>

      {/* Recent Detections */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Recent Detections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentDetections.map((detection) => (
            <div
              key={detection.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={detection.image}
                alt={detection.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {detection.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{detection.subtitle}</p>
                <p className="text-xs text-gray-500">{detection.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {actionCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <div key={idx} className={`${card.bgColor} rounded-lg p-6`}>
              <Icon className={`w-8 h-8 ${card.iconColor} mb-4`} />
              <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.subtitle}</p>
            </div>
          )
        })}
      </section>

      {/* Best Practices Section */}
      <section className="bg-white rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Best Practices for Photo Capture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
            <div>
              <h4 className="font-medium text-gray-900">
                Focus good lighting conditions
              </h4>
              <p className="text-sm text-gray-600">
                View the captured clearly for best results
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
            <div>
              <h4 className="font-medium text-gray-900">
                Take photos from multiple angles
              </h4>
              <p className="text-sm text-gray-600">
                Multiple perspectives improve accuracy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Need Assistance Section */}
      <section className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Need Assistance?
            </h2>
            <p className="text-gray-600">Our support team is here to help you</p>
          </div>
          <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
            Contact Support
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </section>
    </Layout>
  )
}
