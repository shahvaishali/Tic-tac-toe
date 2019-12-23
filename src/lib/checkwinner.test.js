import { checkWinner } from "./checkwinner";

describe('Check winner function', () => {
    test('Check X is a winner', () => {
        expect(checkWinner(['X', 'O', 'X', 'O', 'X', 'O', 'X', '', ''])['winner']).toEqual('X')
    })
})
