// Deletes all empty folders from the user's bookmarks.

// Method getTree returns an object of type Promise, which is really gay.
var asyncFlowController = browser.bookmarks.getTree();

// Setup callback functions to receive the results when they're ready.
asyncFlowController.then(onSuccess, onFailure);

/**
 * Async callback to receive bookmarks.
 *
 * @param {BookmarkTreeNode[]} bookmarksRootArray
 */
function onSuccess(bookmarksRootArray) {
    removeEmptyFolders(bookmarksRootArray);
}

/**
 * Callback for failure condition
 */
function onFailure(e) {
    console.log(`Error: ${e}`);
}

/**
 * Checks if the bmtNode is a folder.
 *
 * @param {BookmarkTreeNode} bmtNode - The folder to check
 * @return true if it is a folder, false otherwise
 */
function isFolder(bmtNode) {
    // The "type" property is optional so we have make sure it is there
    // before we use it to determine the type.
    if (bmtNode.type) {
        return bmtNode.type == "folder";
    }
    else {
        return ! bmtNode.url;
    }
}

/**
 * Checks for no children. Does not check that it is a folder
 * or bookmark item.
 *
 * @param {BookmarkTreeNode} bmtNode - The folder to check for no children
 * @return true if it is empty (no children), false otherwise
 */
function isChildless(bmtNode) {
    return (!bmtNode.children) || bmtNode.children.length == 0;
}

/**
 * Gets the bookmark title or its id if the title is empty
 *
 * @param {BookmarkTreeNode} bmtNode - The bookmark or folder
 * @return The title or id if the title is empty
 */
function getTitle(bmtNode) {
    var title;
    if (bmtNode.title.length == 0) {
        title = "Unamed element (id=" + bmtNode.id + ") in folder " 
            + bmtNode.parent;
    }
    else {
        title = bmtNode.title;
    }
    return title;
}

/**
 * Recursively removes any empty bookmark folders 
 *
 * @param {BookmarkTreeNode[]} bookmarkNodes - Array from which to
 *                                              remove empty folder
 *                                              elements
 */
function removeEmptyFolders(bookmarkTreeNodes) {
    for (var bmtNode of bookmarkTreeNodes) {
        if (isFolder(bmtNode) {
            if (isChildless(bmtNode) {
                console.log("Removing empty folder: " + getTitle(bmtNode));
                //browser.bookmarks.remove(item.id);
            }
            else {
                removeEmptyFolders(bmtNode.children);
            }
        }
    }
}

