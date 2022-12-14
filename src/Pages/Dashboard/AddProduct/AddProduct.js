import { Button, Input, Textarea } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LargeButtonLoading from '../../../Components/LargeButtonLoading/LargeButtonLoading';
import { AuthContext } from '../../../Context/AuthProvider';
import useTitle from '../../../Hooks/useTitle';

const AddProduct = () => {
    useTitle('Add Product')
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const { data: sellerInfo = [], isLoading } = useQuery({
        queryKey: ['sellerinfo'],
        queryFn: async () => {
            const res = await axios.get(`https://a-12-server-side.vercel.app/verifyinformation/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('moto-token')}`
                }
            })
            return res.data
        }
    })

    console.log(sellerInfo);

    const { verified } = sellerInfo;

    const { displayName, email } = user;
    const time = new Date().toLocaleString()
    const handleAddProductFormSubmit = event => {
        setLoading(false)
        event.preventDefault();
        const form = event.target;
        const image = form.picture.files[0]
        const category_name = form.category_name.value;
        const name = form.name.value;
        const location = form.location.value;
        const re_sell_price = form.re_sell_price.value;
        const original_price = form.original_price.value;
        const year_of_purchase = form.year_of_purchase.value;
        const condition = form.condition.value;
        const years_of_used = form.year_of_used.value;
        const time = form.time.value;
        const seller_name = form.seller_name.value;
        const seller_email = form.seller_email.value
        const mobile = form.mobile.value;
        const description = form.description.value;
        const formData = new FormData()
        formData.append('image', image)

        setLoading(true)
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData.success);
                if (imgData.success) {
                    const picture = imgData.data.display_url;
                    const data = {
                        picture,
                        category_name,
                        name,
                        location,
                        re_sell_price,
                        original_price,
                        year_of_purchase,
                        condition,
                        years_of_used,
                        time,
                        seller_name,
                        seller_email,
                        mobile,
                        verified_seller: verified,
                        description,
                        product_status: 'available',
                        advertisement: false,

                    }
                    axios.post('https://a-12-server-side.vercel.app/addProduct', data, {
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('moto-token')}`
                        }
                    })
                        .then(res => {
                            form.reset()
                            console.log(res.data);
                            setLoading(false)
                            navigate('/dashboard/myallproducts')

                        })
                        .catch(err => {
                            setLoading(false)
                            console.error(err);
                        })
                }

            })
    }
    return (
        <div className='flex justify-center md:justify-end lg:justify-center my-10'>
            <div className='border-4 p-10 border-teal-700 rounded-xl shadow hover:shadow-xl hover:shadow-teal-700 duration-300 ease-in-out bg-gray-100'>
                <p className='text-center text-4xl font-bold mb-10'>Add Your Product</p>
                <form onSubmit={handleAddProductFormSubmit} className=''>
                    <div className='grid lg:grid-cols-2 gap-5'>
                        <input name="picture" type="file" className="border rounded w-full text-sm text-gray-500 file:py-2 file:px-6 file:rounded file:border-1 file:border-gray-400" required />
                        <select name="category_name" className="w-full p-2 bg-white border border-teal-100 rounded-md shadow-sm outline-none appearance-none focus:border-teal-600">
                            <option>supersport</option>
                            <option>dirt</option>
                            <option>cruiser</option>
                        </select>
                    </div>
                    <div className='grid lg:grid-cols-3 gap-5 mt-5'>
                        <Input required name='name' color="teal" label="Bike Name" />
                        <Input required name='location' color="teal" label="location" />
                        <Input required name='re_sell_price' color="teal" label="Resell Price" />
                    </div>
                    <div className='grid lg:grid-cols-3 gap-5 mt-5'>
                        <Input required name='original_price' color="teal" label="Original Price" />
                        <Input required name='year_of_purchase' color="teal" label="Year Of Purchase" />
                        <select name="condition" className="w-full p-2  bg-white border border-teal-100 rounded-md shadow-sm outline-none appearance-none focus:border-teal-600">
                            <option>Good</option>
                            <option>Excellent</option>
                            <option>Fair</option>
                        </select>
                    </div>
                    <div className='grid lg:grid-cols-2 gap-5 mt-5'>
                        <Input required name='year_of_used' color="teal" label="Year Of Used" />
                        <Input required name='time' disabled defaultValue={time} color="teal" label="Post Time" />
                    </div>
                    <div className='grid lg:grid-cols-3 gap-5 mt-5'>
                        <Input required name='seller_name' disabled defaultValue={displayName} color="teal" label="Seller Name" />
                        <Input required name='seller_email' disabled defaultValue={email} color="teal" label="Your Email" />
                        <Input required name='mobile' color="teal" label="Your Phone Number" />
                    </div>
                    <div className='mt-5 md:flex gap-5'>
                        <Textarea required name='description' color="teal" label="Description" />
                        <div className='md:w-1/4 mt-5'>
                            <Button color='teal' type='submit' fullWidth size='lg'>{
                                loading ? <span className='flex justify-center'><LargeButtonLoading /></span> : 'Add Product'
                            }</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;