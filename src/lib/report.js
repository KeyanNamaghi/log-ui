import { pieColors } from "@/components/pie"

export const htmlHead = `<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
<head>
<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  background: white;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #c8c8c8;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #426f6f;
  color: white;
}

h1 {
  color: #426f6f;
}
</style>
</head>`

export const buildHtmlReport = ({ graph, table, title }) => {
	const { data, labels } = graph
	const { backgroundColor, borderColor } = pieColors(data)

	const tableHeadings = table.labels.map((label) => `<th>${label}</th>`).join("\n")
	const rows = table.data.map((row) => `<tr>${row.map((entry) => `<td>${entry}</td>`).join("\n")}</tr>`).join("\n")

	return `<!DOCTYPE html>
    <html>
	  ${htmlHead}
      <body>
        <h1>Github Action Report</h1>
        <div style="display: flex">
          <div>
            <canvas id="chart" style="width: 400px"></canvas>
            <script>
              new Chart('chart', {
                type: 'pie',
                data: {
                  labels: ${JSON.stringify(labels)},
                  datasets: [
                    {
                      backgroundColor: ${JSON.stringify(backgroundColor)},
                      borderColor: ${JSON.stringify(borderColor)},
                      data: ${JSON.stringify(data)},
                    },
                  ],
                },
                options: { title: { display: true, text: '${title}' }, legend: { display: false }, aspectRatio: 1 },
              })
            </script>
          </div>
          <table><tr>${tableHeadings}</tr>${rows}</table>
          </div>
          </body>
        </html>
          `
}
