import { SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";



interface Props {
  params: {
    slug: string
  }
}



export default function ProductPage({ params }: Props) {

  const { slug } = params

  // obtenemos el producto con ese id
  const product = initialData.products.find(product => product.slug === slug)

  // si no existe el producto damos la pagina 404
  if (!product) {
    notFound()
  }



  return (
    <div className="mt 5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* Slideshow */}
      <div className="cols-span-1 md:col-span-2">

      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg">${product.price}</p>

        {/* Selector de Tallas */}
        <SizeSelector />

        {/* Selector de Cantidad */}

        {/* Boton */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>

      </div>

    </div>
  );
}