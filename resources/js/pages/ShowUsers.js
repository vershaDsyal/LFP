import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTable } from "react-table";
import Table from "./Table";

   
class ShowUsers extends Component {



    constructor(props) {
        super(props);
        this.state = { 
            UsersList: [''],
            data:[],
            LoggedUser: [''],
            Loader:false,
            errors: {},
            pid:'',
            columns :  [
                          {
                            // first group - TV Show
                            Header: "Users",
                            // First group columns
                            columns: [
                              {
                                Header: "Name",
                                accessor: "name",
                              }
                            ],
                          },
                          {
                            // Second group - Details
                            Header: "Details",
                            // Second group columns
                            columns: [
                              {
                                Header: "Email",
                                accessor: "email",
                              },
                              {
                                Header: "Status",
                                accessor: "id",
                                
                                    Cell: ({ value }) => (
                                      <div>
                                        <button className="btn btn-primary btn-xs" data-toggle="modal" data-target="#defaultModal"  onClick={this.viewFull.bind(value)}>Edit</button>
                                      </div>
                                    )       
                              },
                            ],
                          },
                        ],
            title: '',
            description : '',
            price: '',
            modalClasses: ['modal','fade'],
        };

    }
   
    componentDidMount() {
         this.fetchUsers();
    }

    viewFull(row){
        console.log(row);
    }

     //Fetch All users List 
    fetchUsers() {

        axios.get('/user').then(({data})=>{
            this.setState({
                UsersList: data,
                data:data
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

                            <Table columns={this.state.columns} data={this.state.UsersList} />

                               
                            </div>
                            
                        </div>
                    </div>
               
            </div>
        );
    }
}   

export default ShowUsers;