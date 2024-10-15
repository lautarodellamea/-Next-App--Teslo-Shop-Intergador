// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 60 // 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

// trayendo datos en duro
// import { initialData } from "@/seed/seed";
// const products = initialData.products


interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {

  // http://localhost:3000/?page=2
  // console.log(searchParams)
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });
  // console.log(products)
  // console.log(currentPage, totalPages)

  if (products.length === 0) {
    redirect('/')
  }


  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />


      <ProductGrid products={products} />


      <Pagination totalPages={totalPages} />
    </>
  );
}
