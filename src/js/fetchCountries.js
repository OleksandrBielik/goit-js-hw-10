const BASE_URL = 'https://restcountries.com/v3.1';
const filters = 'name,capital,population,flags,languages';


export function fetchCountries(name) {

    return fetch(`${BASE_URL}/name/${name}?fields=${filters}`)
        
        .then(response => {

            if (!response.ok) {
                throw new Error('error')
            }

            return response.json()
        })
    
}