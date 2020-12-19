// ---------------------------Selected Elements-----------------------
const form = document.querySelector('#searchForm');
// -------------------------------------------------------------------

// ---------------------------Created Elements------------------------
let resultsHeader = null;
const grid = document.createElement('div');
// -------------------------------------------------------------------

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearSearch();
    const searchTerm = form.elements.query.value;
    const config = {
        params: {
            q: searchTerm
        }
    }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config)
    resultsHeader = document.createElement('h3');
    resultsHeader.classList.add('subtitle', 'has-text-weight-bold')
    resultsHeader.append(`Showing ${res.data.length} results for "${searchTerm}"`);
    document.body.append(resultsHeader);
    console.log(res);
    grid.classList.add('columns');
    makeCards(res.data);
    form.elements.query.value = '';
})

const makeCards = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
}

const clearSearch = () => {
    const allImages = document.querySelectorAll('img');
    for (let img of allImages) {
        img.parentNode.removeChild(img);
    }
    if(resultsHeader !== null)
        resultsHeader.parentNode.removeChild(resultsHeader);
}