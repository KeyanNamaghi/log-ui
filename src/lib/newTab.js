import { buildHtmlReport } from "./report"

export const viewJson = (data) => {
	const jsonData = JSON.stringify(data)
	const blob = new Blob([jsonData], { type: "application/json" })
	const url = URL.createObjectURL(blob)
	window.open(url, "_blank")
	URL.revokeObjectURL(url)
}

export const viewReport = ({ graph, name, table }) => {
	const html = buildHtmlReport({ graph, table, title: name || "Report" })

	const blob = new Blob([html], { type: "text/html" })
	const url = URL.createObjectURL(blob)
	window.open(url, "_blank")
	URL.revokeObjectURL(url)
}
