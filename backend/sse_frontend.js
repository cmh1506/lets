document.body.textContent = "Liebling, es ist aus.";

const es = new EventSource("http://localhost:3001/progress")

es.addEventListener("progress", ({ type, lastEventId, data }) => {
  console.log(type, lastEventId, data)
  document.body.textContent = data
  /* if (data.startsWith("100")) {
    document.body.textContent = "Liebling, es ist aus."
    es.close()
  } */
})

es.addEventListener("done", ({ type, data }) => {
  console.log(type, data)
  document.body.textContent = data
  es.close()
})