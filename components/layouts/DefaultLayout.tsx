import { ReduxStore } from "@/store/store";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBagIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import StrapiImage from "../StrapiImage";
import { UploadFile } from "@/schema/__strapiGql__/graphql";
import lang from "../../lang/fr.json"

export default function DefaultLayout({ children }: { children: ReactNode }) {

    return (
        <>
            <nav className=" py-4">
                <CartList />
            </nav>
            <main>{children}</main>
        </>
    )
}

const CartList = () => {
    const products = useSelector((state: ReduxStore) => state.cart.items)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div>
            <button onClick={() => products.length > 0 ? setIsOpen(true) : null} className={`p-2 border border-black rounded-lg relative ${products.length <= 0 && "pointer-events-none"}`}>
                <ShoppingBagIcon className="w-5 h-5" />
                <span className="flex items-center dur justify-center absolute -bottom-1/4 -right-1/4 w-5 h-5 bg-black rounded-full text-white text-xs font-semibold">
                    {products.length}
                </span>
            </button>
            <Transition
                show={isOpen}
                as={Fragment}
                enter="duration-500 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-300 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0">
                <Dialog onClose={() => setIsOpen(false)} className="w-full h-full absolute top-0 right-0 backdrop-blur bg-gray-300/50 cursor-pointer">
                    <div className="absolute top-0 right-0 w-1/3 h-full overflow-y-auto px-5 bg-white cursor-default">

                        <Dialog.Panel className="space-y-10 flex flex-col h-full pb-5 overflow-y-auto">
                            <span className="block py-10 text-2xl font-bold border-b border-gray-300">{lang.nav.cart.title}</span>
                            <span>{products.length + " " + lang.nav.cart.article_selected}</span>
                            <div className=" max-w-full overflow-y-auto space-y-5">
                                {products.map(product => {
                                    return (
                                        <div key={product.uuid} className="flex items-start gap-5 p-3 border border-gray-300 rounded-lg">
                                            <div className=" w-14 h-14 rounded-lg overflow-hidden">
                                                <StrapiImage image={product.Gallery?.data[0].attributes as UploadFile} format="thumbnail" />
                                            </div>
                                            <div className="flex-1">
                                                <h2 className=" font-semibold">{product.Name}</h2>
                                                <h3 className=" text-sm font-semibold text-gray-500">{product.Price}€</h3>
                                            </div>
                                            <button><TrashIcon className=" w-5 h-5 stroke-red-500" /></button>
                                        </div>
                                    )
                                })}
                            </div>
                            <button className="w-full py-4 rounded-lg bg-black font-semibold text-white flex justify-center items-center gap-2">
                                <span className="block">
                                    {lang.nav.cart.checkout}
                                </span>
                                <ShoppingCartIcon className="w-5 h-5 stroke-white stroke-2" />
                            </button>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>

        </div>
    )
}

