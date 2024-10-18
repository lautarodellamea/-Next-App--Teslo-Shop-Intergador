
'use server'

import prisma from "@/lib/prisma"



export const getProductBySlug = async (slug: string) => {



  try {

    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true
          }
        }
      },
      where: {
        slug: slug
      }
    })


    if (!product) return null

    // si quisieramos sacar ProductImage de product, lo hacemos de esta manera y usariamos ...rest en el return
    // const { ProductImage, ...rest } = product

    return {
      ...product,
      images: product.ProductImage.map(image => image.url)
    }

  } catch (error) {

    throw new Error('No se encontro el producto por slug')

  }




}