import React, {Component} from 'react';
import {
    Button,
    Card,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label, Modal, ModalBody, ModalFooter, ModalHeader,
    Row, Table
} from 'reactstrap';
import {adminServices} from "../../../services";
import moment from "moment";
const queryString = require('query-string');

class DetailOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            lenseList: [],
            isShowModalDelete: false,
            lenseChoosing: null,
        };
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    componentDidMount() {
        console.log(queryString.parse(this.props.location.search));
        this.getOrderDetail();
    }

    getOrderDetail() {
        this.setState({isLoading: true});
        adminServices.getOrderDetail()
            .then(result => {
                if (result.status === 'success') {
                    this.setState({lenseList: result.data})
                }
            }).catch(error => {
                console.log(error);
            }
        )
    }

    render() {
        return (
            <div className="animated fadeIn" style={{backgroundColor: 'white', padding: '30px 45px 30px 45px'}}>

            </div>
        );
    }
}

export default DetailOrder;
