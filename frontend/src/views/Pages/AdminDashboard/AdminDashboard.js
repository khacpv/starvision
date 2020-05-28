import React, {Component, lazy, Suspense} from 'react';
import {
    Button,
    Col,
    Row,
    Label, Table, Input, ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {adminServices} from "../../../services";
import ModalAddDoctor from "./ModalAddDoctor";

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            doctorsList: [],
            isShowModalDelete: false,
            doctorWillBeDeleted: null,
            isAddDoctor: false,
            searchName: ''
        };
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    componentDidMount() {
        this.getDoctors();
    }

    getDoctors() {
        this.setState({isLoading: true});
        adminServices.getDoctors(this.state.searchName)
            .then(result => {
                this.setState({doctorsList: result.items, isLoading: false})
            }).catch(error => {
                console.log(error);
                this.setState({isLoading: false})
            }
        )
    }

    removeDoctor() {
        adminServices.deleteDoctor(this.state.doctorWillBeDeleted).then(result => {
            this.setState({doctorWillBeDeleted: null, isShowModalDelete: false});
            this.getDoctors();
        }).catch(error => {
            console.log(error);
        })
    }

    editDoctor(data) {
        this.modalDoctor.setDataDefault(data);
        this.setState({
            isAddDoctor: true
        })
    }

    render() {
        return (
            <div className="animated fadeIn" style={{backgroundColor: 'white', padding: '30px 45px 30px 45px'}}>
                <ModalAddDoctor ref={child => {this.modalDoctor = child}} resetList={() => this.getDoctors()} isOpen={this.state.isAddDoctor} closeModal={() => this.setState({isAddDoctor: false})}/>
                <Modal isOpen={this.state.isShowModalDelete} toggle={() => {}}>
                    <ModalHeader toggle={() => this.setState({isShowModalDelete: false, doctorWillBeDeleted: null})}>Xác nhận</ModalHeader>
                    <ModalBody>
                        Bạn chắc chắn muốn xoá?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.setState({isShowModalDelete: false, doctorWillBeDeleted: null})}>Bỏ qua</Button>{' '}
                        <Button color="danger" onClick={() => this.removeDoctor()}>Xoá</Button>
                    </ModalFooter>
                </Modal>
                <Row style={{ justifyContent: 'space-between', padding: '0 15px 0 15px'}}>
                    <Row>
                        <div style={{ marginLeft: 15}}>
                            <Input type="text" name="note" id="note" placeholder="tìm kiếm bác sĩ" onChange={(event) => this.state.searchName = event.target.value} />
                        </div>
                        <Button onClick={() => this.getDoctors()} className={'center-item'} style={{ 'margin': '2px 0 0 5px', backgroundColor: 'grey', width: '30px', height: '30px', borderRadius: 5}}>
                            <i style={{margin: 'auto', display: 'block'}} className="fa fa-search"/>
                        </Button>
                    </Row>
                    <div>
                        <Button color={'success'} onClick={() => this.setState({isAddDoctor: true})}>Thêm bác sĩ</Button>
                    </div>
                </Row>
                <div style={{marginTop: 20}}>
                    <Table responsive className='table-solid'>
                        <thead>
                        <tr style={{ backgroundColor: '#F8F8F8'}}>
                            <th className='table-solid'>Tên Bác Sĩ</th>
                            <th className='table-solid'>Ngày Sinh</th>
                            <th className='table-solid'>Số điện thoại</th>
                            <th className='table-solid'>Cơ sở</th>
                            <th className='table-solid'></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.doctorsList.map((item, index) => (
                                <tr key={index}>
                                    <td className='table-solid'>
                                        {item.name}
                                    </td>
                                    <td className='table-solid'>
                                        {item.birthday || ''}
                                    </td>
                                    <td className='table-solid'>
                                        {item.phone}
                                    </td>
                                    <td className='table-solid'>
                                        {item.department_name}
                                    </td>
                                    <td>
                                        <Row style={{justifyContent: 'center'}}>
                                            <Button onClick={() => this.editDoctor(item)} style={{ 'margin-left': 15}} color={'primary'}>Chi tiết</Button>
                                            <Button onClick={() => this.setState({isShowModalDelete: true, doctorWillBeDeleted: item.id})} style={{ 'margin-left': 15}} color={'danger'}>Xoá</Button>
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

export default AdminDashboard;
