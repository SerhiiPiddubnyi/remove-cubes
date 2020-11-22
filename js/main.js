const START_TIMER = 60;
let points = 0;
let timer = START_TIMER;
let cubesQuantity = 0;
let widthParent = 0;
let heightParent = 0;
let timerInterval;
let buttonStart = $('#button-start')
let buttonNewGame = $('#button-new-game')
let gameField = $('#field')
let timeField = $('#time')
let pointsField = $('#points')
let buttonSave = $('#buttonSave')
let players = [
    {name: 'Клинт Иствуд', total: 333},
    {name: 'Ли Ван Клиф', total: 222},
    {name: 'Илай Уоллак', total: 111}];
let cubesView = [
    {
        name: 'ordinary',
        size: 40,
        value: 1
    },
    {
        name: 'double',
        size: 30,
        value: 2
    },
    {
        name: 'triple',
        size: 20,
        value: 3
    },
    {
        name: 'addTime',
        size: 10,
        value: 5
    }
]

function clickSave() {
    let name = $('#name').val()
    players.push({name, total: points})
    players.sort(function (a, b) {
        return b.total - a.total
    })
    $('.modal').modal('hide')
    showResults()
    buttonSave.unbind('click', clickSave)
}

function addResult() {
    $('.modal').modal('show')
    $('#score').val(points)
    $('#name').val('')
    buttonSave.bind('click', clickSave)
}

function addPlayer(index, player) {
    $('#table-body').append(`<tr>
      <th scope="row">${index + 1}</th>
      <td>${player.name}</td>
      <td>${player.total}</td>
    </tr>`)
}

function showResults() {
    $('#table-body').empty()
    players.forEach((player, index) => {
        addPlayer(index, player)
    })
}

function setTimer() {
    timerInterval = setInterval(() => {

        if (timer > 9 & timer < 60) {
            timeField.val('00:' + timer)
        } else if (timer === 60) {
            timeField.val('01:00')
        } else if (timer > 60) {
            timeField.val('0' + Math.floor(timer / 60) + ':' + (timer % 60 > 9 ? timer % 60 : '0' + timer % 60))
        } else {
            timeField.val('00:0' + timer)
        }

        if (timer <= 0) {
            timer = START_TIMER
            clearInterval(timerInterval)
            $('.cube').remove()
            addResult()
        }
        timer -= 1
    }, 1000)
}

function setCubesQuantity() {
    cubesQuantity = Math.floor(Math.random() * 2 + 1)
}

function getSizes() {
    widthParent = gameField.width()
    heightParent = gameField.height()
}

function clickCube() {
    if (this.id < 5) {
        points += +this.id
        pointsField.val(points)
    } else {
        timer += +this.id
    }
    cubesQuantity--
    if (cubesQuantity === 0) {
        setCubesQuantity()
        addCubes()
    }
    $(this).remove()
}

function addCube() {
    getSizes()
    let randomCube = cubesView[Math.floor(Math.random() * 4)]
    let posX = Math.random() * widthParent
    let posY = Math.random() * heightParent
    if (posX + randomCube.size > widthParent) {
        posX = posX + randomCube.size - widthParent
    }
    if (posY + randomCube.size > heightParent) {
        posY = posY + randomCube.size - heightParent
    }

    let newElement = $('<div></div>')
        .addClass(randomCube.name + ' cube')
        .attr('id', randomCube.value)
        .css({
            'position': 'absolute',
            'top': posY + 'px',
            'left': posX + 'px',
        })
        .click(clickCube)
    gameField.append(newElement)
}

function addCubes() {
    for (let i = cubesQuantity; i > 0; i--) {
        addCube()
    }
}

buttonNewGame.click(function () {
        points = 0;
        timer = START_TIMER;
        setCubesQuantity();
        buttonStart.html("Start")
        clearInterval(timerInterval)
        timeField.val('01:00')
        pointsField.val(points)
        $('.cube').remove()
    }
)

buttonStart.click(function () {
        if (buttonStart.html() === "Start") {
            setCubesQuantity()
            addCubes()
            setTimer()
            buttonStart.html("Pause")
        } else if (buttonStart.html() === "Pause") {
            clearInterval(timerInterval)
            buttonStart.html("Continue")
            $('.cube').off()
        } else {
            setTimer()
            buttonStart.html("Pause")
            $('.cube').click(clickCube)
        }
    }
)
buttonNewGame.click()
showResults()












