const { addBookmark, filterValidBookmarks, sortBookmarksReverse } = require('./bookmarkUtils.js');

describe('Bookmark Utilities', () => {
  test('addBookmark adds a new bookmark', () => {
    const existing = [{ title: 'Old', url: 'http://old.com', timestamp: '2025-01-01T12:00:00Z' }];
    const newB = { title: 'New', url: 'http://new.com', description: 'desc' };
    const result = addBookmark(existing, newB);
    expect(result.length).toBe(2);
    expect(result[1].title).toBe('New');
    expect(result[1]).toHaveProperty('timestamp');
  });

  test('addBookmark throws error if title or url missing', () => {
    expect(() => addBookmark([], { title: '', url: 'http://x.com' })).toThrow();
    expect(() => addBookmark([], { title: 'X', url: '' })).toThrow();
  });

  test('filterValidBookmarks removes invalid bookmarks', () => {
    const bookmarks = [
      { title: 'A', url: 'a.com' },
      { title: '', url: 'b.com' },
      { url: 'c.com' },
      null,
    ];
    const valid = filterValidBookmarks(bookmarks);
    expect(valid.length).toBe(1);
    expect(valid[0].title).toBe('A');
  });

  test('sortBookmarksReverse reverses the array', () => {
    const bookmarks = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const sorted = sortBookmarksReverse(bookmarks);
    expect(sorted[0].id).toBe(3);
    expect(sorted[2].id).toBe(1);
  });
});
