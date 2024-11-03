import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './game.css';

const Game = () => {
    // Potential guesswords
    const words: string[] = ['Tesla', 'Empire', 'Banana', 'Strawberry', 'Chocolate', 'Vanilla', 'Computer', 'Cheesecake', 'Tiramisu', 'Dinosaur'];

    const [guessWord, setGuessWord] = useState<string>(''); // The word to be guessed
    const wordSize: number = guessWord.length;

    const [inputValue, setInputValue] = useState<string>(''); // State to hold the input value
    const [message, setMessage] = useState<string>(''); // State to hold the result message
    const [hiddenWord, setHiddenWord] = useState<string>(''); // Initially hidden word
    const [gameWon, setGameWon] = useState<boolean>(false); // State to track if the game is won
    const [playerLife, setPlayerLife] = useState<number>(5); // State to track player's life
    const navigate = useNavigate();

    // Set a random word when the component mounts
    useEffect(() => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setGuessWord(randomWord); // Set the randomly selected guess word
        setHiddenWord(Array(randomWord.length).fill('_').join('')); // Initialize hiddenWord with underscores
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value); // Update the state with the current textarea value
    };

    const handleGuess = () => {
        // Check if inputValue is empty
        if (inputValue.length === 0) {
            setMessage('Please enter a letter!');
            return;
        }

        // Check if the inputted character is more than one
        if (inputValue.length > 1) {
            setMessage('You may only guess a single character at a time!');
            return;
        }

        // Create a new string from hiddenWord to update it based on the guess
        let updatedHiddenWord = hiddenWord.split('');

        // Check if the inputted character exists in the guessWord
        if (guessWord.toLowerCase().includes(inputValue.toLowerCase())) {
            setMessage(`Yes, the letter "${inputValue}" is in the word!`);

            // Update the hiddenWord with the correct guesses
            for (let i = 0; i < guessWord.length; i++) {
                if (guessWord[i].toLowerCase() === inputValue.toLowerCase()) {
                    updatedHiddenWord[i] = guessWord[i]; // Replace underscore with the correct letter
                }
            }

            const newHiddenWord = updatedHiddenWord.join(''); // Join updated letters back to a string
            setHiddenWord(newHiddenWord); // Update the hidden word with the guessed letters

            // Check for a win condition
            if (newHiddenWord === guessWord) {
                setGameWon(true); // Set gameWon to true when the word is guessed
                setMessage(`Congratulations! You've guessed the word: "${guessWord}"`);
            }
        } else {
            // If the guess is incorrect, decrease player life
            setPlayerLife(prevLife => {
                const newLife = prevLife - 1; // Decrease life by 1
                if (newLife === 0) {
                    setMessage(`Game Over! You've run out of lives. The word was: "${guessWord}"`);
                    setGameWon(false); // Game is lost
                }
                return newLife; // Update the player's life
            });
            setMessage(`No, the letter "${inputValue}" is not in the word.`);
        }

        // Clear the input value after guessing
        setInputValue('');
    };

    const handleReturnToHome = () => {
        navigate('/'); // Navigate to the home screen (adjust the path as needed)
    };

    return (
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="game text-center">
                        <h1 className="mb-5 mt-5">Playing hangman...</h1>
                        <p className='topMsg'>Word to be guessed is {wordSize} letters long...</p>
                        <p className='topMsg'>Lives remaining: {playerLife}</p> {/* Display lives remaining */}
                        <div className='form-floating'>
                            <textarea className='form-control' name="playerInput" id="playerInputArea" value={inputValue} onChange={handleInputChange}></textarea>
                            <label className="floatingTextarea">Player input</label>
                        </div>
                        <div className="d-flex justify-content-center p-4">
                            {gameWon ? (
                                <button className="btn btn-success" onClick={handleReturnToHome}>Return to Home Screen</button>
                            ) : playerLife === 0 ? (
                                <button className="btn btn-danger" onClick={handleReturnToHome}>Return to Home Screen</button>
                            ) : (
                                <button className="btn btn-warning" onClick={handleGuess}>Guess!</button>
                            )}
                        </div>
                        <p className='messageOutput'>{message}</p>
                        <p>{hiddenWord}</p>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default Game;
