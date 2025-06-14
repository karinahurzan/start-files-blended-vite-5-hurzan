import { Wave } from 'react-animated-text';

import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Loader from '../components/Loader/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLatestSymbols } from '../reduxState/currency/operations';
import {
  selectBaseCurrency,
  selectFilteredRates,
  selectIsError,
  selectRates,
  selectIsLoading,
} from '../reduxState/selectors';
import RatesList from '../components/RatesList/RatesList';
import Filter from '../components/Filter/Filter';

const Rates = () => {
  const dispatch = useDispatch();

  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const rates = useSelector(selectRates);
  const baseCurrency = useSelector(selectBaseCurrency);
  const filteredRates = useSelector(selectFilteredRates);

  useEffect(() => {
    dispatch(fetchLatestSymbols(baseCurrency));
  }, [baseCurrency, dispatch]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {rates && <Filter />}
        {filteredRates.length > 0 && <RatesList rates={filteredRates} />}
        {isLoading && <Loader />}

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
