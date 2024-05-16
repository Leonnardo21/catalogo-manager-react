import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../../../components/Menu";


export default function CategoryForm(){

    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleInsert = (e) => {
        e.preventDefault();
        try{
            axios.post("http://localhost:3000/categories", {
                name, imageUrl
            });
            navigate("/categories");
        }catch(err){
            console.error("Erro ao inserir dados")
            console.log(err);
        }
    } 

    return(
        <>
            <Menu />
            <h2 className="text-3xl text-center mt-5">Cadastro de Categorias</h2>
            <form onSubmit={handleInsert} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="name">
                    Nome da Categoria
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nome da Categoria" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="name">
                    Link da Imagem
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="imageUrl" type="text" placeholder="URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
                </div>
                <div className="col-span-2 flex justify-end mt-5">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                        Atualizar Categoria
                    </button>
                </div>

            </form>
        </>
    );
}