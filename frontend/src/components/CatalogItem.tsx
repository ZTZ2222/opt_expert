import { ICategory } from "@/interfaces/category.interface";
import Image from "next/image";
import Link from "next/link";

const CatalogItem: React.FC<ICategory> = ({ id, name, slug_en, image }) => {
  return (
    <Link href={`/katalogi/${slug_en}`} className="group relative">
      <h1 className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center rounded-lg bg-black bg-opacity-0 text-center text-2xl font-bold uppercase text-transparent transition-all group-hover:bg-opacity-70 group-hover:text-white">
        {name}
      </h1>
      <div className="relative h-56 md:h-72 lg:h-96">
        <Image
          alt={name}
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg border border-bgGradient2 object-cover"
        />
      </div>
    </Link>
  );
};

export default CatalogItem;
