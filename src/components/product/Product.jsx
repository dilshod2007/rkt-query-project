import React, { useState } from 'react'
import { useGetProductsQuery } from '../../redux/api/ProductsApi'
import { Link } from 'react-router-dom'
import { Rate } from 'antd';
import { FaHeart } from 'react-icons/fa';  

const Product = () => {
  const { data } = useGetProductsQuery();
  
  const [likedProducts, setLikedProducts] = useState({});

  const handleLike = (productId) => {
    setLikedProducts(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  return (
    <>
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 h-screen flex items-center justify-center">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 space-y-6 lg:space-y-0 lg:space-x-10">
          <div className="text-white lg:w-1/2 space-y-4">
            <h1 className="text-6xl font-extrabold mb-4">iPhone 14 Pro</h1>
            <p className="text-2xl">Experience the future of smartphones. Designed with perfection.</p>
            <a href="#shop" className="inline-block bg-white text-blue-600 font-semibold py-2 px-6 rounded-md shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105">
              SHOP NOW
            </a>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            {data && data.payload && (
              <img 
                src={data.payload[0].product_images[1]} 
                alt="iPhone 14 Pro"
                className="w-3/4 h-auto rounded-lg transition-transform transform hover:scale-105" 
              />
            )}
          </div>
        </div>
      </div>

      <div id="shop" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 bg-gray-100 mt-10">
        {data && data.payload &&
          data.payload.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative">
              
              <div className="absolute top-2 right-2">
                <FaHeart 
                  size={24}
                  onClick={() => handleLike(product._id)}
                  className={`cursor-pointer transition-colors ${likedProducts[product._id] ? 'text-red-500' : 'text-gray-400'}`}
                />
              </div>

              <Link to={`/single/${product._id}`}>
                <img src={product.product_images[0]} alt={product.product_name} className="w-full object-cover flex-shrink-0 flex justify-center align-center" />
              </Link>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{product.product_name}</h3>
                <p className="text-gray-600 text-base mb-2">{product.description}</p>

                <div className="flex justify-between items-center text-gray-800">
                  <p className="text-2xl font-bold text-green-600">${product.sale_price}</p>
                  <p className="text-sm font-semibold text-gray-600">In Stock: {product.countInStock}</p>
                </div>

                <p className="text-gray-600 text-sm mt-2">Category: {product.category}</p>
                <p className="text-gray-600 text-sm mt-2"><Rate disabled defaultValue={2} /></p>

                <button className="w-full mt-4 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        }
      </div>

      <div className="bg-blue-50 py-16">
        <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-8">Recommended Products</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data && data.payload.slice(0, 4).map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <Link to={`/single/${product._id}`}>
                <img src={product.product_images[0]} alt={product.product_name} className="w-full  object-cover" />
              </Link>

              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{product.product_name}</h3>
                <p className="text-gray-600 text-base">${product.sale_price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg mb-8">Stay updated with the latest products and offers!</p>
          <form className="flex flex-col md:flex-row justify-center gap-[30px]">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="py-3 px-6 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white w-full md:w-auto mb-4 md:mb-0" 
            />
            <button 
              type="submit" 
              className="bg-white text-blue-600 py-3 px-6 rounded-md shadow-md font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-5xl font-bold text-blue-600">100K+</h3>
            <p className="text-lg font-semibold text-gray-700 mt-2">Satisfied Customers</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-blue-600">500+</h3>
            <p className="text-lg font-semibold text-gray-700 mt-2">Products Available</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-blue-600">24/7</h3>
            <p className="text-lg font-semibold text-gray-700 mt-2">Customer Support</p>
          </div>
        </div>
      </div>
       
    </>
  )
}


export default Product;
