import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Pagination, PaginationItem, PaginationLink} from 'reactstrap';

class Paginations extends Component {

    navigateScreen(page) {
        const {url, limit, history} = this.props;
        history.push(`/${url}?limit=${limit}&&offset=${((page - 1) * limit) + 1}`);
        // this.props.resetData();
    }

    render() {
        return (
            <div className="animated fadeIn" style={{ marginTop: '30px'}}>
                <Pagination>
                    <PaginationItem disabled>
                        <PaginationLink previous tag="button"/>
                    </PaginationItem>
                    <PaginationItem active>
                        <PaginationLink onClick={() => this.navigateScreen(1)} tag="button">
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={() => this.navigateScreen(2)} tag="button">
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink tag="button">
                            3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink tag="button">
                            4
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink tag="button">
                            5
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next tag="button"/>
                    </PaginationItem>
                </Pagination>
            </div>
        );
    }
}

export default Paginations;
