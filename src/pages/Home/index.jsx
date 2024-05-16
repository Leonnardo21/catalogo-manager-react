import Menu from '../../components/Menu';

export default function Home(){
    return(
        <div className='flex flex-col items-center justify-center'>
            <Menu />      
            <h1 className='text-5xl text-center mt-10'>Sistema de catálogo</h1>
        </div>
    );
}