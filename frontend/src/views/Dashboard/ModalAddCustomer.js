import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    FormGroup,
    Label,
    FormText,
    Row, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import qs from 'qs';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import {customerService} from "../../services/index";
import _ from 'lodash';

class ModalAddCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tenkh: '',
            mobile: '',
            diachi: '',
            birthday: null,
            gender: null,
            ghichu: '',
        };
        this.createCustomer = _.debounce(this.createCustomer, 1000);
    }


    createCustomer() {
        const doctorData = JSON.parse(localStorage.getItem('profile'));
        const user = JSON.parse(localStorage.getItem('user'));
        const {tenkh, mobile, diachi, birthday, gender, ghichu} = this.state;
        customerService.addCustomer(qs.stringify({
            tenkh, mobile, diachi, birthday, gender, ghichu,
            tenbacsi: doctorData.user_nicename,
            mabacsi: doctorData.user_id,
            tendttc: user.Ten_DTTC,
            iddttc: user.Id_Dttc
        })).then(result => {
            if (result.status === "success") {
                alert('Đăng kí thành công');
                this.props.closeModal();
            } else {
                alert(result.message);
            }
        }).catch(error => {
            alert('Đã xảy ra lỗi');
        })
    }

    render() {
        const {tenkh, mobile, diachi, birthday, gender, ghichu} = this.state;
        const enabled = tenkh && mobile && diachi && birthday && gender;
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => {}}>
                <ModalHeader toggle={() => this.props.closeModal()}>Thêm bệnh nhân</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Tên bệnh nhân:</Label>
                            <Input onChange={(event) => {
                                if (!this.state.tenkh || !event.target.value) {
                                    this.setState({tenkh: event.target.value})
                                } else {
                                    this.state.tenkh = event.target.value
                                }
                            }} type="text" name="email" id="name" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Điện thoại:</Label>
                            <Input onChange={(event) => {
                                if (!this.state.mobile || !event.target.value) {
                                    this.setState({mobile: event.target.value})
                                } else {
                                    this.state.mobile = event.target.value
                                }
                            }} type="text" name="phone" id="phone" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Địa chỉ:</Label>
                            <Input onChange={(event) => {
                                if (!this.state.diachi || !event.target.value) {
                                    this.setState({diachi: event.target.value})
                                } else {
                                    this.state.diachi = event.target.value
                                }
                            }} type="text" name="address" id="address" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dob" style={{ 'padding-right': 20}}>Ngày sinh:</Label>
                            <DatePicker
                                className="radius-border-input"
                                selected={this.state.birthday}
                                maxDate={new Date()}
                                showYearDropdown={true}
                                onChange={(value) => this.setState({birthday: value})}
                            />
                        </FormGroup>
                        <FormGroup row>
                            <div style={{ 'padding-left': 15}}>Giới tính:</div>
                            <FormGroup check style={{ 'margin': '0px 10px 0px 10px'}}>
                                <Label check>
                                    <Input type="radio" name="radio1" onChange={() => this.setState({gender: 'male'})} />{' '}
                                    Nam
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" onChange={() => this.setState({gender: 'female'})} />{' '}
                                    Nữ
                                </Label>
                            </FormGroup>
                            <FormGroup check style={{ 'margin-left': 10}}>
                                <Label check>
                                    <Input type="radio" name="radio1" onChange={() => this.setState({gender: 'other'})} />{' '}
                                    Khác
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Ghi chú</Label>
                            <Input onChange={(event) => {
                                if (!this.state.ghichu || !event.target.value) {
                                    this.setState({ghichu: event.target.value})
                                } else {
                                    this.state.ghichu = event.target.value
                                }
                            }} type="textarea" name="note" id="note" />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color={enabled ? "primary" : "secondary"} onClick={() => enabled ? this.createCustomer() : alert('Vui lòng nhập đủ thông tin')}>Thêm</Button>{' '}
                    <Button color="danger" onClick={() => this.props.closeModal()}>Huỷ</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ModalAddCustomer.propTypes = {
    account: PropTypes.object
};

const mapStateToProps = state => ({
    account: state.account
});

const actions = dispatch => ({

});

export default connect(mapStateToProps, actions)(ModalAddCustomer);
