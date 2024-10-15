'use server'

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client"


interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender

}



export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions = {}) => {

  // validaciones por si me mandan una pagina incorrecta
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  try {

    // ######### tratar de hacer las dos peticiones de manera simultanea con un promise.all #########
    // 1. Obtenemos todos los Productos
    // traigo todos los productos, dos imagenes de cada uno y de esas imagenes solo me interesa el url
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      },
      where: {
        gender: gender
      }
    })
    // console.log(products)


    // 2. Obtener total de paginas
    const totalCounter = await prisma.product.count({
      where: {
        gender: gender
      }
    }) // contamos todos los productos que tengo
    const totalPages = Math.ceil(totalCounter / take)
    //  ##################################################################

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map(product => ({
        ...product,
        images: product.ProductImage.map(image => image.url)
      }))
    }


  } catch (error) {

    throw new Error('No se pudo cargar los productos')

  }


}