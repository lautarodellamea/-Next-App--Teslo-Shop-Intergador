export const revalidate = 684800 // 7 dias (cada 7 dias revalida recordar ponerlo en segundos)



import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";



interface Props {
  params: {
    slug: string
  }
}


// generamos metadata dinamica
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? 'Producto no encontrado',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? 'Producto no encontrado',
      // images: [], //https://misitioweb.com/products/prod-1/image-png
      images: [`/products/${product?.images[1]}`,]
    },
  }
}



export default async function ProductPage({ params }: Props) {

  const { slug } = params

  // obtenemos el producto por slug
  const product = await getProductBySlug(slug)

  console.log(product)

  // si no existe el producto damos la pagina 404
  if (!product) {
    notFound()
  }



  return (
    <div className="mt 5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">



      <div className="cols-span-1 md:col-span-2">

        {/* Mobile Slideshow */}
        <ProductMobileSlideshow title={product.title} images={product.images} className="block md:hidden" />

        {/* Desktop Slideshow */}
        <ProductSlideshow title={product.title} images={product.images} className="hidden md:block" />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">

        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg">${product.price}</p>

        {/* Selector de Tallas */}
        <SizeSelector
          selectedSize={product.sizes[3]}
          availableSizes={product.sizes}

        />

        {/* Selector de Cantidad */}
        <QuantitySelector quantity={2} />

        {/* Boton */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>

      </div>

    </div>
  );
}