// src/components/MarketHighlights.jsx
import React, { useState, useEffect } from 'react'
import { FiArrowUp, FiArrowDown } from "react-icons/fi"
import { Loader } from 'lucide-react'
import { getMarketPrices } from '../services/marketService'

const MarketHighlights = () => {
    const [commodities, setCommodities] = useState([])
    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState(null)

    useEffect(() => {
        fetchHighlights()
    }, [])

    const fetchHighlights = async () => {
        try {
            const response = await getMarketPrices({ state: 'AP' })
            if (response.success) {
                // Show top 3 most expensive items
                const top3 = response.commodities.slice(0, 3)
                setCommodities(top3)
                setSummary(response.summary)
            }
        } catch (err) {
            console.error('Error fetching highlights:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-center">
                <Loader className="w-5 h-5 animate-spin text-green-600 mr-2" />
                <span className="text-gray-600">Loading highlights...</span>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Today's Top Market Prices
            </h2>
            <div className="space-y-3">
                {commodities.map((item, idx) => (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex items-center space-x-3">
                            <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded">#{idx + 1}</span>
                            <div>
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.category}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">₹{item.current_price}</p>
                                <p className="text-xs text-gray-500">{item.unit}</p>
                            </div>
                            <div className="flex items-center">
                                {item.trend === "up" ? (
                                    <div className="flex items-center space-x-1 text-green-600">
                                        <FiArrowUp className="h-4 w-4" />
                                        <span className="text-xs font-medium">{item.change_percent > 0 ? '+' : ''}{item.change_percent}%</span>
                                    </div>
                                ) : item.trend === "down" ? (
                                    <div className="flex items-center space-x-1 text-red-600">
                                        <FiArrowDown className="h-4 w-4" />
                                        <span className="text-xs font-medium">{item.change_percent}%</span>
                                    </div>
                                ) : (
                                    <span className="text-xs font-medium text-gray-600">Stable</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {summary && (
                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                        <p className="text-gray-600">Total Items</p>
                        <p className="font-bold text-gray-800">{summary.total_commodities}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">Avg Change</p>
                        <p className={`font-bold ${summary.avg_change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {summary.avg_change_percent > 0 ? '+' : ''}{summary.avg_change_percent}%
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">Highest</p>
                        <p className="font-bold text-gray-800 truncate">{summary.highest_price}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MarketHighlights
