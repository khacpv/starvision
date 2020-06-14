import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';
import {authService} from "../../../services";
import qs from 'qs';
import {saveProfile} from "../../../actions/AccountAction";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {customerService} from "../../../services";
import AdminDashboard from "../AdminDashboard";

class ForgotPassword extends Component {

    state = {
        username: '',
        lienhe: ''
    };

    getPassword() {
        const {username, lienhe} = this.state;
        if (username && lienhe) {
            authService.forgotPassword({username, lienhe}).then(result => {
                if (result.status === 'success') {
                    alert('Hệ thống đang xử lí, chúng tôi sẽ liên lạc sau khi xác nhận thông tin')
                    this.props.history.push('login')
                } else {
                    alert(result.message)
                }
            }).catch(error => {
                alert('Có lỗi xảy ra , vui lòng thử lại sau')
            })
        } else {
            alert('Vui lòng nhập đầy đủ thông tin')
        }

    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="4">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form>
                                            <h1>Quên mật khẩu</h1>
                                            <p className="text-muted">Để đặt lại mật khẩu của bạn, nhập đúng thông tin và chúng tôi sẽ gửi cho bạn hướng dẫn</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input onChange={(event) => this.state.username = event.target.value} type="text" placeholder="Tài khoản" autoComplete="username"/>
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input onChange={(event) => this.state.lienhe = event.target.value} type="text" placeholder="Số điện thoại hoặc email"
                                                       autoComplete="current-password"/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button onClick={() => this.getPassword()} color="primary" className="px-4">Hoàn tất</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ForgotPassword;
