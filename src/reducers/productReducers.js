import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_USER_REQUEST, PRODUCT_USER_SUCCESS, PRODUCT_USER_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL } from "../constants/productConstants";

function productListReducer(state = {products:[]}, action){
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload};
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function productUserReducer(state = {products:[]}, action){
    switch (action.type) {
        case PRODUCT_USER_REQUEST:
            return {loading: true};
        case PRODUCT_USER_SUCCESS:
            return {loading: false, products: action.payload};
        case PRODUCT_USER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function productDetailsReducer(state = {product:{}}, action){
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload};
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function productDeletesReducer(state = {product:{}}, action){
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true};
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, product: action.payload};
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function productSaveReducer(state = {product:{}}, action){
    switch (action.type) {
        case PRODUCT_SAVE_REQUEST:
            return {loading: true};
        case PRODUCT_SAVE_SUCCESS:
            return {loading: false, product: action.payload};
        case PRODUCT_SAVE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export { productListReducer, productDetailsReducer, productDeletesReducer, productUserReducer, productSaveReducer }