import { useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from"./SearchBar.module.css"
import { searchPrducts,getProducts } from "../../redux/actions";
import { useState } from "react";
import LoadingScreen from "../Loading/Loading"; 
import ProductNotFound from "./ProductNotFound";
import {
  Button,
  Input,
} from "@material-tailwind/react";

const Search = () => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  console.log('esto es lo que llega por productName: '+ productName)
  const [isLoading, setIsLoading] = useState(false); 
  const [productNotFound, setProductNotFound] = useState(false);

  useEffect(() => {
    // Restablecer el estado de productNotFound cuando cambie el valor de productName
    setProductNotFound(false);
  }, [productName]);

  const handleChange = () => {
    setProductNotFound(false); 
    setProductName('')
    if (productName === '') {
      dispatch(getProducts())
        .then(() => {
          setProductNotFound(true);
        });
      console.log(productName);
      return; // Salir de la función en este punto si productName está vacío
    }
  
    setIsLoading(true);
    
  
    // Simular una carga de 1 segundo antes de completar la búsqueda
    setTimeout(() => {
      dispatch(searchPrducts(productName))
        .then(() => {
          if(productName == productName){
            setIsLoading(false);
          } else {
            setIsLoading(false);
            dispatch(setProductNotFound(false));
          }
        })
        .catch(() => {
          if(productName == productName){
            setIsLoading(false);
          }
          setIsLoading(false);
          dispatch(setProductNotFound(true));
        });
    }, 1000); // Cambié el tiempo a 1000 para que sea un segundo
  };
  

  

  return (
    <div className="relative  w-full gap-2 md:w-max">
          <div className="w-72">
            <Input  value={productName} id={styles.inputst}  onChange={(event=>setProductName(event.target.value))} placeholder="Search product..."  />
          </div>
          <Button onClick={handleChange} id={styles.buttonsearchBar} size="sm" className="!absolute right-1 top-1 rounded ">
            Buscar
          </Button>
          <div>
       {isLoading && <LoadingScreen />}
       <div className="">
       {productNotFound && <ProductNotFound/>}
      </div> 
      </div> 
      
        </div>
  );
};

export default Search;