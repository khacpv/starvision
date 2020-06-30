import React, {Component, lazy, Suspense} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {
    Button,
    Col,
    Row,
    Form,
    Input,
    FormGroup,
    Modal,Table, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {customerService, uploadService} from "../../services/index";
import moment from 'moment';
import {Player} from "video-react";
import ReactLoading from "react-loading";

class FollowUpForm extends Component {

    initialState = {
        bcva_va_R: '',
        image_R: '',
        video_R: '',
        thumb_R: '',
        bcva_va_L: '',
        image_L: '',
        video_L: '',
        thumb_L: '',
        note: '',
        ngaykham: moment(new Date()).format('YYYY-MM-DD'),
        ngaytaikham: null,
        id_left: null,
        id_right: null,
        followup_no: null
    };

    constructor(props) {
        super(props);
        this.state = {
            ...this.initialState,
            isLoadingImageL: false,
            isLoadingImageR: false,
            isLoadingVideoL: false,
            isLoadingVideoR: false,
            isOpen: !props.isNew
        };
    }

    setData(data) {
        this.setState({
            bcva_va_R: data.R.od_bcva_va,
            image_R: data.R.od_image,
            video_R: data.R.od_video,
            id_right: data.R.A_TH_DUBAO,
            thumb_R: data.R.od_thumb,
            bcva_va_L: data.L.os_bcva_va,
            image_L: data.L.os_image,
            video_L: data.L.os_video,
            id_left: data.L.A_TH_DUBAO,
            thumb_L: data.L.os_thumb,
            note: data.comment,
            ngaykham: data.ngaykham,
            ngaytaikham: data.ngaytaikham,
            followup_no: data.followup_no
        })
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    createFollowUp() {
        const doctorData = JSON.parse(localStorage.getItem('user'));
        const {bcva_va_R, note, bcva_va_L, ngaykham} = this.state;
        const data = {
            mabacsi : doctorData.Mabacsi,
            idbacsi : doctorData.Id_bacsi,
            iddttc : doctorData.Id_Dttc,
            khid: this.props.customer.ID_KHACHHANG,
            ...this.state
        };
        if (bcva_va_R && bcva_va_L && note && ngaykham) {
            customerService.createFollowUp(data).then(result => {
                if (result.status === 'success') {
                    this.resetForm();
                    this.props.getUserData(this.props.customer);
                    alert('Cập nhật thành công');
                } else {
                    alert(result.message)
                }
            }).catch(error => console.log(error))
        } else {
            alert('Vui lòng nhập đủ thông tin')
        }
    }

    resetForm() {
        this.setState(this.initialState);
    }

    changeValue(event, param) {
        this.setState({[param]: event.target.value})
    }

    changeFile(file, param, event) {
        let fileMime = file.type;
        if (fileMime.indexOf('video/') < 0 && (param === 'video_L' || param === 'video_R')) {
            alert('Vui lòng chọn đúng file video');
            event.target.value = null;
            return;
        }

        if (fileMime.indexOf('image/') < 0 && (param === 'image_L' || param === 'image_R')) {
            alert('Vui lòng chọn đúng file ảnh');
            event.target.value = null;
            return;
        }

        // TODO: show loading icon
        if (param === 'image_L') this.setState({isLoadingImageL: true});
        if (param === 'image_R') this.setState({isLoadingImageR: true});
        if (param === 'video_L') this.setState({isLoadingVideoL: true});
        if (param === 'video_R') this.setState({isLoadingVideoR: true});
        // Multiparts upload
        uploadService.uploadFile(file, this.props.customer)
            .then(data => {
                // TODO: display uploaded file
                if (param === 'image_L') this.setState({isLoadingImageL: false,[param]: data.Location});
                if (param === 'image_R') this.setState({isLoadingImageR: false,[param]: data.Location});
                if (param === 'video_L') this.setState({isLoadingVideoL: false,[param]: data.Location});
                if (param === 'video_R') this.setState({isLoadingVideoR: false,[param]: data.Location});
                },
            ).catch(err => {
            alert('There was an error uploading: ' + err.message)
        })
    }

    render() {
        let data = this.state;
        let bvcaVaList = [<option/>];
        for (let k = 0.1; k <= 1; k += 0.1) {
            bvcaVaList.push(<option key={k}>{k.toFixed(1)}</option>);
        }
        return (
            <div style={{ marginTop: '50px'}}>
                <Form>
                    <Row>
                        <Col xs={12}>
                            <FormGroup row style={{marginLeft: 5}}>
                                <div>Ngày khám:</div>
                                <div style={{ marginLeft: 25}}>
                                    <DatePicker
                                        className="radius-border-input"
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.ngaykham ? new Date(this.state.ngaykham) : null}
                                        onChange={(date) => this.setState({ngaykham: date})}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <div>
                                <Table responsive className='table-solid'>
                                    <tbody>
                                    <tr>
                                        <th className='table-solid'>Mắt trái</th>
                                        <td className='table-solid-start'>
                                            BVCA
                                            <Input value={data.bcva_va_L} onChange={(event) => this.changeValue(event, 'bcva_va_L')} type={'select'} name="bcva_va_L" id="bcva_va_L" placeholder="">
                                                {bvcaVaList}
                                            </Input>
                                        </td>
                                        <td className='table-solid-start'>
                                            Ảnh
                                            {
                                                data.isLoadingImageL ? <ReactLoading type={'spin'} color={'grey'} height={20} width={20} />
                                                : <Input style={{marginTop: 10}} onChange={(event) => this.changeFile(event.target.files[0], 'image_L', event)} type="file" name="image_L" id="image_L"/>
                                            }
                                            {
                                                data.image_L &&
                                                <div style={{marginTop: 10}}>
                                                    <img
                                                        width={200}
                                                        height={'auto'}
                                                        src={data.image_L}
                                                    />
                                                </div>
                                            }
                                        </td>
                                        <td className='table-solid-start'>
                                            Video
                                            {
                                                data.isLoadingVideoL ? <ReactLoading type={'spin'} color={'grey'} height={20} width={20} />
                                                : <Input style={{marginTop: 10}} onChange={(event) => this.changeFile(event.target.files[0], 'video_L', event)} type="file" name="video_L" id="video_L"/>
                                            }
                                            {
                                                this.state.video_L &&
                                                <div style={{marginTop: 10}}>
                                                    <Player
                                                        playsInline
                                                        fluid={false}
                                                        width={250}
                                                        height={400}
                                                        poster={this.state.thumb_L}
                                                        src={this.state.video_L}
                                                    />
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='table-solid'>Mắt phải</th>
                                        <td className='table-solid-start'>
                                            BVCA
                                            <Input value={data.bcva_va_R} onChange={(event) => this.changeValue(event, 'bcva_va_R')} type={'select'} name="bcva_va_R" id="bcva_va_R" placeholder="" >
                                                {bvcaVaList}
                                            </Input>
                                        </td>
                                        <td className='table-solid-start'>
                                            Ảnh
                                            {
                                                data.isLoadingImageR ? <ReactLoading type={'spin'} color={'grey'} height={20} width={20} />
                                                : <Input style={{marginTop: 10}} onChange={(event) => this.changeFile(event.target.files[0], 'image_R', event)} type="file" name="image_R" id="image_R"/>
                                            }
                                            {
                                                data.image_R &&
                                                <div style={{marginTop: 10}}>
                                                    <img
                                                        width={200}
                                                        height={'auto'}
                                                        src={data.image_R}
                                                    />
                                                </div>
                                            }
                                        </td>
                                        <td className='table-solid-start'>
                                            Video
                                            {
                                                data.isLoadingVideoR ? <ReactLoading type={'spin'} color={'grey'} height={20} width={20} />
                                                :    <Input style={{marginTop: 10}} onChange={(event) => this.changeFile(event.target.files[0], 'video_R', event)} type="file" name="video_R" id="video_R"/>
                                            }
                                            {
                                                this.state.video_R &&
                                                <div style={{marginTop: 10}}>
                                                    <Player
                                                        playsInline
                                                        fluid={false}
                                                        width={250}
                                                        height={500}
                                                        poster={this.state.thumb_R}
                                                        src={this.state.video_R}
                                                    />
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormGroup row style={{marginLeft: 5}}>
                                <div>Ngày hẹn tái khám:</div>
                                <div style={{ marginLeft: 25}}>
                                    <DatePicker
                                        className="radius-border-input"
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.ngaytaikham ? new Date(this.state.ngaytaikham) : null}
                                        onChange={(date) => this.setState({ngaytaikham: date})}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <FormGroup>
                                <Input value={data.note} onChange={(event) => this.changeValue(event, 'note')} type="textarea" name="text" id="exampleText" placeholder="Kết luận" />
                            </FormGroup>
                        </Col>
                        <Button onClick={() => this.createFollowUp()} style={{ marginLeft: 15}} color={this.props.isNew ? 'success' : 'primary'}>{this.props.isNew ? 'Tạo mới' : 'Cập nhật'}</Button>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default FollowUpForm;
