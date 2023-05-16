const loadPhones = (search,dataLimit) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    .then(res => res.json())
    .then(data => displayPhones(data.data, dataLimit))
}

const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    // -------Display only 10 Phones------
    // phones = phones.slice(0,10);

    // *-------display phone and show all button add--------*
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length>10){
        phones = phones.slice(0,10);
        
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // -------Display no phones found------
    const noPhones = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhones.classList.remove('d-none');
    }
    else{
        noPhones.classList.add('d-none');
    }

    // -------Display ALL Phones------
    for(const phone of phones){
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card h-100 p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onClick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Detail</button>
            
            </div>
            </div>
        
        `
        phoneContainer.appendChild(phoneDiv);
    }
     // loader stop
     togglerSpinner(false);
    
}

const searchProcess = dataLimit =>{
    togglerSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    // searchField.value = '';
}


//  ---------Search Option using Button-----
// const searchPhones = () =>{
//     const searchField = document.getElementById('search-field');
//     const searchText = searchField.value;
//     loadPhones(searchText);
//     searchField.value = '';
// }
// ---------Search another Option using Button-----
document.getElementById('btn-search').addEventListener('click',function(){
    
    // ------*start loader*-----
    searchProcess(10);
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e){
    
    if(e.key === 'Enter'){
        searchProcess(10);
    }
});

// handle loader

const togglerSpinner = isLoading =>{
    const loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


// load show all
document.getElementById('btn-show-all').addEventListener('click',function(){
    searchProcess();
})

const loadPhoneDetails = id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
        <p>Others : ${phone.others ? phone.others.Bluetooth : 'No Bluetooth'}</p>
        <p>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage Found'}</p>
        <p>Sensor : ${phone.mainFeatures ? phone.mainFeatures.sensors[0] : 'No sensor Found'}</p>
        <img class="w-25" src="${phone.image}" class="card-img-top" alt="...">
    
    `
}


loadPhones('apple');