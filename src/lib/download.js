import { buildHtmlReport } from "./report"

export const downloadJson = (data, filename) => {
	const jsonData = JSON.stringify(data)
	const blob = new Blob([jsonData], { type: "application/json" })
	const url = URL.createObjectURL(blob)

	const a = document.createElement("a")

	a.href = url
	a.download = `${filename}.json`
	// Open in a new tab
	a.target = "_blank"

	document.body.appendChild(a)
	a.click()

	document.body.removeChild(a)
	URL.revokeObjectURL(url)
}

export const downloadReport = ({ graph, name, table }, filename) => {
	const html = buildHtmlReport({ graph, table, title: name || "Report" })

	const blob = new Blob([html], { type: "text/html" })
	const url = URL.createObjectURL(blob)

	const a = document.createElement("a")

	a.href = url
	a.download = `${filename}.html`
	// Open in a new tab
	a.target = "_blank"

	document.body.appendChild(a)
	a.click()

	document.body.removeChild(a)
	URL.revokeObjectURL(url)
}
