import React, {Component} from 'react';
import {Alert, Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {customerService} from "../../../services";
import moment from "moment";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        };
    }

    componentDidMount() {
        customerService.getAllNotify().then(result => {
            this.setState({notifications: result.data}, () => {
                customerService.markReadAllNotify().then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                })
            })
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="animated fadeIn" style={{ width: '1200px'}}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-bell"/><strong>Danh sách thông báo</strong>
                            </CardHeader>
                            <CardBody>
                                {
                                    this.state.notifications.map((notification, index) => (
                                        <Alert key={index} color="secondary">
                                            <h4>{notification.title}</h4>
                                            <p style={{color: 'black'}}>Nội dung: {notification.content}</p>
                                            <p>Thời điểm: {notification.send_at ? moment(new Date(notification.send_at)).format('DD-MM-YYYY hh:ss'): ''}</p>
                                        </Alert>
                                    ))
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Notification;
