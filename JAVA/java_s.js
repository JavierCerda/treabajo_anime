const base_url = "https://api.jikan.moe/v3";


function searchAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    fetch(`${base_url}/search/anime?q=${query}&page=1&limit=1`)
    .then(res=>res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(data){

    const searchResults = document.getElementById('search-results');

    const animeByCategories = data.results
        .reduce((acc, anime)=>{

            const {type} = anime;
            if(acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;

        }, {});

        searchResults.innerHTML = Object.keys(animeByCategories).map(key=>{

            const animesHTML = animeByCategories[key]
            .map(anime=>{
            
                return `
                <div id="padre123">
                <div id="pep">
                    <div><h1 id="tit"> <span >${anime.title}</span></h1></div>
                    <div><img id="fot" src="${anime.image_url}"></div>
                    <div id="tam_le"><p>${anime.synopsis}</p></div>
                    <div><a href="${anime.url}">Pincha para mas info</></div>
                </div>
           
                `
            }).join("");


            return `
                <section>
                    <div class="kemicofa-row">${animesHTML}</div>
                </section>
            `
        }).join("");
}

function pageLoaded(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded);