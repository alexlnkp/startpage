/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

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

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"qZJXPHtevc5GeXIY","label":"reddit","bookmarks":[{"id":"vflp8J7K4f7xvBJ7","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"2K75XiVT4TgeYK6d","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"Y31LE7mkfJib3YEU","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"dZpkK8VgxyMtHF4V","label":"design tools","bookmarks":[{"id":"qK9TUmt5nHZ2yxvX","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"jMViptaOnEk6NUtX","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"qBqugWJWFov1FUzL","label":"haikei","url":"https://app.haikei.app/"},{"id":"ug5SeLDKgMaEBAFg","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"2UBwFPhRarcFJrCi","label":"worth reading","bookmarks":[{"id":"sPpkMrf4IvPzzs1x","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"WdzlC4MnbKJgDcvG","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"1Ao1Crcc6Aibegb0","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"PL0CUNQAggdLdqQ9","label":"sources","bookmarks":[{"id":"87zmi9VqEobuU1Qr","label":"icons","url":"https://feathericons.com/"},{"id":"lc5Yahe1H9lz0Ft5","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"4yVbafNyDVi8gqxB","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"4zkN2Z31czVpbV3H","label":"author","url":"https://prettycoffee.github.io/"}]}]

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