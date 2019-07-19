import DataLoader from 'dataloader';
const db = require('../../db/knex.js');

export const Loader = (table, key) => new DataLoader(
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