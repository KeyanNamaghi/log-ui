"use client"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js"
import Noise from "./Noise"
import Duration from "./Duration"

ChartJS.register(ArcElement, Tooltip)

export default function Home() {
	const textRef = useRef(null)
	const [logs, setLogs] = useState("")

	if (logs.length === 0) {
		return (
			<main className="flex min-h-screen flex-col items-center p-16 h-full gap-8">
				<h1 className="text-2xl font-bold">Parse Your Logs</h1>
				<Textarea ref={textRef} className="h-64" />
				<Button onClick={() => setLogs(textRef.current.value)}>Parse Logs</Button>
				<Sheet>
					<SheetTrigger>Help</SheetTrigger>
					<SheetContent className="h-[80vh]" side="bottom">
						<SheetHeader>
							<SheetTitle>Just copy & paste your logs to generate a report</SheetTitle>
							<SheetDescription>
								<div className="p-8">
									{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
									<video src="/report.mov" controls={false} autoPlay loop />
								</div>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</main>
		)
	}

	return (
		<main className="flex min-h-screen flex-col items-center px-16 py-4 h-full">
			<Button onClick={() => setLogs("")} className="my-4">
				Generate new report
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
