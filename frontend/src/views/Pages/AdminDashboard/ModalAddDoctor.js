import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Form,
    Input,
    FormGroup,
    Label,
    Row, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import qs from 'qs';
import DatePicker from "react-datepicker";
import _ from 'lodash';
import {adminServices} from "../../../services";

class ModalAddDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            birthday: null,
            department_name: null,
            address: null,
            phone: null,
            username: null,
            password: null,
            note: null,
            email: null,
            dttc_name: null,
            gender: null,
            id: null
        };
        this.createDoctor = _.debounce(this.createDoctor, 1000);
    }

    resetData() {
        this.setState({
            name: null,
            birthday: null,
            department_name: null,
            address: null,
            phone: null,
            username: null,
            password: null,
            note: null,
            email: null,
            dttc_name: null,
            gender: null,
            id: null
        })
    }

    setDataDefault(data) {
        this.setState({
            name: data.name,
            birthday: data.birthday,
            department_name: data.department_name,
            address: data.address,
            phone: data.phone,
            username: data.username,
            password: data.password,
            note: data.note,
            email: data.email,
            dttc_name: data.dttc_name,
            gender: data.gender,
            id: data.id
        })
    }

    createDoctor() {
        const {name, birthday, department_name, address, phone, username, password, note, email, dttc_name, gender} = this.state;
        adminServices.createDoctor({name, birthday, department_name, address, phone, username, password, note, email, dttc_name, gender}).then(result => {
            if (result.msg === "success") {
                alert('Đăng kí thành công');
                this.props.resetList();
                this.resetData();
                this.props.closeModal();
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại sau')
            }
        }).catch(error => {
            console.log(error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau')
        })
    }

    updateDoctor() {
        const {name, birthday, department_name, address, phone, username, password, note, email, dttc_name, gender} = this.state;
        adminServices.updateDoctor({name, birthday, department_name, address, phone, username, password, note, email, dttc_name, gender},
            this.state.id).then(result => {
            if (result.msg === "success") {
                alert('Cập nhật thành công');
                this.props.resetList();
                this.resetData();
                this.props.closeModal();
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại sau')
            }
        }).catch(error => {
            console.log(error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau')
        })
    }

    render() {
        const headerLabel = !this.state.username ? 'Thêm bác sĩ' : 'Thông tin bác sĩ';
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => {}}>
                <ModalHeader toggle={() => {
                    this.resetData();
                    this.props.closeModal()
                }}>{headerLabel}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Tên bác sĩ:</Label>
                            <Input onChange={(event) => {
                                this.setState({name: event.target.value})
                            }} value={this.state.name} type="text" name="name" id="name" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Tên cơ sở:</Label>
                            <Input onChange={(event) => {
                                this.setState({department_name: event.target.value})
                            }} value={this.state.department_name} type="text" name="department_name" id="department_name" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Địa chỉ:</Label>
                            <Input onChange={(event) => {
                                this.setState({address: event.target.value})
                            }} value={this.state.address} type="text" name="address" id="address" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Số điện thoại:</Label>
                            <Input onChange={(event) => {
                                this.setState({phone: event.target.value})
                            }} value={this.state.phone} type="text" name="phone" id="phone" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Tên đăng nhập:</Label>
                            <Input onChange={(event) => {
                                this.setState({username: event.target.value})
                            }} value={this.state.username} type="text" name="username" id="username" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Mật khẩu:</Label>
                            <Input onChange={(event) => {
                                this.setState({password: event.target.value})
                            }} value={this.state.password} type="text" name="password" id="password" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Tên đối tượng tiếp cận:</Label>
                            <Input onChange={(event) => {
                                this.setState({dttc_name: event.target.value})
                            }} value={this.state.dttc_name} type="text" name="dttc_name" id="dttc_name" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Email:</Label>
                            <Input onChange={(event) => {
                                this.setState({email: event.target.value})
                            }} value={this.state.email} type="mail" name="email" id="email" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dob" style={{ paddingRight: 20}}>Ngày sinh:</Label>
                            <DatePicker
                                className="radius-border-input"
                                dateFormat="dd/MM/yyyy"
                                selected={this.state.birthday ? new Date(this.state.birthday) : null}
                                maxDate={new Date()}
                                showYearDropdown={true}
                                onChange={(value) => this.setState({birthday: value})}
                            />
                        </FormGroup>
                        <FormGroup row>
                            <div style={{ paddingLeft: 15}}>Giới tính:</div>
                            <FormGroup check style={{ 'margin': '0px 10px 0px 10px'}}>
                                <Label check>
                                    <Input type="radio" checked={this.state.gender === 'male'} name="gender" onChange={() => this.setState({gender: 'male'})} />{' '}
                                    Nam
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" checked={this.state.gender === 'female'} name="gender" onChange={() => this.setState({gender: 'female'})} />{' '}
                                    Nữ
                                </Label>
                            </FormGroup>
                            <FormGroup check style={{ marginLeft: 10}}>
                                <Label check>
                                    <Input type="radio" checked={this.state.gender === 'other'} name="gender" onChange={() => this.setState({gender: 'other'})} />{' '}
                                    Khác
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Ghi chú</Label>
                            <Input onChange={(event) => {
                                this.setState({note: event.target.value})
                            }} value={this.state.note} type="textarea" name="note" id="note" />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color={"primary"} onClick={() => this.state.id ? this.updateDoctor() : this.createDoctor()}>{this.state.id ? 'Cập nhật' : 'Thêm'}</Button>{' '}
                    <Button color="danger" onClick={() => {
                        this.props.closeModal();
                        this.resetData();
                    }}>Huỷ</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalAddDoctor;
