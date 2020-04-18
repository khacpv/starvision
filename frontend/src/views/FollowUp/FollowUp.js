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
import CustomerList from "../../containers/CustomerList";

class FollowUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fittingDate: new Date(),
            a: null
        };
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        let klist = [];
        for (let k = 40; k <= 47.25 ; k+= 0.25) {
            klist.push(<option>{k.toFixed(2)}</option>)
        }
        let plist = [
            <option>{-3}</option>,
            <option>{-7}</option>,
            <option>{3}</option>
        ];
        let slist = [];
        for (let s = 10.4; s <= 11.6 ; s+= 0.20) {
            slist.push(<option>{s.toFixed(2)}</option>)
        }
        return (
            <div className="animated fadeIn overflow-content">
                <Row style={{width: '1600px'}}>
                    <Col xs='3'>
                        <CustomerList/>
                    </Col>
                    <Col xs='9' style={{backgroundColor: 'white', padding: '15px 15px 15px 15px'}}>
                        <Form>
                            <h1 style={{ 'text-align': 'center', 'font-weight': 'bold', 'padding-top': 30}}>
                                FOLLOW UP
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
                        </Form>
                        <Form>
                            <Row>
                                <Col xs={6}>
                                    <h3>
                                        OS - Mắt trái
                                    </h3>
                                    <Table responsive className='table-solid'>
                                        <thead>
                                        <tr>
                                            <th className='table-solid'>K-code</th>
                                            <th className='table-solid'>Power</th>
                                            <th className='table-solid'>Size</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className='table-solid'>
                                                <Input onChange={() => console.log(this.state.a)} type="text" name="note" id="note" placeholder="" />
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
                                    <div>
                                        <Table responsive className='table-solid'>
                                            <tbody>
                                            <tr>
                                                <th className='table-solid'>Fitting</th>
                                                <td className='table-solid'>
                                                    <Input type="select" name="select" id="exampleSelect">
                                                        {klist}
                                                    </Input>
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="select" name="select" id="exampleSelect">
                                                        {plist}
                                                    </Input>
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="select" name="select" id="exampleSelect">
                                                        {slist}
                                                    </Input>
                                                </td>
                                                <td className='table-solid'/>
                                            </tr>
                                            <tr>
                                                <th className='table-solid'>BCVA</th>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className='table-solid'>Over Refraction:</th>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'/>
                                            </tr>
                                            <tr>
                                                <th className='table-solid'>Comments</th>
                                                <td className='table-solid' colspan="4">
                                                    <div>
                                                        <h5>Size:</h5>
                                                        <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                        <h5 style={{'margin-top': 5}}>Alignment zone:</h5>
                                                        <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                        <h5 style={{'margin-top': 5}}>Compress zone:</h5>
                                                        <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                        <h5 style={{'margin-top': 5}}>Kết luận:</h5>
                                                        <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className='table-solid'>Video</th>
                                                <td className='table-solid'colspan="4">
                                                    <Input type="file" name="file" id="exampleFile" />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <h3>OD - Mắt phải</h3>
                                    <Table responsive className='table-solid'>
                                        <thead>
                                        <tr>
                                            <th className='table-solid'>K-code</th>
                                            <th className='table-solid'>Power</th>
                                            <th className='table-solid'>Size</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className='table-solid'>
                                                <Input onChange={() => console.log(this.state.a)} type="text" name="note" id="note" placeholder="" />
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
                                    <div>
                                        <Table responsive className='table-solid'>
                                            <tbody>
                                            <tr>
                                                <th className='table-solid'>Fitting</th>
                                                <td className='table-solid'>
                                                    <Input type="select" name="select" id="exampleSelect">
                                                        {klist}
                                                    </Input>
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="select" name="select" id="exampleSelect">
                                                        {plist}
                                                    </Input>
                                                </td>
                                                <td className='table-solid'>
                                                    <Input type="select" name="select" id="exampleSelect">
                                                        {slist}
                                                    </Input>
                                                </td>
                                                <td className='table-solid'/>
                                            </tr>
                                            <tr>
                                                <th className='table-solid'>BCVA</th>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className='table-solid'>Over Refraction:</th>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'>
                                                    <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                </td>
                                                <td className='table-solid'/>
                                            </tr>
                                            <tr>
                                                <th className='table-solid'>Comments</th>
                                                <td className='table-solid' colspan="4">
                                                    <div>
                                                        <h5>Size:</h5>
                                                        <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                        <h5 style={{'margin-top': 5}}>Alignment zone:</h5>
                                                        <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                        <h5 style={{'margin-top': 5}}>Compress zone:</h5>
                                                        <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                        <h5 style={{'margin-top': 5}}>Kết luận:</h5>
                                                        <Input onChange={(event) => this.state.a = event.target.value} type="text" name="note" id="note" placeholder="" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className='table-solid'>Video</th>
                                                <td className='table-solid'colspan="4">
                                                    <Input type="file" name="file" id="exampleFile" />
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
                </Row>
            </div>
        );
    }
}

export default FollowUp;
