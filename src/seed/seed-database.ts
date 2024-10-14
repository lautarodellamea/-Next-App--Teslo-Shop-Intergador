
// intalar npm i -D ts-node para poder ejecutar archivos ts en node
// agregamos en el package.json el script npm run seed: "seed": "ts-node src/seed/seed-database.ts"
// creamos el archivo tsconfig.json con npx tsc --init
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution

import { initialData } from "./seed"
import prisma from '../lib/prisma';

async function main() {
  // console.log(initialData)



  // 1. Borrar registros previos
  // ejecutamos todas las promesas de una
  // await Promise.all([
  //   prisma.productImage.deleteMany(),
  //   prisma.product.deleteMany(),
  //   prisma.category.deleteMany()
  // ])

  // al final lo hacemos asi porque si intentara eliminar las categorias antes de eliminar los productos o imagenes daria error
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const { categories, products } = initialData

  // Llenamos la base de Categorias
  const categoriesData = categories.map(category => {
    return { name: category }
  })
  // console.log(categoriesData)

  await prisma.category.createMany({
    data: categoriesData
  })


  // obtengo las categorias de mi base de datos
  const categoriesDB = await prisma.category.findMany()
  // console.log({ categoriesDB })

  // creo un objetp con los nombres de las categorias y el id correspondiente
  const categoriesMap = categoriesDB.reduce((acc, category) => {
    return {
      ...acc,
      [category.name.toLowerCase()]: category.id
    }
  }, {} as Record<string, string>)
  // console.log({ categoriesMap })


  // Products

  // forma en la que cargamos 1 producto, pero nosotros vamos a cargar todos
  // const { images, type, ...product1 } = products[0]
  // await prisma.product.create({
  //   data: {
  //     ...product1,
  //     categoryId: categoriesMap['shirts']
  //   }
  // })

  products.forEach(async products => {
    const { images, type, ...rest } = products
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })


    // insertando images
    const imagesData = images.map(image => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })


  })





  console.log('Seed Ejecutado')
}






(() => {


  // para que no se ejecute en produccion (CUIDADO)
  if (process.env.NODE_ENV === 'production') return


  main()
})()