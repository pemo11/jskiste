// file: SudokuSolver1.js - erstellt: 06/09/21
// Reine Konsolenanwendung als erster Ansatz

// Geniale Lösung/Umsetzung dank Computerphile 
// Praktisch 1:1 Pendant der Python-Umsetzung
// Ohne let oder var wird eine globale Variable angelegt

const grid1 = [[7,0,4,9,0,0,5,6,8],
               [0,1,0,0,0,0,3,4,0],
               [0,8,0,2,0,4,1,0,0],
               [8,0,5,1,0,2,0,0,4],
               [0,0,0,5,3,8,0,0,0],
               [2,3,1,4,7,9,0,0,0],
               [1,7,0,0,0,0,0,0,6],
               [6,0,2,0,9,1,0,0,0],
               [0,0,0,7,2,0,8,0,1]]


const outGrid = (grid,comment) => {
    console.log(`${comment}`)
    for(i=0;i<9;i++) {
        outputLine = ""
        for(j=0;j<9;j++) {
            outputLine += ` ${grid[i][j]} `
        }
        console.log(outputLine)
        console.log()
    }
    console.log("")
}

const checkCell = (grid,x,y,n) => {
    // Check the column
    for(let i=0;i<9;i++) {
        if (grid[x][i] == n) {
            return false
        }
    }
    // Check the row
    for(let i=0;i<9;i++) {
        if (grid[i][y] == n) {
            return false
        }
    }

    // check the block
    let x0 = Math.floor(x / 3) * 3
    let y0 = Math.floor(y / 3) * 3
    for(let i=0;i<3;i++) {
        for(let j=0;j<3;j++) {
            if(grid[x0+i][y0+j] == n) {
                return false
            }
        }
    }
    return true
}

const solveGrid = (grid) => {
    for(let i=0;i<9;i++) {
        for(let j=0;j<9;j++) {
            // cell empty?
            if(grid[i][j] == 0) {
                // Check all numbers for this cell
                for(let n=1;n<10;n++) {
                    if(checkCell(grid,i,j,n) == true) {
                        grid[i][j] = n
                        solveGrid(grid)
                        grid[i][j] = 0
                    }
                }
                return
            }
        }
    }
    outGrid(grid,"Nachher")
}


outGrid(grid1,"Vorher")
solveGrid(grid1)
