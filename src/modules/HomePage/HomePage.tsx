import { useEffect, useState } from 'react';
import { Banner } from './Banner';
import styles from './HomePage.module.scss';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { ByCategory } from './ByCategory';
import { Product } from '../shared/types/Product';
import { Loader } from '../shared/components/Loader';
import ErrorMessage from '../shared/components/ErrorMessage/ErrorMessage';
import { checkResponse, wait } from '../shared/utils/apiHelper';
import { STATUS, Status } from '../shared/utils/status';
import { ServerError } from '../shared/utils/errorTypes';

export const HomePage = () => {
  const [status, setStatus] = useState<Status>(STATUS.IDLE);
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setStatus(STATUS.LOADING);
        setErrorMessage('');

        await wait(100);

        const productsRes = checkResponse(await fetch('api/products.json'));
        const productsFromServer: Product[] = await productsRes.json();

        setProducts(productsFromServer);
        setStatus(STATUS.SUCCESS);
      } catch (err) {
        if (err instanceof ServerError) {
          setErrorMessage(`Server error (${err.status})`);
        } else {
          setErrorMessage('Something went wrong');
        }

        setStatus(STATUS.ERROR);
      }
    };

    load();
  }, []);

  const hotProducts = [...products]
    .sort((p1, p2) => p2.fullPrice - p2.price - (p1.fullPrice - p1.price))
    .slice(0, 10);

  const newProducts = [...products]
    .sort((p1, p2) => p2.year - p1.year)
    .slice(0, 10);

  if (status === STATUS.LOADING) {
    return <Loader />;
  }

  if (status === STATUS.ERROR) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <>
      <h1 className={styles.title}>Product Catalog</h1>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2 className={styles.sectionTitleText}>
            Welcome to Nice Gadgets store!
          </h2>
        </div>
        <Banner />
      </div>
      <ProductsSlider
        key={'new'}
        products={newProducts}
        title={'Brand new models'}
      />

      <ByCategory products={products} />

      <ProductsSlider
        key={'hot'}
        products={hotProducts}
        title={'Hot Prices'}
        showDiscount={true}
      />
    </>
  );
};
