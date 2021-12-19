app = document.getElementById('articles')
yazi1 = document.getElementById('yazi1')
yazi2 = document.getElementById('yazi2')
navTitle1 = document.getElementById('navTitle1')
navTitle2 = document.getElementById('navTitle2')
contentTitle = document.getElementById('contentTitle')
homePage = document.getElementById('homePage')
contentPic = document.getElementById('contentPic')
apiUrl = 'https://sahinistambul.herokuapp.com/api/articles'

a = []
b = []
c = []
d = []

homePage.addEventListener('click', homeFunc)


// get all data
getData(apiUrl, useData, null)

// fetch api
async function getData(file, func, param){
    let x = await fetch(file)
    let y = await x.json()
    console.log("database baglanildi")
    func(y, param)
}

// first useage of databese
function useData(data){
    if(location.pathname != '/'){
        sayfa = data.find(myObj => ('/' + myObj.url) == location.pathname)
        // divide articles
        yazi = sayfa.content
        urlBaslik = sayfa.url
        baslik = sayfa.title
        resim = sayfa.picture
        document.title = 'Sahin Istambul ' + baslik
    }
    else{
        yazi = data[0].content
        urlBaslik = data[0].url
        baslik = data[0].title
        resim = data[0].picture
        document.title = 'Sahin Istambul'
    }
    yaziLen = yazi.length
    navTitle1.innerHTML = '<i class="fa fa-font"></i>' + baslik
    navTitle1.href = '#' + 'baslik'
    navTitle2.innerHTML = '<i class="fa fa-font"></i>' + baslik
    navTitle2.href = '#' + 'baslik'
    contentTitle.innerText = baslik
    contentPic.src = resim
    yaziBol(yazi, yaziLen)
    for(let i = 0; i < a.length; i++)app.removeChild(a[i])
    // create articles section
    dataLen = data.length
    j = -1
    for(let i = 0; i < dataLen; i++){
        baslik = data[i].title
        urlBaslik = data[i].url
        yazi = data[i].content
        resim = data[i].picture
        if (i%4==0){
            j++
            a[j] = document.createElement('div')
            a[j].className = 'w3-row-padding w3-center'
            app.appendChild(a[j])
        }
        b[i] = document.createElement('div')
        b[i].innerText = baslik
        b[i].style.backgroundImage = "url(" + resim + ")"
        b[i].id = urlBaslik
        b[i].className = 'w3-col m3 w3-hover-opacity myArticles'
        b[i].style.paddingTop = "3em"
        b[i].addEventListener("click", onClick)
        a[j].appendChild(b[i])
    }
}


// click crticles
function onClick(element) {
    console.log(element.target.className)
    getData(apiUrl, clickData, element)
}

function clickData(data, element){
    for(let i = 0; i < data.length; i++){
        if(element.target.id === data[i].url){
            baslik = data[i].title
            urlBaslik = data[i].url
            if(i == 0){
                history.pushState(null, null, '/')
            }
            else{
                history.pushState(null, null, urlBaslik)
            }
            location = '#baslik'
            document.title = 'Sahin Istambul ' + baslik
            navTitle1.innerHTML = '<i class="fa fa-font"></i>' + baslik
            navTitle2.innerHTML = '<i class="fa fa-font"></i>' + baslik
            contentTitle.innerText = baslik
            yazi = data[i].content
            contentPic.src = data[i].picture
            yaziLen = yazi.length
            yaziBol(yazi, yaziLen)
        }
    }
}

function yaziBol(yazi, yaziLen){
    yaziLimit = 0
    for(let i = parseInt(yaziLen/2); i<yaziLen; i++){
        // yazi limiti nokta
        if(yazi[i] == '.') {
            yaziLimit = i+1
            break
        }
    }
    yazi1.innerText = yazi.slice(0, yaziLimit)
    yazi2.innerText = yazi.slice(yaziLimit, yaziLen)
}

// Change style of navbar on scroll
window.onscroll = function() {myFunction()};
function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    }
    else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    }
    else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function homeFunc(){
    history.pushState(null, null, '/')
    location = '#'
    getData(apiUrl, useData)
}