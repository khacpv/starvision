import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.css';

class Paginations extends Component {

    navigateScreen(data) {
        const {url, limit, history} = this.props;
        history.push(`/${url}?limit=${limit}&&offset=${(data.selected * limit) + 1}`);
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 20,
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
                marginTop: '30px'
            }}>
                <ReactPaginate
                    activeClassName={'item activePage '}
                    breakClassName={'item break-me '}
                    breakLabel={'...'}
                    containerClassName={'pagination'}
                    disabledClassName={'disabled-page'}
                    marginPagesDisplayed={5}
                    nextClassName={"item next "}
                    nextLabel={'trang sau'}
                    onPageChange={(data) => this.navigateScreen(data)}
                    pageCount={this.props.total/this.props.limit}
                    pageClassName={'item pagination-page '}
                    pageRangeDisplayed={2}
                    previousClassName={"item previous"}
                    previousLabel={'trang trước'}
                />
            </div>
        );
    }
}

export default Paginations;
