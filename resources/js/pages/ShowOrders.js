import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTable } from "react-table";

class ShowOrders extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            OrdersList: [''],
            orderDetails: [''],
            Loader:false,
            errors: {},
            pid:'',
            title: '',
            description : '',
            price: '',
            modalClasses: ['modal','fade'],
        };

    }
   
    componentDidMount() {
         this.fetchOrders();
    }

     //Fetch All orders List 
    fetchOrders() {

        axios.get('/orders').then(({data})=>{
            this.setState({
                OrdersList: data,
            });
            
        }).catch(error => {
            console.log('Error..', error);                
        }); 
    }

    showdetails(id){

        axios.get('/orders/'+id).then(({data})=>{
            this.setState({
                orderDetails: data,
            });
          

        }).catch(error => {
            console.log('Error..', error);                
        }); 

    }
    
    render(){
         
        return(
            <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h3 className="section-title">Orders List</h3>
                        <div className="card">

                        <div className="card-body">

                                <table className="table table-bordered mb-0 text-center">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Product</th>
                                            <th>Customer</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        this.state.OrdersList.length > 0 && (
                                               this.state.OrdersList.map((row, key)=>(

                                                    <tr key={key}>
                                                        <td>{row.id}</td>
                                                        <td>{row.title}</td>
                                                        <td>{row.cutomer_name}</td>
                                                        <td>{row.status}</td>
                                                        <td>
                                                        <button type="button" className="btn btn-primary btn-xs" data-toggle="modal" data-target="#defaultModal"   onClick={this.showdetails.bind(this, row.id)}>
                                                            <i className="material-icons">show</i>                                                
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
                                                  order details
                                                 
                                                  </h5>
                                                                            
                                                <a href="#" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </a>
                                            </div>
                                            <div className="modal-body">

                                                <div className="form-group">
                                                    <div className="row">

                                                        <div className="form-group col-md-12">
                                                            <label>Order id : {this.state.orderDetails[0].id}</label>
                                                            
                                                        </div>
                                                        <div className="form-group col-md-12">
                                                            <label>Transaction id : {this.state.orderDetails[0].trans_id}</label>
                                                            
                                                        </div>

                                                        <div className="form-group col-md-12">
                                                            <label>Product : {this.state.orderDetails[0].title}</label>
                                                            
                                                        </div>

                                                        <div className="form-group col-md-12">
                                                            <label>qty : {this.state.orderDetails[0].product_quantity}</label>
                                                            
                                                        </div>

                                                        <div className="form-group col-md-12">
                                                            <label>single Price : {this.state.orderDetails[0].price} </label> &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <label>Total Price : {this.state.orderDetails[0].total_price} </label>
                                                           
                                                        </div>

                                                    </div>
                                                   
                                                     
                                                </div>
                                                <div className="modal-footer">
                                                    <a href="#" className="btn btn-secondary" data-dismiss="modal">Close</a>
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

export default ShowOrders;