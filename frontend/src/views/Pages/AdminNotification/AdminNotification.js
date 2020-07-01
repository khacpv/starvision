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
import { Multiselect } from 'multiselect-react-dropdown';
import {adminServices} from "../../../services";

class AdminNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [],
            title: '',
            content: '',
            selectedList: []
        };
    }

    componentDidMount() {
        this.getDoctors();
    }

    getDoctors() {
        this.setState({isLoading: true});
        adminServices.getDoctors('')
            .then(result => {
                this.setState({options: result.items, isLoading: false})
            }).catch(error => {
                console.log(error);
                this.setState({isLoading: false})
            }
        )
    }

    resetForm() {
        this.setState({
            title: '',
            content: '',
            selectedList: []
        })
    }

    sendNotification() {
        const {title, content, selectedList} = this.state;
        if (title && content && selectedList.length > 0) {
            let receiver_id = [];
            selectedList.map(item => {
                receiver_id.push(item.user_id)
            })
            adminServices.addNotification({
                title, content, receiver_id : receiver_id.join()
            }).then(result => {
                if (result.status === 'success') {
                    alert('Gửi thông báo thành công');
                    this.resetForm()
                } else {
                    alert('Có lỗi xảy ra, vui lòng thử lại')
                }
            }).catch(error => {
                console.log(error)
                alert('Có lỗi xảy ra, vui lòng thử lại')
            })
        } else {
            alert('Vui lòng điền đủ thông tin')
        }

    }

    onSelect(selectedList, selectedItem) {
        this.setState({selectedList})
    }

    onRemove(selectedList, removedItem) {
        this.setState({selectedList})
    }

    render() {
        return (
            <div className="animated fadeIn" style={{ width: '1200px'}}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-bell"/><strong>Gửi thông báo</strong>
                            </CardHeader>
                            <div style={{ margin: '30px'}}>
                                <h4>Danh sách người nhận</h4>
                                <Multiselect
                                    options={this.state.options} // Options to display in the dropdown
                                    selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    onSelect={(selectedList, selectedItem) => this.onSelect(selectedList, selectedItem)} // Function will trigger on select event
                                    onRemove={(selectedList, removedItem) =>this.onRemove(selectedList, removedItem)} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                />
                            </div>
                            <div style={{ margin: '0 30px 0 30px'}}>
                                <FormGroup>
                                    <Label for="name">Tiêu đề thông báo:</Label>
                                    <Input onChange={(event) => {
                                        this.setState({title: event.target.value})
                                    }} value={this.state.title} type="text" name="title" id="title" placeholder="" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleText">Nội dung thông báo:</Label>
                                    <Input onChange={(event) => {
                                        this.setState({content: event.target.value})
                                    }} value={this.state.content} type="textarea" name="content" id="content" />
                                </FormGroup>
                                <Button onClick={() => this.sendNotification()} style={{ marginBottom: 15}} color={'success'}>Gửi</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AdminNotification;
