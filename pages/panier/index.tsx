
import StrapiImage from '@/components/StrapiImage'
import { CREATE_PAYMENT_INTENT } from '@/mutations/payment'
import { CreatePaymentIntent, CreatePaymentIntentInputs, MutationCreatePaymentIntentArgs } from '@/schema/__apiGql__/graphql'
import { UploadFile } from '@/schema/__strapiGql__/graphql'
import { removeFromCart, updateQuantity } from '@/store/cartSlice'
import { addClientSecret } from '@/store/paymentSlice'
import { ReduxStore } from '@/store/store'
import { useMutation } from '@apollo/client'
import { Listbox, Transition } from '@headlessui/react'
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function CartPage() {

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <Products />
          <Order />
        </div>
      </div>
    </div>
  )
}

function Order() {
  const { order, items } = useSelector((state: ReduxStore) => state.cart)
  const [createPaymentIntent, { data, loading, error }] = useMutation(CREATE_PAYMENT_INTENT);
  const dispatch = useDispatch()
  const router = useRouter()
  const handlePaymentIntent = async () => {
    const payload = items.map(item => {
      const product = order.items.find(el => el.uuid === item.uuid)

      return {
        slug: item.Slug,
        quantity: product?.quantity
      }
    })
    await createPaymentIntent({
      variables: {
        products: payload as CreatePaymentIntentInputs[]
      }
    })
  }

  useEffect(() => {
    if (data?.createPaymentIntent.client_secret) {
      dispatch(addClientSecret(data.createPaymentIntent.client_secret));
      router.push("/panier/paiement/informations-livraison")
    }
  }, [data])

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <dl className="mt-6 space-y-4">
        {
          order.items.map((item, i) => {
            return (
              <div key={item.uuid} className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">{item.name} <span className=''> x{item.quantity}</span></dt>
                <dd className="text-sm font-medium text-gray-900">{item.price * item.quantity}€</dd>
              </div>
            )
          })
        }
        {/* <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="flex items-center text-sm text-gray-600">
            <span>Shipping estimate</span>
            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Learn more about how shipping is calculated</span>
              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </dt>
          <dd className="text-sm font-medium text-gray-900">$5.00</dd>
        </div> */}
        {/* <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="flex text-sm text-gray-600">
            <span>Tax estimate</span>
            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Learn more about how tax is calculated</span>
              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </dt>
          <dd className="text-sm font-medium text-gray-900">$8.32</dd>
        </div> */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">Order total</dt>
          <dd className="text-base font-medium text-gray-900">{order.total}€</dd>
        </div>
      </dl>

      <div className="mt-6">
        <button
          onClick={handlePaymentIntent}
          className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Continuer
        </button>
      </div>
    </section>
  )
}


function Products() {
  const dispatch = useDispatch()
  const products = useSelector((state: ReduxStore) => state.cart.items)

  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      <h2 id="cart-heading" className="sr-only">
        Items in your shopping cart
      </h2>
      <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
        {products.map((product, productIdx) => (
          <li key={product.uuid} className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 object-cover object-center sm:h-48 sm:w-48 overflow-hidden rounded-lg">
                <StrapiImage image={product.Gallery?.data[0].attributes as UploadFile} format="small" />
              </div>
            </div>

            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                  <div className="flex justify-between">
                    <h3 className='text-sm'>
                      <Link href={`/catalogue/produits/${product.Slug}`} className="font-medium text-gray-700 hover:text-gray-800 ">
                        {product.Name}
                      </Link>
                    </h3>
                  </div>
                  {/* <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.color}</p>
                          {product.size ? (
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                          ) : null}
                        </div> */}
                  <p className="mt-1 text-sm font-medium text-gray-900">{product.Price}€</p>
                </div>

                <div className="mt-4 sm:mt-0 sm:pr-9">
                  <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                    Quantity, {product.Name}
                  </label>
                  <QuantitySelect uuid={product.uuid} />

                  <div className="absolute right-0 top-0">
                    <button type="button" onClick={() => dispatch(removeFromCart(product.uuid))} className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Remove</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              {/* <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inStock ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      ) : (
                        <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                      )}

                      <span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>
                    </p> */}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function QuantitySelect({ uuid }: { uuid: string }) {
  const dispatch = useDispatch()
  const order = useSelector((state: ReduxStore) => state.cart.order)
  const quantity = useMemo(() => {
    const item = order.items.find(item => item.uuid === uuid)
    return item?.quantity
  }, [order.items, uuid])

  return (
    <div className='relative w-10 py-2 text-center border border-gray-300 rounded-lg'>
      <Listbox value={quantity} onChange={value => dispatch(updateQuantity({ uuid, value }))}>
        <Listbox.Button className="w-full h-full">{quantity}</Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-3 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {
              Array.from(Array(9).keys()).map(value => {
                return (
                  <Listbox.Option
                    key={value + (value + 1)}
                    value={value + 1}
                    className={` hover:bg-gray-300 cursor-pointer ${value + 1 === quantity ? 'bg-indigo-600 text-white' : ''}`}
                  >
                    {value + 1}
                  </Listbox.Option>
                )
              })
            }
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  )
}