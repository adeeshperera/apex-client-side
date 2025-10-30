'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Car, Wrench, DollarSign, Calendar, Eye, Trash2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';
import { buildApi } from '../../lib/auth';
import { Build } from '../../types';

function DashboardContent() {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const fetchBuilds = async () => {
      try {
        const buildsData = await buildApi.getUserBuilds(user._id);
        setBuilds(buildsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching builds:', err);
        setError('Failed to load builds. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, [user, router]);

  const deleteBuild = async (buildId: string) => {
    if (window.confirm('Are you sure you want to delete this build?')) {
      try {
        await buildApi.deleteBuild(buildId);
        setBuilds(prev => prev.filter(build => build._id !== buildId));
      } catch (err) {
        console.error('Error deleting build:', err);
        setError('Failed to delete build. Please try again.');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate statistics
  const totalBuilds = builds.length;
  const totalInvestment = builds.reduce((sum, build) => sum + build.totalPrice, 0);
  const totalModifications = builds.reduce((sum, build) => sum + (build.selectedParts?.length || 0), 0);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                  Welcome back, <span className="gradient-text">{user.name}</span>
                </h1>
                <p className="text-gray-400 text-lg">Manage your car builds and track your modifications</p>
              </div>
              <Link
                href="/customize"
                className="btn-primary px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 btn-hover-scale shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Create New Build
              </Link>
            </div>

            {error && (
              <div className="error-state animate-fade-in mb-6">
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

          {/* Statistics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="glass rounded-2xl p-6 card-hover animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-orange-500/10 rounded-xl mr-4">
                  <Car className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold">Total Builds</h3>
              </div>
              <p className="text-3xl font-bold gradient-text">{totalBuilds}</p>
            </div>

            <div className="glass rounded-2xl p-6 card-hover animate-fade-in-delay-1">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-500/10 rounded-xl mr-4">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold">Investment</h3>
              </div>
              <p className="text-3xl font-bold text-green-500">${totalInvestment.toLocaleString()}</p>
            </div>

            <div className="glass rounded-2xl p-6 card-hover animate-fade-in-delay-2 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-500/10 rounded-xl mr-4">
                  <Wrench className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold">Modifications</h3>
              </div>
              <p className="text-3xl font-bold text-blue-500">{totalModifications}</p>
            </div>
          </div>

          {/* Builds Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Builds ({builds.length})</h2>
            
            {loading ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading your builds...</p>
              </div>
            ) : builds.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {builds.map((build, index) => (
                  <div 
                    key={build._id} 
                    className={`glass rounded-2xl overflow-hidden card-hover animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">{build.carModel}</h3>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => router.push(`/build/${build._id}`)}
                            className="p-2 text-gray-400 hover:text-orange-500 transition-all duration-300 rounded-lg hover:bg-orange-500/10"
                            title="View Build"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBuild(build._id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-all duration-300 rounded-lg hover:bg-red-500/10"
                            title="Delete Build"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Color:</span>
                          <span className="font-medium">{build.color}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Modifications:</span>
                          <span className="font-medium">{build.selectedParts?.length || 0}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Investment:</span>
                          <span className="gradient-text font-bold">${build.totalPrice.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                        <div className="flex items-center text-gray-400 text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(build.createdAt)}
                        </div>
                        <button
                          onClick={() => router.push(`/build/${build._id}`)}
                          className="text-orange-500 hover:text-orange-400 text-sm font-semibold transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <div className="glass rounded-2xl p-8 sm:p-12 max-w-md mx-auto">
                  <Car className="w-16 h-16 text-gray-500 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-4">No builds yet</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">Start customizing your first car to see it here!</p>
                  <Link
                    href="/customize"
                    className="btn-primary px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Build
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}