import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: Props) {

  const { id } = params

  if (id !== 'men' && id !== 'women' && id !== 'kids') {
    notFound()
  }



  return (
    <div>
      <h1>Category Page</h1>
    </div>
  );
}