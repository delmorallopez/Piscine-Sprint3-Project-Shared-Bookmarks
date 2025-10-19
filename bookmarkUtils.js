// bookmarkUtils.js

// Add a new bookmark to existing array
function addBookmark(existingData, newBookmark) {
    if (!newBookmark.title || !newBookmark.url) {
      throw new Error("Title and URL are required");
    }
    return [...existingData, { ...newBookmark, timestamp: new Date().toISOString() }];
  }
  
  // Filter only valid bookmarks
  function filterValidBookmarks(bookmarks) {
    return bookmarks.filter((b) => b && b.title && b.url);
  }
  
  // Sort bookmarks reverse chronological
  function sortBookmarksReverse(bookmarks) {
    return [...bookmarks].reverse();
  }
  
  module.exports = { addBookmark, filterValidBookmarks, sortBookmarksReverse };
  