import { Button } from '@material-tailwind/react';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle } from "react-icons/fa";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import BooingModal from './BookingModal';

const CategoryItem = ({ product }) => {
    const { user } = useContext(AuthContext)
    const { category_name, condition, description, location, mobile, name, original_price, picture, re_sell_price, seller_email, seller_name, time, verified_seller, year_of_purchase, years_of_used, _id } = product;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const handleOpen = () => setOpen(!open);

    const wishlistProduct = {
        picture,
        email: user?.email,
        product_name: name,
        price: re_sell_price,
        location,
        booking_id: _id
    }

    const handleAddWishList = async () => {
        fetch(`http://localhost:5000/wishlist`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('moto-token')}`
            },
            body: JSON.stringify(wishlistProduct)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Added In Wishlist')
                console.log(data);
                navigate('/dashboard/wishlist')
            })
    }


    return (
        <div className="flex justify-center mt-5">
            <div className="flex flex-col lg:flex-row rounded-lg bg-white dark:bg-teal-400 dark:text-white shadow hover:shadow-lg duration-300">

                <PhotoProvider>
                    <PhotoView src={picture}>
                        <img className="min-w-[19vw] h-96 lg:h-auto object-cover lg:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={picture} alt="" />
                    </PhotoView>
                </PhotoProvider>
                <div className="p-6 flex flex-col justify-start">
                    <div className='md:flex justify-between'>
                        <h5 className="text-xl font-medium mb-2">{name}</h5>
                        <p className="text-[18px]">
                            Seller Name: <span className='font-semibold'>{seller_name}</span>
                            {
                                verified_seller ? <><FaCheckCircle className="inline text-blue-600 ml-1" title='Verified' /></> : <></>
                            }
                        </p>
                    </div>
                    <div className='md:flex justify-between'>
                        <p>Category: <span className='font-semibold uppercase'>{category_name}</span></p>
                        <p>Re-sell Price: <span className='font-semibold'>${re_sell_price}</span></p>
                        <p>Showroom Price: <span className='font-semibold'>${original_price}</span></p>
                    </div>
                    <div className='md:flex justify-between'>
                        <p>Purchase on: <span className='font-semibold'>{year_of_purchase}</span></p>
                        <p>Used: <span className='font-semibold'>{years_of_used}</span> Years</p>
                        <p>Condition: <span className='font-semibold'>{condition}</span></p>
                    </div>
                    <p className="text-base mb-4"><span className='font-semibold'>Description:</span> {description}</p>
                    <div className='md:flex justify-between'>
                        <p className="text-base">Post Time: {time}</p>
                        <p>Phone: {mobile}</p>
                    </div>
                    <div className='md:flex justify-between'>
                        <p>Location: {location}</p>
                        <p>Email: {seller_email}</p>
                    </div>
                    <div className='lg:flex items-center mt-5'>
                        <div className='w-full lg:w-1/5 mr-auto'>
                            <Button onClick={handleAddWishList} color='amber' fullWidth>Add To Wishlist</Button>
                        </div>
                        <div className='w-full lg:w-1/5 ml-auto mt-2 lg:mt-0'>
                            <Button htmlFor="" onClick={handleOpen} variant='gradient' color='amber' fullWidth>Book Now</Button>
                            <BooingModal handleOpen={handleOpen} product={product} open={open} setOpen={setOpen} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;