import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTable } from "react-table";

class ShowUsers extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            UsersList: [''],
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
         this.fetchUsers();
    }

     //Fetch All users List 
    fetchUsers() {

        axios.get('/user').then(({data})=>{
            this.setState({
                UsersList: data,
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
                        <h3 className="section-title">Users List</h3>
                        <div className="card"> 
                            <div className="card-body">

                                <table className="table table-bordered mb-0 text-center">
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        this.state.UsersList.length > 0 && (
                                               this.state.UsersList.map((row, key)=>(

                                                    <tr key={key}>
                                                        <td>{row.id}</td>
                                                        <td>{row.name}</td>
                                                        <td>{row.email} AED</td>
                                                        <td>
                                                            

                                                        
                                                        </td>

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

export default ShowUsers;