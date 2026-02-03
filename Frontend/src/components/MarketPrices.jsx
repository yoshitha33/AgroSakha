// src/components/MarketPrices.jsx
import React, { useState, useEffect } from 'react'
import { FiArrowUp, FiArrowDown } from "react-icons/fi"
import { Loader, AlertCircle } from 'lucide-react'
import { getMarketPrices } from '../services/marketService'

const MarketPrices = () => {
    const [commodities, setCommodities] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('all')

    useEffect(() => {
        fetchMarketPrices()
    }, [])

    const fetchMarketPrices = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await getMarketPrices({ state: 'AP' })
            console.log('Market prices response:', response)
            if (response.success && response.commodities) {
                setCommodities(response.commodities)
            } else {
                setError(response.error || 'Failed to fetch market prices')
            }
        } catch (err) {
            console.error('Error fetching market prices:', err)
            setError(err || 'Unable to fetch market prices')
        } finally {
            setLoading(false)
        }
    }

    const getFilteredCommodities = () => {
        if (selectedCategory === 'all') return commodities
        return commodities.filter(c => c.category === selectedCategory)
    }

    const categories = ['all', ...new Set(commodities.map(c => c.category))]
    const filtered = getFilteredCommodities()

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Market Prices - Andhra Pradesh</h2>
                <button
                    onClick={fetchMarketPrices}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        loading
                            ? 'bg-gray-300 text-gray-600'
                            : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                >
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-700">{error}</div>
                </div>
            )}

            {loading && !commodities.length ? (
                <div className="flex items-center justify-center py-8">
                    <Loader className="w-6 h-6 animate-spin text-green-600 mr-2" />
                    <span>Loading market prices...</span>
                </div>
            ) : (
                <>
                    {/* Category Filter */}
                    <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                                    selectedCategory === cat
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                            >
                                {cat.replace('_', ' ').toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Commodity</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Current Price</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Range</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Change</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Trend</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filtered.map((item) => (
                                    <tr key={item.name} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.name}</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                                            ₹{item.current_price} <span className="text-xs text-gray-600 font-normal">({item.unit})</span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            ₹{item.min_price} - ₹{item.max_price}
                                        </td>
                                        <td className={`px-4 py-3 text-sm font-medium ${
                                            item.change_percent >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {item.change_percent > 0 ? '+' : ''}{item.change_percent}%
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex items-center">
                                                {item.trend === 'up' ? (
                                                    <>
                                                        <FiArrowUp className="h-4 w-4 text-green-600 mr-1" />
                                                        <span className="text-green-600 text-xs font-medium">UP</span>
                                                    </>
                                                ) : item.trend === 'down' ? (
                                                    <>
                                                        <FiArrowDown className="h-4 w-4 text-red-600 mr-1" />
                                                        <span className="text-red-600 text-xs font-medium">DOWN</span>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-600 text-xs font-medium">STABLE</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-8 text-gray-600">
                            No commodities found in this category
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default MarketPrices
