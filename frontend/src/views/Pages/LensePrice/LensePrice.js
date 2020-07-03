import React, {Component} from 'react';
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    ModalBody,
    Row
} from 'reactstrap';
import {adminServices} from "../../../services";

class LensePrice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            govPrice: 0,
            softPrice: 0,
        };
    }

    componentDidMount() {
        this.getLensePrice();
    }

    getLensePrice() {
        this.setState({isLoading: true});
        adminServices.getLensePrice('GOV')
            .then(result => {
                if (result.data && result.data.price) {
                    this.setState({govPrice: result.data.price})
                }
            }).catch(error => {
                console.log(error);
            }
        )
        adminServices.getLensePrice('SOFT')
            .then(result => {
                if (result.data && result.data.price) {
                    this.setState({softPrice: result.data.price})
                }
            }).catch(error => {
                console.log(error);
            }
        )
    }

    updatePrice() {
        const {govPrice, softPrice} = this.state;
        const govData = {
            price: govPrice, type: 'GOV'
        }
        const softData = {
            price: softPrice, type: 'SOFT'
        }
        if (govPrice >= 0 && softPrice >= 0) {
            adminServices.updateLensePrice(govData, softData).then(result => {
                if (result[0].msg === 'success' || result[1].msg === 'success') {
                    alert('cập nhật thành công')
                } else {
                    alert('có lỗi xảy ra , vui lòng thử lại')
                }
            }).catch(error => {
                console.log(error);
                alert('có lỗi xảy ra , vui lòng thử lại')
            })
        } else {
            alert('Vui lòng kiểm tra lại giá trị hợp lệ')
        }

    }

    render() {
        return (
            <div className="animated fadeIn" style={{ width: '1200px'}}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Điều chỉnh giá kính (Đơn vị: Việt Nam đồng)</strong>
                            </CardHeader>
                            <div style={{ margin: '20px 30px 0 30px'}}>
                                <FormGroup>
                                    <Label for="name">Giá kính Custom OK :</Label>
                                    <Input onChange={(event) => {
                                        this.setState({govPrice: event.target.value})
                                    }} value={this.state.govPrice} type="number" min={0} name="govPrice" id="govPrice" placeholder="" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleText">Giá kính Soft OK :</Label>
                                    <Input onChange={(event) => {
                                        this.setState({softPrice: event.target.value})
                                    }} value={this.state.softPrice} type="number" min={0} name="softPrice" id="softPrice" placeholder="" />
                                </FormGroup>
                                <Button onClick={() => this.updatePrice()} style={{ marginBottom: 15}} color={'success'}>Cập nhật</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default LensePrice;
