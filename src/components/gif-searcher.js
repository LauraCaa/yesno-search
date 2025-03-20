import "@/assets/styles.css";
import {useState, useEffect, useCallback} from "react";

export default function GifSearcher() {
    const[data, setData] = useState(null);
    const[question, setQuestion] = useState("");

    const fetchAnswer = useCallback(() => {
        if (question.trim() !== "") {
            fetch('https://yesno.wtf/api?question=INSERT_QUESTION')
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch((error) => console.error(error))
        }else {
            setData(null)
        }
    }, [question])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchAnswer();
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [question]);
 
    
    function handleForm(e) {
        e.preventDefault();
    };
    
    return(
        <div className="main-container">
            <form onSubmit={(e) => handleForm(e)}>
                <fieldset>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                    <input type="search" placeholder="Ask me a question..." onChange={(e) => setQuestion(e.target.value)}/>
                </fieldset>
            </form>
            {data &&
                <div className="image-container">
                    <img src={data.image} alt="api-image"/>
                    <span>{data.answer}</span>
                </div>
            }
        </div>
    )
};