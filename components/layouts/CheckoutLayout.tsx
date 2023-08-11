import { ReactNode } from "react";

export default function CheckoutLayout ({children}: {children: ReactNode}) {
    return (
        <div>
            <ul>
                <li>A</li>
                <li>B</li>
            </ul>
            {children}
        </div>
    )
}