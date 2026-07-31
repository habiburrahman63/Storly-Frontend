import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';

export const NewLaunchItems: React.FC = () => {
  const { products } = useApp();

  const newLaunches = products.filter((p) => p.isNewLaunch).concat(products).slice(0, 5);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          New Launch Items
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Hand-picked organic favorites, fresh off local farm deliveries
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {newLaunches.map((product) => (
          <ProductCard key={`nl-${product.id}`} product={product} />
        ))}
      </div>
    </section>
  );
};
