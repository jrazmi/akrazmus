import React from "react";
import { Row, Col } from '../Layout'
import PropTypes from 'prop-types';
import { AdvancedFilters } from './AdvancedFilters';
import { QuickFilters } from './QuickFilters';
import { SecondaryButton } from '../Typography';
import { InputContainer, Label, StyledSelectInput, ErrorContainer } from '../Forms/Styles';

export class FilterForm extends React.Component {
  state = {
    hasAdvancedQuery: this.props.currentQuery.hasAdvancedQuery(),
    perPage: this.props.currentQuery.perPage
  }

  toggleFilter = () => {
    this.setState({hasAdvancedQuery: !this.state.hasAdvancedQuery})
  }

  render(){
    const {currentQuery, path, filters} = this.props;
    return(
      <React.Fragment>
      <Row>
          <Col md={8}>
              <QuickFilters 
                currentQuery={currentQuery} 
                hasAdvancedQuery={this.state.hasAdvancedQuery}
                path={path}
                perPage={this.state.perPage}
                pageNumber={this.state.pageNumber}
                />
            </Col>
          
          <Col md={2}>
              <InputContainer labelBelow={1}>
                  <StyledSelectInput type="number" value={this.state.perPage} name="perPage" onChange={(e) => this.setState({perPage: e.target.value})}>
                    <option defaultValue={null} value={null}> -- Select -- </option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>

                  </StyledSelectInput>
                  <Label htmlFor="perPage" id={`label-perPage`}>Items Per Page</Label>
              </InputContainer>
          </Col>
          <Col md={2}>
            <SecondaryButton full onClick={()=>this.toggleFilter()}>Filters</SecondaryButton>
          </Col>
      </Row>

      {
        this.state.hasAdvancedQuery && 
        <AdvancedFilters 
          currentQuery={currentQuery}
          filters={filters}
        
        />
      }

      </React.Fragment>
    )

  }
}

FilterForm.propTypes = {
  currentQuery: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired
}