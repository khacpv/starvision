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
    Container,Table
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {customerService} from "../../services/index";
import moment from 'moment';
import CustomerList from "./CustomerList";

class SoftOkForm extends Component {

    initialState = {
        SPH_R: '',
        CYL_R: '',
        HK_R: '',
        VK_R: '',
        SPH_L: '',
        CYL_L: '',
        HK_L: '',
        VK_L: '',
        Power_L: null,
        Power_R: null
    };

    constructor(props) {
        super(props);
        this.state = {
            ...this.initialState,
            isLoading: false
        }
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    createCustomOk() {
        const {SPH_R, CYL_R, HK_R, VK_R, SPH_L, CYL_L, HK_L, VK_L} = this.state;
        if ((SPH_R && CYL_R && HK_R && VK_R) || (SPH_L && CYL_L && HK_L && VK_L)) {
            const doctorData = JSON.parse(localStorage.getItem('user'));
            const data = {
                mabacsi : doctorData.Tenbacsi,
                idbacsi : doctorData.Id_bacsi,
                iddttc : doctorData.Id_Dttc,
                ngaykham : new Date(),
                khid: this.props.customer.ID_KHACHHANG,
                type: 'SOFT',
                ...this.state
            };
            customerService.createCustomOk(data).then(() => {
                alert('Cập nhật thành công');
                this.props.getUserData(this.props.customer);
            }).catch(error => alert(error.message))
        } else {
            alert('Vui lòng điền đủ thông tin BVCA');
        }

    }

    setData(data) {
        this.setState({
            SPH_R: data.customOk_R.sph,
            CYL_R: data.customOk_R.cyl,
            HK_R: data.customOk_R.hk,
            VK_R: data.customOk_R.vk,
            SPH_L: data.customOk_L.sph,
            CYL_L: data.customOk_L.cyl,
            HK_L: data.customOk_L.hk,
            VK_L: data.customOk_L.vk,
            Power_L: data.customOk_L.power,
            Power_R: data.customOk_R.power
        })
    }

    changeValue(event, param) {
        this.setState({[param]: event.target.value}, () => {
            if (['SPH_R', 'CYL_R', 'HK_R', 'VK_R'].includes(param)) {
                this.calculateKcode('right');
            }
            if (['SPH_L', 'CYL_L', 'HK_L', 'VK_L'].includes(param)) {
                this.calculateKcode('left');
            }
        });
    }

    resetForm() {
        this.setState(this.initialState);
    }

    calculateKcode(type) {
        const { SPH_R, CYL_R, HK_R, VK_R, SPH_L, CYL_L, HK_L, VK_L} = this.state;
        let b4 = type === 'left' ? parseFloat(SPH_L) : parseFloat(SPH_R);
        let b5 = type === 'left' ? parseFloat(CYL_L) : parseFloat(CYL_R);
        let b6 = type === 'left' ? parseFloat(HK_L) : parseFloat(HK_R);
        let b7 = type === 'left' ? parseFloat(VK_L) : parseFloat(VK_R);
        let b11 = 0;
        let b12 = 0;
        let b9 = 0;
        if (b6 != 0) {
            if (b6 > 20) {
                b11 = b6
            } else {
                b11 = 337.5/b6
            }
        }

        if (b7 != 0) {
            if (b7 > 20) {
                b12 = b7
            } else {
                b12 = 337.5/b7
            }
        }

        if (b11 !== 0 && b12 !== 0) {
            b9 = Math.round((1/(1-0.012*(b4+b5/2))*(b4+b5/2)+((b11+b12)/2-44)*0.16)*4+0.04)/4;
        } else if (b11 !== 0 || b12 !== 0) {
            b9 = Math.round((1/(1-0.012*(b4+b5/2))*(b4+b5/2)+((b11+b12)-44)*0.16)*4+0.04)/4
        } else {
            b9 = Math.round((1/(1 - 0.012 * (b4+b5/2))*(b4+b5/2))*4+0.04)/4;
        }


        if (type === 'left') {
            this.setState({Power_L: b9.toFixed(2)})
        } else {
            this.setState({Power_R: b9.toFixed(2)})
        }
    }


    render() {
        let data = this.state;
        return (
            <div>
                <Form>
                    <Row>
                        <Col xs={6}>
                            <h2>OS - Mắt trái</h2>
                            <div>
                                <Table responsive className='table-solid'>
                                    <thead>
                                    <tr>
                                        <th className='table-solid'>SPH</th>
                                        <th className='table-solid'>CYL</th>
                                        <th className='table-solid'>HK</th>
                                        <th className='table-solid'>VK</th>
                                        <th className='table-solid'>K-code</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className='table-solid'>
                                            <Input value={data.SPH_L} onChange={(event) => this.changeValue(event, 'SPH_L')} type="number" name="Ref_SPH_L" id="Ref_SPH_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.CYL_L} onChange={(event) => this.changeValue(event, 'CYL_L')} type="number" name="CYL_L" id="CYL_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.HK_L} onChange={(event) => this.changeValue(event, 'HK_L')} type="number"  name="HK_L" id="HK_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.VK_L} onChange={(event) => this.changeValue(event, 'VK_L')} type="number"  name="VK_L" id="Ref_AX_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.Power_L} type="number"  name="Power_L" id="Power_L" placeholder="" disabled />
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <h2>OD - Mắt phải</h2>
                            <div>
                                <Table responsive className='table-solid'>
                                    <thead>
                                    <tr>
                                        <th className='table-solid'>SPH</th>
                                        <th className='table-solid'>CYL</th>
                                        <th className='table-solid'>HK</th>
                                        <th className='table-solid'>VK</th>
                                        <th className='table-solid'>K-code</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className='table-solid'>
                                            <Input value={data.SPH_R} onChange={(event) => this.changeValue(event, 'SPH_R')} type="number" name="SPH_R" id="SPH_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.CYL_R} onChange={(event) => this.changeValue(event, 'CYL_R')} type="number" name="CYL_R" id="CYL_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.HK_R} onChange={(event) => this.changeValue(event, 'HK_R')} type="number"  name="HK_R" id="HK_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.VK_R} onChange={(event) => this.changeValue(event, 'VK_R')} type="number"  name="VK_R" id="VK_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.Power_R} type="number"  name="Power_R" id="Power_R" placeholder="" disabled />
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Button onClick={() => this.resetForm()} style={{ 'margin-left': 15}}>Làm mới</Button>
                        <Button onClick={() => this.createCustomOk()} style={{ 'margin-left': 15}} color={'primary'}>Cập nhật</Button>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default SoftOkForm;
