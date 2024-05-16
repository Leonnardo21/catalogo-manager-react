import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../../../components/Menu";
export default function ProductsEdit() {

    const { productId } = useParams(); // Recupera o ID do parâmetro da rota
    const [product, setProduct] = useState({
        name: "", description: "", price: "", imageUrl: "", categoryId: "", stock: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${productId}`);
                setProduct(response.data); // Define o estado com as informações do produto
            } catch (error) {
                console.error("Erro ao carregar o produto:", error);
            }
        };

        fetchProduto();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede recarregamento do formulário
        try {
            const response = await axios.put(`http://localhost:3000/products/${productId}`, product);
            console.log("Produto atualizado:", response.data);
            navigate("/products");
        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);
            // Lógica para tratar erros
        }
    };

    return (
        <>
        <Menu />
        <h2 className="text-3xl text-center mt-5">Atualizar Produto</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-2 gap-4">
            <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="name">
                Nome do Produto
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nome do Produto" value={product.name} onChange={e => setProduct({...product, name: e.target.value})}/>
            </div>
            <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="description">
                Descrição
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Descrição do Produto" maxLength={300} value={product.description} onChange={e => setProduct({...product, description: e.target.value})} />
            </div>
            <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="price">
                Preço
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Preço do Produto" value={product.price} onChange={e => setProduct({...product, price: e.target.value})}/>
            </div>
            <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="image">
                Imagem
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="imageUrl" type="text" placeholder="URL" value={product.imageUrl} onChange={e => setProduct({...product, imageUrl: e.target.value})}/>
            </div>
            <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="category">
                Categoria
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="categoryId" type="text" placeholder="Categoria do Produto" 
            value={product.categoryId} onChange={e => setProduct({...product, categoryId: e.target.value})}
            />
            </div>
            <div className="mb-4">
                <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="stock">
                    Estoque
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="stock" type="number" placeholder="Quantidade em Estoque"
                    value={product.stock} onChange={e => setProduct({...product, stock: e.target.value})}
                />
                <div className="col-span-2 flex justify-end mt-5">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                        Atualizar Produto
                    </button>
                </div>
            </div>
        </form>
        </>
    );

}