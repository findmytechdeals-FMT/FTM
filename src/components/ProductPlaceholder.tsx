import React from 'react';
import { 
  Smartphone, 
  Headphones, 
  Speaker, 
  Laptop, 
  Tv, 
  Sparkles, 
  Watch, 
  Gamepad2, 
  Home, 
  Camera, 
  Zap, 
  Keyboard, 
  Cpu, 
  ImagePlus 
} from 'lucide-react';

interface ProductPlaceholderProps {
  categoryId?: string;
  className?: string;
  name?: string;
}

export const ProductPlaceholder: React.FC<ProductPlaceholderProps> = ({ 
  categoryId, 
  className = '',
  name
}) => {
  const getIcon = () => {
    switch (categoryId) {
      case 'smartphones':
        return Smartphone;
      case 'audio':
        return Headphones;
      case 'speakers':
        return Speaker;
      case 'computers':
        return Laptop;
      case 'tvs':
        return Tv;
      case 'appliances':
        return Sparkles;
      case 'wearables':
        return Watch;
      case 'gaming':
        return Gamepad2;
      case 'smarthome':
        return Home;
      case 'cameras':
        return Camera;
      case 'power':
        return Zap;
      case 'accessories':
        return Keyboard;
      default:
        return Cpu;
    }
  };

  const Icon = getIcon();

  return (
    <div className={`w-full h-full min-h-[160px] rounded-xl bg-gradient-to-br from-slate-50 via-slate-100 to-cyan-50/40 border border-dashed border-slate-300 p-4 flex flex-col items-center justify-center text-center transition-all ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-cyan-600 mb-2.5">
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>
      <span className="text-[11px] font-bold text-slate-800 tracking-wide">
        Official Photo Pending
      </span>
      <span className="text-[10px] text-slate-400 mt-0.5">
        Specs & Retailer Deals Listed
      </span>
    </div>
  );
};
