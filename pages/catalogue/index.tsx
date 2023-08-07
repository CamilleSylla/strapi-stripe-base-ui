import strapiGqlClient from "@/apollo-client"
import StrapiImage from "@/components/StrapiImage";
import { GET_PRODUCTS_LIST } from "@/queries/products"
import { ProductEntityResponseCollection, UploadFile } from "@/schema/__strapiGql__/graphql"
import Link from "next/link";

export default function CataloguePage({ products }: { products: ProductEntityResponseCollection["data"] }) {
    return (
        <div className=" mx-40">
            <Catalogue products={products} />
        </div>
    )
}

const Catalogue = ({ products }: { products: ProductEntityResponseCollection["data"] }) => {
    return (
        <div className=" w-full grid grid-cols-4 gap-8 p-12">
            {products.map(product => {
                return <ProductCard product={product} key={product.id} />
            })}
        </div>
    )
}

const ProductCard = ({ product }: { product: ProductEntityResponseCollection["data"][0] }) => {

    return (
        <Link href={`/catalogue/produits/${product.attributes?.Slug}`}>
        <article className=" space-y-2.5 text-center">
            <div className="w-full h-80 overflow-hidden">
                <div className="hover:scale-125 w-full h-full transition-all duration-300">
                    <StrapiImage image={product.attributes?.Gallery?.data[0]?.attributes as UploadFile} format="medium"></StrapiImage>
                </div>
            </div>
            <h3 className="font-bold text-lg">{product.attributes?.Name}</h3>
            <h4 className="font-bold text-sm text-gray-700">{product.attributes?.Price}€</h4>
        </article>
        </Link>
    )
}

export async function getServerSideProps() {
    const { data: productsData } = await strapiGqlClient.query({
        query: GET_PRODUCTS_LIST
    })

    return {
        props: {
            products: productsData.products.data
        }
    }
}