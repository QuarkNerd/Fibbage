export function popRadomElements<T>(selection: T[], count: number): T[] {
	const random = [];
	while (random.length < count) {
		const index = Math.floor(Math.random() * selection.length);
		random.push(selection[index]);
		selection.splice(index, 1);
	}
	return random;
}

export function download(filename: string, text: string) {
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}
