import _ from 'lodash';

/* 
Filter construction based on Jake Lowen's
https://github.com/jakelowen/sqorn-graphql-filters/blob/master/lib/applyFilters.js

*/


export class FilterQuery {
    constructor(db, table, input){
        this.db = db;
        this.query = this.db(table);
        this.where = input && input.where ? input.where : null;
        this.limit = input && input.limit ? input.limit : null;
        this.sort = input && input.sort ? input.sort : null;
        this.offset = input && input.offset ? input.offset : null;
        
    }

    // construct the query
    build = async () =>{
        if(this.where){
            const prepped = this.prep(this.where);
            this.query = this.compose(this.query, prepped);
        }

        const totalCount = this.query.clone().count('*');

        
        if(this.sort){
            _.map(this.sort, (order, column) => {
                this.query = this.query.orderBy(
                    column, order.toLowerCase()
                    )
                })
            }
            
        const limit = this.limit ? this.limit : 20;
        const offset = this.offset ? this.offset : 0;

        this.query = this.query.limit(limit + 1);
        this.query = this.query.offset(offset);

        return {query: this.query, totalCount: totalCount}
    }

    prep = (statement, parent=null) => {
        const expressions = [];
        _.map(statement, (x,y) => {
            
            if( y === "OR"){
                expressions.push({
                    class: "PARENT",
                    connector: "OR",
                    parent: parent,
                    operations: this.prep(x, "OR")
                });
            }
            else if( y === "AND"){
                expressions.push({
                    class: "PARENT",
                    connector: "AND",
                    parent: parent,
                    operations: this.prep(x, "AND")
                });
            } else {
                _.map(x, (v, k) => {
                    if(k === "AND" || k === "OR") {
                        const subOption = this.prep({[k]: v}, parent);
                        expressions.push(subOption[0])
                    } else {
                        _.map(v, (x, d) => {
                            expressions.push({
                                class: "EXPRESSION",
                                column: k,
                                operation: d,
                                value: x,
                                parent: parent
                            })
                        })
                    }

                })
            }
        })
        return expressions
    }

    compose = (builder, expressions) => {
        _.map(expressions, statement => {
     
            switch(statement.class){
                case "PARENT": {
                    switch(statement.parent){
                        case "OR": {
                            builder = builder.orWhere((sb) => {
                                return this.compose(sb, statement.operations)
                            });
                            break;
                        } 
                        case "AND": {
                            builder = builder.andWhere((sb) => {
                                return this.compose(sb, statement.operations);
                            })
                            break;
                        }
                        default: {
                            if(statement.connector === "OR"){
                                builder = builder.orWhere((sb) => {
                                    return this.compose(sb, statement.operations)
                                });
                                break;
                            } else {
                                builder = builder.andWhere((sb) => {
                                    return this.compose(sb, statement.operations);
                                })
                                break;
                            }

                        }

                    }
                }
                case "EXPRESSION": {
                    switch(statement.parent){
                        case "OR": {
                            builder = builder.orWhere((sb) => {
                                return this.operations(sb, statement);
                            });
                            break;
                        }
                        default: {
                            builder = builder.andWhere((sb) => {
                                return this.operations(sb, statement);
                            })
                        }
                    }
                }
            }
        })
        return builder;
        
    }

    operations = (innerBuilder, statement) => {
        switch(statement.operation){
            case 'eq':{
                return innerBuilder.where(statement.column, '=', statement.value);
            }
            case 'neq': {
                return innerBuilder.where(statement.column, '!=', statement.value);
            }
            case 'in': {
                return innerBuilder.whereIn(statement.column, statement.value);
            }
            case 'notIn': {
                return innerBuilder.whereNotIn(statement.column, statement.value);
            }
            case 'lt': {
                return innerBuilder.where(statement.column, '<', statement.value);
            }
            case 'lte': {
                return innerBuilder.where(statement.column, '<=', statement.value);
            }
            case 'gt': {
                return innerBuilder.where(statement.column, '>', statement.value);
            }
            case 'gte': {
                return innerBuilder.where(statement.column, '>=', statement.value);
            }
            case 'contains': {
                return innerBuilder.where(statement.column, 'ilike', `%${statement.value}%`);
            }
            case 'notContains':{
                return innerBuilder.whereNot(statement.column, 'ilike', `%${statement.value}%`);
            }
            case 'startsWith': {
                return innerBuilder.where(statement.column, 'ilike', `${statement.value}%`);
            }
            case 'notStartsWith': {
                return innerBuilder.whereNot(statement.column, 'ilike', `${statement.value}%`);
            }
            case 'endsWith': {
                return innerBuilder.where(statement.column, 'ilike', `%${statement.value}`);
            }
            case 'notEndsWith': {
                return innerBuilder.whereNot(statement.column, 'ilike', `%${statement.value}`);
            }
            default:
                break;
        }
   
    }
  
}