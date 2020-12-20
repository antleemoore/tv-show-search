// ---------------------------Selected Elements-----------------------
const form = document.querySelector('#searchForm');
// -------------------------------------------------------------------

// ---------------------------Created Elements------------------------
let resultsHeader = null;
const grid = document.createElement('div');
// -------------------------------------------------------------------

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    if (searchTerm === "") {
        return;
    }
    else
        clearSearch();
    const config = {
        params: {
            q: searchTerm
        }
    }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)
    resultsHeader = document.createElement('h3');
    resultsHeader.classList.add('subtitle', 'has-text-weight-bold', 'white')
    resultsHeader.append(res.data.length === 0 ? `No results found for "${searchTerm}"` : `Showing ${res.data.length} results for "${searchTerm}"`);
    document.body.append(resultsHeader);
    grid.classList.add('columns', 'is-desktop');
    document.body.append(grid);
    makeCards(res.data);
    form.elements.query.value = '';
})

const makeCards = (shows) => {
    for (let result of shows) {
        const card = addCard(result.show);
        grid.append(card);
    }
}

const addCard = (show) => {
    const cardHolder = document.createElement('div');
    cardHolder.classList.add('column', 'is-one-fifth');
    
    const card = document.createElement('div');
    cardHolder.append(card);
    card.classList.add('card');
    
    const cardImage = document.createElement('div');
    card.append(cardImage);
    
        const img = document.createElement('img');
    if (show.image != null) {
        img.src = show.image.medium;
    }
    else {
        img.src = './plainblack.jpg';
    }
    cardImage.classList.add('card-image');
    const figure = document.createElement('figure');
    cardImage.append(figure);
    figure.append(img);
    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content', 'has-text-weight-bold', 'subtitle');
    const link = document.createElement('a');
    const rating = document.createElement('div');
    rating.id = 'ratingDiv';
    cardContent.append(show.name);
    cardContent.append(rating);
    
    const linkDiv = document.createElement('div');
    linkDiv.id = 'linkDiv';
    if (show.officialSite !== null)
    {
        linkDiv.append('Official Site');
        link.append(linkDiv);
        link.href = show.officialSite;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        cardContent.append(link);
    }
    else {
        linkDiv.append('Official Site Unavailable');
        linkDiv.classList.add('unavailable');
        cardContent.append(linkDiv);
    }
    show.rating.average !== null ? rating.append(`Average Rating: ${show.rating.average}`) : rating.append(`Average Rating: N/A`);

    card.append(cardContent);

    return cardHolder;
}

const clearSearch = () => {
    const allImages = document.querySelectorAll('.column');
    for (let img of allImages) {
        img.parentNode.removeChild(img);
    }
    if(resultsHeader !== null)
        resultsHeader.parentNode.removeChild(resultsHeader);
}