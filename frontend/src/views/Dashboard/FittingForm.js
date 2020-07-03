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
    Collapse,
    CardBody,
    Card,
    Container,
    Table,
} from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import {customerService, uploadService} from '../../services/index';
import AWS from 'aws-sdk';
import moment from 'moment';
import { Player } from 'video-react';
import ReactLoading from 'react-loading';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getFileS3Name(typeContent, type, khid, doctorData) {
    let strDate = moment(new Date()).format('YYYY-MM-DD');
    let idBacsi = doctorData.Id_bacsi;
    let id_Dttc = doctorData.Id_Dttc;
    let randomNumber = getRandomInt(100) * 100;
    return strDate + "-" + idBacsi + "-" + id_Dttc.toString() + "_" + khid.toString() + "_" + type + randomNumber.toString() + "." + typeContent;
}

class FittingForm extends Component {
    initialState = {
        referaction_sph_L: '',
        referaction_cyl_L: '',
        referaction_ax_L: '',
        bcva_va_L: '',
        bcva_sph_L: '',
        bcva_cyl_L: '',
        bcva_ax_L: '',
        kcode_L: '',
        power_L: '',
        comment_size_L: '',
        comment_matbo_L: '',
        comment_vung_dieu_tri_L: '',
        comment_di_chuyen_L: '',
        comment_ket_luan_L: '',
        video_L: '',
        size_L: '',
        referaction_sph_R: '',
        referaction_cyl_R: '',
        referaction_ax_R: '',
        bcva_va_R: '',
        bcva_sph_R: '',
        bcva_cyl_R: '',
        bcva_ax_R: '',
        kcode_R: '',
        power_R: '',
        comment_size_R: '',
        comment_matbo_R: '',
        comment_vung_dieu_tri_R: '',
        comment_di_chuyen_R: '',
        comment_ket_luan_R: '',
        video_R: '',
        size_R: '',
        id_left: null,
        id_right: null,
        thumb_L: null,
        thumb_R: null
    };

    constructor(props) {
        super(props);
        this.state = {
            ...this.initialState,
            isLoadingLeft: false,
            isLoadingRight: false,
            isOpen: !props.isNew,
        };
    }

    setData(data) {
        if (data.fitting_left) {
            this.setState({
                referaction_sph_L: data.fitting_left.os_referaction_sph,
                referaction_cyl_L: data.fitting_left.os_referaction_cyl,
                referaction_ax_L: data.fitting_left.os_referaction_ax,
                bcva_va_L: data.fitting_left.os_bcva_va,
                bcva_sph_L: data.fitting_left.os_bcva_sph,
                bcva_cyl_L: data.fitting_left.os_bcva_cyl,
                bcva_ax_L: data.fitting_left.os_bcva_ax,
                kcode_L: data.fitting_left.os_kcode,
                power_L: data.fitting_left.os_power,
                comment_size_L: data.fitting_left.os_comment_size,
                comment_matbo_L: data.fitting_left.os_comment_matbo,
                comment_vung_dieu_tri_L: data.fitting_left.os_comment_vung_dieu_tri,
                comment_di_chuyen_L: data.fitting_left.os_comment_di_chuyen,
                comment_ket_luan_L: data.fitting_left.os_comment_ket_luan,
                video_L: data.fitting_left.os_video,
                size_L: data.fitting_left.os_size,
                thumb_L: data.fitting_left.os_thumb,
                id_left: data.fitting_left.id,
            });
        }
        if (data.fitting_right) {
            this.setState({
                referaction_sph_R: data.fitting_right.od_referaction_sph,
                referaction_cyl_R: data.fitting_right.od_referaction_cyl,
                referaction_ax_R: data.fitting_right.od_referaction_ax,
                bcva_va_R: data.fitting_right.od_bcva_va,
                bcva_sph_R: data.fitting_right.od_bcva_sph,
                bcva_cyl_R: data.fitting_right.od_bcva_cyl,
                bcva_ax_R: data.fitting_right.od_bcva_ax,
                kcode_R: data.fitting_right.od_kcode,
                power_R: data.fitting_right.od_power,
                comment_size_R: data.fitting_right.od_comment_size,
                comment_matbo_R: data.fitting_right.od_comment_matbo,
                comment_vung_dieu_tri_R: data.fitting_right.od_comment_vung_dieu_tri,
                comment_di_chuyen_R: data.fitting_right.od_comment_di_chuyen,
                comment_ket_luan_R: data.fitting_right.od_comment_ket_luan,
                video_R: data.fitting_right.od_video,
                size_R: data.fitting_right.od_size,
                thumb_R: data.fitting_right.od_thumb,
                id_right: data.fitting_right.id,
            });
        }
    }

    createFitting() {
        const doctorData = JSON.parse(localStorage.getItem('user'));
        const data = {
            mabacsi: doctorData.Mabacsi,
            idbacsi: doctorData.Id_bacsi,
            iddttc: doctorData.Id_Dttc,
            ngaykham: moment(new Date()).format('DD/MM/YYYY'),
            khid: this.props.customer.ID_KHACHHANG,
        };
        const {
            referaction_sph_L,
            referaction_sph_R,
            referaction_cyl_L,
            referaction_cyl_R,
            referaction_ax_L,
            referaction_ax_R,
            bcva_va_L,
            bcva_va_R,
            bcva_sph_L,
            bcva_sph_R,
            bcva_cyl_L,
            bcva_cyl_R,
            bcva_ax_L,
            bcva_ax_R,
            kcode_L,
            kcode_R,
            power_L,
            power_R,
            comment_size_L,
            comment_size_R,
            comment_matbo_L,
            comment_matbo_R,
            comment_vung_dieu_tri_L,
            comment_vung_dieu_tri_R,
            comment_di_chuyen_L,
            comment_di_chuyen_R,
            comment_ket_luan_L,
            comment_ket_luan_R,
            video_L,
            video_R,
            size_L,
            size_R,
            id_right,
            id_left
        } = this.state;
        if (
            bcva_va_L &&
            bcva_sph_L &&
            bcva_cyl_L &&
            bcva_ax_L &&
            bcva_va_R &&
            bcva_sph_R &&
            bcva_cyl_R &&
            bcva_ax_R
        ) {
            customerService
                .createFitting(
                    {
                        ...data,
                        fitting_no: this.props.fittingNo,
                        referaction_sph: referaction_sph_L,
                        referaction_cyl: referaction_cyl_L,
                        referaction_ax: referaction_ax_L,
                        bcva_va: bcva_va_L,
                        bcva_sph: bcva_sph_L,
                        bcva_cyl: bcva_cyl_L,
                        bcva_ax: bcva_ax_L,
                        side: 'L',
                        kcode: kcode_L,
                        power: power_L,
                        comment_size: comment_size_L,
                        comment_matbo: comment_matbo_L,
                        comment_vung_dieu_tri: comment_vung_dieu_tri_L,
                        comment_di_chuyen: comment_di_chuyen_L,
                        comment_ket_luan: comment_ket_luan_L,
                        video: video_L,
                        size: size_L,
                        id: id_left
                    },
                    {
                        ...data,
                        fitting_no: this.props.fittingNo,
                        referaction_sph: referaction_sph_R,
                        referaction_cyl: referaction_cyl_R,
                        referaction_ax: referaction_ax_R,
                        bcva_va: bcva_va_R,
                        bcva_sph: bcva_sph_R,
                        bcva_cyl: bcva_cyl_R,
                        bcva_ax: bcva_ax_R,
                        side: 'R',
                        kcode: kcode_R,
                        power: power_R,
                        comment_size: comment_size_R,
                        comment_matbo: comment_matbo_R,
                        comment_vung_dieu_tri: comment_vung_dieu_tri_R,
                        comment_di_chuyen: comment_di_chuyen_R,
                        comment_ket_luan: comment_ket_luan_R,
                        video: video_R,
                        size: size_R,
                        id: id_right
                    }
                )
                .then((result) => {
                    if (
                        result[0].status === 'success' &&
                        result[1].status === 'success'
                    ) {
                        this.props.getUserData(this.props.customer);
                        alert('Cập nhật thành công');
                    }
                })
                .catch((error) => alert(error.message));
        } else {
            alert('Vui lòng điền đủ thông tin 2 mắt');
        }
    }

    resetForm() {
        this.setState(this.initialState);
    }

    changeValue(event, param) {
        this.setState({[param]: event.target.value});
    }

    changeFile(file, eyeSide, event) {
        let fileMime = file.type;
        if (fileMime.indexOf('video/') < 0) {
            alert('Selected file is not a Video');
            event.target.value = null;
            return;
        }

        // TODO: show loading icon
        if (eyeSide === 'left') {
            this.setState({isLoadingLeft: true})
        }
        if (eyeSide === 'right') {
            this.setState({isLoadingRight: true})
        }
        // Multiparts upload
        uploadService.uploadFile(file, this.props.customer)
        .then(data => {
                // TODO: hide loading icon
                if (eyeSide === 'left') {
                    this.setState({video_L: data.Location, isLoadingLeft: false})
                }
                if (eyeSide === 'right') {
                    this.setState({video_R: data.Location, isLoadingRight: false})
                }
                // TODO: display uploaded file
            },
        ).catch(err => {
            if (eyeSide === 'left') {
                this.setState({isLoadingLeft: false})
            }
            if (eyeSide === 'right') {
                this.setState({isLoadingRight: false})
            }
            alert('There was an error uploading your photo: ' + err.message)
        })
    }

    render() {
        let data = this.state;
        let klist = [<option/>];
        for (let k = 40; k <= 47.25; k += 0.25) {
            klist.push(<option>{k.toFixed(2)}</option>);
        }
        let plist = [
            <option/>,
            <option>{-3}</option>,
            <option>{-7}</option>,
            <option>{3}</option>,
        ];
        let slist = [<option/>];
        for (let s = 10.4; s <= 11.6; s += 0.2) {
            slist.push(<option key={s}>{s.toFixed(2)}</option>);
        }
        let refSphList = [<option/>];
        for (let k = -15; k <= 10; k += 0.25) {
            refSphList.push(<option key={k}>{k.toFixed(2)}</option>);
        }
        let refCylList = [<option/>];
        for (let k = -10; k <= 0; k += 0.25) {
            refCylList.push(<option key={k}>{k.toFixed(2)}</option>);
        }
        let bvcaVaList = [<option/>];
        for (let k = 1; k <= 10; k += 1) {
            bvcaVaList.push(<option key={k}>{`${k.toString()}/10`}</option>);
        }
        let fixArea = [
            <option/>,
            <option>Rõ</option>,
            <option>Mờ</option>,
            <option>Rất mờ</option>,
        ];
        let beefEye = [
            <option/>,
            <option>Rõ nét</option>,
            <option>Bình thường</option>,
            <option>Mờ</option>,
        ];
        let sizeOptions = [
            <option/>,
            <option>Tốt</option>,
            <option>To</option>,
            <option>Bé</option>,
        ];
        let moveOptions = [
            <option/>,
            <option>Nhiều</option>,
            <option>Vừa</option>,
            <option>Ít</option>,
        ];
        return (
            <div style={{marginTop: '20px'}}>
                <div>
                    <Button
                        onClick={() => this.setState({isOpen: !this.state.isOpen})}
                        style={{marginBottom: 15}}
                        color={'info'}
                    >
                        Fitting lần {this.props.fittingNo}( Click để{' '}
                        {this.state.isOpen ? 'đóng' : 'mở'})
                    </Button>
                </div>
                <Collapse isOpen={this.state.isOpen}>
                    <Form>
                        <Row>
                            <Col xs={6}>
                                <h3>OS - Mắt trái</h3>
                                <div>
                                    <Table responsive className="table-solid">
                                        <tbody>
                                        <tr>
                                            <th className="table-solid">Fitting</th>
                                            <td className="table-solid" style={{ width: '100px'}}>
                                                K-code
                                                <Input
                                                    value={data.kcode_L}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'kcode_L')
                                                    }
                                                    type="select"
                                                    name="kcode_L"
                                                    id="kcode_L"
                                                >
                                                    {klist}
                                                </Input>
                                            </td>
                                            <td className="table-solid" style={{ width: '100px'}}>
                                                Power
                                                <Input
                                                    value={data.power_L}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'power_L')
                                                    }
                                                    type="select"
                                                    name="power_L"
                                                    id="power_L"
                                                >
                                                    {plist}
                                                </Input>
                                            </td>
                                            <td className="table-solid">
                                                Size
                                                <Input
                                                    value={data.size_L}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'size_L')
                                                    }
                                                    type="select"
                                                    name="select"
                                                    id="size_L"
                                                >
                                                    {slist}
                                                </Input>
                                            </td>
                                            <td className="table-solid" style={{ width: '100px'}}/>
                                        </tr>
                                        <tr>
                                            <th className="table-solid">BCVA</th>
                                            <td className="table-solid">
                                                SPH
                                                <Input
                                                    value={data.bcva_sph_L}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'bcva_sph_L')
                                                    }
                                                    type="select"
                                                    name="bcva_sph_L"
                                                    id="bcva_sph_L"
                                                    placeholder=""
                                                >
                                                    {refSphList}
                                                </Input>
                                            </td>
                                            <td className="table-solid">
                                                CYL
                                                <Input
                                                    value={data.bcva_cyl_L}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'bcva_cyl_L')
                                                    }
                                                    type="select"
                                                    name="bcva_cyl_L"
                                                    id="bcva_cyl_L"
                                                    placeholder=""
                                                >
                                                    {refCylList}
                                                </Input>
                                            </td>
                                            <td className="table-solid">
                                                AX
                                                <Input
                                                    value={data.bcva_ax_L}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'bcva_ax_L')
                                                    }
                                                    type="text"
                                                    name="bcva_ax_L"
                                                    id="bcva_ax_L"
                                                    placeholder=""
                                                />
                                            </td>
                                            <td className="table-solid">
                                                VA
                                                <Input
                                                    value={data.bcva_va_L}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'bcva_va_L')
                                                    }
                                                    type="select"
                                                    name="bcva_va_L"
                                                    id="bcva_va_L"
                                                    placeholder=""
                                                >
                                                    {bvcaVaList}
                                                </Input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="table-solid">Over Refraction:</th>
                                            <td className="table-solid">
                                                <Input
                                                    value={data.referaction_sph_L}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'referaction_sph_L')
                                                    }
                                                    type="select"
                                                    name="referaction_sph_L"
                                                    id="referaction_sph_L"
                                                    placeholder=""
                                                >
                                                    {refSphList}
                                                </Input>
                                            </td>
                                            <td className="table-solid">
                                                <Input
                                                    value={data.referaction_cyl_L}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'referaction_cyl_L')
                                                    }
                                                    type="select"
                                                    name="referaction_cyl_L"
                                                    id="referaction_cyl_L"
                                                    placeholder=""
                                                >
                                                    {refCylList}
                                                </Input>
                                            </td>
                                            <td className="table-solid">
                                                <Input
                                                    value={data.referaction_ax_L}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'referaction_ax_L')
                                                    }
                                                    type="text"
                                                    name="referaction_ax_L"
                                                    id="referaction_ax_L"
                                                    placeholder=""
                                                />
                                            </td>
                                            <td className="table-solid"/>
                                        </tr>
                                        <tr>
                                            <th className="table-solid">Comments</th>
                                            <td className="table-solid" colSpan="4">
                                                <div>
                                                    <h5>Vùng điều trị:</h5>
                                                    <Input
                                                        value={data.comment_vung_dieu_tri_L}
                                                        onChange={(event) =>
                                                            this.changeValue(
                                                                event,
                                                                'comment_vung_dieu_tri_L'
                                                            )
                                                        }
                                                        type="select"
                                                        name="comment_vung_dieu_tri_L"
                                                        id="comment_vung_dieu_tri_L"
                                                        placeholder=""
                                                    >
                                                        {fixArea}
                                                    </Input>
                                                    <h5 style={{marginTop: 5}}>Mắt bò:</h5>
                                                    <Input
                                                        value={data.comment_matbo_L}
                                                        onChange={(event) =>
                                                            this.changeValue(event, 'comment_matbo_L')
                                                        }
                                                        type="select"
                                                        name="comment_matbo_L"
                                                        id="comment_matbo_L"
                                                        placeholder=""
                                                    >
                                                        {beefEye}
                                                    </Input>
                                                    <h5 style={{marginTop: 5}}>Size:</h5>
                                                    <Input
                                                        value={data.comment_size_L}
                                                        onChange={(event) =>
                                                            this.changeValue(event, 'comment_size_L')
                                                        }
                                                        type="select"
                                                        name="comment_size_L"
                                                        id="comment_size_L"
                                                        placeholder=""
                                                    >
                                                        {sizeOptions}
                                                    </Input>
                                                    <h5 style={{marginTop: 5}}>Di chuyển:</h5>
                                                    <Input
                                                        value={data.comment_di_chuyen_L}
                                                        onChange={(event) =>
                                                            this.changeValue(event, 'comment_di_chuyen_L')
                                                        }
                                                        type="select"
                                                        name="comment_di_chuyen_L"
                                                        id="comment_di_chuyen_L"
                                                        placeholder=""
                                                    >
                                                        {moveOptions}
                                                    </Input>
                                                    <h5 style={{marginTop: 5}}>Kết luận:</h5>
                                                    <Input
                                                        value={data.comment_ket_luan_L}
                                                        onChange={(event) =>
                                                            this.changeValue(event, 'comment_ket_luan_L')
                                                        }
                                                        type="text"
                                                        name="comment_ket_luan_L"
                                                        id="comment_ket_luan_L"
                                                        placeholder=""
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="table-solid">Video</th>
                                            <td className="table-solid" colSpan="4">
                                                {
                                                    this.state.isLoadingLeft ? <ReactLoading type={'spin'} color={'grey'} height={20} width={20} />
                                                        : <Input
                                                            onChange={(event) =>
                                                                this.changeFile(
                                                                    event.target.files[0],
                                                                    'left',
                                                                    event
                                                                )
                                                            }
                                                            type="file"
                                                            name="file"
                                                            id="exampleFile"
                                                        />
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
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <h3>OD - Mắt phải</h3>
                                <div>
                                    <Table responsive className="table-solid">
                                        <tbody>
                                        <tr>
                                            <th className="table-solid">Fitting</th>
                                            <td className="table-solid" style={{ width: '100px'}}>
                                                K-code
                                                <Input
                                                    value={data.kcode_R}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'kcode_R')
                                                    }
                                                    type="select"
                                                    name="kcode_R"
                                                    id="kcode_R"
                                                >
                                                    {klist}
                                                </Input>
                                            </td>
                                            <td className="table-solid" style={{ width: '100px'}}>
                                                Power
                                                <Input
                                                    value={data.power_R}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'power_R')
                                                    }
                                                    type="select"
                                                    name="power_R"
                                                    id="power_R"
                                                >
                                                    {plist}
                                                </Input>
                                            </td>
                                            <td className="table-solid">
                                                Size
                                                <Input
                                                    value={data.size_R}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'size_R')
                                                    }
                                                    type="select"
                                                    name="size_R"
                                                    id="size_R"
                                                >
                                                    {slist}
                                                </Input>
                                            </td>
                                            <td className="table-solid" style={{ width: '100px'}}/>
                                        </tr>
                                        <tr>
                                            <th className="table-solid">BCVA</th>
                                            <td className="table-solid">
                                                SPH
                                                <Input
                                                    value={data.bcva_sph_R}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'bcva_sph_R')
                                                    }
                                                    type="select"
                                                    name="bcva_sph_R"
                                                    id="bcva_sph_R"
                                                    placeholder=""
                                                >
                                                    {refSphList}
                                                </Input>
                                            </td>
                                            <td className="table-solid">
                                                CYL
                                                <Input
                                                    value={data.bcva_cyl_R}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'bcva_cyl_R')
                                                    }
                                                    type="select"
                                                    name="bcva_cyl_R"
                                                    id="bcva_cyl_R"
                                                    placeholder=""
                                                >
                                                    {refCylList}
                                                </Input>
                                            </td>
                                            <td className="table-solid">
                                                AX
                                                <Input
                                                    value={data.bcva_ax_R}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'bcva_ax_R')
                                                    }
                                                    type="text"
                                                    name="bcva_ax_R"
                                                    id="bcva_ax_R"
                                                    placeholder=""
                                                />
                                            </td>
                                            <td className="table-solid">
                                                VA
                                                <Input
                                                    value={data.bcva_va_R}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'bcva_va_R')
                                                    }
                                                    type="select"
                                                    name="bcva_va_R"
                                                    id="bcva_va_R"
                                                    placeholder=""
                                                >
                                                    {bvcaVaList}
                                                </Input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="table-solid">Over Refraction:</th>
                                            <td className="table-solid">
                                                <Input
                                                    value={data.referaction_sph_R}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'referaction_sph_R')
                                                    }
                                                    type="select"
                                                    name="referaction_sph_R"
                                                    id="referaction_sph_R"
                                                    placeholder=""
                                                >
                                                    {refSphList}
                                                </Input>
                                            </td>
                                            <td className="table-solid">
                                                <Input
                                                    value={data.referaction_cyl_R}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'referaction_cyl_R')
                                                    }
                                                    type="select"
                                                    name="referaction_cyl_R"
                                                    id="referaction_cyl_R"
                                                    placeholder=""
                                                >
                                                    {refCylList}
                                                </Input>
                                            </td>
                                            <td className="table-solid">
                                                <Input
                                                    value={data.referaction_ax_R}
                                                    onChange={(event) =>
                                                        this.changeValue(event, 'referaction_ax_R')
                                                    }
                                                    type="text"
                                                    name="referaction_ax_R"
                                                    id="referaction_ax_R"
                                                    placeholder=""
                                                />
                                            </td>
                                            <td className="table-solid"/>
                                        </tr>
                                        <tr>
                                            <th className="table-solid">Comments</th>
                                            <td className="table-solid" colSpan="4">
                                                <div>
                                                    <h5>Vùng điều trị:</h5>
                                                    <Input
                                                        value={data.comment_vung_dieu_tri_R}
                                                        onChange={(event) =>
                                                            this.changeValue(
                                                                event,
                                                                'comment_vung_dieu_tri_R'
                                                            )
                                                        }
                                                        type="select"
                                                        name="comment_vung_dieu_tri_R"
                                                        id="comment_vung_dieu_tri_R"
                                                        placeholder=""
                                                    >
                                                        {fixArea}
                                                    </Input>
                                                    <h5 style={{marginTop: 5}}>Mắt bò:</h5>
                                                    <Input
                                                        value={data.comment_matbo_R}
                                                        onChange={(event) =>
                                                            this.changeValue(event, 'comment_matbo_R')
                                                        }
                                                        type="select"
                                                        name="comment_matbo_R"
                                                        id="comment_matbo_R"
                                                        placeholder=""
                                                    >
                                                        {beefEye}
                                                    </Input>
                                                    <h5 style={{marginTop: 5}}>Size:</h5>
                                                    <Input
                                                        value={data.comment_size_R}
                                                        onChange={(event) =>
                                                            this.changeValue(event, 'comment_size_R')
                                                        }
                                                        type="select"
                                                        name="comment_size_R"
                                                        id="comment_size_R"
                                                        placeholder=""
                                                    >
                                                        {sizeOptions}
                                                    </Input>
                                                    <h5 style={{marginTop: 5}}>Di chuyển:</h5>
                                                    <Input
                                                        value={data.comment_di_chuyen_R}
                                                        onChange={(event) =>
                                                            this.changeValue(event, 'comment_di_chuyen_R')
                                                        }
                                                        type="select"
                                                        name="comment_di_chuyen_R"
                                                        id="comment_di_chuyen_R"
                                                        placeholder=""
                                                    >
                                                        {moveOptions}
                                                    </Input>
                                                    <h5 style={{marginTop: 5}}>Kết luận:</h5>
                                                    <Input
                                                        value={data.comment_ket_luan_R}
                                                        onChange={(event) =>
                                                            this.changeValue(event, 'comment_ket_luan_R')
                                                        }
                                                        type="text"
                                                        name="comment_ket_luan_R"
                                                        id="comment_ket_luan_R"
                                                        placeholder=""
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="table-solid">Video</th>
                                            <td className="table-solid" colSpan="4">
                                                {
                                                    this.state.isLoadingRight ? <ReactLoading type={'spin'} color={'grey'} height={20} width={20} />
                                                        : <Input
                                                            onChange={(event) =>
                                                                this.changeFile(
                                                                    event.target.files[0],
                                                                    'right',
                                                                    event
                                                                )
                                                            }
                                                            type="file"
                                                            name="file"
                                                            id="exampleFile"
                                                        />
                                                }
                                                {
                                                    this.state.video_R &&
                                                    <div style={{marginTop: 10}}>
                                                        <Player
                                                            playsInline
                                                            fluid={false}
                                                            width={250}
                                                            height={400}
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
                            <Button
                                onClick={() => this.resetForm()}
                                style={{marginLeft: 15}}
                            >
                                Làm mới
                            </Button>
                            <Button
                                onClick={() => this.createFitting()}
                                style={{marginLeft: 15}}
                                color={this.props.isNew ? 'success' : 'primary'}
                            >
                                {this.props.isNew ? 'Tạo mới' : 'Cập nhật'}
                            </Button>
                        </Row>
                    </Form>
                </Collapse>
            </div>
        );
    }
}

export default FittingForm;
