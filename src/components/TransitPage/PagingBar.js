import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import ReactPaginate from 'react-paginate';

import './style/PagingBar.css';

class PagingBar extends React.Component
{
    render() {
        const { intl } = this.props;
        var prevPage = intl.formatMessage({id: "pagingbar_prev"});
        var nextPage = intl.formatMessage({id: "pagingbar_next"});

        return (
            <div>
                <ReactPaginate
                    initialPage={0}
                    forcePage={this.props.forcePage}
                    previousLabel={prevPage}
                    nextLabel={nextPage}
                    breakLabel={<a href = "" > ...</a>}
                    breakClassName={"break-me"}
                    pageCount={this.props.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={4}
                    onPageChange={this.props.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}>
                </ReactPaginate>
            </div>
        );
    }
}

export default injectIntl(PagingBar);