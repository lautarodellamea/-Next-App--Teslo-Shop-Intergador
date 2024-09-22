'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Product } from "@/interfaces"



interface Props {
  product: Product
}

export const ProductGridItem = ({ product }: Props) => {


  const [displayImage, setDisplayImage] = useState(product.images[0])


  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Image
        src={`/products/${displayImage}`}
        alt={product.title}
        className="w-full object-cover"
        width={300}
        height={300}

        onMouseEnter={() => setDisplayImage(product.images[1])}
        onMouseLeave={() => setDisplayImage(product.images[0])}
      />

      <div className="p-4 flex flex-col">
        <Link href={`/product/${product.slug}`}>{product.title}</Link>
        <span className="font-bold">${product.price}</span>
      </div>




    </div>
  )
}