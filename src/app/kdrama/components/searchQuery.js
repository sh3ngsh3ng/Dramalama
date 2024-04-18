"use server";

export default async function FetchSearchTitle(title) {
	const res = await fetch(
		`${process.env.API_BASE_URL}/movies/dramacool/${title}`,
		{ cache: "force-cache" }
	);
	const data = await res.json();
	return data;
}
