'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';
import { buildApi, serviceApi } from '../../lib/auth';
import { Part, Service } from '../../types';

const carModels = [
  'Nissan GT-R',
  'BMW M3',
  'Audi R8',
  'Mercedes AMG',
  'Porsche 911',
  'Lamborghini Huracan'
];

const colors = [
  { name: 'Midnight Black', value: '#000000' },
  { name: 'Pearl White', value: '#F8F8FF' },
  { name: 'Racing Red', value: '#DC143C' },
  { name: 'Electric Blue', value: '#0080FF' },
  { name: 'Emerald Green', value: '#50C878' },
  { name: 'Sunset Orange', value: '#FF8C00' },
  { name: 'Royal Purple', value: '#6A0DAD' },
  { name: 'Silver Metallic', value: '#C0C0C0' }
];

function CustomizeContent() {
  const [selectedCar, setSelectedCar] = useState(carModels[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const fetchServices = async () => {
      try {
        const servicesData = await serviceApi.getServices();
        setServices(servicesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again.');
      }
    };
    fetchServices();
  }, [user, router]);

  const togglePart = (service: Service) => {
    const part: Part = {
      partId: service._id,
      partName: service.name,
      price: service.price
    };

    setSelectedParts(prev => {
      const exists = prev.find(p => p.partId === part.partId);
      if (exists) {
        return prev.filter(p => p.partId !== part.partId);
      } else {
        return [...prev, part];
      }
    });
  };

  const totalPrice = selectedParts.reduce((sum, part) => sum + part.price, 0);

  const resetBuild = () => {
    setSelectedCar(carModels[0]);
    setSelectedColor(colors[0]);
    setSelectedParts([]);
  };

    const saveBuild = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const buildData = {
        carModel: selectedCar,
        color: selectedColor.name,
        selectedParts: selectedParts,
        totalPrice: totalPrice,
      };
      
      await buildApi.createBuild(buildData);
      router.push('/dashboard');
    } catch (err) {
      console.error('Error saving build:', err);
      setError('Failed to save build. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Car Customizer</h1>
            <p className="text-xl text-gray-400">Design your perfect ride</p>
            
            {error && (
              <div className="error-state animate-fade-in mt-6 max-w-md mx-auto">
                {error}
                <button 
                  onClick={() => window.location.reload()} 
                  className="ml-4 text-orange-500 hover:text-orange-400 underline"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8 min-h-[600px]">
            {/* Left Panel - Configuration */}
            <div className="lg:col-span-3 space-y-6">
              <div className="glass rounded-2xl p-6 animate-fade-in">
                <h3 className="text-xl font-semibold mb-4">Car Model</h3>
                <select
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
                >
                  {carModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              <div className="glass rounded-2xl p-6 animate-fade-in-delay-1">
                <h3 className="text-xl font-semibold mb-4">Color</h3>
                <div className="grid grid-cols-4 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 transition-all duration-300 ${
                        selectedColor.value === color.value
                          ? 'border-orange-500 ring-4 ring-orange-500/30 scale-110'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-400 font-medium">{selectedColor.name}</p>
              </div>

              <div className="glass rounded-2xl p-6 animate-fade-in-delay-2">
                <h3 className="text-xl font-semibold mb-4">
                  Parts & Upgrades ({selectedParts.length})
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
                  {services.map((service) => (
                    <div key={service._id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-orange-500/30 transition-all duration-300">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm sm:text-base">{service.name}</h4>
                        <p className="text-sm text-orange-400 font-semibold">${service.price}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedParts.some(p => p.partId === service._id)}
                        onChange={() => togglePart(service)}
                        className="w-5 h-5 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-6 sticky top-24 animate-fade-in-delay-2">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-semibold">Total Price</span>
                  <span className="text-2xl font-bold gradient-text">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={saveBuild}
                    disabled={loading}
                    className="btn-primary w-full py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="loading-spinner mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      'Save Build'
                    )}
                  </button>
                  <button
                    onClick={resetBuild}
                    className="w-full bg-gray-700/50 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 border border-gray-600"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Center Panel - Car Preview */}
            <div className="lg:col-span-6 flex items-center justify-center order-first lg:order-none">
              <div className="relative w-full max-w-2xl aspect-video glass rounded-2xl overflow-hidden animate-fade-in">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/florian-schneider-799KfBloSFQ-unsplash.jpg"
                    alt="Car preview"
                    fill
                    className="object-cover opacity-70"
                  />
                  <div 
                    className="absolute inset-0 mix-blend-overlay opacity-40 transition-all duration-500"
                    style={{ backgroundColor: selectedColor.value }}
                  />
                </div>
                <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-3 border border-white/10">
                  <p className="text-white font-semibold text-lg">{selectedCar}</p>
                  <p className="text-gray-300 text-sm">{selectedColor.name}</p>
                </div>
              </div>
            </div>

            {/* Right Panel - Selected Modifications */}
            <div className="lg:col-span-3">
              <div className="glass rounded-2xl p-6 h-full animate-fade-in-delay-1">
                <h3 className="text-xl font-semibold mb-4">Selected Modifications</h3>
                {selectedParts.length > 0 ? (
                  <div className="space-y-3">
                    {selectedParts.map((part) => (
                      <div key={part.partId} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                        <div>
                          <p className="font-medium text-sm">{part.partName}</p>
                          <p className="text-sm gradient-text font-semibold">${part.price}</p>
                        </div>
                        <button
                          onClick={() => setSelectedParts(prev => prev.filter(p => p.partId !== part.partId))}
                          className="text-red-400 hover:text-red-300 transition-colors p-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <div className="border-t border-gray-700/50 pt-4 mt-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total:</span>
                        <span className="gradient-text">${totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm leading-relaxed">No modifications selected yet. Choose parts from the configuration panel to customize your car.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomizePage() {
  return (
    <ProtectedRoute>
      <CustomizeContent />
    </ProtectedRoute>
  );
}