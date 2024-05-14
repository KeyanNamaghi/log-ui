"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { findNoisyTests } from "@/lib/noisyTests"
import { downloadJson, downloadReport } from "@/lib/download"
import { viewJson, viewReport } from "@/lib/newTab"
import { useToast } from "@/components/ui/use-toast"
import { Pie } from "@/components/pie"

export default function Noise({ logs }) {
	const { toast } = useToast()
	const noisyTests = findNoisyTests(logs)
	const totalNoise = noisyTests.reduce((acc, { count }) => acc + count, 0)

	const reportData = {
		name: "Noise Report",
		graph: {
			data: noisyTests.map(({ count }) => count),
			labels: noisyTests.map(({ test }) => test),
		},
		table: {
			labels: ["Test", "Lines logged", "Percentage"],
			data: noisyTests.map(({ test, count }) => [test, count, `${((count / totalNoise) * 100).toFixed(2)}%`]),
		},
	}

	return (
		<>
			<h1 className="text-2xl font-bold mt-4">Noise Report</h1>
			<p className="text-muted-foreground">The number of lines logged in each unit test.</p>
			<div className="py-4 flex gap-4">
				<Button
					onClick={() => {
						const filename = `noise-report-${new Date().toJSON()}`
						downloadReport(reportData, filename)
						toast({ title: "Downloaded Report", description: `${filename}.html has been downloaded.` })
					}}
				>
					Download Report
				</Button>
				<Button variant="secondary" onClick={() => viewReport(reportData)}>
					View Report
				</Button>
				<Button
					variant="secondary"
					onClick={() => {
						const filename = `noise-report-${new Date().toJSON()}`
						downloadJson(noisyTests, filename)
						toast({ title: "Downloaded JSON", description: `${filename}.json has been downloaded.` })
					}}
				>
					Download JSON
				</Button>
				<Button variant="secondary" onClick={() => viewJson(noisyTests)}>
					View JSON
				</Button>
			</div>
			<div className="h-96 p-6">
				<Pie
					data={noisyTests.map(({ count }) => count)}
					labels={noisyTests.map(({ test }) => test)}
					label="Lines logged"
				/>
			</div>
			<Table>
				<TableCaption>Lines logged in unit tests</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Test</TableHead>
						<TableHead className="text-right">Lines logged</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{noisyTests.map(({ test, count }) => (
						<TableRow key={test}>
							<TableCell className="font-medium">{test}</TableCell>
							<TableCell className="text-right">{count}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
