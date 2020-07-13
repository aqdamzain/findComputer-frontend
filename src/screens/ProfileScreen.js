import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, userProducts, saveProduct } from '../actions/productActions';

function ProfileScreen(props) {

    const[modalVisible, setModalVisible] = useState(false);

    const [nameUser, setNameUser] = useState('');
    const [address, setAdress] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const userProduct = useSelector(state => state.userProduct);
    const {loading, products, error} = userProduct;

    const productDeleted = useSelector(state => state.deleteProduct);
    const {loading: deleteLoading, products: deletedProduct, error: errorDelete } = productDeleted;

    const dispatch = useDispatch();
    const userAuth = Cookie.getJSON("userInfo");

    useEffect(() => {
        dispatch(userProducts(userAuth));
        return () => {

        };
        // eslint-disable-next-line
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

    }

    const deleteHandler = async (product) => {
        dispatch(deleteProduct(userAuth, product));
        products.splice(products.indexOf(product), 1);
    }

    return <div className="content-profile">
        <div className="side-userInfo">
            {!modalVisible && <div>
                <img src={userAuth.data.profileImg} alt="Avatar"></img>
                <div className="text-userInfo">
                    <ul>
                        <li><h3>{userAuth.data.name}</h3></li>
                        <li>{userAuth.data.address}</li>
                    </ul>
                </div>
                <button type="button" onClick={()=>setModalVisible(true)} className="button primary">Update Profile</button>
            </div>
            }
            
            {modalVisible &&
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="userForm-container">
                            <li>
                                <h2>Update Profile</h2>
                            </li>
                            <li>
                                <label htmlFor="nameUser">Name</label>
                                <input type="text" name="nameUser" id="nameUser" onChange={(e) => setNameUser(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="adress">Adress</label>
                                <input type="number" name="adress" id="adress" onChange={(e) => setAdress(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="profileImage">Image</label>
                                <input type="file" name="profileImage" id="profileImage" onChange={(e) => setProfileImage(e.target.files[0])}>
                                </input>
                            </li>
                            <li>
                                <button type="submit" className="button primary">Update</button>
                            </li>
                            <li>
                                <button type="button" onClick={()=>setModalVisible(false)} className="button secondary">Back</button>
                            </li>
                            
                        </ul>
                    </form>
                </div>
            }

        </div>

        <div className="user-listProduct">

            <div className="userProduct-header">
                <h3>Products</h3>
                <button onClick={() => props.history.push("/CreateProduct")}>Create Product</button>
            </div>
            <div className="product-tableList">
                {
                    loading ? <div>Loading...</div> :
                    error ? <div>{error}</div> :
                    errorDelete ? <div>{errorDelete}</div> :
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <button onClick={() => deleteHandler(product)}>Delete</button>
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>

    </div>
    
    
    
}
export default ProfileScreen;