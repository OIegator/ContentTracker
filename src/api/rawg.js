class RAWG{

    constructor(baseUrl = "https://api.rawg.io/api/", apiKey = "c593f58019084152a8f8bd09c3c88048") {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    games(id){
        return fetch(`${this.baseUrl}games/${id}?key=${this.apiKey}`)
            .then(response=>response.json())
    }

}

export {RAWG}