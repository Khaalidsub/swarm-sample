import { pageItem } from '../types';

export const paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,

  getCursor = (item: pageItem) => null,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);

  const cursorIndex = results.findIndex((item: pageItem) => {
    let itemCursor = item.id ? item.id : getCursor(item);

    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
        )
    : results.slice(0, pageSize);
};
