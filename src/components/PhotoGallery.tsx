import React, { useState, useMemo } from 'react';
import { Search, Sparkles, ChevronLeft, ChevronRight, Maximize2, Tag, Calendar } from 'lucide-react';
import { PHOTOS_DATA, PhotoItem } from '@/data/photos';
import { NeobrutalBadge } from './ui/NeobrutalBadge';
import { NeobrutalButton } from './ui/NeobrutalButton';
import { NeobrutalModal } from './ui/NeobrutalModal';
import { sound } from '@/utils/sound';

export const PhotoGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = ['Semua', 'Favorit', 'Momen Manis', 'Gaya & Fun', 'Random & Cute'];

  const filteredPhotos = useMemo(() => {
    return PHOTOS_DATA.filter((photo) => {
      const matchesCategory = selectedCategory === 'Semua' || photo.category === selectedCategory;
      const matchesSearch =
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (photo.date && photo.date.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenPhoto = (index: number) => {
    sound.playPop();
    setSelectedPhotoIndex(index);
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < filteredPhotos.length - 1) {
      sound.playPop();
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      sound.playPop();
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  const currentPhoto: PhotoItem | null =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <section id="gallery" className="py-12 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <NeobrutalBadge color="yellow">MEMORIES & MOMENTS 📸</NeobrutalBadge>
            <NeobrutalBadge color="pink">{PHOTOS_DATA.length} FOTO ETIN</NeobrutalBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bungee text-black">
            Galeri Kenangan Etin 💖
          </h2>
          <p className="text-black font-extrabold text-base sm:text-lg mt-1">
            Kumpulan potret senyuman, keseruan, & momen manis Etin yang tak terlupakan.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Cari foto atau momen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full neo-box bg-white px-4 py-3 pl-11 rounded-xl text-black font-bold placeholder:text-gray-500 focus:outline-none focus:bg-[#FFE600]/20"
          />
          <Search className="w-5 h-5 text-black absolute left-3.5 top-3.5 stroke-[3]" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
        {categories.map((cat) => {
          const count =
            cat === 'Semua'
              ? PHOTOS_DATA.length
              : PHOTOS_DATA.filter((p) => p.category === cat).length;
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                sound.playPop();
                setSelectedCategory(cat);
              }}
              className={`neo-btn rounded-xl px-4 py-2 text-sm sm:text-base font-extrabold transition-all ${
                isActive
                  ? 'bg-[#FF597B] text-white translate-y-[-2px] shadow-[4px_4px_0px_#000]'
                  : 'bg-white text-black hover:bg-[#FFE600]'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Photos Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="neo-box-lg bg-white rounded-3xl p-12 text-center my-8">
          <p className="font-bungee text-2xl text-black">Foto tidak ditemukan 🔍</p>
          <p className="font-bold text-gray-700 mt-2">Coba kata kunci pencarian atau kategori lain!</p>
          <NeobrutalButton
            variant="yellow"
            className="mt-4 mx-auto"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
          >
            Reset Filter
          </NeobrutalButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => handleOpenPhoto(idx)}
              style={{ transform: `rotate(${photo.rotation || '0deg'})` }}
              className="neo-box bg-white p-3.5 rounded-2xl cursor-pointer group hover:rotate-0 hover:scale-[1.03] hover:z-20 transition-all duration-200 relative flex flex-col justify-between"
            >
              {/* Tape Graphic Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#FFE600]/80 border-2 border-black rotate-[-2deg] shadow-[2px_2px_0px_#000] z-10" />

              {/* Photo Image Frame */}
              <div className="relative aspect-4/3 sm:aspect-square w-full neo-box-sm rounded-xl overflow-hidden bg-gray-100 mb-3">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Sticker Badge */}
                {photo.sticker && (
                  <div className="absolute top-2 right-2 text-xl bg-white/90 p-1.5 rounded-lg neo-tag">
                    {photo.sticker}
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="neo-btn bg-[#FFE600] text-black p-2.5 rounded-xl">
                    <Maximize2 className="w-5 h-5 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* Polaroid Details */}
              <div className="px-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <NeobrutalBadge
                    color={
                      photo.category === 'Favorit'
                        ? 'pink'
                        : photo.category === 'Momen Manis'
                        ? 'cyan'
                        : photo.category === 'Gaya & Fun'
                        ? 'green'
                        : 'purple'
                    }
                  >
                    {photo.category}
                  </NeobrutalBadge>
                  {photo.date && (
                    <span className="text-xs font-extrabold text-gray-700 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {photo.date}
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-base text-black truncate mt-1">
                  {photo.title}
                </h3>
                <p className="text-xs font-bold text-gray-600 line-clamp-2 mt-0.5">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <NeobrutalModal
        isOpen={selectedPhotoIndex !== null}
        onClose={() => setSelectedPhotoIndex(null)}
        bgColor="bg-[#FFF9E6]"
      >
        {currentPhoto && (
          <div className="flex flex-col gap-4">
            {/* Image Full Box */}
            <div className="relative w-full max-h-[60vh] neo-box rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.title}
                className="max-h-[60vh] w-auto object-contain mx-auto"
              />
              {currentPhoto.sticker && (
                <div className="absolute top-4 right-4 text-3xl neo-box bg-white p-2 rounded-xl">
                  {currentPhoto.sticker}
                </div>
              )}
            </div>

            {/* Photo Info */}
            <div className="bg-white neo-box p-4 rounded-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <NeobrutalBadge color="pink">{currentPhoto.category}</NeobrutalBadge>
                  {currentPhoto.date && (
                    <span className="neo-tag bg-[#FFE600] text-black px-2.5 py-0.5 rounded-md text-xs">
                      {currentPhoto.date}
                    </span>
                  )}
                </div>
                <span className="text-xs font-extrabold text-gray-500">
                  Foto {selectedPhotoIndex! + 1} dari {filteredPhotos.length}
                </span>
              </div>
              <h3 className="text-2xl font-bungee text-black mb-1">{currentPhoto.title}</h3>
              <p className="font-bold text-black text-sm sm:text-base leading-relaxed">
                {currentPhoto.caption}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <NeobrutalButton
                variant="white"
                size="sm"
                onClick={handlePrevPhoto}
                disabled={selectedPhotoIndex === 0}
                className={selectedPhotoIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''}
              >
                <ChevronLeft className="w-5 h-5 stroke-[3]" />
                Foto Sebelumnya
              </NeobrutalButton>

              <NeobrutalButton
                variant="yellow"
                size="sm"
                onClick={handleNextPhoto}
                disabled={selectedPhotoIndex === filteredPhotos.length - 1}
                className={selectedPhotoIndex === filteredPhotos.length - 1 ? 'opacity-40 cursor-not-allowed' : ''}
              >
                Foto Selanjutnya
                <ChevronRight className="w-5 h-5 stroke-[3]" />
              </NeobrutalButton>
            </div>
          </div>
        )}
      </NeobrutalModal>
    </section>
  );
};
