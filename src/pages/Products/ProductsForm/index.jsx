import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../../../components/Menu";

export default function ProductsForm(){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [stock, setStock] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const navigate = useNavigate();

    const handleInsert = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate() + 1).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        try{
            axios.post("http://localhost:3000/products", {
                name, description, price, imageUrl,categoryId, stock, createdAt: formattedDate
            });
            navigate("/products");
        }catch(e){
            console.error("Erro ao inserir dados")
            console.log(e);
        }
    }

    return(
        <>
        <Menu />
        <h2 className="text-3xl text-center mt-5">Cadastro de Produtos</h2>
        <form onSubmit={handleInsert} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-2 gap-4">
            <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="name">
                Nome do Produto
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nome do Produto" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="description">
                Descrição
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Descrição do Produto" maxLength={300} value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="price">
                Preço
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Preço do Produto" value={price} onChange={e => setPrice(e.target.value)}/>
            </div>
            <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="image">
                Imagem
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="imageUrl" type="text" placeholder="URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
            </div>
            <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="category">
                Categoria
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="categoryId" type="text" placeholder="Categoria do Produto" 
            value={categoryId} onChange={e => setCategoryId(e.target.value)}
            />
            </div>
            <div className="mb-4">
                <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="stock">
                    Estoque
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="stock" type="number" placeholder="Quantidade em Estoque"
                    value={stock} onChange={e => setStock(e.target.value)}
                />
            </div>
                <input type="hidden" id="createdAt" value={createdAt} onChange={e => setCreatedAt(e.target.value)}/>
            <div className="col-span-2 flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                Cadastrar Produto
            </button>
            </div>
        </form>
        </>
    );
}