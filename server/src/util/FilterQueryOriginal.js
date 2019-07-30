import _ from 'lodash';

/* 
Filter construction based on Jake Lowen's
https://github.com/jakelowen/sqorn-graphql-filters/blob/master/lib/applyFilters.js

*/

/*

DEEEPLY NESTED IS NOT WORKING
THAT SECOND OR ISN't working.
AND:[
    OR:{..., {OR: {...}}}
]


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
    run = async () =>{
        if(this.where){
            const prepped = this.prep(this.where);
            this.query = this.query.where((builder)=>{
                return this.build(builder, prepped);
            }
            )

        }
        return await this.query.select('*')
    }


    // map out all of the filter clauses
    prep = (clause, parent=null, isNested = false) => {

        //map out conditions for query
        let expressions = [];
        _.map(clause, (x,y) => {
            // console.log(y)
            // console.log(x);
            /*
            if this clause is not an array and its not nested construct the expression
            
            EXAMPLE QUERY:
            where: {
                deleted: { eq: false}
            }

            EXPECTED expressions:
            [ { class: 'EXPRESSION',
                column: 'deleted',
                operation: 'eq',
                value: false } 
            ]
            */

            if(!Array.isArray(x) && !parent && !isNested){
                _.map(x, (v, k) => {
                    expressions.push({
                        class: "EXPRESSION",
                        column: y,
                        operation: k,
                        value: v,
                    })
                })
            } 
            
            /*
            AND/OR clauses should construct a parent expression and recursivly call prep function on nested subclauses
            
            EXAMPLE QUERY (AND SINGULAR):
            input: {
                    where: {
                        AND: {id: {eq: "1"}
                    }
                }
            EXPECTED expressions(AND SINGULAR): 
            [ { class: 'PARENT',
                connector: 'AND',
                operations:
                [ { class: 'EXPRESSION', column: 'id', operation: 'eq', value: '1' } ] } ]
            
            EXAMPE QUERY (OR ARRAY):
              where: {
                OR: [
                    {deleted:{eq: false}}
                    {id:{eq: "1"}}
                    ]
                }
            EXPECTED expressions (ARRAY):
                [ { class: 'PARENT',
                    connector: 'OR',
                    operations:
                    [ { class: 'EXPRESSION',
                        column: 'deleted',
                        operation: 'eq',
                        value: false },
                    { class: 'EXPRESSION', column: 'id', operation: 'eq', value: '1' } ] } ]

            */
            
            else if ( y === 'AND'){
                expressions.push({
                    class: "PARENT",
                    connector: "AND",
                    operations: this.prep(x, parent, true),
                    parent: parent,
                })
            } 
            else if ( y === "OR"){
                expressions.push({
                    class: "PARENT",
                    connector: "OR",
                    operations: this.prep(x, parent, true),
                    parent: parent
                })
            } else 
            
            /* if clause is not a parent and not a root expression
                map values and recursively call prep function until narrowed to EXPRESSIONS
            */
            
            {
                _.map(x, (v, k) => {
                    if( k === "AND" || k === "OR") {
                    
                        const subOp = this.prep({ [k]: v}, k);
                        expressions.push(subOp[0]);
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
        return expressions;

    }

    // build the expression, if it is a parent rebuild subexpressions
    build = (builder, expressions) => {
        let thisBuilder = builder;
        _.map(expressions, statement => {
            
            switch(statement.class){
                case "PARENT": {
                      
                            thisBuilder = builder.where((builder) => {
                                return this.build(builder, statement.operations)
                            })

                    break;
                }
                case "EXPRESSION": {
                    return this.generate(thisBuilder, statement);
                    break;
                }
                default: {
                    break;
                }
            }
        });
        return thisBuilder;
    }

    // generate or vs and queries default to andWhere
    // if the statement has a parent 
    generate = (builder, statement) => {
    
        switch(statement.parent){
            case "OR": {
                // console.log(statement)
                return builder.orWhere((innerBuilder)=> { 
                    return this.operations(innerBuilder, statement);
                });
                break;
            }
            default: {
                return builder.andWhere((innerBuilder)=> { 
                    return this.operations(innerBuilder, statement);
                });
            }
            // case "OR": {
            //     return builder.orWhere(statement.column, this.operations(statement.operation), statement.value);
            //     break;
            // }
            // default: {
            //     return builder.andWhere(statement.column, this.operations(statement.operation), statement.value);
            //     break;
            // }

        }
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
    // operations = (operation) => {
    //     switch(operation){
    //         case "eq": {
    //             return '='
    //         }
    //         case "neq": {
    //             return '!='
    //         }
    //         default:
    //             break;
    //     }
    // }

}