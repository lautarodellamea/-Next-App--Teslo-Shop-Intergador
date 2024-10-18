import prisma from "@/lib/prisma"
import { url } from "inspector"

export const getProductBySlug = async (slug: string) => {


  try {

    const product = await prisma.findFirst({
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

    return


  } catch (error) {
    console.log(error)
    throw new Error('Error al obtener el producto por slug')
  }



}