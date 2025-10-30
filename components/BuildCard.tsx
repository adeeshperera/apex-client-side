import { Build } from '../types';
import { Calendar, Eye, Trash2 } from 'lucide-react';

interface BuildCardProps {
  build: Build;
  onView: (buildId: string) => void;
  onDelete: (buildId: string) => void;
}

export default function BuildCard({ build, onView, onDelete }: BuildCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{build.carModel}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onView(build._id)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="View Build"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(build._id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete Build"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Color:</span>
            <span className="text-white">{build.color}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Modifications:</span>
            <span className="text-white">{build.selectedParts?.length || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Investment:</span>
            <span className="text-orange-500 font-semibold">${build.totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(build.createdAt)}
          </div>
          <button
            onClick={() => onView(build._id)}
            className="text-orange-500 hover:text-orange-400 text-sm font-semibold"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}