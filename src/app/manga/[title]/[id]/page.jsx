import styles from "./info.module.css";
import Image from "next/image";
import Buttons from "./buttons";
import { redirect } from "next/navigation";
import { FaStar } from "react-icons/fa";
import CurrentReading from "./[read]/currentReading";
import PreFetchChaterLinks from "../../cacher";

// This page displays the information regarding the manga or manhwa which the user selected on the previous page.

export default async function MangaInfo({ params }) {
	const id = params.id;
	const data = await getMangaInfo(id);

	if (data.message) {
		redirect("/404");
	}

	PreFetchChaterLinks(data.chapters);

	return (
		<div className={styles.MangaInfoContainer}>
			{data && (
				<div className={styles.MangaInfo}>
					<div
						className={styles.MangaHero}
						style={{
							backgroundImage: `url(${data.cover})`,
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
							borderRadius: 10,
						}}
					>
						<div className={styles.TitleContainer}>
							<p
								style={{
									color: data.color,
									borderRadius: 10,
									padding: 5,
								}}
							>
								{data.title["english"] || data.title["romaji"]}
							</p>
							<Image
								src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${data.image}`}
								width={200}
								height={310}
								alt="Manga Poster"
								priority
							/>
						</div>
					</div>

					<div className={styles.MangaDescription}>
						<div className={styles.Description}>
							<h2>Description</h2>
							<p>{data.description.split("<br")[0]}</p>
						</div>

						<div className={styles.MangaReleaseYear}>
							<span style={{ color: "#A3FFD6" }}>
								Started on: {data.startDate["day"]}-
								{data.startDate["month"]}-
								{data.startDate["year"]}
							</span>
							<span style={{ color: "white", margin: 10 }}>
								|
							</span>
							<span style={{ color: "var(--pastel-red)" }}>
								Ended on: {data.endDate["day"]}-
								{data.endDate["month"]}-{data.endDate["year"]}
							</span>
						</div>

						<div className={styles.GenreContainer}>
							<span className={styles.GenreText}>Genres: </span>
							<div className={styles.genres}>
								{data.genres &&
									data.genres.map((item, index) => (
										<span
											key={index}
											className={styles.MangaGenre}
										>
											{item}
										</span>
									))}
							</div>
						</div>

						<div className={styles.MangaRatings}>
							<span>Ratings: {data.rating / 10}</span>
							<span>
								<FaStar />
							</span>
						</div>
					</div>

					<div className={styles.CharactersContainer}>
						<h2>Characters</h2>
						<div className={styles.Character}>
							{data.characters &&
								data.characters.map((item, index) => (
									<div
										key={index}
										className={styles.CharacterEntry}
									>
										<Image
											src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
											width={140}
											height={200}
											alt="Character Poster"
										/>
										<p>
											{item.name.full} ({item.role})
										</p>
									</div>
								))}
						</div>
					</div>
					<CurrentReading />
					<div className={styles.Chapters}>
						<p className={styles.ChapterTitle}>
							Chapters & Volumes
						</p>
						<Buttons content={data} />
					</div>
				</div>
			)}
		</div>
	);
}

async function getMangaInfo(id) {
	const res = await fetch(
		`${process.env.API_BASE_URL}/meta/anilist-manga/info/${id}?provider=mangadex`,
		{ next: { revalidate: 86400 } }
	);
	const data = await res.json();
	return data;
}
