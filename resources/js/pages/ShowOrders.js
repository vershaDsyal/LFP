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
            LoggedUser: [''],
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
            console.log(data);

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

                                                    </tr>
                                                ))
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div> 
                            
                        </div>
                    </div>
               
            </div>
        );
    }
}   

export default ShowOrders;