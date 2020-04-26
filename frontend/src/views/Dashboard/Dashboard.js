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
import OrderLenseForm from "./OrderLenseForm";

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
            orderLenseData: [],
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
                this.setState({customOK: customOK.data}, () => {
                    this.newOrderLense.resetForm();
                    this.getOrderLenseData(customer);
                    this.newOrderLense.setDefaultLense(customOK.data.customOk.customOk_L.od_custom_ok_lense, customOK.data.customOk.customOk_R.od_custom_ok_lense)
                });
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
                    fittingData[index/2] = {};
                    fittingData[index/2].fitting_no = data.fitting_no;
                    if (data.L) {
                        fittingData[index/2].fitting_left = data.L;
                    } else {
                        fittingData[index/2].fitting_right = data.R;
                    }
                } else {
                    if (data.L) {
                        fittingData[(index - 1)/2].fitting_left = data.L;
                    } else {
                        fittingData[(index - 1)/2].fitting_right = data.R;
                    }
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

    getOrderLenseData(customer) {
        const doctorData = JSON.parse(localStorage.getItem('user'));
        customerService.getOrderLenseById(customer.ID_KHACHHANG, doctorData.Id_Dttc).then(result => {
            this.setState({orderLenseData: result.data});
            result.data.map((data, index) => {
                this[`order${index}`].setData(data);
            })
        }).catch(error => console.log(error))
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
                            <h1 style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: 30}}>
                                ORTHOR-K FITTING
                            </h1>
                            <Row style={{ padding: 15}}>
                                <Col xs={4}>
                                    <FormGroup row>
                                        <div>Ngày sinh:</div>
                                        <div style={{ marginLeft: 25}}>
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
                                        <div style={{ paddingLeft: 15}}>Giới tính:</div>
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
                                        <Label for="phone" xs={4} style={{paddingRight: 0}}>Điện thoại:</Label>
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
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: currentTab === 3 })}
                                            onClick={() => { this.changeTab(3); }}
                                        >
                                            Follow Up
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={currentTab}>
                                    <TabPane tabId={0}>
                                        <CustomerOKForm getUserData={(customer) => this.getCustomOkData(customer)} ref={child => {this.customOk = child}} customer={this.state.customer}/>
                                    </TabPane>
                                    <TabPane tabId={1}>
                                        {
                                            this.state.fittingData.map((fitting, index) => (
                                                <FittingForm getUserData={(customer) => this.getFittingData(customer)} fittingNo={index + 1} key={index} data={fitting} ref={child => {this[`fitting${index}`] = child}} customer={this.state.customer}/>
                                            ))
                                        }
                                        <FittingForm getUserData={(customer) => this.getFittingData(customer)} fittingNo={this.state.fittingData.length + 1} ref={child => {this.newFitting = child}} isNew={true} customer={this.state.customer}/>
                                    </TabPane>
                                    {
                                        this.state.customOK &&
                                        <TabPane tabId={2}>
                                            {
                                                this.state.orderLenseData.map((order, index) => (
                                                    <OrderLenseForm getUserData={(customer) => this.getOrderLenseData(customer)} orderNo={index + 1} key={index} data={order} ref={child => {this[`order${index}`] = child}} customer={this.state.customer}/>
                                                ))
                                            }
                                            <OrderLenseForm getUserData={(customer) => this.getOrderLenseData(customer)}
                                                            defaultLense={{left: this.state.customOK.customOk.customOk_L.od_custom_ok_lense,
                                                                right: this.state.customOK.customOk.customOk_R.od_custom_ok_lense}}
                                                            orderNo={this.state.orderLenseData.length + 1} ref={child => {this.newOrderLense = child}} isNew={true} customer={this.state.customer}/>
                                        </TabPane>
                                    }
                                </TabContent>
                            </div> : <div style={{height: '100px', textAlign: 'center'}}>
                                <p style={{ marginTop: '100px'}}>Chưa có thông tin khách hàng</p>
                            </div>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;
