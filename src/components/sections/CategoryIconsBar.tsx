import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, CupSoda, Apple, Carrot, LeafyGreen, Nut } from 'lucide-react';

const ICON_MAP: { [key: string]: React.ReactNode } = {
  Sprout: <Sprout className="w-7 h-7 text-[#034848]" />,
  CupSoda: <CupSoda className="w-7 h-7 text-[#034848]" />,
  Apple: <Apple className="w-7 h-7 text-[#034848]" />,
  Carrot: <Carrot className="w-7 h-7 text-[#034848]" />,
  LeafyGreen: <LeafyGreen className="w-7 h-7 text-[#034848]" />,
  Nut: <Nut className="w-7 h-7 text-[#034848]" />,
};

export const CategoryIconsBar: React.FC = () => {
  const { categories, products, setFilters, navigate } = useApp();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const count = products.filter(
            (p) =>
              p.category.toLowerCase().trim() === cat.name.toLowerCase().trim() ||
              p.categorySlug === cat.slug
          ).length;
          return (
            <div
              key={cat.id}
              onClick={() => {
                setFilters((prev) => ({ ...prev, category: cat.name }));
                navigate('shop');
              }}
              className="group flex flex-col items-center justify-center p-5 bg-stone-50/80 hover:bg-emerald-50/60 rounded-2xl border border-stone-200/70 hover:border-[#72bf44]/50 cursor-pointer transition-all duration-300 text-center hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xs mb-3 group-hover:bg-[#034848] transition-colors">
                <div className="group-hover:[&_svg]:text-white text-[#034848] transition-colors">
                  {ICON_MAP[cat.iconName] || <Sprout className="w-7 h-7" />}
                </div>
              </div>
              <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#034848] transition-colors">
                {cat.name}
              </h4>
              <span className="text-[11px] font-medium text-slate-400 mt-1">
                {count} Items
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
