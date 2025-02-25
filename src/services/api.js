const API_KEY = "e145f66352074fd2900cce478881b8a7"
const BASE_URL = "https://api.rawg.io/api"


export const fetchPublishers = async (page = 1,query) => {
  if(query){
    const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&search=${query}&page=${page}&page_size=40`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    console.log(data)
    return data
  }
    const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&page=${page}&page_size=40`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    return data
}

export const fetchPublisherDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/publishers/${id}?key=${API_KEY}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch publisher details')
  }
  const data = await response.json()
  return data
}

export const fetchPublisherGames = async (id) => {
  
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&publishers=${id}&ordering=-metacritic&page_size=20`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch publisher games')
    }
    const data = await response.json()
    return data.results
}

export const fetchRecentGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=20&ordering=released`)
    if (!response.ok) {
      throw new Error("Error en la solicitud a la API")
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error fetching recent games:", error)
    throw error
  }
}

export const fetchBetterGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=20&ordering=-metacritic`)
    if (!response.ok) {
      throw new Error("Error en la solicitud a la API")
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error fetching better games:", error)
    throw error
  }
}

export const fetchAllGames = async (page = 1, filters) => {
  const queryParams = new URLSearchParams();
  const defaultSearch = `a,b,c,d,e,f,g,h,i,j,k,l,m,n,ñ,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,Ñ,O,P,
  Q,R,S,T,U,V,W,X,Y,Z,Á,É,Í,Ó,Ú,á,é,í,ó,ú,0,1,2,3,4,5,6,7,8,9,?,¿,¡,!,+,',],[,@,#,~,€,¬,.,-,_,(,),/,|,*,"`
  
  const genres = await fetchGenres()
  const idGenre = localizarId(genres, filters.genre)

  let searchTerm
  if(filters.search){
    searchTerm = decodeURIComponent(filters.search)
      .trim()
      .split(' ')
      .filter(word => word) // Eliminar espacios vacíos
      .join(',');
    
    console.log('El searchTerm es'+searchTerm)
    
  }
  queryParams.append("search", searchTerm || defaultSearch)
  queryParams.append("search_precise", "true")
  queryParams.append("page_size", "40")
  queryParams.append("ordering", "name")

  if (filters.genre) {
    queryParams.append('genres', idGenre);
  }
  if(filters.metacritic != 0){
    const metacriticNumber = parseInt(filters.metacritic, 10); 
    const metacriticmax = String(metacriticNumber + 19)

    console.log(filters.metacritic)
    queryParams.append('metacritic', ''+filters.metacritic+','+metacriticmax);
  }
  
  if (filters.year) {
    //Hacer un algoritmo que si contiene 's que la elimine y comprenda entre los 9 años siguientes. 
    if(filters.year.includes("s")){
      let cleanedYear = filters.year.replace(/s/g, '')
      cleanedYear = parseInt(cleanedYear, 10)
      console.log(cleanedYear)
      queryParams.append("dates", `${cleanedYear}-01-01,${cleanedYear+9}-12-31`)
    }
    else{
      queryParams.append("dates", `${filters.year}-01-01,${filters.year}-12-31`)
    }
  }
  console.log(filters.genre)
 // `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=40&ordering=name&search_precise=true&search=a,b,c,d,e,f,g,h,i,j,k,l,m,n,ñ,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,Ñ,O,P,Q,R,S,T,U,V,W,X,Y,Z,Á,É,Í,Ó,Ú,á,é,í,ó,ú,0,1,2,3,4,5,6,7,8,9,?,¿,¡,!,+,',],[,@,#,~,€,¬,.,-,_,(,),/,|,*,"`,
 console.log(`${BASE_URL}/games?key=${API_KEY}&page=${page}&${queryParams.toString()}`);
 const response = await fetch(
  `${BASE_URL}/games?key=${API_KEY}&page=${page}&${queryParams.toString()}`,
  )
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();

};

export const fetchGameDetails = async (id) => {
  
  try {
    const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`)
    if (!response.ok) {
      throw new Error("Error en la solicitud a la API")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching game details:", error)
    throw error
  }
}

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data)
    return data.results; // Devuelve la lista de géneros
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error; // Lanza el error para que pueda ser manejado en otro lugar
  }
};

function localizarId(genres,genre){
  console.log(genres)
  const foundGenre = genres.find(g => g.name == genre);
  return foundGenre ? foundGenre.id : null;
}

// export const fetchGenres = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`)
//     if (!response.ok) {
//       throw new Error("Failed to fetch genres")
//     }
//     const data = await response.json()

//     // Crear un mapeo de nombre a ID
//     genresCache = {}
//     data.genres.forEach((genre: { name: string; id: number }) => {
//       genresCache![genre.name] = genre.id
//     })

//     return data.genres
//   } catch (error) {
//     console.error("Error fetching genres:", error)
//     throw error
//   }
// }

// export const fetchSpecificGame = async (search = '') => {
// try {
//     const response = await fetch(
//     `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40&ordering=name&search_precise=true&search=${search}`,
//     )
//     if (!response.ok) {
//     throw new Error("Error en la solicitud a la API")
//     }
//     const data = await response.json()
//     return data
// } catch (error) {
//     console.error("Error fetching all games:", error)
//     throw error
// }
// }