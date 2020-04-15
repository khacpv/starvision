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
import {customerService} from "../../../services/index";

class Login extends Component {

    state = {
        username: '',
        password: ''
    };

    login() {
        const {username, password} = this.state;
        if (username && password) {
            authService.login(qs.stringify({username, password})).then(result => {
                authService.setToken(result.data.token, result.data);
                // this.props.saveProfile(result.data);
                this.props.history.push('/dashboard');
                customerService.getUserData(result.data.user_id).then(data => {
                    authService.setUser(data.data[0]);
                }).catch(error => console.log(error))
            }).catch((error) => {
                alert('thông tin đăng nhập không chính xác')
            });
        } else {
            alert('Vui lòng nhập đủ thông tin')
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
                                            <h1>Đăng nhập</h1>
                                            <p className="text-muted">Đăng nhập vào hệ thống</p>
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
                                                <Input onChange={(event) => this.state.password = event.target.value} type="password" placeholder="Mật khẩu"
                                                       autoComplete="current-password"/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button onClick={() => this.login()} color="primary" className="px-4">Hoàn tất</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Quên mật khẩu?</Button>
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

Login.propTypes = {
    saveProfile: PropTypes.func,
};

const mapStateToProps = state => ({

});

const actions = dispatch => ({
    saveProfile: (data) => dispatch(saveProfile(data))
});

export default connect(mapStateToProps, actions)(Login);
