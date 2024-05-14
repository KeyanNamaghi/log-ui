export const FindSlowTests = (contents) => {
	const longTests = contents
		.split("\n")
		.filter((line) => {
			return line.match(/PASS .*?\((.*?)\)/)
		})
		.map((line) => {
			const times = line.match(/PASS .*?\/([^\/]*) \(([^ ]*).*\)/)
			return { test: times[1], count: Math.round(times[2]) }
		})
		.sort((a, b) => b.count - a.count)

	return longTests
}
