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
import FollowUpForm from "./FollowUpForm";
import SoftOkForm from "./SoftOkForm";

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
            customOKSoft: null,
            fittingData: [],
            orderLenseData: [],
            followUpData: [],
            isLoading: false,
            type: 'GOV'
        };
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    getUserData(customer) {
        this.setState({
            customer
        });
        this.getCustomOkGOVData(customer);
        this.getCustomOkSoftData(customer);
        this.getFittingData(customer);
        this.getFollowUpData(customer);
    }

    getCustomOkGOVData(customer) {
        const doctorData = JSON.parse(localStorage.getItem('user'));
        customerService.getCustomOkGOVById(customer.ID_KHACHHANG, doctorData.Id_Dttc).then(customOK => {
            if (customOK.data === '') {
                this.customOk.resetForm();
                this.setState({customOK: null});
            } else {
                this.customOk.setData(customOK.data.customOk);
                this.setState({customOK: customOK.data}, () => {
                    this.newOrderLense.resetForm();
                    this.getOrderLenseData(customer);
                    this.newOrderLense.setDefaultLense(customOK.data.customOk)
                });
            }
        }).catch(error => {
            console.log(error)
        });
    }

    getCustomOkSoftData(customer) {
        const doctorData = JSON.parse(localStorage.getItem('user'));
        customerService.getCustomOkSoftById(customer.ID_KHACHHANG, doctorData.Id_Dttc).then(customOK => {
            if (customOK.data === '') {
                this.customOkSoft.resetForm();
                this.setState({customOKSoft: null});
            } else {
                this.customOkSoft.setData(customOK.data.customOk);
                // this.setState({customOKSoft: customOK.data}, () => {
                //     this.newOrderLense.resetForm();
                //     this.getOrderLenseData(customer);
                //     this.newOrderLense.setDefaultLense(customOK.data.customOk)
                // });
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

    getFollowUpData(customer) {
        const doctorData = JSON.parse(localStorage.getItem('user'));
        customerService.getFollowUpById(customer.ID_KHACHHANG, doctorData.Id_Dttc).then(result => {
            this.newFollowUp.resetForm();
            let followData = [];
            result.data.map((data, index) => {
                if (index % 2 === 0) {
                    followData[index/2] = {};
                    followData[index/2].ngaykham = data.ngaykham;
                    followData[index/2].ngaytaikham = data.ngaytaikham;
                    followData[index/2].note = data.comment;
                    if (data.L) {
                        followData[index/2].follow_left = data.L;
                    } else {
                        followData[index/2].follow_right = data.R;
                    }
                } else {
                    if (data.L) {
                        followData[(index - 1)/2].follow_left = data.L;
                    } else {
                        followData[(index - 1)/2].follow_right = data.R;
                    }
                }
            });
            this.setState({followUpData: followData});
            followData.map((data, index) => {
                this[`follow${index}`].setData(data);
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
                                            GOV-OK
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: currentTab === 4 })}
                                            onClick={() => { this.changeTab(4); }}
                                        >
                                            ARTMOST SOFT-OK
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
                                        <CustomerOKForm getUserData={(customer) => this.getCustomOkGOVData(customer)} ref={child => {this.customOk = child}} customer={this.state.customer}/>
                                    </TabPane>
                                    <TabPane tabId={4}>
                                        <SoftOkForm getUserData={(customer) => this.getCustomOkSoftData(customer)} ref={child => {this.customOkSoft = child}} customer={this.state.customer}/>
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
                                            <FormGroup row>
                                                <div style={{ 'padding-left': 15}}>Loại kính:</div>
                                                <FormGroup check style={{ 'margin': '0px 10px 0px 10px'}}>
                                                    <Label check>
                                                        <Input type="radio" name="type" onChange={() => this.setState({type: 'GOV'})} checked={this.state.type === 'GOV'}/>{' '}
                                                        GOV
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio" name="type" onChange={() => this.setState({type: 'SOFT'})} checked={this.state.type === 'SOFT'}/>{' '}
                                                        SOFT
                                                    </Label>
                                                </FormGroup>
                                            </FormGroup>
                                            {
                                                this.state.orderLenseData.map((order, index) => (
                                                    <OrderLenseForm getUserData={(customer) => this.getOrderLenseData(customer)} orderNo={index + 1} key={index} data={order} ref={child => {this[`order${index}`] = child}} customer={this.state.customer}/>
                                                ))
                                            }
                                            <OrderLenseForm getUserData={(customer) => this.getOrderLenseData(customer)}
                                                            defaultLense={this.state.customOK.customOk}
                                                            orderNo={this.state.orderLenseData.length + 1} ref={child => {this.newOrderLense = child}} isNew={true} customer={this.state.customer}/>
                                        </TabPane>
                                    }
                                    <TabPane tabId={3}>
                                        {
                                            this.state.followUpData.map((order, index) => (
                                                <FollowUpForm getUserData={(customer) => this.getFollowUpData(customer)} orderNo={index + 1} key={index} data={order} ref={child => {this[`follow${index}`] = child}} customer={this.state.customer}/>
                                            ))
                                        }
                                        <FollowUpForm getUserData={(customer) => this.getFollowUpData(customer)}
                                                        followNo={this.state.followUpData.length + 1} ref={child => {this.newFollowUp = child}} isNew={true} customer={this.state.customer}/>
                                    </TabPane>
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
