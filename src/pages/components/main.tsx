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
                { role: "system", content: "You: " + response + "del texto dame una lista de palabras clave" },
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
        <section className="min-h-screen w-screen">
            <div className="m-4 ">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap w-full mb-20">
                        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                                Generador de palabras clave SEO
                            </h1>
                            <p>
                                En este programas ingresas las parte que se indican,
                                luego el retona una serie de oraciones, de las cuales saldran las palabras claves,
                                por ultimo podras descargar esa palabla en un achivo de tipo .txt
                            </p>
                            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="">
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex items-center justify-center"><h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"> Parametros</h1></div>
                                    <div className="flex items-center justify-center px-5 py-24">
                                        <div >
                                            <input className="Inputs m-4" type="text" value={inputValue} onChange={handleInputChange} placeholder="Titular" />
                                        </div>
                                        <div>
                                            <input className="Inputs m-4" type="text" value={inputValue2} onChange={handleInputChange2} placeholder="Evitar" />
                                        </div>
                                        <div>
                                            <input className="Inputs m-4" type="text" value={inputValue3} onChange={handleInputChange3} placeholder="Motivo" />
                                        </div>
                                        <div>
                                            <input className="Inputs m-4" type="text" value={inputValue4} onChange={handleInputChange4} placeholder="Cantidad" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <button className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"type="submit">Pedir oraciones</button>
                                    </div>
                                </form>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
                                {error && <p>{error}</p>}
                                <ul>
                                    {List.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
                                <form onSubmit={ListhandleSubmit}>
                                    <button className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"type="submit">Lista de palabras clave</button>
                                </form>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
                                <ul>
                                    {List2.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="bg-gray-100 p-6 rounded-lg">
                        {responseList && (
                            <button className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0" onClick={handleDownload}>Descargar respuesta</button>
                        )}
                    </div>
                </div>
            </div>
        </section >

    );
}

