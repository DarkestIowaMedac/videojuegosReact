const API_KEY = "e145f66352074fd2900cce478881b8a7"
const BASE_URL = "https://api.rawg.io/api"

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
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=5&ordering=-rating`)
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

export const fetchAllGames = async (page = 1, query = '') => {
    try {
      let response
      if(query === ''){
        console.log("holitas")
      response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=40&ordering=name&search_precise=true&search=a,b,c,d,e,f,g,h,i,j,k,l,m,n,ñ,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,Ñ,O,P,Q,R,S,T,U,V,W,X,Y,Z,Á,É,Í,Ó,Ú,á,é,í,ó,ú,0,1,2,3,4,5,6,7,8,9,?,¿,¡,!,+,',],[,@,#,~,€,¬,.,-,_,(,),/,|,*,"`,
      )
      if (!response.ok) {
        throw new Error("Error en la solicitud a la API")
      }
    } else {
        console.log("holitas22")
        response = await fetch(
            `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=40&ordering=name&search_precise=true&search=${query}`,
        )
        if (!response.ok) {
            throw new Error("Error en la solicitud a la API")
        }
    }
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching all games:", error)
      throw error
    }
  }

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