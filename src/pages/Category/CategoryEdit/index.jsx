import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../../../components/Menu";
export default function CategoryEdit(){

    const { categoryId } = useParams(); // Recupera o ID do parâmetro da rota
    const [category, setCategory] = useState({
        name: "", imageUrl: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/categories/${categoryId}`);
                setCategory(response.data); 
            }catch(err){
                console.error("Erro ao carregar o categoria:", error);
            }
        }
        fetchCategory();
    }, [categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/categories/${categoryId}`, category);
            alert("Dados atualizado:");
            navigate("/categories");
        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);
        }
    }

    return(
        <>
            <Menu />
            <h2 className="text-3xl text-center mt-5">Atualizar Categoria</h2>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="name">
                    Nome da Categoria
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nome do Produto" value={category.name} onChange={e => setCategory({...category, name: e.target.value})}/>
                </div>
                <div className="mb-4">
                <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="description">
                    Descrição
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="imageUrl" placeholder="URL" maxLength={300} value={category.imageUrl} onChange={e => setCategory({...category, imageUrl: e.target.value})} />
                </div>
                <div className="col-span-2 flex justify-end mt-5">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                        Atualizar Categoria
                    </button>
                </div>
            </form>
        </>);
    }