/*Aqui esta el archivo de javaScript*/
/*Esta constante lo que hace es enlazar con la url de la api*/
const base_url = "https://api.jikan.moe/v3";

/*Esta funcion es la que busca el anime y lo pasa a un json*/
function buscaAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("buscador");

    fetch(`${base_url}/search/anime?q=${query}&page=1&limit=1`)
    .then(res=>res.json()) .then(funcionPrin) .catch(errorFuction)
   
    
}
/*Esta funcion es la del error*/
function errorFuction(){
    return `<h1>error</h1>`
}
/*Esto es la funcion donde devuelve el resultado de la busqueda enlazado con las etiquetas de css para darle estilo*/
function funcionPrin(data){

    const buscaResults = document.getElementById('busca-results');

    const animeByCategories = data.results
        .reduce((lar, anime)=>{

            const {name} = anime;
            if(lar[name] === undefined) lar[name] = [];
            lar[name].push(anime);
            return lar;

        }, {});

        

        buscaResults.innerHTML = Object.keys(animeByCategories).map(key=>{

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
/*Esta funcion es para recargar la pagina*/
function recargar_pag(){
    const form = document.getElementById('busca_form');
    form.addEventListener("submit", buscaAnime);
}

/*Esto de aqui tambien es para recargar la pagina*/
window.addEventListener("load", recargar_pag);