const prose = `
{{FIGURE | src="gatm.png" | caption="The textbook logo"}}
Hi
Bye
{{FIGURE | src="gatm.png" | caption="The textbook logo"}}
`


definePage("GAtM", {
  url: "/projects/gatm",
  name: "GAtM",
  getHTML: () => {
    let html = `
    <p class="pheader">GAtM</p>
    ${genHatnote('For the official GAtM website, hosted on GitHub Pages, see <a href="https://gunn-gatm.github.io">gunn-gatm.github.io</a>.')}
     
     ${genProse(prose)} 
    `

    return html
  }
})
