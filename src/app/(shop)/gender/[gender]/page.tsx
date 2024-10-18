// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 60 // 60 segundos


import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";



interface Props {
  params: {
    gender: string
  },
  searchParams: {
    page?: string
  },
}

export default async function CategoryPage({ params, searchParams }: Props) {

  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }



  // le digo que la key es de tipo ValidCategories y el value es un string
  const labels: Record<string, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }


  if (gender !== 'men' && gender !== 'women' && gender !== 'kid') {
    notFound()
  }


  return (
    <>
      <Title title={`Articulos de ${labels[gender]}`} subtitle="Todos los productos" className="mb-2" />


      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
} 