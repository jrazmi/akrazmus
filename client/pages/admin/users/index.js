import React from "react";
import { gql } from "apollo-boost";
import { Query } from 'react-apollo';
import Link from 'next/link';
import { withGlobalAuth } from '../../../components/HOC/withGlobalAuth';

import Page from '../../../components/Page';
import { CurrentUser, CurrentQuery } from '../../../lib/constructors';
import { AdminNav, AdminUserCard } from "../../../components/Admin";
import { Container, Row, Col, Box, H1 } from "../../../components/Util";
import { ActionNav, Pagination } from '../../../components/Util/Navigation';
import { Site } from '../../../lib/siteConfig';
import { LoadingBar } from '../../../components/Util/Status';
import { FilterForm } from '../../../components/Util/Filters';
import { UserPlus } from 'styled-icons/fa-solid/UserPlus';
import { UsersWhere, UsersSort } from '../../../lib/filters';

export const GET_USERS_ADMIN_QUERY = gql`
    query users($input: UsersInput){
        users(input:$input){
            hasMore
            totalCount
            items {
                id
                first_name
                last_name
                email
                globalPermissions
            }
        }
    }
`;
class AdminUsersIndex extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentQuery = CurrentQuery(this.props);
        return(
            <Page
                currentUser={currentUser}
                SideNav={<AdminNav currentUser={currentUser}/>}
            >
                <Container>
                    <Row bsPrefix="row py-5">
                        <Col>
                            <Query query={GET_USERS_ADMIN_QUERY}>
                                {({data, loading, error}) => {
                                    return(
                                        <React.Fragment>
                                            <Box>
                                                <Row bsPrefix="row align-items-center">
                                                    <Col md={3}>
                                                        <H1>Users</H1>
                                                    </Col>
                                                    <Col md={6}>
                                                        {data && data.users &&
                                                            <Pagination 
                                                                itemCount={data.users.totalCount}
                                                                pageNumber={1}
                                                                perPage={20}
                                                                path={Site.routes.admin.users.index}
                                                            />
    
                                                        }
                                                    </Col>
                                                    <Col md={3}>
                                                    <ActionNav className="justify-content-end">
                                                            <Link href={Site.routes.admin.users.create}>
                                                                <ActionNav.Link href={Site.routes.admin.users.create}> <span><UserPlus/></span> new </ActionNav.Link>
                                                            </Link>
        
                                                    </ActionNav>
                                                    </Col>
                                                </Row>
                                                <LoadingBar loading={loading ? 1 : 0}/>
                                                        
                                                <FilterForm 
                                                    currentQuery={currentQuery}
                                                    path={Site.routes.admin.users.index}
                                                    filters={UsersWhere}
                                                    sort={UsersSort}
                                                />
                                                            
                                           

                                            </Box>
                                            
                                            <Row>
                                                {data && data.users && data.users.items &&
                                                    data.users.items.map((item, idx) => {
                                                        return(
                                                            <Col lg={4} key={idx}>
                                                                <AdminUserCard user={item}/>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>


                                            <Box>
                                            <LoadingBar loading={loading ? 1 : 0}/>
                                            {data && data.users &&
                                                            <Pagination 
                                                                itemCount={data.users.totalCount}
                                                                pageNumber={1}
                                                                perPage={20}
                                                                path={Site.routes.admin.users.index}
                                                            />
    
                                                        }
                                            </Box>
                                        </React.Fragment>
                                    )
                                }}

                            </Query>
                        </Col>
                    </Row>
                </Container>

            </Page>
        )
    }
}


export default withGlobalAuth(AdminUsersIndex, ["ADMIN"]);
