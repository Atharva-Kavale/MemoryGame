const container = document.getElementById("container")
const blankImg = document.getElementById("blankImg")
const shuffleBtn = document.getElementById("resetGame")
const showBtn = document.getElementById("showBtn")

let photo
let coverPhoto

let markEl = document.getElementById("marks")
let score = 0

let num = []
let check = []
let countt = 0
let tCount = 30
let scount

let timerStart = 0
let timer = document.getElementById("timer")
let t1

const winEl = document.querySelector(".win-bg")

const choiceEl = document.querySelector(".choice")
function theme(choice)
{
    let loc = ""
    if(choice === 1)
    {
        loc = "images/cartoon/"
    }
    if(choice === 2)
    {
        loc = "images/marvel/"
    }
    if(choice === 3)
    {
        loc = "images/poc/"
    }
    document.body.style.background = `url(${loc}bg1.jpg) fixed`
    document.body.style.backgroundSize = "cover"
    
      
    let tphoto = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png","13.png","14.png","15.png"]
    for(let i = 0; i < tphoto.length; i++)
    {
        tphoto[i] = loc + tphoto[i]
    }
    photo = tphoto.concat(tphoto)
    coverPhoto = loc + "cover.jpg"
    
    choiceEl.style.display = "none"
    newGame()
}
shuffleBtn.addEventListener('click', function () //shuffle when clicked
{
    choiceEl.style.display = "block"
})
function newGame()
{
    alert("There is timer to this game, so keep watch on it.\nIt will start once you click any card.")
    timer.innerText = "02:00"
    timerStart = 0
    t1 = timer.innerText.split(":") 

    tCount = 30
    markEl.textContent = `Score : ${score = 0}`
    scount = 1
    shuffle()
    render()
}

showBtn.addEventListener('click', function () //show cards for second
{
    if(!scount)
    {
        alert("Please start game first.")
    }
    else if(scount === 1)
    {
        alert("You only able to saw cards for 1 time.")
        showAll()
        setTimeout(hideAll, 3000)
    }
    else if(scount === 2)
    {
        alert("You already saw cards.")
    } 
    else
    {
        alert("You can only see cards before starting the game.")
    }
})
function showAll()  //shows all cards
{
    scount ++
    for(let i = 0; i < photo.length; i++)
    {
        document.getElementById("Cphoto-" + i).classList.add("hide")
    }
}
function hideAll()  //hides all card
{
    for(let i = 0; i < photo.length; i++)
    {
        document.getElementById("Cphoto-" + i).classList.remove("hide")
    }
}

function shuffle() //shuffle cards
{
    let cnt = 0;
    let temp
    num = []
    while (cnt != photo.length) //test
    {
        temp = Math.floor(Math.random() * photo.length)
        if (!num.includes(temp)) //checking repeatation
        {
            num.push(temp)
            cnt++
        }

    }
}

function render() //display elements
{
    let printEl1 = "", printEl2 = ""
    for (let i = 0; i < photo.length; i++) //print first row
    {
        printEl1 += `
        <div class="position">
            <div id="photo-${i}">
                <img src="${photo[num[i]]}" class="photos">
            </div>
        </div>
        `
        printEl2 += `
        <div class="cover">
            <div id="Cphoto-${i}" class="coverDiv">
                <img src="${coverPhoto}" class="coverImg" onclick="show(${i})">
            </div>
        </div>`
    }
    container.innerHTML = printEl1
    blankImg.innerHTML = printEl2
}
function show(indx) //called when i click div area to revel card
{
    timerStart ++
    if(timerStart === 1)
    {
        timeStart()
    }
    scount = 3;
    if(countt < 2)
    {
        check.push(indx)
        document.getElementById("Cphoto-" + indx).classList.add("hide")
        countt++;
    }
    
    if (countt == 2) //if 2 cards are displyed
    {
        setTimeout(hide, 800)
    }
}
function hide() //check if i matched the card
{
    let t0 = document.getElementById("photo-" + check[0])
    let t1 = document.getElementById("photo-" + check[1])

    if (t0.innerHTML != t1.innerHTML)    //if cards are not same
    {
        document.getElementById("Cphoto-" + check[0]).classList.remove("hide")
        document.getElementById("Cphoto-" + check[1]).classList.remove("hide")     
        score -= 5
    }
    else    // if 2 cards are same
    {
        score += 10
        tCount -= 2
    }
    check = []
    countt = 0
    markEl.textContent = `Score : ${score}`

    if (tCount === 0)    //if all cards are displyed
    {
        alert("Wohooo! You Completed your game.... 🎉\nYour Score is " + score + " points.")
        winEl.style.display = "block"
    }
}

winEl.addEventListener('click',function()
{
    winEl.style.display = "none"
})

function timeStart()
{ 
    if(timerStart != 0)
    {
        setTimeout(decrease,1000)
    }
    else
    {
        timer.innerText = "02:00"
    }
}
function decrease()
{
    t1[1]--
    if(t1[1] != -1 && tCount > 0)
    {
        timer.innerText = ("0" + t1[0]).slice(-2) + ":" + ("0" + t1[1]).slice(-2)
        timeStart()
    }
    else if(t1[1] === -1)
    {
        if(t1[0] === 0)
        {
            alert("Time is over.\nBetter luck next time.")
            location.reload() //window.location.reload
        }  
        else
        {
            t1[0]--
            t1[1] = 59
            timer.innerText = ("0" + t1[0]).slice(-2) + ":" + ("0" + t1[1]).slice(-2)
            timeStart()
        }
    }
}

