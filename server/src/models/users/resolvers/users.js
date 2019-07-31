import { FilterQuery } from '../../../util';

export const users = async (root, args, ctx, info) => {
    let query = new FilterQuery(ctx.db, 'users', args.input);

    const build = query.build();
    console.log(build.toString())
    const items = await build
    return {
        hasMore: false,
        totalCount: 0,
        items: items
    }
}