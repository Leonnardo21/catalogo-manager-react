import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Menu from "../../../components/Menu";

export default function Products(){
    const [data, setData] = useState([]);

    useEffect(() => {
        //https 
        axios.get('http://localhost:3000/products')
        .then(function (response){
            setData(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    const handleDelete = async (id) => {
       await axios.delete(`http://localhost:3000/products/${id}`)
       setData(data.filter(product => product.id !== id));
       window.location.reload()
    }

    return(
        <>
            <Menu />
            <h2 className="text-3xl text-center mt-5">Listagem de Produtos</h2>
            <div className='flex justify-end mr-5'>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to="/products/new-product">Adicionar novo produto</Link>
            </div>
            <div className="relative mx-5 mt-5">
                <table className="w-full text-sm text-center rtl:text-right text-white-500 text-white-400">
                    <thead className="text-xs text-white-300 uppercase bg-blue-500 text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Descrição
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Preço
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Categoria
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Imagem
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Estoque
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="bg-white border-b bg-white-800">                    
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-black">
                            {item.id}
                        </th>
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-black">
                            {item.name}
                        </th>
                        <td className="px-6 py-4">
                            {item.description}
                        </td>
                        <td className="px-2 py-4">
                            R$ {item.price}
                        </td>
                        <td className="px-6 py-4">
                            {item.categoryId}
                        </td>
                        <td className="px-6 py-4">
                            {item.imageUrl}
                        </td>
                        <td className="px-6 py-4">
                            {item.stock}
                        </td>
                        <td className="px-6 py-4">
                            <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                                <Link to={`/edit-product/${item.id}`}><i className="fa-solid fa-pen"></i></Link>
                                
                            </button>
                            <button onClick={() => handleDelete(item.id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </td>
                        </tr>
                        ))
                    }       
                    </tbody>
                </table>
            </div>
        </>
    );
}