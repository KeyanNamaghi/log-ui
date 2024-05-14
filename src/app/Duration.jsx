"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { downloadJson, downloadReport } from "@/lib/download"
import { viewJson, viewReport } from "@/lib/newTab"
import { useToast } from "@/components/ui/use-toast"
import { Pie } from "@/components/pie"
import { FindSlowTests } from "@/lib/slowTests"

export default function Duration({ logs }) {
	const { toast } = useToast()
	const tests = FindSlowTests(logs)
	const totalDuration = tests.reduce((acc, { count }) => acc + count, 0)

	const reportData = {
		graph: {
			data: tests.map(({ count }) => count),
			labels: tests.map(({ test }) => test),
		},
		name: "Duration Report",
		table: {
			labels: ["Test", "Time Taken", "Percentage"],
			data: tests.map(({ test, count }) => [test, count, `${((count / totalDuration) * 100).toFixed(2)}%`]),
		},
	}

	return (
		<>
			<h1 className="text-2xl font-bold mt-4">Duration Report</h1>
			<p className="text-muted-foreground">Time taken for tests that take over 4 seconds.</p>
			<div className="py-4 flex gap-4">
				<Button
					onClick={() => {
						const filename = `duration-report-${new Date().toJSON()}`
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
						const filename = `duration-report-${new Date().toJSON()}`
						downloadJson(tests, filename)
						toast({ title: "Downloaded JSON", description: `${filename}.json has been downloaded.` })
					}}
				>
					Download JSON
				</Button>
				<Button variant="secondary" onClick={() => viewJson(tests)}>
					View JSON
				</Button>
			</div>
			<div className="h-96 p-6">
				<Pie data={tests.map(({ count }) => count)} labels={tests.map(({ test }) => test)} label="Time taken" />
			</div>
			<Table>
				<TableCaption>Time taken for unit tests</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Test</TableHead>
						<TableHead className="text-right">Time taken (s)</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tests.map(({ test, count }) => (
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
