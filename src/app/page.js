"use client"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js"
import Noise from "./Noise"
import Duration from "./Duration"
import { demoLogs } from "@/demo"

ChartJS.register(ArcElement, Tooltip)

export default function Home() {
	const textRef = useRef(null)
	const [logs, setLogs] = useState("")

	if (logs.length === 0) {
		return (
			<main className="flex min-h-screen flex-col items-center p-16 h-full gap-8">
				<h1 className="text-2xl font-bold">Unit Test Report Generator</h1>
				<p className="text-muted-foreground">Copy and paste your raw logs from GitHub actions to generate a report</p>
				<Textarea ref={textRef} className="h-64" />
				<div className="flex gap-4">
					<Button onClick={() => setLogs(textRef.current.value)}>Parse Logs</Button>
					<Button onClick={() => setLogs(demoLogs)} variant="secondary">
						Demo
					</Button>
				</div>
				<Sheet>
					<SheetTrigger>Help</SheetTrigger>
					<SheetContent className="h-[80vh]" side="bottom">
						<SheetHeader>
							<SheetDescription>
								<div className="p-8">
									{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
									<video src="/report.mov" controls={false} autoPlay loop />
								</div>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
				<a
					className="inline-flex absolute m-auto bottom-4 hover:text-muted-foreground"
					href="https://github.com/KeyanNamaghi/log-ui"
				>
					<svg
						width="24px"
						height="24px"
						xmlns="http://www.w3.org/2000/svg"
						role="img"
						aria-label="github"
						viewBox="0 0 130 98"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
							fill="#24292f"
						/>
					</svg>
					Made with 🍕 by Keyan Namaghi
				</a>
			</main>
		)
	}

	return (
		<main className="flex min-h-screen flex-col items-center px-16 py-4 h-full">
			<Button onClick={() => setLogs("")} className="my-4">
				Generate New Report
			</Button>

			<Tabs defaultValue="noise" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="noise">Noise</TabsTrigger>
					<TabsTrigger value="duration">Duration</TabsTrigger>
				</TabsList>
				<TabsContent value="noise">
					<Noise logs={logs} />
				</TabsContent>
				<TabsContent value="duration">
					<Duration logs={logs} />
				</TabsContent>
			</Tabs>
		</main>
	)
}
