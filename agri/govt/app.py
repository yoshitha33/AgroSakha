from flask import Flask, jsonify, render_template
from bs4 import BeautifulSoup
import requests
from datetime import datetime
import time
import random

app = Flask(__name__)

# Cache for storing schemes to avoid repeated scraping
schemes_cache = {
    'last_updated': None,
    'schemes': []
}

def scrape_government_schemes():
    government_schemes = []
    
    try:
        # Central Government Schemes
        
        # PM Kisan Samman Nidhi
        government_schemes.append({
            'title': 'PM Kisan Samman Nidhi',
            'description': 'Income support scheme providing ₹6000 per year in three installments to landholding farmer families.',
            'eligibility': 'All landholding farmer families with cultivable land records',
            'benefits': '₹6000 per year in three installments of ₹2000 each',
            'link': 'https://pmkisan.gov.in/',
            'category': 'financial',
            'type': 'government',
            'logo': 'https://pmkisan.gov.in/assets/images/logo.png',
            'last_updated': '2024-12-01'
        })
        
        # PM Fasal Bima Yojana
        government_schemes.append({
            'title': 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
            'description': 'Comprehensive crop insurance scheme covering pre-sowing to post-harvest losses against natural calamities.',
            'eligibility': 'All farmers including sharecroppers and tenant farmers with insurable interest',
            'benefits': 'Actuarial premium rates, 2% for Kharif, 1.5% for Rabi crops, comprehensive risk coverage',
            'link': 'https://pmfby.gov.in/',
            'category': 'insurance',
            'type': 'government',
            'logo': 'https://pmfby.gov.in/wp-content/themes/pmfby/images/logo.png',
            'last_updated': '2024-12-01'
        })
        
        # Soil Health Card Scheme
        government_schemes.append({
            'title': 'Soil Health Card Scheme',
            'description': 'Provides farmers with soil health cards containing crop-wise recommendations of nutrients and fertilizers.',
            'eligibility': 'All farmers across India',
            'benefits': 'Free soil testing every 3 years, nutrient status report, fertilizer recommendations',
            'link': 'https://soilhealth.dac.gov.in/',
            'category': 'infrastructure',
            'type': 'government',
            'logo': 'https://soilhealth.dac.gov.in/resources/images/logo.png',
            'last_updated': '2024-11-15'
        })
        
        # PM Krishi Sinchai Yojana
        government_schemes.append({
            'title': 'Pradhan Mantri Krishi Sinchai Yojana (PMKSY)',
            'description': 'Focused on expanding cultivated area under assured irrigation, improving on-farm water use efficiency.',
            'eligibility': 'Individual farmers, Self Help Groups, cooperatives, FPOs',
            'benefits': 'Subsidy on micro irrigation systems, water harvesting structures',
            'link': 'https://pmksy.gov.in/',
            'category': 'infrastructure',
            'type': 'government',
            'logo': 'https://pmksy.gov.in/images/logo.png',
            'last_updated': '2024-11-20'
        })
        
        # Paramparagat Krishi Vikas Yojana
        government_schemes.append({
            'title': 'Paramparagat Krishi Vikas Yojana (PKVY)',
            'description': 'Promotes organic farming through cluster approach and organic certification.',
            'eligibility': 'Farmers willing to practice organic farming in clusters of 50 acres',
            'benefits': '₹50,000 per hectare over 3 years, organic certification support',
            'link': 'https://pgsindia-ncof.gov.in/',
            'category': 'training',
            'type': 'government',
            'logo': 'https://www.ncof.dacnet.nic.in/images/logo.png',
            'last_updated': '2024-11-10'
        })
        
        # National Mission for Sustainable Agriculture
        government_schemes.append({
            'title': 'National Mission for Sustainable Agriculture (NMSA)',
            'description': 'Promotes sustainable agriculture practices to enhance productivity and climate resilience.',
            'eligibility': 'All categories of farmers',
            'benefits': 'Support for climate-resilient practices, water conservation, nutrient management',
            'link': 'https://nmsa.dac.gov.in/',
            'category': 'infrastructure',
            'type': 'government',
            'logo': 'https://nmsa.dac.gov.in/images/logo.png',
            'last_updated': '2024-11-25'
        })
        
        # Rashtriya Krishi Vikas Yojana
        government_schemes.append({
            'title': 'Rashtriya Krishi Vikas Yojana (RKVY)',
            'description': 'Provides flexibility to states in planning and executing programs for holistic development of agriculture.',
            'eligibility': 'State governments and their implementing agencies',
            'benefits': 'Infrastructure development, technology promotion, integrated farming systems',
            'link': 'https://rkvy.nic.in/',
            'category': 'infrastructure',
            'type': 'government',
            'logo': 'https://rkvy.nic.in/images/logo.png',
            'last_updated': '2024-11-18'
        })
        
        # National Food Security Mission
        government_schemes.append({
            'title': 'National Food Security Mission (NFSM)',
            'description': 'Increases production and productivity of rice, wheat, pulses and nutri-cereals.',
            'eligibility': 'Farmers in selected districts',
            'benefits': 'Subsidized seeds, fertilizers, farm machinery, training programs',
            'link': 'https://nfsm.gov.in/',
            'category': 'financial',
            'type': 'government',
            'logo': 'https://nfsm.gov.in/images/logo.png',
            'last_updated': '2024-12-05'
        })
        
        # Kisan Credit Card
        government_schemes.append({
            'title': 'Kisan Credit Card (KCC)',
            'description': 'Provides farmers with timely access to credit for agriculture and allied activities.',
            'eligibility': 'All farmers including sharecroppers, tenant farmers, SHGs',
            'benefits': 'Interest subvention, flexible repayment, insurance coverage',
            'link': 'https://www.nabard.org/content1.aspx?id=573',
            'category': 'financial',
            'type': 'government',
            'logo': 'https://www.nabard.org/images/logo.png',
            'last_updated': '2024-12-03'
        })
        
        # Agricultural Marketing Infrastructure
        government_schemes.append({
            'title': 'Agricultural Marketing Infrastructure (AMI)',
            'description': 'Creates scientific storage capacity and modern marketing infrastructure.',
            'eligibility': 'Individual farmers, FPOs, cooperatives, private entrepreneurs',
            'benefits': 'Subsidy on construction of warehouses, cold storages, market yards',
            'link': 'https://agmarknet.gov.in/',
            'category': 'infrastructure',
            'type': 'government',
            'logo': 'https://agmarknet.gov.in/images/logo.png',
            'last_updated': '2024-11-28'
        })
        
        # Formation and Promotion of FPOs
        government_schemes.append({
            'title': 'Formation and Promotion of Farmer Producer Organizations (FPOs)',
            'description': 'Promotes collective farming through formation of FPOs for better market access.',
            'eligibility': 'Groups of farmers with minimum 300 members in plains, 100 in hills',
            'benefits': 'Grant of ₹18.5 lakhs over 5 years, technical support, market linkages',
            'link': 'https://sfac.in/',
            'category': 'support',
            'type': 'government',
            'logo': 'https://sfac.in/images/logo.png',
            'last_updated': '2024-11-22'
        })
        
        # National Livestock Mission
        government_schemes.append({
            'title': 'National Livestock Mission (NLM)',
            'description': 'Sustainable development of livestock sector focusing on entrepreneurship and employment.',
            'eligibility': 'Individual farmers, SHGs, cooperatives, private entrepreneurs',
            'benefits': 'Subsidy on livestock infrastructure, breeding programs, feed development',
            'link': 'https://nlm.udyamimitra.in/',
            'category': 'support',
            'type': 'government',
            'logo': 'https://nlm.udyamimitra.in/images/logo.png',
            'last_updated': '2024-11-30'
        })
        
        # Blue Revolution
        government_schemes.append({
            'title': 'Blue Revolution - Integrated Development of Fisheries',
            'description': 'Promotes fish production and productivity through sustainable aquaculture.',
            'eligibility': 'Fish farmers, SHGs, cooperatives, private entrepreneurs',
            'benefits': 'Infrastructure development, capacity building, market support',
            'link': 'https://dof.gov.in/',
            'category': 'support',
            'type': 'government',
            'logo': 'https://dof.gov.in/images/logo.png',
            'last_updated': '2024-11-25'
        })
        
        # National Mission on Oilseeds and Oil Palm
        government_schemes.append({
            'title': 'National Mission on Oilseeds and Oil Palm (NMOOP)',
            'description': 'Increases production and productivity of oilseeds and oil palm.',
            'eligibility': 'Farmers in selected districts',
            'benefits': 'Quality seeds, integrated pest management, processing infrastructure',
            'link': 'https://nmoop.gov.in/',
            'category': 'financial',
            'type': 'government',
            'logo': 'https://nmoop.gov.in/images/logo.png',
            'last_updated': '2024-12-01'
        })
        
        # Sub Mission on Agricultural Mechanization
        government_schemes.append({
            'title': 'Sub Mission on Agricultural Mechanization (SMAM)',
            'description': 'Promotes farm mechanization for increasing efficiency and reducing drudgery.',
            'eligibility': 'Individual farmers, custom hiring centers, FPOs',
            'benefits': 'Subsidy on farm machinery, custom hiring centers, training programs',
            'link': 'https://agrimachinery.nic.in/',
            'category': 'infrastructure',
            'type': 'government',
            'logo': 'https://agrimachinery.nic.in/images/logo.png',
            'last_updated': '2024-11-20'
        })
        
    except Exception as e:
        print(f"Error scraping government schemes: {e}")
    
    return government_schemes

def scrape_private_schemes():
    private_schemes = []
    
    try:
        # Private Sector Schemes
        
        # Tata Rallis
        private_schemes.append({
            'title': 'Tata Rallis Krishi Mitra Program',
            'description': 'Comprehensive crop protection solutions with technical advisory and market linkages.',
            'eligibility': 'Farmers in operational areas growing cotton, rice, sugarcane, fruits & vegetables',
            'benefits': 'Quality inputs, technical guidance, buyback arrangements, credit facilities',
            'link': 'https://www.tatarallis.com/',
            'category': 'support',
            'type': 'private',
            'logo': 'https://www.tatarallis.com/images/logo.png',
            'last_updated': '2024-11-15'
        })
        
        # Mahindra Agri Solutions
        private_schemes.append({
            'title': 'Mahindra Agri Solutions - Samriddhi',
            'description': 'End-to-end farming solutions including inputs, advisory, financing and market access.',
            'eligibility': 'Farmers in Maharashtra, Karnataka, Andhra Pradesh, Gujarat',
            'benefits': 'Integrated farming solutions, credit facilities, technology adoption',
            'link': 'https://www.mahindraagri.com/',
            'category': 'support',
            'type': 'private',
            'logo': 'https://www.mahindraagri.com/images/logo.png',
            'last_updated': '2024-11-20'
        })
        
        # ITC e-Choupal
        private_schemes.append({
            'title': 'ITC e-Choupal',
            'description': 'Digital platform connecting farmers directly with markets, eliminating intermediaries.',
            'eligibility': 'Farmers in soybean, wheat, coffee, cotton growing regions',
            'benefits': 'Fair pricing, quality inputs, weather information, best practices',
            'link': 'https://www.itc.in/businesses/agri-business/e-choupal/',
            'category': 'support',
            'type': 'private',
            'logo': 'https://www.itc.in/images/logo.png',
            'last_updated': '2024-11-18'
        })
        
        # Reliance Fresh Direct from Farm
        private_schemes.append({
            'title': 'Reliance Fresh - Direct from Farm',
            'description': 'Direct procurement program connecting farmers with retail chain for fresh produce.',
            'eligibility': 'Fruit and vegetable farmers near Reliance Fresh centers',
            'benefits': 'Assured procurement, better prices, quality standards training',
            'link': 'https://www.relianceretail.com/',
            'category': 'support',
            'type': 'private',
            'logo': 'https://www.relianceretail.com/images/logo.png',
            'last_updated': '2024-11-25'
        })
        
        # Godrej Agrovet
        private_schemes.append({
            'title': 'Godrej Agrovet - Farmer Connect',
            'description': 'Provides quality animal feed, crop protection and extension services.',
            'eligibility': 'Dairy farmers and crop growers in operational areas',
            'benefits': 'Quality feed, veterinary services, technical support, market linkages',
            'link': 'https://www.godrejagrovet.com/',
            'category': 'support',
            'type': 'private',
            'logo': 'https://www.godrejagrovet.com/images/logo.png',
            'last_updated': '2024-11-22'
        })
        
        # HDFC Bank Kisan Dhan Vikas
        private_schemes.append({
            'title': 'HDFC Bank Kisan Dhan Vikas',
            'description': 'Comprehensive banking solutions for farmers including credit, insurance and advisory.',
            'eligibility': 'Farmers with valid land records and credit history',
            'benefits': 'Competitive interest rates, flexible repayment, crop insurance',
            'link': 'https://www.hdfcbank.com/personal/borrow/popular-loans/kisan-credit-card',
            'category': 'financial',
            'type': 'private',
            'logo': 'https://www.hdfcbank.com/images/logo.png',
            'last_updated': '2024-12-01'
        })
        
        # ICICI Bank Agri Business
        private_schemes.append({
            'title': 'ICICI Bank Agri Business Solutions',
            'description': 'Banking solutions for entire agri value chain from input to output.',
            'eligibility': 'Farmers, FPOs, agri businesses, food processors',
            'benefits': 'Customized credit solutions, supply chain financing, digital banking',
            'link': 'https://www.icicibank.com/personal-banking/loans/rural-and-agri-loans',
            'category': 'financial',
            'type': 'private',
            'logo': 'https://www.icicibank.com/images/logo.png',
            'last_updated': '2024-11-28'
        })
        
        # Axis Bank Kisan Package
        private_schemes.append({
            'title': 'Axis Bank Kisan Package',
            'description': 'Holistic financial package for farmers covering credit, insurance and investment needs.',
            'eligibility': 'Individual farmers and farmer groups',
            'benefits': 'Subsidized loans, weather insurance, savings products, mobile banking',
            'link': 'https://www.axisbank.com/retail/loans/rural-loans',
            'category': 'financial',
            'type': 'private',
            'logo': 'https://www.axisbank.com/images/logo.png',
            'last_updated': '2024-11-30'
        })
        
        # UPL Advanta Seeds
        private_schemes.append({
            'title': 'UPL Advanta - Farmer Support Program',
            'description': 'Provides quality seeds with complete crop management solutions.',
            'eligibility': 'Farmers growing corn, rice, sunflower, sorghum',
            'benefits': 'High-yielding seeds, technical support, crop protection advisory',
            'link': 'https://www.upl-ltd.com/',
            'category': 'support',
            'type': 'private',
            'logo': 'https://www.upl-ltd.com/images/logo.png',
            'last_updated': '2024-11-15'
        })
        
        # Bayer Crop Science Better Life Farming
        private_schemes.append({
            'title': 'Bayer Better Life Farming',
            'description': 'Sustainable agriculture program with focus on smallholder farmer empowerment.',
            'eligibility': 'Smallholder farmers growing fruits, vegetables, cereals',
            'benefits': 'Quality seeds, crop protection, digital tools, market access',
            'link': 'https://www.bayer.com/en/agriculture/better-life-farming',
            'category': 'support',
            'type': 'private',
            'logo': 'https://www.bayer.com/images/logo.png',
            'last_updated': '2024-11-20'
        })
        
        # Syngenta The Good Growth Plan
        private_schemes.append({
            'title': 'Syngenta The Good Growth Plan',
            'description': 'Sustainable agriculture initiative focused on increasing crop productivity.',
            'eligibility': 'Farmers adopting sustainable farming practices',
            'benefits': 'Modern farming techniques, biodiversity enhancement, rural prosperity',
            'link': 'https://www.syngenta.com/en/company/the-good-growth-plan',
            'category': 'training',
            'type': 'private',
            'logo': 'https://www.syngenta.com/images/logo.png',
            'last_updated': '2024-11-18'
        })
        
        # BASF Samruddhi
        private_schemes.append({
            'title': 'BASF Samruddhi Program',
            'description': 'Farmer development program providing training and technical support.',
            'eligibility': 'Farmers in rice, cotton, sugarcane growing regions',
            'benefits': 'Training programs, demonstration plots, technical advisory',
            'link': 'https://www.basf.com/in/en/who-we-are/organization/locations/asia-pacific/india.html',
            'category': 'training',
            'type': 'private',
            'logo': 'https://www.basf.com/images/logo.png',
            'last_updated': '2024-11-25'
        })
        
        # Jain Irrigation Farmer Support
        private_schemes.append({
            'title': 'Jain Irrigation - Micro Irrigation Solutions',
            'description': 'Provides drip and sprinkler irrigation systems with financing options.',
            'eligibility': 'Farmers looking to adopt micro irrigation',
            'benefits': 'Subsidized irrigation systems, technical support, maintenance services',
            'link': 'https://www.jains.com/',
            'category': 'infrastructure',
            'type': 'private',
            'logo': 'https://www.jains.com/images/logo.png',
            'last_updated': '2024-11-22'
        })
        
        # BigHaat Agri Solutions
        private_schemes.append({
            'title': 'BigHaat Agri Input Solutions',
            'description': 'Online platform providing quality agricultural inputs with doorstep delivery.',
            'eligibility': 'Farmers across India',
            'benefits': 'Quality inputs, competitive prices, expert advisory, doorstep delivery',
            'link': 'https://www.bighaat.com/',
            'category': 'support',
            'type': 'private',
            'logo': 'https://www.bighaat.com/images/logo.png',
            'last_updated': '2024-12-01'
        })
        
        # DeHaat Farmer Services
        private_schemes.append({
            'title': 'DeHaat Full Stack Agri Services',
            'description': 'Provides end-to-end agricultural services through technology platform.',
            'eligibility': 'Farmers in Bihar, Uttar Pradesh, Jharkhand, West Bengal',
            'benefits': 'Quality inputs, advisory services, market linkages, credit access',
            'link': 'https://dehaat.co.in/',
            'category': 'support',
            'type': 'private',
            'logo': 'https://dehaat.co.in/images/logo.png',
            'last_updated': '2024-11-28'
        })
        
    except Exception as e:
        print(f"Error scraping private schemes: {e}")
    
    return private_schemes

def get_all_schemes(force_refresh=False):
    # Return cached data if recent (within 1 hour) and not forced
    if not force_refresh and schemes_cache['last_updated'] and \
       (datetime.now() - schemes_cache['last_updated']).seconds < 3600:
        return schemes_cache['schemes']
    
    # Scrape fresh data
    government = scrape_government_schemes()
    private = scrape_private_schemes()
    all_schemes = government + private
    
    # Add timestamp to each scheme
    for scheme in all_schemes:
        if 'last_updated' not in scheme:
            scheme['last_updated'] = datetime.now().strftime('%Y-%m-%d')
    
    # Update cache
    schemes_cache['schemes'] = all_schemes
    schemes_cache['last_updated'] = datetime.now()
    
    return all_schemes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/schemes')
def get_schemes():
    schemes = get_all_schemes()
    return jsonify(schemes)

@app.route('/api/refresh')
def refresh_schemes():
    schemes = get_all_schemes(force_refresh=True)
    return jsonify({
        'status': 'success',
        'message': 'Schemes refreshed successfully',
        'count': len(schemes),
        'government_count': len([s for s in schemes if s['type'] == 'government']),
        'private_count': len([s for s in schemes if s['type'] == 'private']),
        'last_updated': schemes_cache['last_updated'].strftime('%Y-%m-%d %H:%M:%S')
    })

@app.route('/api/schemes/government')
def get_government_schemes():
    schemes = get_all_schemes()
    government_schemes = [s for s in schemes if s['type'] == 'government']
    return jsonify(government_schemes)

@app.route('/api/schemes/private')
def get_private_schemes():
    schemes = get_all_schemes()
    private_schemes = [s for s in schemes if s['type'] == 'private']
    return jsonify(private_schemes)

@app.route('/api/schemes/category/<category>')
def get_schemes_by_category(category):
    schemes = get_all_schemes()
    filtered_schemes = [s for s in schemes if s['category'] == category]
    return jsonify(filtered_schemes)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)