import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, buyProduct } from '../actions/productActions';

function ProductScreen(props) {
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;
    const productBuy = useSelector(state => state.userUpdate);
    const {loading: buyLoading, product: productbuy, error: errorBuy} = productDetails;
    const dispatch = useDispatch();

    const userAuth = Cookie.getJSON("userInfo");

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {

        };
        // eslint-disable-next-line
    }, []);

    const handleBuy = () => {
        dispatch(buyProduct(userAuth, product));
        props.history.push("/user/buyHistory");
    }

    var temp = product;

    return <div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        {loading? <div>Loading...</div> :
            error? <div>{error}</div> :
            (
            <div className = "details">
                <div className="details-image">
                    <ul>
                        <li>
                            <img src={temp.itemImg} alt="product"></img>
                        </li>
                        <li>
                            <button type="button" onClick={handleBuy} className="button primary">Proccess to Buy</button>
                        </li>
                    </ul>
                </div>
                <div className="details-info">
                    <ul>
                        <li><h4>{temp.name}</h4></li>
                        <li> {temp.category} </li>
                        <li>
                            Description:
                            <div>
                                {temp.description}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            )
        }
    </div>
}
export default ProductScreen;