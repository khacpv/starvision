import React, {Component, lazy, Suspense} from 'react';
import {
    Button,
    Col,
    Row,
    Label,
} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import {customerService} from "../../../services";
import moment from "moment";
class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: {
                "cong_no_thang_truoc" : 0,
                "da_thanh_toan" : 0,
                "phat_sinh_thang_nay" : 0,
                "tien_kinh" : 0,
                "tien_phai_thanh_toan": 0,
                "tien_vtth": 0
            }
        };
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    componentDidMount() {
        const doctorData = JSON.parse(localStorage.getItem('user'));
        customerService.getSummary(doctorData.Id_bacsi).then(result => {
            if (result.status === 'success') {
                this.setState({data: result.data})
            }
        }).catch(error => console.log(error))
    }

    render() {
        const data = this.state.data;
        return (
            <div className="animated fadeIn" style={{backgroundColor: 'white', padding: '30px 45px 30px 45px', width: '1200px'}}>
                <Row style={{ justifyContent: 'space-between'}}>
                    <h2>Công nợ hàng tháng</h2>
                    <h2>{moment(new Date()).format('DD/MM/YYYY')}</h2>
                </Row>
                <Row>
                    <h3 style={{color: 'red'}}>Công nợ: {data.cong_no_thang_truoc} vnđ</h3>
                </Row>
                <Row>
                    <h3 style={{color: 'blue'}}>Phát sinh tháng nay: {data.phat_sinh_thang_nay} vnđ (Tiền kính: {data.tien_kinh}, Tiền VTTH: {data.tien_vtth})</h3>
                </Row>
                <Row>
                    <h3 style={{color: 'green'}}>Đã thanh toán: {data.da_thanh_toan} vnđ</h3>
                </Row>
                <Row>
                    <h2 style={{color: 'red'}}>Tiền phải thanh toán: {data.tien_phai_thanh_toan} vnđ</h2>
                </Row>
            </div>
        );
    }
}

export default Summary;
