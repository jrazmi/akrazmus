import { FilterQuery } from "../../../util";


export const users = async (root, args, ctx, info) => {
    let query = new FilterQuery(ctx.db, 'users', args.input);

    const items = await query.run()
    return {
        hasMore: false,
        totalCount: 0,
        items: items
    }
}