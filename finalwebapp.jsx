import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Heart, Calculator, MapPin, Calendar, User, Star, Fuel, Zap, Car, Phone, Eye, X, ArrowLeft, ArrowRight } from 'lucide-react';

const TwoWheelerMarketplace = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [fuelType, setFuelType] = useState('all');
  const [compareList, setCompareList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [upcomingLaunches, setUpcomingLaunches] = useState([]);
  const [showrooms, setShowrooms] = useState([]);
  const [sortBy, setSortBy] = useState('price-asc');

  const [emiAmount, setEmiAmount] = useState(150000);
  const [emiTenure, setEmiTenure] = useState(24);
  const [emiRate, setEmiRate] = useState(10);
  const [fuelPrice, setFuelPrice] = useState(95);
  const [monthlyKm, setMonthlyKm] = useState(1000);
  const [selectedMileage, setSelectedMileage] = useState(35);
  const [affordBudget, setAffordBudget] = useState(200000);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef(null);

  const fallbackVehicles = [
    { id: 1, name: 'Royal Enfield Classic 350', brand: 'Royal Enfield', price: 198000, category: 'bike', fuelType: 'petrol', mileage: 35, engine: '349cc', power: '20.2 bhp', images: ['https://images.unsplash.com/photo-1622188206122-7283c1ca863d?w=1200&h=800&fit=crop'], rating: 4.5, reviews: 1250, specs: { Displacement: '349cc', 'Max Power': '20.2 bhp @ 6100 rpm', 'Max Torque': '27 Nm @ 4000 rpm', 'Fuel Tank': '13L', Weight: '195kg', 'Top Speed': '110 kmph' } },
    { id: 2, name: 'Honda Activa 125', brand: 'Honda', price: 75000, category: 'scooter', fuelType: 'petrol', mileage: 60, engine: '124cc', power: '8.29 bhp', images: ['https://imgd.aeplcdn.com/1280x720/n/cw/ec/138407/activa-125-right-front-three-quarter.jpeg?isig=0&q=80'], rating: 4.3, reviews: 2100, specs: { Displacement: '124cc', 'Max Power': '8.29 bhp @ 6500 rpm', 'Max Torque': '10.3 Nm @ 5000 rpm', 'Fuel Tank': '5.3L', Weight: '110kg', 'Top Speed': '85 kmph' } },
    { id: 3, name: 'Ather 450X', brand: 'Ather', price: 149000, category: 'ev', fuelType: 'electric', mileage: 105, engine: 'Electric', power: '6.2 kW', images: ['https://www.financialexpress.com/wp-content/uploads/2023/08/2023-Ather-450X-review-img-1-1.jpg?w=1024'], rating: 4.6, reviews: 850, specs: { Motor: '6.2 kW PMSM', Battery: '3.7 kWh Li-ion', Range: '105 km', 'Charging Time': '5.4 hours', Weight: '108kg', 'Top Speed': '90 kmph' } },
    { id: 4, name: 'TVS Apache RTR 160', brand: 'TVS', price: 112000, category: 'bike', fuelType: 'petrol', mileage: 45, engine: '159.7cc', power: '15.53 bhp', images: ['https://images.unsplash.com/photo-1622188206122-7283c1ca863d?w=1200&h=800&fit=crop'], rating: 4.2, reviews: 920, specs: { Displacement: '159.7cc', 'Max Power': '15.53 bhp @ 8500 rpm', 'Max Torque': '13.85 Nm @ 6500 rpm', 'Fuel Tank': '12L', Weight: '149kg', 'Top Speed': '114 kmph' } },
    { id: 5, name: 'Bajaj Chetak Electric', brand: 'Bajaj', price: 125000, category: 'ev', fuelType: 'electric', mileage: 95, engine: 'Electric', power: '4.08 kW', images: ['https://imgd.aeplcdn.com/1280x720/n/cw/ec/50530/chetak-right-front-three-quarter.jpeg?isig=0&q=80'], rating: 4.1, reviews: 650, specs: { Motor: '4.08 kW BLDC', Battery: '3 kWh Li-ion', Range: '95 km', 'Charging Time': '5 hours', Weight: '118kg', 'Top Speed': '70 kmph' } },
    { id: 6, name: 'Yamaha FZ-S V3', brand: 'Yamaha', price: 105000, category: 'bike', fuelType: 'petrol', mileage: 50, engine: '149cc', power: '12.4 bhp', images: ['https://images.unsplash.com/photo-1622188206122-7283c1ca863d?w=1200&h=800&fit=crop'], rating: 4.4, reviews: 780, specs: { Displacement: '149cc', 'Max Power': '12.4 bhp @ 7250 rpm', 'Max Torque': '13.3 Nm @ 5500 rpm', 'Fuel Tank': '13L', Weight: '135kg', 'Top Speed': '110 kmph' } }
  ];

  const fallbackUpcoming = [
    { id: 1, name: 'Honda CB350RS', brand: 'Honda', expectedPrice: 210000, launchDate: '2025-11-15', category: 'bike', images: ['https://images.unsplash.com/photo-1622188206122-7283c1ca863d?w=1200&h=800&fit=crop'] },
    { id: 2, name: 'TVS iQube S', brand: 'TVS', expectedPrice: 135000, launchDate: '2025-12-01', category: 'ev', images: ['https://imgd.aeplcdn.com/1280x720/n/cw/ec/124013/iqube-electric-right-front-three-quarter.jpeg?isig=0&q=80'] }
  ];

  const fallbackShowrooms = [
    { id: 1, name: 'Premium Motors Guwahati', address: '123 GS Road, Guwahati, Assam', phone: '+91 9876543210', brands: ['Royal Enfield', 'Honda', 'TVS'], rating: 4.5, coords: { lat: 26.149, lng: 91.736 } },
    { id: 2, name: 'City Wheels', address: '456 Fancy Bazar, Guwahati, Assam', phone: '+91 8765432109', brands: ['Yamaha', 'Bajaj', 'Ather'], rating: 4.3, coords: { lat: 26.166, lng: 91.778 } }
  ];

  useEffect(() => {
    let mounted = true;

    const safeFetch = async (url) => {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const json = await res.json();
        return Array.isArray(json) ? json : null;
      } catch (e) {
        return null;
      }
    };

    const load = async () => {
      const [vJson, uJson, sJson] = await Promise.all([
        safeFetch('/api/vehicles'),
        safeFetch('/api/upcoming'),
        safeFetch('/api/showrooms')
      ]);
      if (!mounted) return;
      setVehicles(vJson && vJson.length ? vJson : fallbackVehicles);
      setUpcomingLaunches(uJson && uJson.length ? uJson : fallbackUpcoming);
      setShowrooms(sJson && sJson.length ? sJson : fallbackShowrooms);
    };

    load();
    return () => { mounted = false; };
  }, []);

  const sortedAndFilteredVehicles = vehicles
    .filter(vehicle => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch = !q || (vehicle.name || '').toLowerCase().includes(q) || (vehicle.brand || '').toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'all' || vehicle.category === selectedCategory;
      const price = Number(vehicle.price) || 0;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesBrand = selectedBrand === 'all' || vehicle.brand === selectedBrand;
      const matchesFuel = fuelType === 'all' || vehicle.fuelType === fuelType;
      return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesFuel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return (Number(a.price) || 0) - (Number(b.price) || 0);
        case 'price-desc': return (Number(b.price) || 0) - (Number(a.price) || 0);
        case 'rating': return (Number(b.rating) || 0) - (Number(a.rating) || 0);
        case 'mileage': return (Number(b.mileage) || 0) - (Number(a.mileage) || 0);
        default: return 0;
      }
    });

  const calculateEMI = (principal, rate, tenure) => {
    const P = Number(principal) || 0;
    const annual = Number(rate) || 0;
    const n = Number(tenure) || 0;
    if (P <= 0 || n <= 0) return 0;
    const monthlyRate = annual / 100 / 12;
    if (monthlyRate === 0) return P / n;
    const x = Math.pow(1 + monthlyRate, n);
    return (P * monthlyRate * x) / (x - 1);
  };

  const calculateMonthlyFuelCost = (mileage, kmPerMonth, fuelPricePerLiter) => {
    const m = Number(mileage) || 0;
    const km = Number(kmPerMonth) || 0;
    const fp = Number(fuelPricePerLiter) || 0;
    if (m <= 0) return 0;
    return (km / m) * fp;
  };

  const toggleWishlist = (vehicleId) => {
    setWishlist(prev => {
      const exists = prev.includes(vehicleId);
      const next = exists ? prev.filter(id => id !== vehicleId) : [...prev, vehicleId];
      return next;
    });
  };

  const toggleCompare = (vehicle) => {
    setCompareList(prev => {
      const exists = prev.find(v => v.id === vehicle.id);
      if (exists) return prev.filter(v => v.id !== vehicle.id);
      if (prev.length >= 3) return prev;
      return [...prev, vehicle];
    });
  };

  useEffect(() => { setCarouselIndex(0); }, [selectedVehicle]);

  const nextImage = () => setCarouselIndex(i => {
    const len = (selectedVehicle?.images?.length) || 1;
    return (i + 1) % len;
  });

  const prevImage = () => setCarouselIndex(i => {
    const len = (selectedVehicle?.images?.length) || 1;
    return (i - 1 + len) % len;
  });

  const VehicleCard = ({ vehicle }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative">
        <img src={(vehicle.images && vehicle.images[0]) || vehicle.image || ''} alt={vehicle.name || 'vehicle'} className="w-full h-48 object-cover" />
        <button onClick={() => toggleWishlist(vehicle.id)} className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${wishlist.includes(vehicle.id) ? 'bg-red-500 text-white' : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gray-100'}`} aria-label="Toggle wishlist">
          <Heart className="w-5 h-5" />
        </button>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${vehicle.fuelType === 'electric' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {vehicle.fuelType === 'electric' ? <Zap className="w-3 h-3 inline mr-1" /> : <Fuel className="w-3 h-3 inline mr-1" />}
            {(vehicle.fuelType || '').charAt(0).toUpperCase() + (vehicle.fuelType || '').slice(1)}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg text-gray-800">{vehicle.name}</h3>
          <div className="flex items-center flex-shrink-0 ml-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600 font-medium">{vehicle.rating}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-2">{vehicle.brand}</p>
        <p className="text-2xl font-bold text-blue-600 mb-3">₹{(Number(vehicle.price) || 0).toLocaleString('en-IN')}</p>

        <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600 mb-4 border-t border-b py-2">
          <span className="font-medium">{vehicle.fuelType === 'electric' ? `${vehicle.mileage} km` : `${vehicle.mileage} kmpl`}<p className="font-normal text-gray-500">{vehicle.fuelType === 'electric' ? 'Range' : 'Mileage'}</p></span>
          <span className="font-medium">{vehicle.engine}<p className="font-normal text-gray-500">Engine</p></span>
          <span className="font-medium">{vehicle.power}<p className="font-normal text-gray-500">Power</p></span>
        </div>

        <div className="mt-auto flex space-x-2">
          <button onClick={() => { setSelectedVehicle(vehicle); setActiveTab('browse'); }} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-semibold" aria-label={`View details of ${vehicle.name}`}>
            <Eye className="w-4 h-4 mr-2" /> View Details
          </button>
          <button onClick={() => toggleCompare(vehicle)} title="Add to Compare" className={`p-2 border rounded-lg transition-colors ${compareList.find(v => v.id === vehicle.id) ? 'bg-green-100 border-green-300 text-green-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`} aria-label="Toggle compare">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );

  const FilterPanel = () => (
    <div className={`bg-white p-6 rounded-lg shadow-lg ${showFilters ? 'block' : 'hidden lg:block'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Filters</h3>
        <button onClick={() => setShowFilters(false)} className="lg:hidden text-gray-500 hover:text-gray-800"><X className="w-5 h-5" /></button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Categories</option>
            <option value="bike">Bikes</option>
            <option value="scooter">Scooters</option>
            <option value="ev">Electric Vehicles</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Brand</label>
          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="w-full border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Brands</option>
            {[...new Set(vehicles.map(v => v.brand))].sort().map(brand => (<option key={brand} value={brand}>{brand}</option>))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Fuel Type</label>
          <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Types</option>
            <option value="petrol">Petrol</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Price Range: <span className="font-bold text-blue-600">₹{priceRange[1].toLocaleString('en-IN')}</span></label>
          <input type="range" min="0" max="500000" step="10000" value={priceRange[1]} onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Car className="w-8 h-8 text-blue-600" />
              <div className="ml-2 text-2xl font-bold text-blue-600">WheelsHub</div>
            </div>

            <div className="hidden md:flex space-x-2">
              {['browse', 'compare', 'calculators', 'upcoming', 'showrooms'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} {tab === 'compare' && `(${compareList.length})`}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 relative" aria-label="Wishlist">
                <Heart className="w-6 h-6" />
                {wishlist.length > 0 && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>}
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600" aria-label="Profile">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {activeTab === 'browse' && (
          <>
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="text" placeholder="Search by name or brand (e.g., Classic 350, Honda)" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                </div>
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center font-semibold">
                  <Filter className="w-5 h-5 mr-2" /> Filters
                </button>
              </div>
            </div>

            <div className="lg:flex lg:gap-8">
              <div className="w-full lg:w-80 lg:flex-shrink-0 mb-8 lg:mb-0"><FilterPanel /></div>

              <div className="flex-1">
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <h2 className="text-2xl font-bold text-gray-800">{sortedAndFilteredVehicles.length} Vehicles Found</h2>
                  <div className="flex items-center gap-3">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="price-asc">Sort by Price: Low to High</option>
                      <option value="price-desc">Sort by Price: High to Low</option>
                      <option value="rating">Sort by Rating</option>
                      <option value="mileage">Sort by Mileage</option>
                    </select>
                    <button className="px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50" onClick={() => { setSearchTerm(''); setSelectedBrand('all'); setSelectedCategory('all'); setFuelType('all'); setPriceRange([0,500000]); }} title="Reset filters">Reset</button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedAndFilteredVehicles.map(vehicle => (<VehicleCard key={vehicle.id} vehicle={vehicle} />))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'compare' && (
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-3xl font-bold">Compare Vehicles</h2>
                <p className="text-gray-600 mt-1">Compare up to 3 vehicles side-by-side.</p>
              </div>

              {compareList.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto text-gray-300 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <p className="text-gray-500 font-semibold text-lg">Your comparison list is empty.</p>
                  <p className="text-sm text-gray-400 mt-1">Click the checkmark on vehicle cards to add them here.</p>
                </div>
              ) : (
                <div className="p-6 overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr>
                        <th className="text-left py-3 font-semibold text-gray-600">Feature</th>
                        {compareList.map(vehicle => (
                          <th key={vehicle.id} className="text-center py-3 min-w-[200px]"><div className="flex flex-col items-center"><img src={vehicle.images?.[0] || vehicle.image} alt={vehicle.name} className="w-32 h-20 object-cover rounded mb-2" /><h4 className="font-semibold text-gray-800">{vehicle.name}</h4><p className="text-sm text-gray-500">{vehicle.brand}</p><button onClick={() => toggleCompare(vehicle)} className="text-red-500 hover:text-red-700 mt-1 text-xs font-semibold flex items-center"><X className="w-3 h-3 mr-1" /> Remove</button></div></th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {['Price', 'Engine/Motor', 'Power', 'Mileage/Range', 'Rating'].map(feature => (
                        <tr key={feature}>
                          <td className="py-4 font-medium text-gray-700">{feature}</td>
                          {compareList.map(vehicle => (
                            <td key={vehicle.id} className="py-4 text-center font-semibold">
                              {feature === 'Price' && <span className="text-blue-600">₹{(Number(vehicle.price) || 0).toLocaleString('en-IN')}</span>}
                              {feature === 'Engine/Motor' && vehicle.engine}
                              {feature === 'Power' && vehicle.power}
                              {feature === 'Mileage/Range' && `${vehicle.mileage} ${vehicle.fuelType === 'electric' ? 'km' : 'kmpl'}`}
                              {feature === 'Rating' && (<div className="flex items-center justify-center"><Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />{vehicle.rating}</div>)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'calculators' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center"><Calculator className="w-6 h-6 mr-2 text-blue-600" /> EMI Calculator</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Vehicle Price (₹)</label>
                  <input type="number" value={emiAmount} onChange={(e) => setEmiAmount(Number(e.target.value))} placeholder="e.g., 150000" className="w-full border-gray-300 rounded-lg p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Loan Tenure (months)</label>
                  <select value={emiTenure} onChange={(e) => setEmiTenure(Number(e.target.value))} className="w-full border-gray-300 rounded-lg p-3">
                    <option value={12}>12 months</option>
                    <option value={24}>24 months</option>
                    <option value={36}>36 months</option>
                    <option value={48}>48 months</option>
                    <option value={60}>60 months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Interest Rate (annual %)</label>
                  <input type="number" value={emiRate} onChange={(e) => setEmiRate(Number(e.target.value))} className="w-full border-gray-300 rounded-lg p-3" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Your Estimated EMI</h3>
                <div className="flex justify-between items-center text-3xl">
                  <span className="font-bold text-gray-800">Monthly EMI:</span>
                  <span className="font-bold text-blue-600">₹{Math.round(calculateEMI(emiAmount, emiRate, emiTenure)).toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Calculated with the interest rate you provided.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center"><Fuel className="w-6 h-6 mr-2 text-green-600" /> Fuel Cost & Affordability</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Vehicle (for mileage)</label>
                  <select onChange={(e) => setSelectedMileage(Number(e.target.value))} value={selectedMileage} className="w-full border-gray-300 rounded-lg p-3">
                    {vehicles.filter(v => v.fuelType === 'petrol').map(vehicle => (<option key={vehicle.id} value={vehicle.mileage}>{vehicle.name} - {vehicle.mileage} kmpl</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Distance (km)</label>
                  <input type="number" value={monthlyKm} onChange={(e) => setMonthlyKm(Number(e.target.value))} className="w-full border-gray-300 rounded-lg p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Petrol Price (₹/liter)</label>
                  <input type="number" value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value))} className="w-full border-gray-300 rounded-lg p-3" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Budget (₹)</label>
                  <input type="number" value={affordBudget} onChange={(e) => setAffordBudget(Number(e.target.value))} className="w-full border-gray-300 rounded-lg p-3" />
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Estimates</h3>
                <div className="flex justify-between items-center text-2xl">
                  <span className="font-semibold text-gray-800">Monthly Fuel Cost:</span>
                  <span className="font-bold text-green-600">₹{Math.round(calculateMonthlyFuelCost(selectedMileage, monthlyKm, fuelPrice)).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-lg mt-3">
                  <span className="font-semibold text-gray-800">Max EMI for Budget (est.):</span>
                  <span className="font-semibold text-gray-800">₹{Math.round(calculateEMI(affordBudget, emiRate, 36)).toLocaleString('en-IN')} /mo (36m)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Upcoming Launches</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingLaunches.map(launch => (
                <UpcomingCard key={launch.id} launch={launch} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'showrooms' && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Find a Showroom</h2>
            <div className="space-y-6">
              {showrooms.map(showroom => (
                <div key={showroom.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{showroom.name}</h3>
                    <div className="flex items-center mt-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /><span className="ml-1 text-sm font-medium text-gray-600">{showroom.rating} / 5.0</span></div>
                    <div className="flex items-center mt-3 text-gray-600"><MapPin className="w-4 h-4 mr-2" /><span>{showroom.address}</span></div>
                    <div className="flex items-center mt-2 text-gray-600"><Phone className="w-4 h-4 mr-2" /><a href={`tel:${showroom.phone}`} className="underline">{showroom.phone}</a></div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex flex-col items-end">
                    <h4 className="font-semibold text-gray-700 mb-2">Available Brands:</h4>
                    <div className="flex flex-wrap gap-2 mb-3">{showroom.brands.map(brand => (<span key={brand} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">{brand}</span>))}</div>
                    <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.address)}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Open in Maps</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 relative">
              <button onClick={() => setSelectedVehicle(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" aria-label="Close modal"><X className="w-6 h-6" /></button>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="relative">
                    <img src={(selectedVehicle.images && selectedVehicle.images[carouselIndex]) || selectedVehicle.images?.[0] || ''} alt={selectedVehicle.name} className="w-full h-80 object-cover rounded-lg" />
                    {selectedVehicle.images && selectedVehicle.images.length > 1 && (
                      <>
                        <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"><ArrowLeft className="w-5 h-5" /></button>
                        <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"><ArrowRight className="w-5 h-5" /></button>
                      </>
                    )}
                  </div>
                  <div className="mt-4 flex gap-2 overflow-x-auto">
                    {(selectedVehicle.images || []).map((img, idx) => (
                      <img key={idx} src={img} alt={`thumb-${idx}`} className={`w-20 h-14 object-cover rounded cursor-pointer ${idx === carouselIndex ? 'ring-2 ring-blue-600' : 'opacity-80'}`} onClick={() => setCarouselIndex(idx)} />
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{selectedVehicle.name}</h2>
                  <p className="text-lg text-gray-500 mb-4">{selectedVehicle.brand}</p>
                  <p className="text-4xl font-bold text-blue-600 mb-6">₹{(Number(selectedVehicle.price) || 0).toLocaleString('en-IN')}</p>

                  <h3 className="text-xl font-bold mb-3 text-gray-700">Key Specifications</h3>
                  <table className="w-full text-left mb-6">
                    <tbody className="divide-y">
                      {Object.entries(selectedVehicle.specs || {}).map(([key, value]) => (
                        <tr key={key}><td className="py-2 font-medium text-gray-600">{key}</td><td className="py-2 font-semibold text-gray-800">{value}</td></tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex gap-3">
                    <a href={`tel:+91`} className="px-4 py-3 bg-green-600 text-white rounded-lg font-semibold">Contact Dealer</a>
                    <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify({ vehicleId: selectedVehicle.id, name: selectedVehicle.name })); alert('Copied quick enquiry to clipboard'); }} className="px-4 py-3 border rounded-lg">Quick Enquiry</button>
                    <button onClick={() => { const exists = wishlist.includes(selectedVehicle.id); setWishlist(prev => exists ? prev.filter(id => id !== selectedVehicle.id) : [...prev, selectedVehicle.id]); }} className="px-4 py-3 border rounded-lg">{wishlist.includes(selectedVehicle.id) ? 'Remove Wishlist' : 'Add to Wishlist'}</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} WheelsHub. All rights reserved.</p>
          <p className="text-sm">Your trusted partner for two-wheelers in India.</p>
        </div>
      </footer>
    </div>
  );
};

const UpcomingCard = ({ launch }) => {
  const [remaining, setRemaining] = useState(getTimeRemainingLocal(launch.launchDate));

  useEffect(() => {
    const t = setInterval(() => setRemaining(getTimeRemainingLocal(launch.launchDate)), 1000);
    return () => clearInterval(t);
  }, [launch.launchDate]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
      <img src={(launch.images && launch.images[0]) || ''} alt={launch.name} className="w-1/3 h-full object-cover" />
      <div className="p-6 flex-1">
        <h3 className="text-xl font-bold text-gray-800">{launch.name}</h3>
        <p className="text-gray-500 mb-3">{launch.brand}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center"><span className="font-semibold w-28">Expected Price:</span><span className="text-blue-600 font-bold">₹{(Number(launch.expectedPrice) || 0).toLocaleString('en-IN')}</span></div>
          <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-500" /><span className="font-semibold w-24">Launch Date:</span><span className="text-gray-700">{new Date(launch.launchDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
          {remaining && remaining.total > 0 ? (
            <div className="mt-3 text-sm text-gray-700">Launching in <span className="font-semibold">{remaining.days}d {remaining.hours}h {remaining.minutes}m {remaining.seconds}s</span></div>
          ) : (
            <div className="mt-3 text-sm text-gray-700">Launch date passed or invalid</div>
          )}
        </div>
      </div>
    </div>
  );
};

function getTimeRemainingLocal(isoDate) {
  const total = Date.parse(isoDate) - Date.now();
  if (isNaN(total)) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

export default TwoWheelerMarketplace;
