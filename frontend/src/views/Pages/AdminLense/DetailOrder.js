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
            data: null,
        };
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    componentDidMount() {
        const query = queryString.parse(this.props.location.search);
        if (query.id) {
            this.getOrderDetail(query.id);
        }
    }

    getOrderDetail(id) {
        this.setState({isLoading: true});
        adminServices.getOrderDetail(id)
            .then(result => {
                if (result.msg === 'success') {
                    this.setState({data: result.items})
                }
            }).catch(error => {
                console.log(error);
            }
        )
    }

    removeOrderLense() {
        adminServices.deleteOrderLense(this.state.data.id).then(result => {
            this.setState({isShowModalDelete: false});
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        const data = this.state.data;
        if (data) {
            return (
                <div className="animated fadeIn" style={{backgroundColor: 'white', padding: '30px 45px 30px 45px', width: '1200px'}}>
                    <Modal isOpen={this.state.isShowModalDelete} toggle={() => {}}>
                        <ModalHeader toggle={() => this.setState({isShowModalDelete: false})}>Xác nhận</ModalHeader>
                        <ModalBody>
                            Bạn chắc chắn muốn xoá?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.setState({isShowModalDelete: false})}>Bỏ qua</Button>{' '}
                            <Button color="danger" onClick={() => this.removeOrderLense()}>Xoá</Button>
                        </ModalFooter>
                    </Modal>
                    <Row>
                        <h3 style={{ paddingLeft: 15}}>Loại kính: {data.type === 'SOFT' ? 'SOFT-OK' : 'GOV-OK'}</h3>
                        <Col xs={12} style={{ marginTop: 10}}>
                            <h3>Suggested Order lens - Số Order: {data.order_number || '---'}</h3>
                            <h4>Ngày đặt hàng: {data.createdAt ? moment(new Date(data.createdAt)).format('MM-DD-YYYY') : ''}</h4>
                        </Col>
                        <Col xs={6}>
                            <div>
                                <Table responsive className='table-solid'>
                                    <tbody>
                                    <tr>
                                        <th className='table-solid' rowSpan={2}>OS</th>
                                        {
                                            data.type === 'GOV' && <td className='table-solid'>
                                                Lense: {data.left.lense}
                                            </td>
                                        }
                                        {
                                            data.type === 'GOV' && <td className='table-solid'>
                                                K-code: {data.left.kcode}
                                            </td>
                                        }
                                        {
                                            data.type === 'GOV' ? <td className='table-solid'>
                                                Power: {data.left.power}
                                            </td> : <td className='table-solid' colSpan={2}>
                                                Power: {data.left.power}
                                            </td>
                                        }
                                        {
                                            this.state.type !== 'GOV' && <td className='table-solid'>
                                                Prefix: STV
                                            </td>
                                        }
                                        {
                                            this.state.type === 'GOV' && <td className='table-solid'>
                                                Size: {data.left.side}
                                            </td>
                                        }
                                    </tr>
                                    <tr>
                                        <td className='table-solid' colSpan={2}>
                                            <h4>Giá tiền: </h4>
                                            <p>{data.left.price}</p>
                                        </td>
                                        <td className='table-solid' colSpan={2}>
                                            <h4>Trạng thái: </h4>
                                            <p>{data.left.status}</p>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div>
                                <Table responsive className='table-solid'>
                                    <tbody>
                                    <tr>
                                        <th className='table-solid' rowSpan={2}>OS</th>
                                        {
                                            data.type === 'GOV' && <td className='table-solid'>
                                                Lense: {data.right.lense}
                                            </td>
                                        }
                                        {
                                            data.type === 'GOV' && <td className='table-solid'>
                                                K-code: {data.right.kcode}
                                            </td>
                                        }
                                        {
                                            data.type === 'GOV' ? <td className='table-solid'>
                                                Power: {data.right.power}
                                            </td> : <td className='table-solid' colSpan={2}>
                                                Power: {data.right.power}
                                            </td>
                                        }
                                        {
                                            this.state.type !== 'GOV' && <td className='table-solid'>
                                                Prefix: STV
                                            </td>
                                        }
                                        {
                                            this.state.type === 'GOV' && <td className='table-solid'>
                                                Size: {data.right.side}
                                            </td>
                                        }
                                    </tr>
                                    <tr>
                                        <td className='table-solid' colSpan={2}>
                                            <h4>Giá tiền: </h4>
                                            <p>{data.right.price}</p>
                                        </td>
                                        <td className='table-solid' colSpan={2}>
                                            <h4>Trạng thái: </h4>
                                            <p>{data.right.status}</p>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                    <div>
                        Ghi chú: {data.note}
                    </div>
                </div>
            );
        } else {
            return (<div className="animated fadeIn pt-1 text-center">Loading...</div>)
        }

    }
}

export default DetailOrder;
