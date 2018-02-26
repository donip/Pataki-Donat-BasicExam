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
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */



function createDiv(name = "HELLO", imgSource = "/assets/aemon.png") {
    var leftMainDiv = document.getElementById('leftMain');
    var newDiv = document.createElement("div");
    var newPara = document.createElement('p');
    var newImg = document.createElement('img');
    newImg.src = imgSource;
    newImg.setAttribute('class', 'small-image');

    newPara.innerHTML = name;
    newDiv.setAttribute('class', 'small-div');
    newDiv.appendChild(newImg);
    newDiv.appendChild(newPara);

    leftMainDiv.appendChild(newDiv);
}

function characterLister(data) {
    for (i = 0; i < data.length; i++) {
        createDiv(data[i].name, data[i].portrait);
    }
}