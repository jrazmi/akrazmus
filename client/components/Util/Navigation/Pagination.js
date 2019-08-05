import React from 'react';
import styled, {css} from "styled-components";
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Row, Col } from '../Layout'
import { H5 } from '../Typography';

export const PaginationAnchor = styled('a')`
    font-size: .75rem;
    cursor: pointer;
    text-transform: uppercase;
    color: ${props => props.theme.colors.black};
    ${({disabled}) => disabled && css`
        cursor: not-allowed;
        opacity: .4;
        pointer-events: none;

        &:hover,
        &:focus,
        &:active {

            cursor: not-allowed;
            text-decoration: none;
            opacity: .4;
            color: ${props => props.theme.colors.black};

        }
    `}
`;

export class Pagination extends React.Component {
    paginate(itemCount, pageNumber, perPage, path) {
        let nextPage = `${path}?page=${pageNumber + 1}&perpage=${perPage}`;
        let previousPage = `${path}?page=${pageNumber - 1}&perpage=${perPage}`;
        return {
            nextPage: nextPage,
            previousPage: previousPage,
            hasNext: (pageNumber * perPage) < itemCount,
            hasPrevious: pageNumber > 1,
            totalPages: Math.ceil(itemCount / perPage)
        }
    }
    render(){
        const { itemCount, pageNumber, perPage, path} = this.props;
        const pages = this.paginate(itemCount, pageNumber, perPage, path);
        return(
            <Row bsPrefix="row align-items-center justify-content-center text-center">
                    <Col md={2} >
                        <Link href={pages.previousPage}>
                            <PaginationAnchor href={pages.hasPrevious ? pages.previousPage : null} disabled={!pages.hasPrevious ? 1 : 0}>Prev</PaginationAnchor>
                        </Link>
                    </Col>
                      <Col md={4}>
                        
                        <H5 uppercase>Total: {itemCount}</H5>
                    </Col>
                    <Col md={4}>
                        <H5 uppercase>Page: {pageNumber} / {pages.totalPages} </H5>
                    </Col>
                    <Col md={2}>
                        <Link href={pages.nextPage}>
                            <PaginationAnchor href={pages.hasNext ? pages.nextPage : null} disabled={!pages.hasNext ? 1 : 0}>Next</PaginationAnchor>
                        </Link>
                    </Col>
                  
            </Row>
        )
    }
}

Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired
}