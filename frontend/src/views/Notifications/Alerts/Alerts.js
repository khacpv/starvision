import React, {Component} from 'react';
import {Alert, Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {customerService} from "../../../services";

class Alerts extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        customerService.getAllNotify().then(result => {
            console.log(result)
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-bell"></i><strong>Danh sách thông báo</strong>
                            </CardHeader>
                            <CardBody>
                                <Alert color="primary">
                                    This is a primary alert — check it out!
                                </Alert>
                                <Alert color="secondary">
                                    This is a secondary alert — check it out!
                                </Alert>
                                <Alert color="success">
                                    This is a success alert — check it out!
                                </Alert>
                                <Alert color="danger">
                                    This is a danger alert — check it out!
                                </Alert>
                                <Alert color="warning">
                                    This is a warning alert — check it out!
                                </Alert>
                                <Alert color="info">
                                    This is a info alert — check it out!
                                </Alert>
                                <Alert color="light">
                                    This is a light alert — check it out!
                                </Alert>
                                <Alert color="dark">
                                    This is a dark alert — check it out!
                                </Alert>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Alerts;
