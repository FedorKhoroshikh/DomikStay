import PhotoGrid from "@/components/gallery/PhotoGrid";

export const metadata = {
  title: "Галерея — ДомикStay",
  description: "Фотографии домика, интерьера и территории.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Галерея</h1>
      <p className="text-gray-600 mb-10">
        Домик, интерьер и территория — посмотрите, где вы будете отдыхать.
      </p>
      <PhotoGrid />
      <div className="mt-12 text-center">
        <a
          href="/book"
          className="inline-block rounded-lg bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
        >
          Забронировать
        </a>
      </div>
    </div>
  );
}
