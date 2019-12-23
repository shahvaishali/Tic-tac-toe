import { checkWinner } from "./checkwinner";

describe('Check winner function', () => {
    test('Check X is a winner', () => {
        //Diagonal test case
        expect(checkWinner(['X', 'O', 'X', 'O', 'X', 'O', 'X', '', ''])['winner']).toEqual('X')
        
        //Vertical test case
        expect(checkWinner(['X', 'O', '', 'X', 'O', '', 'X', '', ''])['winner']).toEqual('X')
        
        //Horizontal test case
        expect(checkWinner(['X', 'X', 'X', 'O', '', 'O', '', '', ''])['winner']).toEqual('X')
    })

    test('Check O is a winner', () => {
        //Diagonal test case
        expect(checkWinner(['O', 'X', 'X', 'X', 'O', '', '', 'X', 'O'])['winner']).toEqual('O')
        
        //Vertical test case
        expect(checkWinner(['X', 'O', 'X', 'X', 'O', '', '', 'O', 'X'])['winner']).toEqual('O')
        
        //Horizontal test case
        expect(checkWinner(['X', 'X', '', 'O', 'O', 'O', '', '', ''])['winner']).toEqual('O')
    })

    test('Check if it is a tie', () => {
        expect(checkWinner(['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O'])['winner']).toEqual(null)
        expect(checkWinner(['O', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'])['winner']).toEqual(null)
    })


})

