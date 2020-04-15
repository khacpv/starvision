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
import CustomerList from "../../containers/CustomerList";

class CustomerOKForm extends Component {

    initialState = {
        Ref_SPH_R: '',
        Ref_CYL_R: '',
        Ref_AX_R: '',
        BCVA_VA_R: '',
        BCVA_SPH_R: '',
        BCVA_CYL_R: '',
        BCVA_AX_R: '',
        D_K1_R: '',
        D_K2_R: '',
        D_AVE_R: '',
        D_HVID_R: '',
        customOk_Lense_R: '',
        customOk_Kcode_R: '',
        customOk_Power_R: '',
        customOk_Size_R: '',
        Ref_SPH_L: '',
        Ref_CYL_L: '',
        Ref_AX_L: '',
        BCVA_VA_L: '',
        BCVA_SPH_L: '',
        BCVA_CYL_L: '',
        BCVA_AX_L: '',
        D_K1_L: '',
        D_K2_L: '',
        D_AVE_L: '',
        D_HVID_L: '',
        customOk_Lense_L: '',
        customOk_Kcode_L: '',
        customOk_Power_L: '',
        customOk_Size_L: '',
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
        const doctorData = JSON.parse(localStorage.getItem('user'));
        const data = {
            mabacsi : doctorData.Tenbacsi,
            idbacsi : doctorData.Id_bacsi,
            iddttc : doctorData.Id_Dttc,
            ngaykham : new Date(),
            khid: this.props.customer.ID_KHACHHANG,
            ...this.state
        };
        customerService.createCustomOk(data).then(() => {
            alert('Cập nhật thành công');
            this.props.getUserData(this.props.customer);
        }).catch(error => console.log(error))
    }

    setData(data) {
        this.setState({
            Ref_SPH_R: data.customOk_R.od_refactometer_sph,
            Ref_CYL_R: data.customOk_R.od_refactometer_cyl,
            Ref_AX_R: data.customOk_R.od_refactometer_ax,
            BCVA_VA_R: data.customOk_R.od_bcva_va,
            BCVA_SPH_R: data.customOk_R.od_bcva_sph,
            BCVA_CYL_R: data.customOk_R.od_bcva_cyl,
            BCVA_AX_R: data.customOk_R.od_bcva_ax,
            D_K1_R: data.customOk_R.od_original_k1,
            D_K2_R: data.customOk_R.od_original_k2,
            D_AVE_R: data.customOk_R.od_original_ave,
            D_HVID_R: data.customOk_R.od_original_hvid,
            customOk_Lense_R: data.customOk_R.od_custom_ok_lense,
            customOk_Kcode_R: data.customOk_R.od_custom_ok_k_code,
            customOk_Power_R: data.customOk_R.od_custom_ok_power,
            customOk_Size_R: data.customOk_R.od_custom_ok_size,
            Ref_SPH_L: data.customOk_L.od_refactometer_sph,
            Ref_CYL_L: data.customOk_L.od_refactometer_cyl,
            Ref_AX_L: data.customOk_L.od_refactometer_ax,
            BCVA_VA_L: data.customOk_L.od_bcva_va,
            BCVA_SPH_L: data.customOk_L.od_bcva_sph,
            BCVA_CYL_L: data.customOk_L.od_bcva_cyl,
            BCVA_AX_L: data.customOk_L.od_bcva_ax,
            D_K1_L: data.customOk_L.od_original_k1,
            D_K2_L: data.customOk_L.od_original_k2,
            D_AVE_L: data.customOk_L.od_original_ave,
            D_HVID_L: data.customOk_L.od_original_hvid,
            customOk_Lense_L: data.customOk_L.od_custom_ok_lense,
            customOk_Kcode_L: data.customOk_L.od_custom_ok_k_code,
            customOk_Power_L: data.customOk_L.od_custom_ok_power,
            customOk_Size_L: data.customOk_L.od_custom_ok_size,
        })
    }

    changeValue(event, param) {
        this.setState({[param]: event.target.value})
    }

    resetForm() {
        this.setState(this.initialState);
    }

    render() {
        let data = this.state;
        return (
            <div>
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
                                        <td className='table-solid'/>
                                        <td className='table-solid'>
                                            <Input value={data.Ref_SPH_L} onChange={(event) => this.changeValue(event, 'Ref_SPH_L')} type="number" name="Ref_SPH_L" id="Ref_SPH_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.Ref_CYL_L} onChange={(event) => this.changeValue(event, 'Ref_CYL_L')} type="number"  name="Ref_CYL_L" id="Ref_CYL_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.Ref_AX_L} onChange={(event) => this.changeValue(event, 'Ref_AX_L')} type="number"  name="Ref_AX_L" id="Ref_AX_L" placeholder="" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='table-solid'>BCVA</th>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_VA_L} onChange={(event) => this.changeValue(event, 'BCVA_VA_L')} type="number"  name="BCVA_VA_L" id="BCVA_VA_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_SPH_L} onChange={(event) => this.changeValue(event, 'BCVA_SPH_L')} type="number"  name="BCVA_SPH_L" id="BCVA_SPH_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_CYL_L} onChange={(event) => this.changeValue(event, 'BCVA_CYL_L')} type="number"  name="BCVA_CYL_L" id="BCVA_CYL_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_AX_L} onChange={(event) => this.changeValue(event, 'BCVA_AX_L')} type="number"  name="BCVA_AX_L" id="BCVA_AX_L" placeholder="" />
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
                                            <Input  value={data.D_K1_L} onChange={(event) => this.changeValue(event, 'D_K1_L')} type="number"  name="D_K1_L" id="D_K1_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input  value={data.D_K2_L} onChange={(event) => this.changeValue(event, 'D_K2_L')} type="number"  name="D_K2_L" id="D_K2_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.D_AVE_L} onChange={(event) => this.changeValue(event, 'D_AVE_L')} type="number"  name="D_AVE_L" id="D_AVE_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.D_HVID_L} onChange={(event) => this.changeValue(event, 'D_HVID_L')} type="number" name="D_HVID_L" id="D_HVID_L" placeholder="" />
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
                                            <Input value={data.customOk_Lense_L} onChange={(event) => this.changeValue(event, 'customOk_Lense_L')} type={'text'} name="customOk_Lense_L" id="customOk_Lense_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.customOk_Kcode_L} onChange={(event) => this.changeValue(event, 'customOk_Kcode_L')} type="number" name="customOk_Kcode_L" id="customOk_Kcode_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.customOk_Power_L} onChange={(event) => this.changeValue(event, 'customOk_Power_L')} type="number" name="customOk_Power_L" id="customOk_Power_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.customOk_Size_L} onChange={(event) => this.changeValue(event, 'customOk_Size_L')} type="number" name="customOk_Size_L" id="customOk_Size_L" placeholder="" />
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
                                        <td className='table-solid'/>
                                        <td className='table-solid'>
                                            <Input value={data.Ref_SPH_R} onChange={(event) => this.changeValue(event, 'Ref_SPH_R')} type="number" name="Ref_SPH_R" id="Ref_SPH_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.Ref_CYL_R} onChange={(event) => this.changeValue(event, 'Ref_CYL_R')} type="number"  name="Ref_CYL_R" id="Ref_CYL_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.Ref_AX_R} onChange={(event) => this.changeValue(event, 'Ref_AX_R')} type="number"  name="Ref_AX_R" id="Ref_AX_R" placeholder="" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='table-solid'>BCVA</th>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_VA_R} onChange={(event) => this.changeValue(event, 'BCVA_VA_R')} type="number"  name="BCVA_VA_R" id="BCVA_VA_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_SPH_R} onChange={(event) => this.changeValue(event, 'BCVA_SPH_R')} type="number"  name="BCVA_SPH_R" id="BCVA_SPH_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_CYL_R} onChange={(event) => this.changeValue(event, 'BCVA_CYL_R')} type="number"  name="BCVA_CYL_R" id="BCVA_CYL_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_AX_R} onChange={(event) => this.changeValue(event, 'BCVA_AX_R')} type="number"  name="BCVA_AX_R" id="BCVA_AX_R" placeholder="" />
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
                                            <Input  value={data.D_K1_R} onChange={(event) => this.changeValue(event, 'D_K1_R')} type="number"  name="D_K1_R" id="D_K1_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input  value={data.D_K2_R} onChange={(event) => this.changeValue(event, 'D_K2_R')} type="number"  name="D_K2_R" id="D_K2_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.D_AVE_R} onChange={(event) => this.changeValue(event, 'D_AVE_R')} type="number"  name="D_AVE_R" id="D_AVE_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.D_HVID_R} onChange={(event) => this.changeValue(event, 'D_HVID_R')} type="number" name="D_HVID_R" id="D_HVID_R" placeholder="" />
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
                                            <Input value={data.customOk_Lense_R} onChange={(event) => this.changeValue(event, 'customOk_Lense_R')} type={'text'} name="customOk_Lense_R" id="customOk_Lense_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.customOk_Kcode_R} onChange={(event) => this.changeValue(event, 'customOk_Kcode_R')} type="number" name="customOk_Kcode_R" id="customOk_Kcode_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.customOk_Power_R} onChange={(event) => this.changeValue(event, 'customOk_Power_R')} type="number" name="customOk_Power_R" id="customOk_Power_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.customOk_Size_R} onChange={(event) => this.changeValue(event, 'customOk_Size_R')} type="number" name="customOk_Size_R" id="customOk_Size_R" placeholder="" />
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Button onClick={() => this.resetForm()} style={{ 'margin-left': 15}}>Clear</Button>
                        <Button onClick={() => this.createCustomOk()} style={{ 'margin-left': 15}} color={'primary'}>Save</Button>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default CustomerOKForm;
