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
            pid:'',
            title: '',
            description : '',
            price: '',
            modalClasses: ['modal','fade'],
        };

        this.onChange = this.onChange.bind(this);
        this.handleModalClose  = this.handleModalClose.bind(this);
        this.handleModalOpen  = this.handleModalOpen.bind(this);

    }
   
    componentDidMount() {
        this.fetchProducts();    
    }


    handleModalClose(){
       
        this.setState({
            pid:'',
            title : '',
            description : '',
            price : '',
        });
    }

    handleModalOpen(){
       $('#defaultModal').modal('show');
    }

    onChange(e) {

        this.setState({
                [e.currentTarget.name]: e.currentTarget.value
        });

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
        
        axios.get('/api/products/'+pid).then(({data})=>{

             this.setState({
                pid:pid,
                title: data.product.title,
                description: data.product.description,
                price: data.product.price,
            });
          
        }).catch(({response:{data}})=>{
          Swal.fire({
            text:data.message,
            icon:"error"
          })
        });
    }

    updateProduct(pid,title,description,price){

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);

        axios.post('/api/products/'+pid, formData).then(({data})=>{
              Swal.fire({
                icon:"success",
                text:data.message
              })
            this.handleModalClose();
            this.fetchProducts();
        }).catch(({response})=>{
          if(response.status===422){
            setValidationError(response.data.errors)
          }else{
            Swal.fire({
              text:response.data.message,
              icon:"error"
            })
          }
        })

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
                                                    <div className="row">

                                                        <div className="form-group col-md-12">
                                                            <label>Name</label>
                                                            <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.onChange}/>
                                                            <span className="text-danger">{this.state.errors["title"]}</span>
                                                        </div>

                                                        <div className="form-group col-md-12">
                                                            <label>Description</label>
                                                            <input className="form-control" type="text" name="description" value={this.state.description} onChange={this.onChange}/>
                                                            <span className="text-danger">{this.state.errors["description"]}</span>
                                                        </div>

                                                        <div className="form-group col-md-12">
                                                            <label>Cost</label>
                                                            <input className="form-control" type="float" name="price" value={this.state.price} onChange={this.onChange}/>
                                                            <span className="text-danger">{this.state.errors["price"]}</span>
                                                        </div>

                                                    </div>
                                                   
                                                     
                                                </div>
                                                <div className="modal-footer">
                                                    <a href="#" className="btn btn-secondary" data-dismiss="modal">Close</a>
                                                    
                                                     <button type="button" className="btn btn-primary" onClick={this.updateProduct.bind(this,this.state.pid,this.state.title,this.state.description,this.state.price)} >
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