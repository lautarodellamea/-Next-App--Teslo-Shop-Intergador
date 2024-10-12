/* eslint-disable react/no-unescaped-entities */
import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import Image from 'next/image';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">


      <div className="flex flex-col w-[1000px]">

        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart">Editar carrito</Link>



            {/* Items */}

            {

              productsInCart.map(product => (

                <div key={product.slug} className="flex mb-5">
                  <Image src={`/products/${product.images[0]}`} alt={product.title} width={100} height={100} className="mr-5 rounded" style={{ width: '100px', height: '100px' }} />


                  <div>
                    <p>{product.title}</p>
                    <p>${product.price} x 3</p>
                    <p>Subtotal: ${product.price * 3}</p>
                  </div>

                </div>



              )

              )
            }


          </div>

          {/* Resumen */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Lautaro Della Mea</p>
              <p>Av. Siempre Viva 123</p>
              <p>Col. Centro</p>
              <p>Alcandia Cuauhtémoc</p>
              <p>Ciudad de México</p>
              <p>CP 123123</p>
              <p>123.123.123</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 bg-gray-200 mb-10" />


            <h2 className="text-2xl mb-2">Resumen de orden</h2>


            <div className="grid grid-cols-2">

              <span>No. Productos</span>
              <span className="text-right">3 Articulos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>

            </div>


            <div className="mt-5 mb-2 w-full" >

              <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                  Al hacer clic en "Colocar orden", usted acepta los <Link className="underline" href="/terms-and-conditions">Terminos y Condiciones</Link> y la <Link className="underline" href="/privacy-policy">Política de privacidad</Link>.

                </span>
              </p>

              <Link className="flex btn-primary justify-center" href="/orders/123">Colocar orden</Link>
              {/* Aca la orden ya queda en base de datos */}
            </div>

          </div>



        </div>

      </div>



    </div>
  );
}