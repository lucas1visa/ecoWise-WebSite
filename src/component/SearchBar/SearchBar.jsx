import { useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from"./SearchBar.module.css"
import { searchPrducts,getProducts } from "../../redux/actions";
import { useState } from "react";
import { Button } from "react-bootstrap";
import LoadingScreen from "../Loading/Loading"; 
import ProductNotFound from "./ProductNotFound";

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
    <div className={styles.containerSearch}>
      <input 
        type="text"
        placeholder="Buscar prod..."
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
        id={styles.inputSearch}
      />
      <Button onClick={handleChange} id={styles.buttonsearchBar}>
        <ion-icon name="search-outline"></ion-icon>
      </Button>
       {isLoading && <LoadingScreen />}
       <div className="div-">
       {productNotFound && <ProductNotFound/>}
      </div> 
    </div>
  );
};

export default Search;