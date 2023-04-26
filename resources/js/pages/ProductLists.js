import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTable } from "react-table";

class ProductLists extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            ProductList: [''],
            Loader:false,
            errors: {},
            modalClasses: ['modal','fade'],
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

    editProduct(pid){
        console.log(pid);
    }

    deleteProduct(id){

        const isConfirm = Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          axios.delete('/api/products/'+id).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            this.fetchProducts()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }
    
    render(){
         
        return(
            <div className="row">
                
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h3 className="section-title">Products List</h3>
                        <div className="card">                            
                            <div className="card-body">

                                <table className="table table-bordered mb-0 text-center">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        this.state.ProductList.length > 0 && (
                                               this.state.ProductList.map((row, key)=>(

                                                    <tr key={key}>
                                                        <td>{row.title}</td>
                                                        <td>{row.description}</td>
                                                        <td>{row.price} AED</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger btn-xs" onClick={this.deleteProduct.bind(this, row.id)}>
                                                                <i className="material-icons">delete</i>                                                
                                                            </button>
                                                            &nbsp;&nbsp;&nbsp;
                                                            <button type="button" className="btn btn-primary btn-xs" data-toggle="modal" data-target="#defaultModal"   onClick={this.editProduct.bind(this, row.id)}>
                                                                <i className="material-icons">Edit</i>                                                
                                                            </button>

                                                            
                                                        
                                                        </td>

                                                    </tr>
                                                ))
                                            )
                                        }

                                    </tbody>
                                </table>

                                <div className={this.state.modalClasses.join(' ')} id="defaultModal" role="dialog" aria-labelledby="defaultModalLabel" aria-hidden="true">
                                   
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="defaultModalLabel">
                                                <i> edit Product</i></h5><br/>
                                                 { this.state.Loader &&  <span className="dashboard-spinner spinner-xs"></span> }                               
                                                    <a href="#" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </a>
                                            </div>
                                            <div className="modal-body">

                                                <div className="form-group">
                                                   
                                                     
                                                </div>
                                                <div className="modal-footer">
                                                    <a href="#" className="btn btn-secondary" data-dismiss="modal">Close</a>
                                                    
                                                     <button type="button" className="btn btn-primary">
                                                             Save changes
                                                        </button>   
                                                        
                                                </div>
                                        
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                    
                                                               
                            </div>
                            
                        </div>
                    </div>
               
            </div>
        );
    }
}   



export default ProductLists;