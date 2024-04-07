const apiKey = `b8b004dff323465a89bc45b497a1ad28`;
const blogContainer = document.querySelector('.blog-container');
const input = document.querySelector('input');
const button = document.querySelector('button');

const fetchRandomNews = async () => {
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json()
        return data.articles;
       

    } catch(error){
        console.error('Error fetching random news', error);
        return[];
    }
   
}

const displayBlogs = (articles) => {
    blogContainer.innerHTML = '';
    articles.forEach((article) => {
        const blogPost = document.createElement('div');
        blogPost.classList.add('blog-post');
        const image = document.createElement('img');
        image.src = article.urlToImage;
        image.alt = article.title;
        const title = document.createElement('h2');
        title.classList.add('title');
        const truncatedTitle = article.title.length > 40? article.title.slice(0, 40) + '...':article.title;
        title.textContent =truncatedTitle;
        const description = document.createElement('p');
        const truncatedDescription = article.description.length > 120?article.description.slice(0,120) + '...': article.description
        description.textContent = truncatedDescription;

        blogPost.appendChild(image);
        blogPost.appendChild(title);
        blogPost.appendChild(description);
        blogPost.addEventListener('click', () => {
            window.open(article.url, '_blank');
        })
        blogContainer.appendChild(blogPost);
    })
}

(async() => {
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    }
    catch(error){
        console.error('Error fetching random news',error);
    }
})();


button.addEventListener('click', async () => {
    const InputValue = input.value.trim();

    if(InputValue != '') {
        try{
            const articles = await fetchNewsInput(InputValue);
            displayBlogs(articles);
        }
        catch(error){
            console.error('Error fetching random news',error);
        }
    }
}) 

const fetchNewsInput = async (InputValue) => {
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${InputValue}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json()
        return data.articles;
       

    } catch(error){
        console.error('Error fetching input news', error);
        return[];
    }
}