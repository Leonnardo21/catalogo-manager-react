import Menu from "../../../components/Menu";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from "react";


export default function Category(){

    const [data, setData] = useState([]);

    useEffect(() => {
        //http 
        axios.get('http://localhost:3000/categories/')
       .then(function (response){
        setData(response.data);
        }).catch((err) => {
            console.log(err);
        });
       }, []);

       const handleDelete = async (id) => {
            await axios.delete(`http://localhost:3000/categories/${id}`)
            setData(data.filter(category => category.id !== id));
       }

    return(
        <>
            <Menu />
            <h2 className="text-3xl text-center mt-5">Listagem de Categorias</h2>
            <div className="flex justify-end mr-5">
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to="/categories/new-category">Adicionar nova categoria</Link>
            </div>
            <div className="relative mx-5 mt-5">
                <table className="w-full text-sm text-center rtl:text-right text-white-500">
                    <thead className="text-xs text-white text-center uppercase bg-blue-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Nome</th>
                            <th scope="col" className="px-6 py-3">Imagem</th>
                            <th scope="col" className="px-6 py-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="bg-white border-b bg-white-800">
                                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-black">
                                    {item.id}
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-black">
                                    {item.name}
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-black">
                                    {item.imageUrl}
                                </td>
                                <td className="px-6 py-4">
                                    <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                                    <Link to={`/categories/edit-category/${item.id}`}><i className="fa-solid fa-pen"></i></Link>
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}