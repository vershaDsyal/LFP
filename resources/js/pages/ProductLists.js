import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

class ProductLists extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            ProductList: [''],
            Loader:false,
            errors: {},
        };
    
    }
   
    componentDidMount() {
        this.fetchProducts();    
    }

    //Fetch All Products List 
    fetchProducts() {

        axios.get('/api/products').then(({data})=>{
            this.setState({
                ProductList: data,
            });

        }).catch(error => {
            console.log('Error..', error);                
        }); 
    }
    
    render(){
         
        return(
            <div className="row">
                
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h3 className="section-title">Products List</h3>
                        <div className="card">                            
                            <div className="card-body">
                                                               
                            </div>
                            
                        </div>
                    </div>
               
            </div>
        );
    }
}   



export default ProductLists;