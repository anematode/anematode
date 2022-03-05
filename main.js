function cycleSlides(e, delta) {
  let parent = e.parentElement
  let slides = Array.from(parent.children).filter(c => c.tagName === "IMG")

  let selected = slides.filter(s => s.classList.contains("shown-slide"))[0]
  let c = slides.length

  let currentIndex = slides.indexOf(selected)
  currentIndex = ((currentIndex + delta) % c + c) % c

  slides.forEach(s => (s.classList.remove("shown-slide"), s.classList.add("hidden-slide")))
  slides[currentIndex].classList.add("shown-slide")
}

function shortenLongDesc(text, l) {
  let chopped = text.slice(0, 300)

  for (let i = chopped.length - 1; i >= 0; --i) {
    if (chopped[i] === ' ') {
      chopped = chopped.slice(0, i)
      break
    }
  }

  if (chopped.length < text.length) {
    chopped += `<span class="chopped">...</span> `
  }

  chopped += `<a class="read-more" href="${l}">Read more »</span>`
  return chopped
}

function loadProjectsAsync({ desc } = {desc: "long"}) {
  let elem = () => document.getElementsByClassName("project-list")[0]

  let projects = fetch("/projects/project_list.json").then(r => r.json()).then(j => {
    elem = elem()

    for (const proj of j) {
      let e
      let setArrowLoc = () => {
        Array.from(e.querySelectorAll(".prev, .next")).forEach(a => {
          a.style.top = a.parentElement.getBoundingClientRect().height / 2 + "px"
        })
      }

      let observer = new ResizeObserver(setArrowLoc)
      let thumbs = proj.thumbs.map((t, i) => {
        return `<img class="project-image ${ i === 0 ? "shown-slide" : "hidden-slide"}" src="${t}">`
      }).join('\n')

      let slideshowButtons = `
  <a class="prev" onclick="cycleSlides(this, -1)">&#10094;</a>
  <a class="next" onclick="cycleSlides(this, 1)">&#10095;</a>`

      let html = `
      <h2 class="project-link"><a href="${proj.link}">${proj.name}</a></h2>
      <p class="date-worked">${proj.date_worked}</p>
      <p class="project-desc">${desc === "long" ? shortenLongDesc(proj.long_description, proj.link) : proj.short_description}</p>
      <br>
      <div class="slideshow" style="aspect-ratio: ${proj.min_thumb_aspect ?? 0};">
      ${thumbs}
      ${proj.thumbs.length > 1 ? slideshowButtons : ''}
      </div>
      `
      e = document.createElement("div")
      e.classList.add("project")
      e.innerHTML = html

      observer.observe(e)

      resizeCallbacks.push(setArrowLoc)
      elem.appendChild(e)
    }
  }).catch(e => {
    elem = elem()
    elem.innerHTML = `<h2 class="err-loading">Unable to load projects!</h2>`
  })
}


function getProjectsHTML(opts) {
  loadProjectsAsync(opts)

  return `<div class="project-list"></div>`
}

const mainPages = {
  "Home": {
    url: "/",
    name: "Home",
    getHTML: () => {
      let html = `<p class="autobiography"><span class="hello">Hello! :)</span>
I'm a college student from the Bay Area pursuing a degree in computer science. Many of my projects also include elements of music, mathematics, and writing.</p>
      `
      html += getProjectsHTML({ desc: "short" })
      return html
    },
    isMain: true
  },
  "Projects": {
    url: "/projects",
    name: "Projects",
    getHTML: () => {
      let html = `<p class="pheader">Projects</p>
      `
      html += getProjectsHTML({ desc: "long" })
      return html
    },
    isMain: true
  },
  "About": {
    url: "/about",
    name: "About",
    getHTML: () => {
      let html = `<p class="pheader">About Me</p>
        <div class="about-me-wrapper">
        <div class="about-me">
        <p class="prose">
        I'm Timothy Herchen, a freshman at <a href="https://foothill.edu/">Foothill College</a> in Los Altos Hills, CA.
        I graduated from <a href="https://gunn.pausd.org/">Gunn High School</a> in Palo Alto, CA in 2021.
        </p>
        <p class="prose">
        Most of my interests—programming, mathematics, music, writing—have been with me since I was young.
        I especially love anywhere these interests intersect; most of my personal projects pull from at least two of these elements.
        I've tinkered around with Scratch since about fifth grade and began seriously programming in the seventh grade.
        Since then, I've become adept at JavaScript and Python, and proficient at C++, LaTeX, and Java.
        Having wanted to return to systems programming for a while, I'm currently learning Rust and x86 assembly.
        </p>
        <p class="prose">
        I took a break from self-studying math after ninth grade, but got back into it last year.
        I'm currently studying real and complex analysis—it's amazing how much excellent supplementary content is available in the Internet age.
        </p>
        <p class="prose">
        <a href="mailto:timothy.herchen@gmail.com">Email</a>&nbsp;&nbsp;&nbsp;
        <a href="https://www.youtube.com/channel/UCKm2xCXddmNg0dK6KSwJmkA">YouTube</a>&nbsp;&nbsp;&nbsp;
        Discord: forevermilk#0001
        </p>
        </div>
        <div class="photo-wrapper">
        <img class="headshot" src="../assets/headshot.png" />
        <p class="photo-caption">January 2022, <a href="https://www.google.com/maps/search/37.3202,+-122.1991">37°19'12.7"N 122°11'56.8"</a></p>
        <p class="photo-credit">Credit: Brandon Chung</p>
        </div>
        </div>
        `

      return html
    },
    isMain: true
  },
  "GitHub": {
    url: "https://github.com/anematode",
    name: "GitHub",
    target: "_blank",
    getHTML: () => {
      return ``
    },
    isMain: true
  }
}

var navbarHTML = `<div class="navbar-wrapper">
    <nav class="navbar">
        <h2 class="name">anematode</h2>
        <ul class="navbar-items"></ul>
    </nav>
</div>`

var copyrightNotice = `<div class="copyright">
<p>Copyright &copy; 2022 by Timothy Herchen</p>
</div>`

var html404 = `<div class="error-404">
    <p class="smiley">
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; #+<br>
        &nbsp;+#+ &nbsp; &nbsp;+# &nbsp;<br>
        +###+ &nbsp;##&nbsp; &nbsp;<br>
        &nbsp;+#+ &nbsp;## &nbsp; &nbsp;<br>
        &nbsp; &nbsp; &nbsp; #+ &nbsp; &nbsp;<br>
        &nbsp;+#+ &nbsp;## &nbsp; &nbsp;<br>
        +###+ &nbsp;##&nbsp; &nbsp;<br>
        &nbsp;+#+ &nbsp; &nbsp;+# &nbsp;<br>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; #+<br>
    </p>

    <h2>Page not found!</h2>
    <a class="nav-item-link" href="/">Return home</a>
</div>`

function getCurrentPage() {
  var url = document.location.href
  var match = { url: "" }

  for (const d of Object.values(mainPages)) {
    if (url.includes(d.url) && d.url.length > match.url.length) {
      match = d
    }
  }

  return match
}

let resizeCallbacks = []
function onResize() {
  resizeCallbacks.forEach(c => c())
}

let navItems

function loadCurrentPage() {
  let match = getCurrentPage()
  let url = match.url

  if (!url) {
    show404()
  } else {
    let main = document.createElement("main")
    main.innerHTML = match.getHTML()

    document.body.innerHTML = navbarHTML
    let nav = document.querySelector(".navbar-items")
    let navHTML = ``

    for (const d of Object.values(mainPages)) {
      if (d.isMain)
      navHTML += `<li class="nav-item">
                <a class="nav-item-link" href="${d.url}" target="${d.target || ''}">${d.name}</a>
            </li>`
    }

    let c = () => {
      if (window.innerWidth >= 675) {
        nav.classList.add("flat")
        nav.classList.remove("column")
      } else {
        nav.classList.add("column")
        nav.classList.remove("flat")
      }
    }

    resizeCallbacks.push(c)

    nav.innerHTML = navHTML
    document.body.appendChild(main)

    window.addEventListener("load", c)
    setPageLink(match.name)
  }

  /*let copyright = document.createElement("div")
  document.body.appendChild(copyright)
  copyright.innerHTML = copyrightNotice*/

  window.addEventListener("load", onResize)
}

let navObserver = new ResizeObserver(onResize)
navObserver.observe(document.body)

function show404() {
  document.body.innerHTML = html404
}

function definePage(name, details) {
  mainPages[name] = details
}

function setPageLink(d) {
  Array.from(document.querySelectorAll(".nav-item-link")).forEach(a => {
    if (a.innerText === d) {
      a.href = "javascript:return false;"
      a.classList.add("nav-item-current-link")
    }
  })
}

function genHatnote(s) {
  return `<p class="prose hatnote"><emph>${s}</emph></p>`
}

const templateRegex = /\{\{[^\n]+\}\}/g

function substituteTemplates(s) {
  // Recursively substitute templates
  for (const match of s.matchAll(templateRegex)) {
    //console.log(match)
  }

  return s
}

function genProse(s) {
  // First process "templates"

  s = substituteTemplates(s)
  let lines = s.split('\n')

  return lines.map(l => `<p class="prose">${l}</p>`).join('')
}

window.addEventListener("load", loadCurrentPage)
if (!document.location.href.includes("prevent_redirect")) {
  document.location.href = "https://github.com/anematode"
}
