import { useState } from "react";
import axios from "axios";

export default function Home() {

    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [inputValue3, setInputValue3] = useState("");
    const [inputValue4, setInputValue4] = useState("");

    const [response, setResponse] = useState("");
    const [responseList, setList] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue2(event.target.value);
    };
    const handleInputChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue3(event.target.value);
    };
    const handleInputChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue4(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requestBody = {
            messages: [
                {
                    role: "system", content: "You: " + "Crea oraciones de" + inputValue + ", evita las palabra" +
                        inputValue2 + ",para" + inputValue3 + ", dame esta cantidad de oraciones " + inputValue4
                },
            ],
        };

        try {
            const response = await axios.post("/api/chat", requestBody);
            const { data } = response;
            setResponse(data.choices[0].message.content);
            setError("");
        } catch (error) {
            console.error("Error:");
            setError("Error: Ha ocurrido un problema");
        }


    };

    const ListhandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requestBody2 = {
            messages: [
                { role: "system", content: "You: " + "dame una lista lista de palabras clave" + response },
            ],
        };

        try {
            const responseList = await axios.post("/api/chat", requestBody2);
            const { data } = responseList;
            setList(data.choices[0].message.content);
            setError("");
        } catch (error) {
            console.error("Error:");
            setError("Error: Ha ocurrido un problema");
        }
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([responseList], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "respuesta.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const List = response.split("\n").filter((item) => item !== "."); // Separar la respuesta en elementos de la lista
    const List2 = responseList.split("\n").filter((item) => item !== ".");
    return (
        <div>
            <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
                <input type="text" value={inputValue} onChange={handleInputChange} />
                <input type="text" value={inputValue2} onChange={handleInputChange2} />
                <input type="text" value={inputValue3} onChange={handleInputChange3} />
                <input type="text" value={inputValue4} onChange={handleInputChange4} />
                <button type="submit">Enviar</button>
            </form>
            <div>
                {error && <p>{error}</p>}
                <p>Input: {inputValue + "," + inputValue2 + "," + inputValue3 + "," + inputValue4}</p>
                <ul>
                    {List.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <form onSubmit={ListhandleSubmit}>
                    <button type="submit">Lista de palabras clave</button>
                </form>
                <ul>
                    {List2.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                {responseList && (
                    <button onClick={handleDownload}>Descargar respuesta</button>
                )}
            </div>
        </div>
    );
}