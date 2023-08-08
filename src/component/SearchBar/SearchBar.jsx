import { useDispatch } from "react-redux";
import styles from"./SearchBar.module.css"
import { searchPrducts,getProducts } from "../../redux/actions";
import { useState } from "react";
import { Button } from "react-bootstrap";
import LoadingScreen from "../Loading/Loading";
const Search = () => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = () => {
    if (productName === '') {
      dispatch(getProducts());
    } else {
      setIsLoading(true);

      // Simular una carga de 1 segundo antes de completar la búsqueda
      setTimeout(() => {
        dispatch(searchPrducts(productName))
          .then(() => {
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error fetching search results:', error);
            setIsLoading(false);
          });
      }, 600); 
    }
  };

  return (
    <div className={styles.containerSearch}>
      <input
        type="text"
        placeholder="Productos"
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
        className={styles.inputSearch}
      />
      <Button onClick={handleChange} className="ml-auto m-2">
        <ion-icon name="search-outline"></ion-icon>
      </Button>
      {isLoading && <LoadingScreen />}
    </div>
  );
};

export default Search;