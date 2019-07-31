import DataLoader from 'dataloader';

export const SingleLoader = (db, table, key) => new DataLoader(
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

export const ManyLoader = (db, table, key) => new DataLoader(
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

export const FilterLoader = (query) => new DataLoader(
    (keys) => {
        query
        .then(rows => {
            return(
                keys.map(id => {
                    return(
                        rows.filter(x=>x.id === id)
                    )
                })
            )
        }) 
    }
)