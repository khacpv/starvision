import React, {Component, lazy, Suspense} from 'react';
import {
    Button,
    Row,
    Input,
    Container,Table
} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import {customerService} from "../../services";
import ModalAddCustomer from "./ModalAddCustomer";
import moment from 'moment';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerSearchName: '',
            isAddCustomer: false,
            customerList: [],
            isLoading: false
        };
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    searchCustomer() {
        this.setState({isLoading: true});
        const doctorData = JSON.parse(localStorage.getItem('user'));
        customerService.searchCustomer(doctorData.Tenbacsi, this.state.customerSearchName)
            .then(result => {
                this.setState({customerList: result.data, isLoading: false})
            }).catch(error => {
                console.log(error);
                this.setState({isLoading: false})
            }
        )
    }

    render() {
        return (
            <div style={{backgroundColor: 'white', padding: '15px 15px 15px 15px', maxHeight: '1000px', overflowY: 'scroll'}}>
                <ModalAddCustomer isOpen={this.state.isAddCustomer} closeModal={() => this.setState({isAddCustomer: false})}/>
                <Row>
                    <div style={{ marginLeft: 15}}>
                        <Input type="text" name="note" id="note" placeholder="tìm kiếm bệnh nhân" onChange={(event) => this.state.customerSearchName = event.target.value} />
                    </div>
                    <Button onClick={() => this.searchCustomer()} className={'center-item'} style={{ 'margin': '2px 0 0 5px', backgroundColor: 'grey', width: '30px', height: '30px', borderRadius: 5}}>
                        <i style={{margin: 'auto', display: 'block'}} className="fa fa-search"/>
                    </Button>
                </Row>
                <div>
                    <Button style={{ marginTop: 15}} onClick={() => this.setState({isAddCustomer: true})}>Thêm bệnh nhân</Button>
                </div>
                <div style={{marginTop: 20}}>
                    <Table responsive className='table-solid'>
                        <thead>
                        <tr style={{ backgroundColor: '#F8F8F8'}}>
                            <th className='table-solid'>Tên Bệnh Nhân</th>
                            <th className='table-solid'>Ngày Sinh</th>
                            <th className='table-solid'>Giới Tính</th>
                            <th className='table-solid'>Địa Chỉ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.customerList.map((item, index) => (
                                <tr onClick={() => this.props.getUserData(item)} className={'table-hover'} key={index}>
                                    <td className='table-solid'>
                                        {item.TENKHACHHANG}
                                    </td>
                                    <td className='table-solid'>
                                        {item.NAMSINH}
                                    </td>
                                    <td className='table-solid'>
                                        {item.GIOITINH === 'male' ? 'Nam' : 'Nữ'}
                                    </td>
                                    <td className='table-solid'>
                                        {item.DIACHI}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default CustomerList;
