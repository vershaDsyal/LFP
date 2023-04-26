import React, { Component } from 'react';
import {Link} from 'react-router';

class ProductLists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    
    }
   
    componentDidMount() {    
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