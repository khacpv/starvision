import React, {Component, lazy, Suspense} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {
    Button,
    Col,
    Row,
    Form,
    Input,
    FormGroup,
    Label,
    TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {customerService} from "../../services/index";
import moment from 'moment';
import CustomerList from "../../containers/CustomerList";
import CustomerOKForm from "./CustomerOKForm";
import classnames from 'classnames';
import FittingForm from "./FittingForm";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerSearchName: '',
            customer: {},
            isAddCustomer: false,
            customerList: [],
            currentTab: 0,
            customOK: null,
            fittingData: [],
            isLoading: false
        };
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    getUserData(customer) {
        this.setState({
            customer
        });
        this.getCustomOkData(customer);
        this.getFittingData(customer);
    }

    getCustomOkData(customer) {
        const doctorData = JSON.parse(localStorage.getItem('user'));
        customerService.getCustomOkById(customer.ID_KHACHHANG, doctorData.Id_Dttc).then(customOK => {
            if (customOK.data === '') {
                this.customOk.resetForm();
                this.setState({customOK: null});
            } else {
                this.customOk.setData(customOK.data.customOk);
                this.setState({customOK: customOK.data});
            }
        }).catch(error => {
            console.log(error)
        });
    }

    getFittingData(customer) {
        const doctorData = JSON.parse(localStorage.getItem('user'));
        customerService.getFittingById(customer.ID_KHACHHANG, doctorData.Id_Dttc).then(fitting => {
            this.newFitting.resetForm();
            let fittingData = [];
            fitting.data.map((data, index) => {
                if (index % 2 === 0) {
                    fittingData[index] = {};
                    fittingData[index].fitting_no = data.fitting_no;
                    fittingData[index].fitting_right = data.R;
                } else {
                    fittingData[index - 1].fitting_left = data.L;
                }
            });
            this.setState({fittingData: fittingData});
            fittingData.map((data, index) => {
                this[`fitting${index}`].setData(data);
            })
        }).catch(error => {
            console.log(error)
        })
    }

    changeTab(tab) {
        this.setState({currentTab: tab});
    }

    render() {
        const {currentTab} = this.state;
        return (
            <div className="animated fadeIn overflow-content">
                <Row style={{ width: '1600px'}}>
                    <Col xs='3'>
                        <CustomerList getUserData={(customer) => this.getUserData(customer)}/>
                    </Col>
                    <Col xs='9' style={{backgroundColor: 'white', padding: '15px 15px 15px 15px'}}>
                        <Form>
                            <h1 style={{ 'text-align': 'center', 'font-weight': 'bold', 'padding-top': 30}}>
                                ORTHOR-K FITTING
                            </h1>
                            <Row style={{ padding: 15}}>
                                <Col xs={4}>
                                    <FormGroup row>
                                        <div>Ngày sinh:</div>
                                        <div style={{ 'margin-left': 25}}>
                                            <DatePicker
                                                disabled
                                                className="radius-border-input"
                                                selected={this.state.customer.NAMSINH ? new Date(this.state.customer.NAMSINH) : null}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col xs={8}>
                                    <FormGroup disabled row>
                                        <div style={{ 'padding-left': 15}}>Giới tính:</div>
                                        <FormGroup check style={{ 'margin': '0px 10px 0px 10px'}}>
                                            <Label check>
                                                <Input checked={this.state.customer.GIOITINH === 'male'} type="radio" name="radio1" disabled/>{' '}
                                                Nam
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input checked={this.state.customer.GIOITINH === 'female'} type="radio" name="radio1" disabled/>{' '}
                                                Nữ
                                            </Label>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={8}>
                                    <FormGroup row>
                                        <Label for="name" xs={3}>Tên bệnh nhân:</Label>
                                        <Col xs={9}>
                                            <Input value={this.state.customer.TENKHACHHANG} type="text" placeholder="" disabled/>
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col xs={4}>
                                    <FormGroup row>
                                        <Label for="phone" xs={4} style={{'padding-right': 0}}>Điện thoại:</Label>
                                        <Col xs={8}>
                                            <Input value={this.state.customer.DIDONG} type="text" placeholder="" disabled/>
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={8}>
                                    <FormGroup row>
                                        <Label for="note" xs={3}>Địa chỉ:</Label>
                                        <Col xs={9}>
                                            <Input value={this.state.customer.DIACHI} type="text" placeholder="" disabled/>
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col xs={4}/>
                            </Row>
                        </Form>
                        {
                            this.state.customer.TENKHACHHANG ? <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: currentTab === 0 })}
                                            onClick={() => { this.changeTab(0); }}
                                        >
                                            CustomOk
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: currentTab === 1 })}
                                            onClick={() => { this.changeTab(1); }}
                                        >
                                            Fitting
                                        </NavLink>
                                    </NavItem>
                                    {
                                        this.state.customOK && <NavItem>
                                            <NavLink
                                                className={classnames({ active: currentTab === 2 })}
                                                onClick={() => { this.changeTab(2); }}
                                            >
                                                Order lense
                                            </NavLink>
                                        </NavItem>
                                    }

                                </Nav>
                                <TabContent activeTab={currentTab}>
                                    <TabPane tabId={0}>
                                        <CustomerOKForm getUserData={(customer) => this.getCustomOkData(customer)} ref={child => {this.customOk = child}} customer={this.state.customer}/>
                                    </TabPane>
                                    <TabPane tabId={1}>
                                        {
                                            this.state.fittingData.map((fitting, index) => (
                                                <FittingForm fittingNo={index + 1} index={index} data={fitting} ref={child => {this[`fitting${index}`] = child}} customer={this.state.customer}/>
                                            ))
                                        }
                                        <FittingForm fittingNo={this.state.fittingData.length + 1} ref={child => {this.newFitting = child}} isNew={true} customer={this.state.customer}/>
                                    </TabPane>
                                    {
                                        this.state.customOK &&
                                        <TabPane tabId={2}>

                                        </TabPane>
                                    }
                                </TabContent>
                            </div> : <div style={{height: '100px', 'text-align': 'center'}}>
                                <p style={{ 'margin-top': '100px'}}>Chưa có thông tin khách hàng</p>
                            </div>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;
