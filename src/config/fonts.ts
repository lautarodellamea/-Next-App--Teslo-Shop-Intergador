// este archivo se encarga de las fuentes

import { Inter, Montserrat_Alternates } from 'next/font/google';

export const inter = Inter({ subsets: ["latin"] });

// si quiero cambiar loa fuente solo cambio la parte de Montserrat_Alternates, no amarro el nombre de la variable, al nombre de la fuente por si la llego a cambiar.
export const titleFont = Montserrat_Alternates({ subsets: ["latin"], weight: ["500", "700"] })