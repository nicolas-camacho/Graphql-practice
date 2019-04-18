const express = require('express');
const app = express();

const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

const { books } = require('./data.json');

const schema = buildSchema(`
	type Query {
		book(id: Int!): Book
		books(topic: String): [Book]
	}

	type Book {
		id: Int
		title: String
		author: String
		topic: String
		url: String
	}
`);

let getBook = (args) => {
	let id = args.id;
	return books.filter(book => {
		return book.id == id;
	})[0]
}

let getBooks = () => {
	if (args.topic) {
		let topic = args.topic;
		return books.filter(book => book.topic === topic);
	} else {
		return books;
	}
}

const root = {
	book: getBook
}

app.use('/graphql', express_graphql({
	schema: schema,
	rootValue: root,
	graphiql: true
}))

app.listen(3000, () => console.log('server on port 3000'))