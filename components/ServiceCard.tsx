import { Service } from '../types';
import { Zap, Settings, Palette } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-8 h-8" />;
      case 'Settings':
        return <Settings className="w-8 h-8" />;
      case 'Palette':
        return <Palette className="w-8 h-8" />;
      default:
        return <Zap className="w-8 h-8" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
      <div className="flex items-center mb-4">
        <div className="text-orange-500 mr-3">
          {getServiceIcon(service.icon || 'Zap')}
        </div>
        <h3 className="text-xl font-semibold text-white">{service.name}</h3>
      </div>
      <p className="text-gray-400 mb-4">{service.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-orange-500">${service.price}</span>
        <span className="text-sm text-gray-500 bg-gray-700 px-3 py-1 rounded-full">
          {service.category}
        </span>
      </div>
    </div>
  );
}