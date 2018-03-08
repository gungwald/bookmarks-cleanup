// Unnecessary stupid JavaScript async callback setup.
browser.bookmarks.getTree().then(receiveBookmarks, bookmarksFailure);

function receiveBookmarks(bookmarksRoot) {
    removeEmptyFolders(bookmarksRoot);
}

function bookmarksFailure(e) {
    console.log(`Error: ${e}`);
}

function removeEmptyFolders(item) {
    if (item.type == "folder") {
        if (isEmpty(item)) 

