import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { Store as StoreIcon, Star, ArrowUpRight } from 'lucide-react';

export const BestSellerShopsSection: React.FC = () => {
  const { stores, products, navigate } = useApp();

  const store1 = stores[0];
  const store2 = stores[1] || stores[0];

  const store1Products = products.filter((p) => p.storeName === store1?.name || p.storeId === store1?.id).slice(0, 4);
  const store2Products = products.filter((p) => p.storeName === store2?.name || p.storeId === store2?.id).slice(0, 4);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Best Seller Shops
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Customer Favorites You Can't Miss
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Store 1 */}
        {store1 && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#034848] text-white flex items-center justify-center font-black text-lg shadow-sm">
                  <StoreIcon className="w-6 h-6 text-[#72bf44]" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{store1.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">{store1.rating}</span>
                    <span>({store1.reviewCount.toLocaleString()} Reviews)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('store-detail', { storeId: store1.id })}
                className="px-4 py-2 bg-[#034848] hover:bg-[#72bf44] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <span>View Shop</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {(store1Products.length > 0 ? store1Products : products.slice(0, 4)).map((p) => (
                <ProductCard key={`s1-${p.id}`} product={p} compact />
              ))}
            </div>
          </div>
        )}

        {/* Store 2 */}
        {store2 && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#72bf44] text-white flex items-center justify-center font-black text-lg shadow-sm">
                  <StoreIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{store2.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">{store2.rating}</span>
                    <span>({store2.reviewCount.toLocaleString()} Reviews)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('store-detail', { storeId: store2.id })}
                className="px-4 py-2 bg-[#034848] hover:bg-[#72bf44] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <span>View Shop</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {(store2Products.length > 0 ? store2Products : products.slice(2, 6)).map((p) => (
                <ProductCard key={`s2-${p.id}`} product={p} compact />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
