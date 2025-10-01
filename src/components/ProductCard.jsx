import { FaCartPlus } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function ProductCard ({ item }) {
  const { t } = useTranslation()
  const { addToCart } = useContext(CartContext)

  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
      <img
        src={item.image}
        alt={item.name}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h2 className='text-lg font-bold'>{item.name}</h2>
        <p className='text-gray-500'>{item.description}</p>
        <div className='flex justify-between items-center mt-4'>
          <span className='text-primary font-semibold'>{item.price} ج.م</span>
          <button
            onClick={() => addToCart(item)}
            className='text-white bg-primary p-2 rounded-full hover:opacity-90'
          >
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  )
}
