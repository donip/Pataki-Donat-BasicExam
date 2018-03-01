function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);

    /*------------ SORBARENDEZÉS (ÉS UTÁNA SORBAN A TÖBBI FÜGGVÉNY) INDÍTÁSA -----------*/
    dataSortingByName(userDatas);

    /*--------- KERESŐGOMB addEventListener --------- */
    document.getElementById('searchButton').addEventListener('click', function () {
        searchForCharacter(userDatas);
    });
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */


//------------------------------- SORBARENDEZÉS NÉV SZERINT -------------------------------//
function dataSortingByName(data) {
    data.sort(function (a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });
    characterLister(data);  //userDatas továbbadása characterLister-nek
}
//-----------------------------------------------------------------------------------------------//

/*-------------------------- FOR CIKLUS AZ ÖSSZES SZEREPLŐ LISTÁZÁSÁHOZ ---------------------------------*/
function characterLister(data) {
    for (var i = 0; i < data.length; i++) {
        createDiv(data, data[i].name, data[i].portrait, i); //sokszor lefuttatja createDiv-et
    }
}
//----------------------------------------------------------------------------------------------//

/*------------------------------- SZEREPLŐT TARTALMAZÓ DIV LÉTREHOZÁSA ----------------------------------*/
function createDiv(data, name, imgSource, id) {
    var leftMainDiv = document.getElementById('leftMain');  //beszúrási hely kiválasztása
    var newDiv = document.createElement('div'); //div létrehozás
    var newPara = document.createElement('p');  //p létrehozás (név lesz benne)
    var newImg = document.createElement('img'); //kép létrehozás

    (function () {
        newImg.addEventListener('click', function () {
            characterDetails(data, id); // kisképre kattintáskor indul, továbbadja userDatas-t & azonosítót
        });
    })(data, id); //json és id átadása paraméterben a characterDetails függvénynek

    newImg.src = imgSource;
    newImg.setAttribute('class', 'small-image'); //class hozzáadása, css-nél jól jön

    newPara.innerHTML = name;
    newDiv.setAttribute('class', 'small-div');

    newDiv.appendChild(newImg); //kép hozzáadása divhez
    newDiv.appendChild(newPara); //név hozzáadása divhez

    leftMainDiv.appendChild(newDiv); //képet-nevet tartalmazó div hozzáadása a html-hez
}
//----------------------------------------------------------------------------------------------//

/*------------------ OLDALSÁVON SZEREPLŐ INFORMÁCIÓK MEGJELENÍTÉSE KATTINTÁSRA --------------------*/
function characterDetails(data, id) {
    var newImg = document.querySelector('#pictureDisplay>img');
    newImg.src = data[id].picture;

    var newName = document.querySelector('#nameDisplay>p');
    newName.textContent = data[id].name;

    var newBio = document.getElementById('bioDisplay');
    newBio.textContent = data[id].bio;
}
//----------------------------------------------------------------------------------------//

/*------------------------- KERESÉS INPUT ALAPJÁN KATTINTÁSRA --------------------------------*/
function searchForCharacter(data) {
    var userInputBox = document.getElementById('userSearch');
    var searchValue = userInputBox.value.toLowerCase(); //kisbetűs kereső value

    for (var i = 0; i < data.length; i++) {
        if (searchValue && (data[i].name).toLowerCase().indexOf(searchValue) > -1) {
            characterDetails(data, i); //FÜGGVÉNY indítása
            userInputBox.value = data[i].name; //inputboxba is kiírja a talált nevet
            i = data.length;  //első találat után leáll a keresés (break alternatíva)
        }
        else { //nincs találat, oldalsáv kiürítése
            var newName = document.querySelector('#nameDisplay>p');
            newName.textContent = 'Nincs találat';
            document.querySelector('#pictureDisplay>img').src = '';
            document.getElementById('bioDisplay').textContent = '';
        }
    }
}
//-------------------------------------------------------------------------------------//