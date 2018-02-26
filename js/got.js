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
    console.log(userDatas);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    characterLister(userDatas);

    document.getElementById("searchButton").addEventListener("click", function () {
        var nev = document.getElementById('searchButton').value;
        searchForCharacter(userDatas, nev);
    });

    /* var images = document.getElementsByClassName("small-image");
     console.log(images);

     for (var i = 0; i < images.length; i++) {
         images[i].addEventListener("click", function () { // as event listeners
             var data = userDatas;
             characterDetails(data, i);
         });
     }*/


}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */



function createDiv(name = "HELLO", imgSource = "/assets/aemon.png", id) {
    var leftMainDiv = document.getElementById('leftMain');
    var newDiv = document.createElement("div");
    var newPara = document.createElement('p');
    var newImg = document.createElement('img');

    newImg.src = imgSource; //setting image source
    newImg.setAttribute('class', 'small-image');


    newPara.innerHTML = name; //setting character name
    newDiv.setAttribute('class', 'small-div');

    newDiv.appendChild(newImg); //adding content to character divs 
    newDiv.appendChild(newPara);

    leftMainDiv.appendChild(newDiv); //displaying divs on screen
}

function characterLister(data) {
    for (var i = 0; i < data.length; i++) {
        createDiv(data[i].name, data[i].portrait, data[i].id);
    }
}



function characterDetails(data, id) {

    console.log(data[id].picture);
    var newImg = document.createElement('img');
    newImg.src = data[id].picture;
    var location = document.getElementById('pictureDisplay');
    location.appendChild(newImg);
}

function searchForCharacter(data, name) {
    var formatName = name.toLowerCase();
    for (var i = 0; i < data.length; i++) {
        if (formatName == (data[i].name).toLoweCase) {
            characterDetails(data, i)
            i = data.legth;
        }
    }
}