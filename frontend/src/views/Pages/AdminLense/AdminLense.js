import React, {Component} from 'react';
import {
    Button, Modal, ModalBody, ModalFooter, ModalHeader,
    Row, Table
} from 'reactstrap';
import {adminServices} from "../../../services";
import moment from "moment";

class AdminLense extends Component {
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
        this.getOrderLense();
    }

    getOrderLense() {
        this.setState({isLoading: true});
        adminServices.getOrderLenseList()
            .then(result => {
                if (result.status === 'success') {
                    this.setState({lenseList: result.data})
                }
            }).catch(error => {
                console.log(error);
            }
        )
    }

    remoteOrderLense() {
        adminServices.deleteOrderLense(this.state.lenseChoosing).then(result => {
            this.setState({lenseChoosing: null, isShowModalDelete: false});
            this.getOrderLense();
        }).catch(error => {
            console.log(error);
        })
    }

    editDoctor(data) {
        this.props.history.push(`/detailOrderLense/${data.So_Don_Hang}`);
    }

    render() {
        return (
            <div className="animated fadeIn" style={{backgroundColor: 'white', padding: '30px 45px 30px 45px'}}>
                <Modal isOpen={this.state.isShowModalDelete} toggle={() => {}}>
                    <ModalHeader toggle={() => this.setState({isShowModalDelete: false, lenseChoosing: null})}>Xác nhận</ModalHeader>
                    <ModalBody>
                        Bạn chắc chắn muốn xoá?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.setState({isShowModalDelete: false, lenseChoosing: null})}>Bỏ qua</Button>{' '}
                        <Button color="danger" onClick={() => this.remoteOrderLense()}>Xoá</Button>
                    </ModalFooter>
                </Modal>
                <div style={{marginTop: 20}}>
                    <Table responsive className='table-solid'>
                        <thead>
                        <tr style={{ backgroundColor: '#F8F8F8'}}>
                            <th className='table-solid'>Số đơn hàng</th>
                            <th className='table-solid'>Ngày tạo</th>
                            <th className='table-solid'>Loại kính</th>
                            <th className='table-solid'></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.lenseList.map((item, index) => (
                                <tr key={index}>
                                    <td className='table-solid'>
                                        {item.So_Don_Hang}
                                    </td>
                                    <td className='table-solid'>
                                        {item.Ngay}
                                    </td>
                                    <td className='table-solid'>
                                        {item.type}
                                    </td>
                                    <td>
                                        <Row style={{justifyContent: 'center'}}>
                                            <Button onClick={() => this.editDoctor(item)} style={{ 'margin-left': 15}} color={'primary'}>Chi tiết</Button>
                                            <Button onClick={() => this.setState({isShowModalDelete: true, lenseChoosing: item.id})} style={{ 'margin-left': 15}} color={'danger'}>Xoá</Button>
                                        </Row>
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

export default AdminLense;
