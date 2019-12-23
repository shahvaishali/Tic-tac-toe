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
})
