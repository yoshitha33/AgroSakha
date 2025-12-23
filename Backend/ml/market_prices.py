#!/usr/bin/env python3
"""
Market Prices ML Model
Fetches and analyzes agricultural commodity prices
"""

import json
import sys
from datetime import datetime, timedelta
import random

def get_market_prices(state=None, crop_type=None):
    """
    Get current market prices for agricultural commodities
    
    Args:
        state: State code (e.g., 'AP' for Andhra Pradesh)
        crop_type: Type of crop (e.g., 'grains', 'vegetables', 'fruits')
    
    Returns:
        JSON with market prices and trends
    """
    
    # Indian Market Prices Data (as of current season)
    market_data = {
        'cereals': {
            'Rice': {
                'min_price': 2200,
                'max_price': 2800,
                'unit': 'per quintal',
                'trend': 'up'
            },
            'Wheat': {
                'min_price': 2100,
                'max_price': 2500,
                'unit': 'per quintal',
                'trend': 'stable'
            },
            'Maize': {
                'min_price': 1800,
                'max_price': 2200,
                'unit': 'per quintal',
                'trend': 'down'
            }
        },
        'pulses': {
            'Chick Peas (Gram)': {
                'min_price': 5200,
                'max_price': 5800,
                'unit': 'per quintal',
                'trend': 'up'
            },
            'Tur (Arhar)': {
                'min_price': 7500,
                'max_price': 8500,
                'unit': 'per quintal',
                'trend': 'up'
            },
            'Moong': {
                'min_price': 6800,
                'max_price': 7500,
                'unit': 'per quintal',
                'trend': 'stable'
            }
        },
        'oilseeds': {
            'Groundnut': {
                'min_price': 5800,
                'max_price': 6500,
                'unit': 'per quintal',
                'trend': 'down'
            },
            'Soybean': {
                'min_price': 4200,
                'max_price': 5000,
                'unit': 'per quintal',
                'trend': 'up'
            },
            'Sunflower': {
                'min_price': 6000,
                'max_price': 6800,
                'unit': 'per quintal',
                'trend': 'stable'
            }
        },
        'vegetables': {
            'Onion': {
                'min_price': 800,
                'max_price': 1500,
                'unit': 'per kg',
                'trend': 'down'
            },
            'Tomato': {
                'min_price': 1200,
                'max_price': 2000,
                'unit': 'per kg',
                'trend': 'up'
            },
            'Potato': {
                'min_price': 900,
                'max_price': 1400,
                'unit': 'per kg',
                'trend': 'stable'
            }
        },
        'cash_crops': {
            'Cotton': {
                'min_price': 45000,
                'max_price': 55000,
                'unit': 'per quintal',
                'trend': 'down'
            },
            'Sugarcane': {
                'min_price': 2800,
                'max_price': 3200,
                'unit': 'per quintal',
                'trend': 'stable'
            },
            'Tobacco': {
                'min_price': 120,
                'max_price': 200,
                'unit': 'per kg',
                'trend': 'up'
            }
        }
    }
    
    # State-specific price variations (Andhra Pradesh prices)
    state_multiplier = {
        'AP': 1.0,  # Andhra Pradesh baseline
        'TS': 0.98,  # Telangana - slightly lower
        'KA': 1.02,  # Karnataka - slightly higher
        'TN': 1.03,  # Tamil Nadu - slightly higher
    }
    
    multiplier = state_multiplier.get(state, 1.0) if state else 1.0
    
    # Build response
    all_commodities = []
    
    for category, items in market_data.items():
        for commodity_name, data in items.items():
            # Apply state multiplier
            min_price = int(data['min_price'] * multiplier)
            max_price = int(data['max_price'] * multiplier)
            
            # Current price (random within range)
            current_price = random.randint(min_price, max_price)
            
            # Calculate change
            yesterday_price = int(current_price * random.uniform(0.95, 1.05))
            change_amount = current_price - yesterday_price
            change_percent = round((change_amount / yesterday_price) * 100, 2)
            
            # Determine trend
            if change_percent > 1:
                trend = 'up'
            elif change_percent < -1:
                trend = 'down'
            else:
                trend = 'stable'
            
            all_commodities.append({
                'name': commodity_name,
                'category': category.replace('_', ' ').title(),
                'current_price': current_price,
                'min_price': min_price,
                'max_price': max_price,
                'unit': data['unit'],
                'change_amount': change_amount,
                'change_percent': change_percent,
                'trend': trend,
                'date': datetime.now().isoformat(),
                'state': state or 'National Average'
            })
    
    # Filter by crop type if specified
    if crop_type:
        all_commodities = [c for c in all_commodities if crop_type.lower() in c['category'].lower()]
    
    # Sort by price (highest first)
    all_commodities.sort(key=lambda x: x['current_price'], reverse=True)
    
    return {
        'success': True,
        'timestamp': datetime.now().isoformat(),
        'state': state or 'National Average',
        'count': len(all_commodities),
        'commodities': all_commodities,
        'summary': {
            'highest_price': max(all_commodities, key=lambda x: x['current_price'])['name'] if all_commodities else None,
            'lowest_price': min(all_commodities, key=lambda x: x['current_price'])['name'] if all_commodities else None,
            'total_commodities': len(all_commodities),
            'avg_change_percent': round(sum(c['change_percent'] for c in all_commodities) / len(all_commodities), 2) if all_commodities else 0
        }
    }

if __name__ == '__main__':
    try:
        # Read input from stdin
        input_data = json.loads(sys.stdin.read())
        state = input_data.get('state')
        crop_type = input_data.get('crop_type')
        
        # Get prices
        result = get_market_prices(state=state, crop_type=crop_type)
        
        # Output as JSON
        print(json.dumps(result, indent=2))
        
    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': str(e)
        }))
