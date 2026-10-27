async function getData(category = 'business' , search = '' , page = 1 ,  pageSize = 10){

    let parameters = new URLSearchParams({
        category : category,
        q : search,
        from : '2026-09-27',
        sortBy : 'publishedAt',
        page : page,
        pageSize : 10,
        // apiKey : '9bf29b59018247c1b2479053d492171b'
    })

   let myResponse = await fetch(`https://newsapi.org/v2/top-headlines?${parameters}` , {
    headers : {
        "X-Api-key" : ' 0e722f5f3bb44deaa38016db8963e33a'
    }
   });

   let myData = await myResponse.json();
console.log(myData)
   showData(myData , page);
}

function showData(data , currentPage){
    let numberOfPages = Math.ceil(data.totalResults / 10),
        news = data.articles,
        $dataContainer = $('#Data .row');

    $dataContainer.html(''); 

    if(news.length > 0){
        for(item of news){
            $dataContainer.append(cardComponents(item));
        }
    }else{

    }

    $('nav .pagination').html(preparePagination(currentPage , numberOfPages))
};

function preparePagination(currentPage , totalPages){
    let lis  = `<li class="page-item"><a class="page-link ${(currentPage == 1) ? 'disabled' : ''}" onclick="paginate(${(currentPage > 1) ? currentPage - 1 : 1})">Previous</a></li>`;

    for(let i = 1 ; i <= totalPages ; i++){
        lis += `<li class="page-item ${(currentPage == i) ? 'active' : ''}"><a class="page-link" onclick="paginate(${i})">${i}</a></li>`
    }

    lis += `<li class="page-item"><a class="page-link ${(currentPage == totalPages) ? 'disabled' : ''}" onclick="paginate(${(currentPage < totalPages) ? currentPage + 1 : totalPages})">Next</a></li>`

    return lis;
}

// html of card
function cardComponents(item){
    return `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="item">
                        <div class="card m-auto" style="width: 18rem;">
                            <div class="image">
                                <img class='img-fluid' src="${item.urlToImage}" onerror="this.src = 'images/image.png' " class="card-img-top" alt="...">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title text-light">${item.title?.slice(0,30)?? 'there is no title here'}</h5>
                                <p class="card-text p-0 pt-3">${item.description?.slice(0,120)?? 'there is no data here'}</p>
                                <a href="${item.url}" target="_blank" class="btn w-100 text-light">See More</a>
                            </div>
                        </div>
                    </div>
                </div>`
};

function paginate(pageNumber){
    let category = $('#Category').val(),
        search = $("#Search").val();

    getData(category , search , pageNumber);

}