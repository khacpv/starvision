import React, {Component} from 'react';
import {
    Button, Modal, ModalBody, ModalFooter, ModalHeader,
    Row, Table
} from 'reactstrap';
import {adminServices} from "../../../services";
import moment from "moment";
const queryString = require('query-string');

class ListNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            notificationList: [],
            isShowModalDelete: false,
            lenseChoosing: null,
            totalLense: 0
        };
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    componentDidMount() {
        this.getNotification();
    }

    getNotification() {
        this.setState({isLoading: true});
        adminServices.getAllNotifications()
            .then(result => {
                if (result.status === 'success') {
                    this.setState({notificationList: result.data})
                }
            }).catch(error => {
                console.log(error);
            }
        )
    }

    render() {
        return (
            <div className="animated fadeIn" style={{backgroundColor: 'white', padding: '30px 45px 30px 45px', width: '1200px'}}>
                <div>
                    <Button color={'success'} onClick={() => this.props.history.push('/adminNotification')}>Gửi thông báo mới</Button>
                </div>
                <div style={{marginTop: 20}}>
                    <Table responsive className='table-solid'>
                        <thead>
                        <tr style={{ backgroundColor: '#F8F8F8'}}>
                            <th className='table-solid'>Tiêu đề</th>
                            <th className='table-solid' style={{width: '500px'}}>Nội dung</th>
                            <th className='table-solid'>Ngày gửi</th>
                            <th className='table-solid'>Người nhận</th>
                            <th className='table-solid'>Trạng thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.notificationList.map((item, index) => (
                                <tr key={index}>
                                    <td className='table-solid'>
                                        {item.title}
                                    </td>
                                    <td className='table-solid'>
                                        {item.content}
                                    </td>
                                    <td className='table-solid'>
                                        {moment(new Date(item.send_at)).format('DD/MM/YYYY')}
                                    </td>
                                    <td className='table-solid'>
                                        {item.user.name}
                                    </td>
                                    <td className='table-solid'>
                                        {item.is_read === 0 ? 'chưa đọc' : 'đã đọc'}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default ListNotifications;
