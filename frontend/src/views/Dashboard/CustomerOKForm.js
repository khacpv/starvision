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
        D_HVID_R: 11.6,
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
        D_HVID_L: 11.6,
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
        const {BCVA_VA_L, BCVA_SPH_L, BCVA_CYL_L, BCVA_AX_L, BCVA_VA_R, BCVA_SPH_R, BCVA_CYL_R, BCVA_AX_R} = this.state;
        if ((BCVA_VA_L && BCVA_SPH_L && BCVA_CYL_L && BCVA_AX_L) || (BCVA_VA_R && BCVA_SPH_R && BCVA_CYL_R && BCVA_AX_R)) {
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
            }).catch(error => alert(error.message))
        } else {
            alert('Vui lòng điền đủ thông tin BVCA');
        }

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
        this.setState({[param]: event.target.value}, () => {
            if (['BCVA_SPH_R', 'D_K1_R', 'D_K2_R', 'D_HVID_R'].includes(param)) {
                this.calOk1_Ok2_Ok3_Ok4('right');
            }
            if (['BCVA_SPH_L', 'D_K1_L', 'D_K2_L', 'D_HVID_L'].includes(param)) {
                this.calOk1_Ok2_Ok3_Ok4('left');
            }
        });
    }

    resetForm() {
        this.setState(this.initialState);
    }

    calOk1_Ok2_Ok3_Ok4(type) {
        const { BCVA_SPH_L, D_K1_L, D_K2_L, D_HVID_L, BCVA_SPH_R, D_K1_R, D_K2_R, D_HVID_R} = this.state;
        let b5 = type === 'left' ? parseFloat(BCVA_SPH_L) : parseFloat(BCVA_SPH_R);
        let d24 = 0;
        let d31 = 0;
        let d32 = 0;
        let d34 = 0;
        let d35 = 0;
        let b8 = type === 'left' ? parseFloat(D_HVID_L) : parseFloat(D_HVID_R);
        let b14 = 0;
        let b15 = 0;
        let b16 = 0;
        let b31 = 0;
        let b32 = 0;
        let b35 = 0;
        let b37 = 0;
        let b39 = 0;
        let b40 = 0;
        let b41 = 0;
        let b42 = 0;
        let b43 = 0;
        let b3 = type === 'left' ? parseFloat(D_K1_L) : parseFloat(D_K1_R);
        let b4 = type === 'left' ? parseFloat(D_K2_L) : parseFloat(D_K2_R);
        let Ok3, Ok4, Ok1, Ok2 = 0;

        // calculate b31
        if (b3 > 20 )
            b31 = 337.5/b3;
        else
            b31 = b3;

        // calculate b32
        if (b4 > 20 )
            b32 = 337.5/b4;
        else
            b32 = b4;

        // calculate d31 =IF(B3<>0,IF(B3<=20,337.5/B3,B3),0)
        if (b3 != 0 )
            if (b3 <= 20)
                d31 = 337.5/b3;
            else
                d31 = b3;
        else
            d31 = b3;

        // calculate d32 =IF(B4<>0,IF(B4<=20,337.5/B4,B4),0)
        if (b4 != 0 )
            if (b4 <= 20)
                d32 = 337.5/b4;
            else
                d32 = b4;
        else
            d32 = b4;

        if (d34 != 0 && d35 != 0)
            b37 = Math.round(Math.abs(d35-d34) * 100)/100;
        else
        if (d31 != 0 && d32 != 0)
            b37 = Math.round(Math.abs(d32 - d31)*100)/100;
        else
            b37 = 0;

        // calculate b39 = b5 - b37/2
        b39 = Math.round((b5 - b37/2)*100)/100;

        // calculate b40
        b40 = Math.round(((d31 + d32) / 2)*100)/100;

        // calculate b41
        b41 = Math.round(((d31+d32)*2 + 0.04))/4;

        // calculate b42
        b42 = b39*-1;

        // calculate b43
        b43 = Math.round(b42*2+0.5)/2;

        // calculate Ok3 =IF(B14<>0,B15+B16,IF(OR(B39<-15,B39>10),"lens unavailable",IF(B39<>0,B39/ABS(B39)*ROUND(ABS(B39)*4+0.04,0)/4,0)))
        if (b14 != 0)
            Ok3 = b15 + b16;
        else
        if (b39 < -15 || b39 > 10)
            Ok3 = "lens unavailable";
        else
        if (b39 != 0)
            Ok3 = Math.round((b39/Math.abs(b39)* (Math.abs(b39)*4+0.04).toFixed(0)/4)*100)/100;
        else
            Ok3 = 0;

        if (b14 >= 20)
            Ok2 = b14;
        else
        if(Math.round((d31+d32)*2+0.04)/4 > 100)
            Ok2 = "lens unavailable";
        else
        if (d31 == 0 || d32 == 0)
            Ok2 = 0;
        else
            Ok2 = Math.round((d31+d32)*2+0.04)/4;

        if (Ok3 > 0)
            Ok1 = "H";
        else
        if (Ok3 <= -5.13)
            Ok1 = "XM";
        else
            Ok1 = "XMJ";

        // calculate D24 =IF(B22>=0,IF(B21>=44,0.9,IF(B21>=42.5,0.93,0.95)),IF(B21>=44,0.93,IF(B21>=42.5,0.95,0.97)))
        if (Ok3 >= 0)
            if (Ok2 >= 44)
                d24 = 0.9;
            else
            if (Ok2 >= 42.5)
                d24 = 0.93;
            else
                d24 = 0.95;
        else
        if (Ok2 >= 44)
            d24 = 0.93
        else
        if (Ok2 >= 42.5)
            d24 = 0.95;
        else
            d24 = 0.97;

        // calculate Ok4
        //IF(B22>=0,IF(B8<>0,ROUND(D24*B8*5,0)/5,IF(B21>=44,10,IF(B21>=42.5,10.4,10.8))),IF(B8<>0,ROUND(D24*B8*5,0)/5,IF(B21>=47.75,10,IF(B21>=44,10.4,IF(B21>=42.5,10.8,11.2)))))
        if (Ok3 >= 0)
            if (b8 != 0)
                Ok4 = Math.round(d24*b8*5)/5;
            else
            if (Ok2 >= 44)
                Ok4 = 10;
            else
            if (Ok2 >= 42.5)
                Ok4 = 10.4;
            else
                Ok4 = 10.8;
        else
        if (b8 != 0)
            Ok4 = Math.round(d24*b8*5)/5;
        else
        if (Ok2 >= 47.75)
            Ok4 = 10;
        else
        if (Ok2 >= 42.5)
            Ok4 = 10.8;
        else
            Ok4 = 11.2;

        //let hvid = Math.round((parseFloat($('#originalKsOd_k1').val()) + parseFloat($('#originalKsOd_k2').val()))/2);)
        if (type === 'left') {
            this.setState({
                customOk_Lense_L: Ok1,
                customOk_Kcode_L: Ok2,
                customOk_Power_L: Ok3,
                customOk_Size_L: Ok4,
                D_AVE_L: parseFloat((b3 + b4)/2).toFixed(2)
            })
        }

        if (type === 'right') {
            this.setState({
                customOk_Lense_R: Ok1,
                customOk_Kcode_R: Ok2,
                customOk_Power_R: Ok3,
                customOk_Size_R: Ok4,
                D_AVE_R: parseFloat((b3 + b4)/2).toFixed(2)
            })
        }

        //console.log(hvid);
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
                                            <Input value={data.Ref_AX_L} onChange={(event) => this.changeValue(event, 'Ref_AX_L')} type="text"  name="Ref_AX_L" id="Ref_AX_L" placeholder="" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='table-solid'>BCVA</th>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_VA_L} onChange={(event) => this.changeValue(event, 'BCVA_VA_L')} type="text"  name="BCVA_VA_L" id="BCVA_VA_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_SPH_L} onChange={(event) => this.changeValue(event, 'BCVA_SPH_L')} type="number"  name="BCVA_SPH_L" id="BCVA_SPH_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_CYL_L} onChange={(event) => this.changeValue(event, 'BCVA_CYL_L')} type="number"  name="BCVA_CYL_L" id="BCVA_CYL_L" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_AX_L} onChange={(event) => this.changeValue(event, 'BCVA_AX_L')} type="text"  name="BCVA_AX_L" id="BCVA_AX_L" placeholder="" />
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
                                            <Input value={data.D_AVE_L} onChange={(event) => this.changeValue(event, 'D_AVE_L')} type="number"  name="D_AVE_L" id="D_AVE_L" placeholder="" disabled/>
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
                                            <Input value={data.customOk_Lense_L} onChange={(event) => this.changeValue(event, 'customOk_Lense_L')} type={'text'} name="customOk_Lense_L" id="customOk_Lense_L" placeholder="" disabled/>
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.customOk_Kcode_L} onChange={(event) => this.changeValue(event, 'customOk_Kcode_L')} type="number" name="customOk_Kcode_L" id="customOk_Kcode_L" placeholder="" disabled/>
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.customOk_Power_L} onChange={(event) => this.changeValue(event, 'customOk_Power_L')} type="number" name="customOk_Power_L" id="customOk_Power_L" placeholder="" disabled/>
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.customOk_Size_L} onChange={(event) => this.changeValue(event, 'customOk_Size_L')} type="number" name="customOk_Size_L" id="customOk_Size_L" placeholder="" disabled/>
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
                                            <Input value={data.Ref_AX_R} onChange={(event) => this.changeValue(event, 'Ref_AX_R')} type="text"  name="Ref_AX_R" id="Ref_AX_R" placeholder="" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='table-solid'>BCVA</th>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_VA_R} onChange={(event) => this.changeValue(event, 'BCVA_VA_R')} type="text"  name="BCVA_VA_R" id="BCVA_VA_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_SPH_R} onChange={(event) => this.changeValue(event, 'BCVA_SPH_R')} type="number"  name="BCVA_SPH_R" id="BCVA_SPH_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_CYL_R} onChange={(event) => this.changeValue(event, 'BCVA_CYL_R')} type="number"  name="BCVA_CYL_R" id="BCVA_CYL_R" placeholder="" />
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.BCVA_AX_R} onChange={(event) => this.changeValue(event, 'BCVA_AX_R')} type="text"  name="BCVA_AX_R" id="BCVA_AX_R" placeholder="" />
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
                                            <Input value={data.D_AVE_R} onChange={(event) => this.changeValue(event, 'D_AVE_R')} type="number"  name="D_AVE_R" id="D_AVE_R" placeholder="" disabled/>
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
                                            <Input value={data.customOk_Lense_R} onChange={(event) => this.changeValue(event, 'customOk_Lense_R')} type={'text'} name="customOk_Lense_R" id="customOk_Lense_R" placeholder="" disabled/>
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.customOk_Kcode_R} onChange={(event) => this.changeValue(event, 'customOk_Kcode_R')} type="number" name="customOk_Kcode_R" id="customOk_Kcode_R" placeholder="" disabled/>
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.customOk_Power_R} onChange={(event) => this.changeValue(event, 'customOk_Power_R')} type="number" name="customOk_Power_R" id="customOk_Power_R" placeholder="" disabled/>
                                        </td>
                                        <td className='table-solid'>
                                            <Input value={data.customOk_Size_R} onChange={(event) => this.changeValue(event, 'customOk_Size_R')} type="number" name="customOk_Size_R" id="customOk_Size_R" placeholder="" disabled/>
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

export default CustomerOKForm;
