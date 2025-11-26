import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

export const ALL_BOOKS = gql`
	query ($author: String, $genre: String) {
		allBooks(author: $author, genre: $genre) {
			author {
				name
			}
			published
			title
		}
	}
`

export const ADD_BOOK = gql`
	mutation createBook(
		$title: String!, 
		$author: String!,
		$published: Int!, 
		$genres: [String!]!
	) {
		addBook(
			title: $title, 
			author: $author, 
			published: $published, 
			genres: $genres
		) {
			title
		}
	}
`

export const SET_BIRTH_YEAR = gql`
	mutation setBirthYear($name: String!, $born: Int!) {
		editAuthor(name: $name, born: $born) {
			id
		}
	}
`