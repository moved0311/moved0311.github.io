const ghpages = require("gh-pages")

ghpages.publish(
  "public",
  {
    branch: "master",
    repo: "https://github.com/moved0311/moved0311.github.io.git",
  },
  () => {
    console.log("Deploy Complete!")
  }
)
