const table = document.createElement('table')
const startBtn = document.querySelector('button')
document.body.appendChild(table)

const generations = []
let generation = 0
const size = [30, 30]

function render() {
    table.innerHTML = ''
    for (let i = 0; i < size[0]; i++) {
        const tr = document.createElement('tr')
        for (let j = 0; j < size[1]; j++) {
            const td = document.createElement('td')
            try {
                td.classList.add(generations[generation][i][j] ? 'alive' : 'dead')
            } catch (e) {}
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}

function generate() {
    if (generation === 0) {
        firstGeneration()
        return
    }
    const newGen = []
    for (let i = 0; i < size[0]; i++) {
        const innerArr = []
        for (let j = 0; j < size[1]; j++) {
            const amount = getAmoutOfTrue(getNeighbours(i, j, generations[generation - 1]))
            if (generations[generation - 1][i][j]) {
                innerArr.push(amount < 2 || amount > 3 ? false : true)
            } else if (amount === 3) {
                innerArr.push(true)
            } else {
                innerArr.push(false)
            }
        }
        newGen.push(innerArr)
    }
    generations.push(newGen)
}

function firstGeneration() {
    const newGen = []
    for (let i = 0; i < size[0]; i++) {
        const innerArr = []
        for (let j = 0; j < size[1]; j++) {
            innerArr.push(Math.random() >= 0.6)
        }
        newGen.push(innerArr)
    }
    generations.push(newGen)
}

function getAmoutOfTrue(arr) {
    let amount = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            amount++
        }
    }
    return amount
}

function getNeighbours(x, y, gen) {
    const neighbours = []
    const check = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ]
    for (let i = 0; i < check.length; i++) {
        try {
            if (gen[x + check[i][0]][y + check[i][1]] != undefined) {
                neighbours.push(gen[x + check[i][0]][y + check[i][1]])
            }
        } catch (e) {

        }
    }
    return neighbours
}

let loop

render()
startBtn.onclick = () => {
    generations.length = 0
    generation = 0
    clearInterval(loop)
    firstGeneration()
    render()
    generation++
    loop = setInterval(() => {
        generate()
        render()
        generation++
    }, 100)
}