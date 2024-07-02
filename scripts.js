/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const lookup = {}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"dZpkK8VgxyMtHF4V","label":"usual","bookmarks":[{"id":"qK9TUmt5nHZ2yxvX","label":"github","url":"https://github.com"},{"id":"jMViptaOnEk6NUtX","label":"yt","url":"https://youtube.com"}]},{"id":"PL0CUNQAggdLdqQ9","label":"sources","bookmarks":[{"id":"OR7sAxmvnXl4U76D","label":"arch","url":"archlinux.org"},{"id":"CerJorUjr8F3uAXW","label":"aur","url":"https://aur.archlinux.org/"},{"id":"q09uZ6MaPMDqI8J6","label":"pkg","url":"https://archlinux.org/packages/"}]},{"id":"T97yo8gspA75utT4","label":"misc","bookmarks":[{"id":"yUGWys1t8iXSKyY4","label":"songsterr","url":"https://songsterr.com"},{"id":"SqCIV8RlSlrjyae0","label":"nf-cheatsheet","url":"https://www.nerdfonts.com/cheat-sheet"},{"id":"UObaqXcgfdAXgShL","label":"catppuccin","url":"https://catppuccin.com/palette"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
