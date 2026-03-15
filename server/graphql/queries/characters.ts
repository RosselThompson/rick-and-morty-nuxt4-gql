export const GET_CHARACTERS_QUERY = `
query GetCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        image
        name
        species
        status
        origin {
          name
        }
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID_QUERY = `
query GetCharacterById($id: ID!) {
    character(id: $id) {
  	id
    image
    name
    status
    species
    gender
    origin{
      name
    }
    location{
      name
    }
    episode {
      id
    }
	}
}
`;
