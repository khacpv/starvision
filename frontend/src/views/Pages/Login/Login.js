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

class Login extends Component {

    state = {
        username: '',
        password: ''
    };

    login() {
        const {username, password} = this.state;
        authService.login(qs.stringify({username, password})).then(result => {
            authService.setToken(result.data.token, result.data);
            this.props.history.push('/dashboard')
        }).catch((error) => {
            console.log(error)
        });
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

export default Login;
