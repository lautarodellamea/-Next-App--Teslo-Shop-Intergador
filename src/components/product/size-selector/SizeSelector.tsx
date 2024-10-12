import { Size } from "@/interfaces"
import clsx from "clsx"

interface Props {
  selectedSize: Size // talla seleccionada
  availableSizes: Size[] // tallas disponibles - [SX, S, M, L, XL]

}


export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
  return (
    <div className="my-5">
      <h3 className="mb-4">Tallas disponibles</h3>

      <div className="flex">
        {
          availableSizes.map(size => (
            <button key={size} className={
              clsx(
                "mx-2 hover:underline text-lg",
                {
                  'underline': selectedSize === size
                }
              )
            }>
              {size}
            </button>
          ))
        }
      </div>

    </div >
  )
}