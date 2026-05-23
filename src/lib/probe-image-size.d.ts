declare module 'probe-image-size' {
	interface ProbeResult {
		width: number;
		height: number;
		type: string;
		mime: string;
		[key: string]: unknown;
	}
	export default function probe(src: string): Promise<ProbeResult>;
}
