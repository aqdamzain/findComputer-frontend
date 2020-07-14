import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, userProducts, saveProduct } from '../actions/productActions';


function CreateProductScreen(props) {


    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const userAuth = Cookie.getJSON("userInfo");

    const savingProduct = useSelector(state => state.saveProduct);
    const {loading: savingLoading, product: savedProduct, error: errorSaving } = savingProduct;

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(saveProduct(userAuth, {
            name, price, category, file: image, desc: description
        }));
        if(errorSaving==null){
            props.history.push("/profile");
        }
    }

    return userAuth ?
    <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Product</h2>
                </li>
                <li>
                    {savingLoading && <div>Loading....</div>}
                    {errorSaving && <div>{errorSaving}</div>}
                </li>
                <li>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" onChange={(e) => setPrice(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])}>
                    </input>
                </li>
                <li>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" onChange={(e) => setDescription(e.target.value)}>
                    </textarea>
                </li>
                <li>
                    <button type="submit" className="button primary">Create</button>
                </li>
                <li>
                    <button type="button" onClick={() => props.history.push("/user/profile")} className="button secondary">Back</button>
                </li>
                
            </ul>
        </form>
    </div>
    : <div>404</div>
}
export default CreateProductScreen;

