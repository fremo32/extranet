// import { randBetweenDate, randBook } from '@ngneat/falso';
import { db } from './client';
import { locoTypes, type InsertLocoTypeParams, railwayCompanies, type InsertRailwayCompanyParams } from './schema';

/*const generateRsndomBooks = async (count: number) => {
	for (let i = 0; i < count; i++) {
		const randomBook = randBook();

		const book: InsertBookParams = {
			title: randomBook.title,
			author: randomBook.author,
			isbn: Math.floor(Math.random() * 1000000000),
			publicationDate: randBetweenDate({ from: new Date(2000, 0, 1), to: new Date() })
		};

		await db.insert(books).values(book);

		console.log(`Inserted book ${i + 1} of ${count}: ${book.title}`);
	}
};*/
const generateRailwayCompanies = async () => {
	const data = [
		{name: "DRB", description: "Deutsche Reichsbahn (1920-1945)", badgeColor: "text-bg-warning"}, 
		{name: "DB", description: "Deutsche Bundesbahn", badgeColor: "text-bg-dark"},
		{name: "DR", description: "Deutsche Reichsbahn (ab 1945)", badgeColor: "text-bg-success"},
		{name: "DB AG", description: "Deutsche Bahn AG", badgeColor: "text-bg-danger"}] as InsertRailwayCompanyParams[]

		for (const railwayCompany of data) {
			await db.insert(railwayCompanies).values(railwayCompany)
			console.log(`Inserted loco type ${railwayCompany.name}`);
		}
}

const generateLocoTypes = async () => {
  const data = ["Dampflokomotive", "Diesellokomotive", "Kleinlokomotive", "Elektrolokomtive", "Dieseltriebwagen"];


  for (const name of data) {
    const locoType: InsertLocoTypeParams = {
      name: name
    }
  
    await db.insert(locoTypes).values(locoType)

    console.log(`Inserted loco type ${locoType.name}`);
  }
}

await generateRailwayCompanies();
await generateLocoTypes();