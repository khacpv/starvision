import React, {Component, lazy, Suspense} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Form,
    Input,
    FormGroup,
    Label,
    Container,Table
} from 'reactstrap';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {customerService} from "../../services/index";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fittingDate: new Date(),
            customerName: ''
        };
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    searchCustomer() {
        customerService.searchCustomer(this.state.customerName, '')
            .then(result => {
                console.log(result)
            }).catch(error => {
                console.log(error)
            }
        )
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs='8' style={{backgroundColor: 'white', padding: '15px 15px 15px 15px'}}>
                        <Form>
                            <h1 style={{ 'text-align': 'center', 'font-weight': 'bold', 'padding-top': 30}}>
                                ORTHOR-K FITTING
                            </h1>
                            <Row style={{ padding: 15}}>
                                <Col xs={4}>
                                    <FormGroup row>
                                        <Label>Ngày fitting:</Label>
                                        <div style={{ 'margin-left': 25}}>
                                            <DatePicker
                                                className="radius-border-input"
                                                selected={this.state.fittingDate}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col xs={4} style={{ 'padding-left': 25}}>
                                    <FormGroup row>
                                        <div>Ngày sinh:</div>
                                        <div style={{ 'margin-left': 25}}>
                                            <DatePicker
                                                className="radius-border-input"
                                                selected={this.state.fittingDate}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col xs={4}>
                                    <FormGroup row>
                                        <div style={{ 'padding-left': 15}}>Giới tính:</div>
                                        <FormGroup check style={{ 'margin': '0px 10px 0px 10px'}}>
                                            <Label check>
                                                <Input type="radio" name="radio1" />{' '}
                                                Nam
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio1" />{' '}
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
                                            <Input type="text" name="email" id="name" placeholder="" />
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col xs={4}>
                                    <FormGroup row>
                                        <Label for="phone" xs={4} style={{'padding-right': 0}}>Điện thoại:</Label>
                                        <Col xs={8}>
                                            <Input type="text" name="phone" id="phone" placeholder="" />
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={8}>
                                    <FormGroup row>
                                        <Label for="note" xs={3}>Ghi chú:</Label>
                                        <Col xs={9}>
                                            <Input type="text" name="note" id="note" placeholder="" />
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col xs={4}/>
                            </Row>
                        </Form>
                        <Form>
                            <Row>
                                <Col xs={6}>
                                    <h2>OS - Mắt trái</h2>
                                    <h3>Refactometer/Current Glasse VA/BCVA</h3>
                                    <div>
                                        <Table responsive className='table-solid'>
                                            <thead>
                                                <tr>
                                                    <th className='table-solid'></th>
                                                    <th className='table-solid'>VA</th>
                                                    <th className='table-solid'>SPH</th>
                                                    <th className='table-solid'>CYL</th>
                                                    <th className='table-solid'>AX</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th className='table-solid'>Refactometer</th>
                                                    <td className='table-solid'>
                                                        <Input type="text" name="note" id="note" placeholder="" />
                                                    </td>
                                                    <td className='table-solid'>
                                                        <Input type="text" name="note" id="note" placeholder="" />
                                                    </td>
                                                    <td className='table-solid'>
                                                        <Input type="text" name="note" id="note" placeholder="" />
                                                    </td>
                                                    <td className='table-solid'>
                                                        <Input type="text" name="note" id="note" placeholder="" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className='table-solid'>BCVA</th>
                                                    <td className='table-solid'>
                                                        <Input type="text" name="note" id="note" placeholder="" />
                                                    </td>
                                                    <td className='table-solid'>
                                                        <Input type="text" name="note" id="note" placeholder="" />
                                                    </td>
                                                    <td className='table-solid'>
                                                        <Input type="text" name="note" id="note" placeholder="" />
                                                    </td>
                                                    <td className='table-solid'>
                                                        <Input type="text" name="note" id="note" placeholder="" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Table responsive className='table-solid'>
                                            <thead>
                                            <tr>
                                                <th className='table-solid'>K1</th>
                                                <th className='table-solid'>K2</th>
                                                <th className='table-solid'>AVE</th>
                                                <th className='table-solid'>HVID</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                        <h3>
                                            Custom OK OS - Mắt trái
                                        </h3>
                                        <Table responsive className='table-solid'>
                                            <thead>
                                            <tr>
                                                <th className='table-solid'>Lense</th>
                                                <th className='table-solid'>K-code</th>
                                                <th className='table-solid'>Power</th>
                                                <th className='table-solid'>Size</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <h2>OD - Mắt phải</h2>
                                    <h3>Refactometer/Current Glasse VA/BCVA</h3>
                                    <div>
                                        <Table responsive className='table-solid'>
                                            <thead>
                                            <tr>
                                                <th className='table-solid'></th>
                                                <th className='table-solid'>VA</th>
                                                <th className='table-solid'>SPH</th>
                                                <th className='table-solid'>CYL</th>
                                                <th className='table-solid'>AX</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th className='table-solid'>Refactometer</th>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className='table-solid'>BCVA</th>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                        <Table responsive className='table-solid'>
                                            <thead>
                                            <tr>
                                                <th className='table-solid'>K1</th>
                                                <th className='table-solid'>K2</th>
                                                <th className='table-solid'>AVE</th>
                                                <th className='table-solid'>HVID</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                        <h3>
                                            Custom OK OS - Mắt phải
                                        </h3>
                                        <Table responsive className='table-solid'>
                                            <thead>
                                            <tr>
                                                <th className='table-solid'>Lense</th>
                                                <th className='table-solid'>K-code</th>
                                                <th className='table-solid'>Power</th>
                                                <th className='table-solid'>Size</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="text" name="note" id="note" placeholder="" />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Button style={{ 'margin-left': 15}}>Clear</Button>
                                <Button style={{ 'margin-left': 15}} color={'primary'}>Save</Button>
                                <Button style={{ 'margin-left': 15}} color={'success'}>Fitting 1</Button>
                            </Row>
                        </Form>
                    </Col>
                    <Col xs='4'>
                        <div style={{backgroundColor: 'white', padding: '15px 15px 15px 15px'}}>
                            <Row>
                                <div style={{ 'margin-left': 15}}><Input type="text" name="note" id="note" placeholder="tìm kiếm bệnh nhân" /></div>
                                <div className={'center-item'} style={{ 'margin': '2px 0 0 10px', 'background-color': 'grey', width: '30px', height: '30px', 'border-radius': 5}}>
                                    <i style={{margin: 'auto', display: 'block'}} className="fa fa-search"/>
                                </div>
                            </Row>
                            <div>
                                <Button style={{ 'margin-top': 15}}>Thêm bệnh nhân</Button>
                            </div>
                            <div style={{'margin-top': 20}}>
                                <Table responsive className='table-solid'>
                                    <thead>
                                    <tr style={{ 'background-color': '#F8F8F8'}}>
                                        <th className='table-solid'>Tên Bệnh Nhân</th>
                                        <th className='table-solid'>Ngày Sinh</th>
                                        <th className='table-solid'>Giới Tính</th>
                                        <th className='table-solid'>Địa Chỉ</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;
