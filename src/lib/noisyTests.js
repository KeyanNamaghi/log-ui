export const findNoisyTests = (contents) => {
	const longTests = contents
		.split("\n")
		.filter((line, index, array) => {
			return !line.includes("PASS") || !array[index + 1].includes("PASS")
		})
		.join("\n")

	const lines = longTests.split("\n")
	let count = 0
	let lastPass = -1
	const tests = []

	for (let i = 0; i < lines.length; i++) {
		if (lines[i].includes("PASS")) {
			if (lastPass !== -1) {
				tests.push({
					count: lines.slice(lastPass, i).length,
					test: lines[i - lines.slice(lastPass, i).length].split("PASS ")[1],
				})
				count += i - lastPass
			}
			lastPass = i
		}
	}

	const noisyTests = tests.sort((a, b) => b.count - a.count)
	return noisyTests
}
