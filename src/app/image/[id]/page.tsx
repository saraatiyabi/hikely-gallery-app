import { hikingImages } from "../../../../public/images/thumb/images";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return hikingImages.map((img) => ({ id: img.id }));
}

export default function ImagePage({ params }: { params: { id: string } }) {
  const image = hikingImages.find((img) => img.id === params.id);
  if (!image) notFound();

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <Image
          src={image.full}
          alt={image.title}
          width={1200}
          height={800}
          className="rounded-xl shadow-2xl"
          priority
        />
        <div className="mt-6 space-y-3">
          <h1 className="text-3xl font-bold">{image.title}</h1>
          <p className="text-lg text-muted-foreground">{image.description}</p>
          <p className="text-sm">
            {image.location} • {image.date}
          </p>
        </div>
      </div>
    </div>
  );
}
