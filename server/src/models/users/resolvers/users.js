import { FilterQuery } from '../../../util';

export const users = async (root, args, ctx, info) => {
    const filtered = new FilterQuery(ctx.db, 'users', args.input);
    const build = await filtered.build();
    const count  = await build.totalCount.returning("count");
    const items = await build.query;
    return {
        hasMore: items.length === filtered.limit + 1,
        totalCount: count[0].count || 0,
        items: items
    }
}