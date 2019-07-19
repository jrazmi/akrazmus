import DataLoader from 'dataloader';
const db = require('../../db/knex.js');

export const SingleLoader = (table, key) => new DataLoader(
    (keys) => {
        return(
            db.table(table)
            .whereIn(key, keys).select()
            .then(rows => {
                return(
                    keys.map(ikey=>{
                        return(
                            rows.find(x=>x[key] === ikey)
                        )
                    }
                    )
                )
            })
        )
    }
)

export const ManyLoader = (table, key) => new DataLoader(
    (keys) => {
        return(
            db.table(table)
            .whereIn(key, keys).select()
            .then(rows => {
                return(
                    keys.map(ikey=>{
                        return(
                            rows.filter(x=>x[key] === ikey)
                        )
                    }
                    )
                )
            })
        )
    }
)