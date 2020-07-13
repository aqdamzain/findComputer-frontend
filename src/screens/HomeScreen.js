import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen(props) {

const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return loading ? <div>Loading...</div> :
    error ? <div>{error}</div> :
    <ul className="products">
            {
              products.map(product =>
                <li key={product.id}>
                  <div className="product">
                    <Link to={'/product/' + product.id}><img className="product-image" src={product.itemImg} alt="product"></img></Link>
                    <div className="product-name">
                      <Link to={'/product/' + product.id}>{product.name}</Link>
                    </div>
                    <div className="product-category">{product.category}</div>
                    <div className="product-price">Rp. {product.price}</div>
                    <div className = "product-owner">{product.owner.name}</div>
                  </div>
                </li>)
            }
          </ul>
}
export default HomeScreen;