import Image from "next/image";

const PHOTOS: { src: string; alt: string }[] = [
  { src: "/images/photo-01.svg", alt: "Вид на домик снаружи" },
  { src: "/images/photo-02.svg", alt: "Гостиная" },
  { src: "/images/photo-03.svg", alt: "Кухня" },
  { src: "/images/photo-04.svg", alt: "Спальня" },
  { src: "/images/photo-05.svg", alt: "Терраса" },
  { src: "/images/photo-06.svg", alt: "Территория" },
];

export default function PhotoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {PHOTOS.map((photo, i) => (
        <div
          key={i}
          className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
