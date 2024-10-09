import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


const seedProducts = initialData.products

interface Props {
  params: {
    // id: string
    id: Category // soy pas especifico
  }
}

export default function CategoryPage({ params }: Props) {

  const { id } = params;

  // filtramos solo los productos de la categoria
  const products = seedProducts.filter(product => product.gender === id)


  // le digo que la key es de tipo ValidCategories y el value es un string
  const labels: Record<Category, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }


  if (id !== 'men' && id !== 'women' && id !== 'kid') {
    notFound()
  }



  return (
    <>
      <Title title={`Articulos de ${labels[id]}`} subtitle="Todos los productos" className="mb-2" />


      <ProductGrid products={products} />
    </>
  );
}