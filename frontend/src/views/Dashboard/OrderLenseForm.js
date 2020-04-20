import React, {Component, lazy, Suspense} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {
    Button,
    Col,
    Row,
    Form,
    Input,
    FormGroup,
    Label, Collapse, CardBody, Card,
    Container,Table
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {customerService} from "../../services/index";
import moment from 'moment';
import CustomerList from "../../containers/CustomerList";

class OrderLenseForm extends Component {

    initialState = {
        lense_R: '',
        kcode_R: '',
        power_R: '',
        side_R: '',
        lense_L: '',
        kcode_L: '',
        power_L: '',
        side_L: '',
        note_order_lens: '',
        orderNumber: '',
        id_order: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            ...this.initialState,
            isLoading: false,
            isOpen: !props.isNew
        };
    }

    setData(data) {
        this.setState({
            lense_R: data.R.od_lense,
            kcode_R: data.R.od_kcode,
            power_R: data.R.od_power,
            side_R: data.R.od_size,
            lense_L: data.L.os_lense,
            kcode_L: data.L.os_kcode,
            power_L: data.L.os_power,
            side_L: data.L.os_size,
            note_order_lens: data.R.note_order_lens,
            id_order: data.R.id_order,
            orderNumber: data.So_Don_Hang
        })
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    createOrderLense() {
        const doctorData = JSON.parse(localStorage.getItem('user'));
        const data = {
            mabacsi : doctorData.Tenbacsi,
            idbacsi : doctorData.Id_bacsi,
            iddttc : doctorData.Id_Dttc,
            ngaykham : new Date(),
            khid: this.props.customer.ID_KHACHHANG,
            ...this.state
        };
        customerService.createOrderLense(data).then(result => {
            if (result.status === 'success') {
                this.resetForm();
                console.log(this.props.defaultLense)
                this.setDefaultLense(this.props.defaultLense.left, this.props.defaultLense.right);
                this.props.getUserData(this.props.customer);
                alert('Cập nhật thành công');
            } else {
                alert(result.message)
            }

        }).catch(error => console.log(error))
    }

    resetForm() {
        this.setState(this.initialState);
    }

    setDefaultLense(leftLense, RightLense) {
        this.setState({
            lense_L: leftLense,
            lense_R: RightLense
        })
    }

    changeValue(event, param) {
        this.setState({[param]: event.target.value})
    }

    render() {
        let data = this.state;
        let klist = [(<option/>)];
        for (let k = 38; k <= 50 ; k+= 0.25) {
            klist.push(<option>{k.toFixed(2)}</option>)
        }
        let plist = [(<option/>)];
        for (let p = -15; p <= -5.25 ; p+= 0.25) {
            plist.push(<option>{p.toFixed(2)}</option>)
        }
        let slist = [(<option/>)];
        for (let s = 9.6; s <= 12.4 ; s+= 0.20) {
            slist.push(<option>{s.toFixed(2)}</option>)
        }
        return (
            <div style={{ 'margin-top': '20px'}}>
                <Form>
                    <Row>
                        <Col xs={12}>
                            <h3>Suggested Order lens - Số Order: {this.state.orderNumber || '---'}</h3>
                        </Col>
                        <Col xs={6}>
                            <div>
                                <Table responsive className='table-solid'>
                                    <tbody>
                                    <tr>
                                        <th className='table-solid'>OS</th>
                                        <td className='table-solid'>
                                            Lense
                                            <Input value={data.lense_L} onChange={(event) => this.changeValue(event, 'lense_L')} type={'text'} name="lense_L" id="lense_L" placeholder=""/>
                                        </td>
                                        <td className='table-solid'>
                                            K-code
                                            <Input value={data.kcode_L} onChange={(event) => this.changeValue(event, 'kcode_L')} type="select" name="kcode_L" id="kcode_L">
                                                {klist}
                                            </Input>
                                        </td>
                                        <td className='table-solid'>
                                            Power
                                            <Input value={data.power_L} onChange={(event) => this.changeValue(event, 'power_L')} type="select" name="power_L" id="power_L">
                                                {plist}
                                            </Input>
                                        </td>
                                        <td className='table-solid'>
                                            Size
                                            <Input value={data.side_L} onChange={(event) => this.changeValue(event, 'side_L')} type="select" name="side_L" id="side_L">
                                                {slist}
                                            </Input>
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
                                        <th className='table-solid'>OD</th>
                                        <td className='table-solid'>
                                            Lense
                                            <Input value={data.lense_R} onChange={(event) => this.changeValue(event, 'lense_R')} type={'text'} name="lense_R" id="lense_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            K-code
                                            <Input value={data.kcode_R} onChange={(event) => this.changeValue(event, 'kcode_R')} type="select" name="kcode_R" id="kcode_R">
                                                {klist}
                                            </Input>
                                        </td>
                                        <td className='table-solid'>
                                            Power
                                            <Input value={data.power_R} onChange={(event) => this.changeValue(event, 'power_R')} type="select" name="power_R" id="power_R">
                                                {plist}
                                            </Input>
                                        </td>
                                        <td className='table-solid'>
                                            Size
                                            <Input value={data.side_R} onChange={(event) => this.changeValue(event, 'side_R')} type="select" name="side_R" id="side_R">
                                                {slist}
                                            </Input>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <Input type="textarea" name="text" id="exampleText" placeholder="Ghi chú đặt kính" />
                            </FormGroup>
                        </Col>
                        <Button onClick={() => this.createOrderLense()} style={{ 'margin-left': 15}} color={this.props.isNew ? 'success' : 'primary'}>{this.props.isNew ? 'Tạo mới' : 'Cập nhật'}</Button>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default OrderLenseForm;
