import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, User, Clock, ArrowUpRight } from 'lucide-react';

export const LatestBlogSection: React.FC = () => {
  const { blogs, navigate } = useApp();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Latest Blog & Articles
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Explore nutritional guides, organic recipes, and wellness tips
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => navigate('blog-detail', { blogId: blog.id })}
            className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Blog Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={blog.coverImage || (blog as any).image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80';
                  }}
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#034848] text-[#72bf44] text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm">
                  {blog.category}
                </span>
              </div>

              {/* Blog Meta & Title */}
              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#72bf44]" />
                    {blog.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#72bf44]" />
                    {blog.author}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-[#034848] transition-colors leading-snug">
                  {blog.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {blog.summary || (blog as any).excerpt}
                </p>
              </div>
            </div>

            {/* Footer / Read Article */}
            <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-stone-100 text-xs font-bold text-[#034848] group-hover:text-[#72bf44] transition-colors">
              <span className="flex items-center gap-1 text-[11px] text-slate-400 font-normal">
                <Clock className="w-3 h-3" /> {blog.readTime}
              </span>
              <span className="flex items-center gap-1">
                Read Article <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
