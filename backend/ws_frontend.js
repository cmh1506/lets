const [input, button, ul] = document.body.children
const ws = new WebSocket("ws://localhost:3001")

ws.addEventListener("error", console.error)

ws.addEventListener("open", () => {
  input.focus()
  button.removeAttribute("disabled")
  button.addEventListener("click", sendMessage)
})

ws.addEventListener("content", receiveMessage)

ws.addEventListener("close", () => {
  button.setAttribute("disabled", true)
  button.removeEventListener("click", sendMessage)
  input.getBoundingClientRect()
  receiveMessage({ data: "Liebling, es ist aus." })
})

function receiveMessage({ data }) {
  const li = document.createElement("li")
  li.textContent = data
  ul.append(li)
}

function sendMessage() {
  const msg = input.value.trim()
  if (msg === "exit") ws.close()
  else if (msg) {
    ws.send(msg)
    input.focus()
  }
  input.value = ""
}