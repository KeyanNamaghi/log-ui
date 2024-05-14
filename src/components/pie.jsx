import { Pie as RePie } from "react-chartjs-2"

const generateHues = (data) => {
	let h = 0.2
	const offset = 0.618033988749895
	return data.map(() => {
		h += offset * 0.5
		h %= 1
		return Math.floor(360 * h)
	})
}

export const pieColors = (data) => {
	const hues = generateHues(data)
	const backgroundColor = hues.map((hue) => `hsl(${hue}, 80%, 85%)`)
	const borderColor = hues.map((hue) => `hsl(${hue}, 80%, 75%)`)
	return {
		backgroundColor,
		borderColor,
	}
}

export const Pie = ({ data, labels, label }) => {
	const { backgroundColor, borderColor } = pieColors(data)

	return (
		<RePie
			data={{
				labels,
				datasets: [
					{
						label,
						data,
						backgroundColor,
						borderColor,
						borderWidth: 1,
					},
				],
			}}
		/>
	)
}
