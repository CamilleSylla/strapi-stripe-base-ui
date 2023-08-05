import strapiGqlClient from "@/apollo-client"
import StrapiImage from "@/components/StrapiImage";
import { GET_PRODUCTS_LIST } from "@/queries/products"
import { ProductEntityResponseCollection, UploadFile } from "@/schema/__strapiGql__/graphql"

export default function CataloguePage({ products }: { products: ProductEntityResponseCollection["data"] }) {
    return (
        <div className=" w-full grid grid-cols-4 gap-8">
            {products.map(product => {
                return <ProductCard product={product} key={product.id} />
            })}
        </div>
    )
}

const ProductCard = ({ product }: { product: ProductEntityResponseCollection["data"][0] }) => {

    return (
        <article className=" space-y-2.5 text-center">
            <div className="w-full h-80">
            <StrapiImage image={product.attributes?.Gallery?.data[0]?.attributes as UploadFile} format="medium"></StrapiImage>
            </div>
            <h3 className="font-bold text-lg">{product.attributes?.Name}</h3>
            <h4 className="font-bold text-sm text-gray-700">{product.attributes?.Price}€</h4>
        </article>
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