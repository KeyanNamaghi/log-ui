import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Generated Report",
	description: "Parse and analyze test results from your unit test logs",
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main>{children}</main>
				<Toaster />
			</body>
		</html>
	)
}
