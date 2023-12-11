export default async function getDataFromJSON() {

    try {
        const response = await fetch('http://localhost:3000/datos-AMZN_GOOGL.json')
        if (!response.ok) {
            throw new Error('Algo sucedio mientras se realizaba la llamada')
        }
        const data = await response.json()
        console.log(data)
        return data;    
    } catch (e) {
        console.error(e)
        throw e;
    }
}

