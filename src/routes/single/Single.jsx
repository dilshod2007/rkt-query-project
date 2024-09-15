import React from 'react';
import { useGetProductsQuery } from '../../redux/api/ProductsApi';
import { useParams } from 'react-router-dom';

const Single = () => {
    const { id } = useParams();
    const { data } = useGetProductsQuery();

    const product = data?.payload?.find((item) => item._id === id);

    if (!product) {
        return <div className='product-not-found text-center text-3xl text-red-500 mt-10'>Product not found!</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="md:w-1/2 p-4">
                    <img
                        className="w-full h-auto rounded-lg shadow-lg object-cover"
                        src={product.product_images[0]}
                        alt={product.product_name}
                    />
                </div>
                <div className="md:w-1/2 p-4 space-y-6">
                    <h1 className="text-4xl font-bold text-gray-800">{product.product_name}</h1>
                    <p className="text-3xl font-semibold text-green-600">$900{product.price}</p>
                    <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
                    <div className="flex items-center">
                        <span className="text-gray-500 font-medium mr-2">Category:</span>
                        <span className="text-gray-800">{product.category}</span>
                    </div>
                    <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Single;
