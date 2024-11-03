import { useNavigate } from "react-router-dom";

const Homescreen = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/game');
    }

    return (
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="homescreen text-center">
                        <h1 className="mt-4 mb-4">Welcome to the Game!</h1>
                        <p>Press the button to play...</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary" onClick={handleClick}>Start game!</button>
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default Homescreen;