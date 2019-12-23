import { checkWinner } from "./checkwinner";

describe('Check winner function', () => {
    test('Check X is a winner', () => {
        //Diagonal test case
        expect(checkWinner(['X', 'O', 'X', 'O', 'X', 'O', 'X', '', ''])['winner']).toEqual('X')
        expect(checkWinner(['X', 'O', 'X', 'O', 'X', 'O', 'X', '', ''])['line']).toEqual([2, 4, 6])
        
        //Vertical test case
        expect(checkWinner(['X', 'O', '', 'X', 'O', '', 'X', '', ''])['winner']).toEqual('X')
        expect(checkWinner(['X', 'O', '', 'X', 'O', '', 'X', '', ''])['line']).toEqual([0, 3, 6])
        
        //Horizontal test case
        expect(checkWinner(['X', 'X', 'X', 'O', '', 'O', '', '', ''])['winner']).toEqual('X')
        expect(checkWinner(['X', 'X', 'X', 'O', '', 'O', '', '', ''])['line']).toEqual([0, 1, 2])
    })

    test('Check O is a winner', () => {
        //Diagonal test case
        expect(checkWinner(['O', 'X', 'X', 'X', 'O', '', '', 'X', 'O'])['winner']).toEqual('O')
        expect(checkWinner(['O', 'X', 'X', 'X', 'O', '', '', 'X', 'O'])['line']).toEqual([0, 4, 8])
        
        //Vertical test case
        expect(checkWinner(['X', 'O', 'X', 'X', 'O', '', '', 'O', 'X'])['winner']).toEqual('O')
        expect(checkWinner(['X', 'O', 'X', 'X', 'O', '', '', 'O', 'X'])['line']).toEqual([1, 4, 7])
        
        //Horizontal test case
        expect(checkWinner(['X', 'X', '', 'O', 'O', 'O', '', '', ''])['winner']).toEqual('O')
        expect(checkWinner(['X', 'X', '', 'O', 'O', 'O', '', '', ''])['line']).toEqual([3, 4, 5])
    })

    test('Check if it is a tie', () => {
        expect(checkWinner(['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O'])['winner']).toEqual(null)
        expect(checkWinner(['O', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'])['winner']).toEqual(null)
    })


})

