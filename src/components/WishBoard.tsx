import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, Heart, MessageSquarePlus, RefreshCw, Download, RotateCcw, FileJson, Check } from 'lucide-react';
import { INITIAL_WISHES, WishMessage } from '@/data/wishes';
import { NeobrutalBadge } from './ui/NeobrutalBadge';
import { NeobrutalButton } from './ui/NeobrutalButton';
import { sound } from '@/utils/sound';

const STORAGE_KEY = 'birthday_wishes_local';

export const WishBoard: React.FC = () => {
  const [wishes, setWishes] = useState<WishMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFE600');
  const [selectedSticker, setSelectedSticker] = useState('👑');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Helper to merge list with local storage without duplicate IDs
  const mergeWithLocalStorage = (serverList: WishMessage[]): WishMessage[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return serverList;
      const localList: WishMessage[] = JSON.parse(stored);
      if (!Array.isArray(localList)) return serverList;

      const serverIds = new Set(serverList.map((w) => w.id));
      const newFromLocal = localList.filter((w) => !serverIds.has(w.id));
      return [...newFromLocal, ...serverList];
    } catch {
      return serverList;
    }
  };

  const fetchWishes = async () => {
    setIsLoading(true);

    // 1. Try fetching from API / server endpoint
    try {
      const res = await fetch('/api/wishes', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const merged = mergeWithLocalStorage(data);
          setWishes(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Ignore & try fallback
    }

    // 2. Try fetching static public/wishes.json
    try {
      const resJSON = await fetch('/wishes.json', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (resJSON.ok) {
        const data = await resJSON.json();
        if (Array.isArray(data)) {
          const merged = mergeWithLocalStorage(data);
          setWishes(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Ignore & try fallback
    }

    // 3. Fallback to LocalStorage or INITIAL_WISHES
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishes(parsed);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Ignore
    }

    setWishes(INITIAL_WISHES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_WISHES));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const stickers = ['👑', '💖', '🥳', '🚀', '🌸', '✨', '🎂', '🎉', '☕', '💎'];
  const colors = [
    { label: 'Yellow', code: '#FFE600' },
    { label: 'Pink', code: '#FF597B' },
    { label: 'Cyan', code: '#00F0FF' },
    { label: 'Green', code: '#A6FF00' },
    { label: 'Purple', code: '#B8C0FF' },
    { label: 'Orange', code: '#FF8E3C' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    sound.playSuccess();

    const payload = {
      name: name.trim(),
      relation: relation.trim() || 'Sahabat',
      message: message.trim(),
      color: selectedColor,
      sticker: selectedSticker
    };

    let success = false;
    let updatedList: WishMessage[] = [];

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          updatedList = data;
          success = true;
          setStatusMessage('Tersimpan di file wishes.json server & browser! 💾');
        }
      }
    } catch (err) {
      console.warn('API endpoint unavailable, falling back to browser storage persistence:', err);
    }

    if (!success) {
      // Fallback update for static host / offline
      const newWish: WishMessage = {
        id: 'w_' + Date.now(),
        name: payload.name,
        relation: payload.relation,
        message: payload.message,
        color: payload.color,
        sticker: payload.sticker,
        date: 'Baru saja'
      };

      updatedList = [newWish, ...wishes];
      setStatusMessage('Tersimpan di browser storage (Dapat diunduh ke file wishes.json)! 💾');
    }

    setWishes(updatedList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    setName('');
    setRelation('');
    setMessage('');
    setIsSubmitting(false);

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.8 }
    });

    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  const handleDownloadJson = () => {
    sound.playSuccess();
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(wishes, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'wishes.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetToDefault = () => {
    if (window.confirm('Apakah kamu yakin ingin mereset ucapan ke data bawaan awal?')) {
      sound.playPop();
      localStorage.removeItem(STORAGE_KEY);
      fetchWishes();
    }
  };

  return (
    <section id="wishes" className="py-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <NeobrutalBadge color="yellow" className="mb-2">
          SHARED JSON GUESTBOOK 📁
        </NeobrutalBadge>
        <h2 className="text-3xl sm:text-5xl font-bungee text-black mt-1">
          Papan Doa & Harapan Untuk Etin 💌
        </h2>
        <p className="text-black font-extrabold text-base sm:text-lg mt-1 max-w-xl mx-auto">
          Setiap ucapan tersimpan otomatis ke <code className="bg-[#FFE600] px-2 py-0.5 rounded border border-black font-mono">wishes.json</code> dan browser storage!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Wish Form (Left Column) */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmit}
            className="neo-box-lg bg-white p-6 sm:p-8 rounded-3xl sticky top-24"
          >
            <div className="flex items-center justify-between border-b-3 border-black pb-3 mb-5">
              <div className="flex items-center gap-2">
                <MessageSquarePlus className="w-6 h-6 text-[#FF597B]" />
                <h3 className="text-xl font-bungee text-black">Tulis Ucapan Baru</h3>
              </div>
              <NeobrutalBadge color="green">AUTO SAVE JSON 💾</NeobrutalBadge>
            </div>

            {statusMessage && (
              <div className="neo-box bg-[#A6FF00] p-3 rounded-xl mb-4 text-xs font-black text-black flex items-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{statusMessage}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-black uppercase mb-1">
                  Nama Kamu *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Darman Sarbunan / Bestie Squad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full neo-box bg-[#FFF9E6] px-4 py-2.5 rounded-xl font-bold text-black focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-black uppercase mb-1">
                  Hubungan / Status
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pacar Tersayang / Sahabat Kuliah"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full neo-box bg-[#FFF9E6] px-4 py-2.5 rounded-xl font-bold text-black focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-black uppercase mb-1">
                  Pilih Stiker Emojinya 📌
                </label>
                <div className="flex flex-wrap gap-2">
                  {stickers.map((stk) => (
                    <button
                      key={stk}
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setSelectedSticker(stk);
                      }}
                      className={`text-xl p-2 neo-box-sm rounded-xl transition-transform ${
                        selectedSticker === stk
                          ? 'bg-[#FFE600] scale-110 shadow-[3px_3px_0px_#000]'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      {stk}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-black uppercase mb-1">
                  Warna Kartu Sticky Note 🎨
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setSelectedColor(c.code);
                      }}
                      style={{ backgroundColor: c.code }}
                      className={`w-8 h-8 rounded-full border-2 border-black transition-all ${
                        selectedColor === c.code ? 'scale-125 shadow-[2px_2px_0px_#000]' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-black uppercase mb-1">
                  Pesan & Doa Untuk Etin *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tulis ucapan ulang tahun terbaikmu di sini..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full neo-box bg-[#FFF9E6] p-4 rounded-xl font-bold text-black focus:outline-none focus:bg-white"
                />
              </div>

              <NeobrutalButton
                variant="pink"
                size="md"
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2"
              >
                <Send className="w-5 h-5 stroke-[3]" />
                {isSubmitting ? 'Menyimpan ke wishes.json...' : 'Kirim & Simpan Ke JSON! 🎉'}
              </NeobrutalButton>
            </div>
          </form>
        </div>

        {/* Wishes Cards Grid (Right Column) */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="font-extrabold text-black text-sm flex items-center gap-1.5">
              <FileJson className="w-4 h-4 text-[#FF597B]" />
              Total {wishes.length} Ucapan di <span className="underline">wishes.json</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadJson}
                className="neo-tag bg-[#A6FF00] text-black px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 hover:bg-[#8ee600]"
                title="Unduh wishes.json ke komputer kamu"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                Unduh JSON
              </button>

              <button
                onClick={fetchWishes}
                className="neo-tag bg-white text-black px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 hover:bg-[#FFE600]"
                title="Refresh dari server & storage"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>

              <button
                onClick={handleResetToDefault}
                className="neo-tag bg-gray-200 text-black px-2.5 py-1 rounded-xl text-xs font-bold hover:bg-red-200"
                title="Reset ke data bawaan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="neo-box bg-white p-8 rounded-2xl text-center font-bold">
              Memuat ucapan dari wishes.json... ⏳
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  style={{ backgroundColor: w.color }}
                  className="neo-box p-5 rounded-2xl relative flex flex-col justify-between hover:translate-y-[-2px] transition-transform"
                >
                  {/* Sticker & Header */}
                  <div className="flex items-center justify-between border-b-2 border-black/80 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl neo-box-sm bg-white p-1 rounded-lg">
                        {w.sticker}
                      </span>
                      <div>
                        <h4 className="font-bungee text-base text-black leading-tight">
                          {w.name}
                        </h4>
                        <span className="text-[11px] font-extrabold text-black/70">
                          {w.relation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message Body */}
                  <p className="font-extrabold text-black text-sm sm:text-base leading-relaxed mb-4">
                    "{w.message}"
                  </p>

                  {/* Footer date */}
                  <div className="flex items-center justify-between text-xs font-extrabold text-black/70 pt-2 border-t border-black/20">
                    <span>📅 {w.date}</span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-black" />
                      Etin's BDay
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};


