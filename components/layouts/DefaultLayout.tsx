import { ReduxStore } from "@/store/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

export default function DefaultLayout({ children }: { children: ReactNode }) {
    const items = useSelector((state : ReduxStore) => state.cart.items)

    return (
        <>
            <nav>
                <div className=' p-5'>
                    Cart {items.length}
                </div>
            </nav>
            <main>{children}</main>
        </>
    )
}

