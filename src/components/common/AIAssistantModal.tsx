import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Send, Bot, User as UserIcon, ShoppingBag, ArrowRight } from 'lucide-react';

export const AIAssistantModal: React.FC = () => {
  const { isAIModalOpen, setIsAIModalOpen, products, addToCart, navigate } = useApp();
  const [messages, setMessages] = useState<
    { sender: 'ai' | 'user'; text: string; recommendedProductIds?: string[] }[]
  >([
    {
      sender: 'ai',
      text: "Hello! I'm Storly's AI Organic Recipe & Grocery Assistant. Ask me for healthy meal ideas, smoothie recipes, or pantry recommendations!",
      recommendedProductIds: ['prod-1', 'prod-2', 'prod-5'],
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAIModalOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    const userText = inputPrompt;
    setInputPrompt('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.reply || 'Here are my top recommended organic picks for you!',
          recommendedProductIds: data.recommendedProductIds || ['prod-1', 'prod-2'],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: "Here are some of our top fresh farm products for your healthy pantry!",
          recommendedProductIds: ['prod-1', 'prod-2', 'prod-3'],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={() => setIsAIModalOpen(false)}
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200 flex flex-col h-[580px] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#034848] to-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#72bf44] text-white flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight flex items-center gap-1.5">
                Storly AI Grocery Assistant <Sparkles className="w-4 h-4 text-[#72bf44]" />
              </h3>
              <p className="text-[11px] text-emerald-200">Powered by Gemini 2.5 Flash</p>
            </div>
          </div>
          <button
            onClick={() => setIsAIModalOpen(false)}
            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-stone-50/50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#034848] text-[#72bf44] flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                  AI
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl p-4 text-xs font-medium leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#034848] text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-stone-200 rounded-tl-xs space-y-3'
                }`}
              >
                <p>{msg.text}</p>

                {/* Recommended Products Grid */}
                {msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    <p className="text-[10px] font-bold text-[#72bf44] uppercase tracking-wider">
                      Recommended Ingredients:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.recommendedProductIds.map((pid) => {
                        const prod = products.find((p) => p.id === pid) || products[0];
                        if (!prod) return null;
                        return (
                          <div
                            key={prod.id}
                            className="flex items-center justify-between p-2 bg-stone-50 rounded-xl border border-stone-200"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-8 h-8 rounded-lg object-cover bg-white"
                                referrerPolicy="no-referrer"
                              />
                              <div className="truncate">
                                <p className="text-[11px] font-bold text-slate-800 truncate">{prod.name}</p>
                                <p className="text-[10px] text-[#034848] font-bold">${prod.price.toFixed(2)}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => addToCart(prod)}
                              className="p-1.5 bg-[#034848] text-white hover:bg-[#72bf44] rounded-lg shrink-0 transition-colors"
                              title="Add to cart"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-bold text-[#034848] animate-pulse">
              <Bot className="w-4 h-4" /> AI is crafting recipe & product recommendations...
            </div>
          )}
        </div>

        {/* Quick Prompts & Input Box */}
        <div className="p-4 border-t border-stone-200 bg-white space-y-2">
          <div className="flex gap-2 overflow-x-auto pb-1 text-[11px]">
            <button
              onClick={() => setInputPrompt('Recommend a healthy morning smoothie with berries')}
              className="px-3 py-1 bg-stone-100 hover:bg-emerald-50 text-slate-700 rounded-full shrink-0 font-medium border border-stone-200"
            >
              🥤 Morning Smoothie Recipe
            </button>
            <button
              onClick={() => setInputPrompt('What organic items are best for salad?')}
              className="px-3 py-1 bg-stone-100 hover:bg-emerald-50 text-slate-700 rounded-full shrink-0 font-medium border border-stone-200"
            >
              🥗 Fresh Salad Prep
            </button>
          </div>

          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask for recipes, dietary advice, organic milk..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#034848]"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="px-5 py-2.5 bg-[#034848] hover:bg-[#72bf44] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
