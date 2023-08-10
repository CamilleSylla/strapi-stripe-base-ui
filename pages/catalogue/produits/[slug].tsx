import strapiGqlClient from "@/apollo-client"
import StrapiImage from "@/components/StrapiImage";
import { useUUID } from "@/composable/useUUID";
import { GET_PRODUCT_BY_ID } from "@/queries/products"
import { UploadFile } from "@/schema/__strapiGql__/graphql";
import { addToCart } from "@/store/cartSlice";
import { Product, ProductGallery } from "@/types/gql"
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ProductPage({ product }: { product: Product }) {
    return (
        <div className="w-full">
            <div className=" flex w-full px-56 gap-10">
                <Gallery images={product.Gallery as ProductGallery} />
                <ProductInfos product={product} />
            </div>
        </div>
    )
}

const ProductInfos = ({ product }: { product: Product }) => {
    const dispatch = useDispatch()
    const { generateUUID } = useUUID()

    return (
        <div className="flex-1">
            <h1 className=" font-bold text-xl text-gray-700">{product.Name}</h1>
            <span className="block">{(product.Price * 100) / 100}€</span>
            <p>{product.Exerpt}</p>
            <button onClick={() => dispatch(addToCart({ ...product, uuid: generateUUID() }))}>Add to cart</button>
        </div>
    )
}

const Gallery = ({ images }: { images: ProductGallery }) => {
    const [active, setActive] = useState(0)
    return (
        <div className="flex-1 space-y-6">
            <div className="w-full h-96">
                <StrapiImage image={images.data[active].attributes as UploadFile} format="medium" />
            </div>
            <div className="flex gap-3">
                {images.data.map((image, i) => {
                    return (
                        <div className={`w-24 h-16 p-1 border-2 ${i === active ? "border-gray-200 cursor-default" : "border-transparent cursor-pointer"}`} key={image.attributes?.alternativeText} onClick={() => setActive(i)}>
                            <StrapiImage image={image.attributes as UploadFile} format="thumbnail" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export async function getServerSideProps({ params }: { params: { slug: string } }) {
    const { data: productInfos } = await strapiGqlClient.query({
        query: GET_PRODUCT_BY_ID,
        variables: {
            slug: params.slug
        }
    })
    return {
        props: {
            product: productInfos.productBySlug
        }
    }
}