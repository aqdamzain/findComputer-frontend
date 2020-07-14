import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, userProducts, saveProduct, historyProducts } from '../actions/productActions';
import { update } from '../actions/userActions';

function BuyHistoryScreen(props) {

    const userProduct = useSelector(state => state.historyProduct);
    const {loading, products, error} = userProduct;

    const dispatch = useDispatch();
    const userAuth = Cookie.getJSON("userInfo");

    useEffect(() => {
        dispatch(historyProducts(userAuth));
        return () => {

        };
        // eslint-disable-next-line
    }, []);

    return userAuth ?
    <div className="content">

        <div className="user-listProduct">

            <div className="userProduct-header">
                <h3>Buy History</h3>
            </div>
            <div className="product-tableList">
                {
                    loading ? <div>Loading...</div> :
                    error ? <div>{error}</div> :
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Seller</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => (
                                <tr key={product.id}>
                                    <td><img src={product.itemImg}></img></td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.owner.name}</td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    </div>
    : <div>404</div>
    
    
    
}
export default BuyHistoryScreen;