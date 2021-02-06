import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FaSearch } from 'react-icons/fa';

const CategorySourceSearch = ({ onCategorySourceSearch, news }) => {
  const [type] = useState('category');
  const [country, setCountry] = useState('in');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [searchQuery] = useState('');


  const onSubmit = e => {
    e.preventDefault();
    if (country || source || category) {
      onCategorySourceSearch(
        `top-headlines?country=${country}&category=${category}&sources=${source}&q=${searchQuery}`
      );
    }
  };

  return (
    <Container fluid className={`heroContainer`}>
      <Row className='justify-content-md-center'>
        <Col xs lg='12'>
          <Form className='mt-3' onSubmit={onSubmit}>
            <Form.Row>
              {type === 'category' && (
                <Fragment>
                  <Col md='5' sm='5' xs='5'>
                    <Form.Group>
                      <Form.Control
                        as='select'
                        defaultValue={country}
                        onChange={e => setCountry(e.target.value)}
                      >
                        <option value='in'>India</option>
                        <option value='us'>United States of America</option>
                        <option value='gb'>United Kingdom</option>
                        <option value='ca'>Canada</option>
                        <option value='cn'>China</option>
                        <option value='ru'>Russia</option>
                        <option value='fr'>France</option>
                        <option value='ph'>Philippines</option>
                        <option value='ae'>United Arab Emirates</option>
                        <option value='au'>Australia</option>
                        <option value='ar'>Argentina</option>
                        <option value='kr'>South Korea</option>
                        <option value='id'>Indonesia</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md='5' sm='5' xs='5'>
                    <Form.Group>
                      <Form.Control
                        as='select'
                        defaultValue={category}
                        onChange={e => setCategory(e.target.value)}
                      >
                        <option value=''>All Category</option>
                        <option value='business'>Business</option>
                        <option value='entertainment'>Entertainment</option>
                        <option value='general'>General</option>
                        <option value='health'>Health</option>
                        <option value='science'>Science</option>
                        <option value='sports'>Sports</option>
                        <option value='technology'>Technology</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Fragment>
              )}
              {type === 'source' && (
                <Fragment>
                  <Col md='7' sm='7'>
                    <Form.Group>
                      <Form.Control
                        as='select'
                        defaultValue={source}
                        onChange={e => setSource(e.target.value)}
                      >
                        <option value=''> Choose Source</option>
                        {news.newsSource.map(source => (
                          <option key={source.id} value={source.id}>
                            {source.name}
                          </option>
                        ))}
                        {news.newsSource.length === 0 &&
                          !news.newsSourceError && (
                            <option value=''>Loading News Source...</option>
                          )}
                        {news.newsSource.length === 0 &&
                          news.newsSourceError && (
                            <option value=''>Error Loading News Source</option>
                          )}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Fragment>
              )}

              <Col md='2' sm='2' xs='2' className='mb-3 '>
                <Button variant='dark' type='submit' className='mr-1'>
                  {news.newsLoading ? (
                    <Fragment>
                      <Spinner
                        as='span'
                        animation='border'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                      />
                      <span className='sr-only'>Loading...</span>
                    </Fragment>
                  ) : (
                    <FaSearch />
                  )}
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => ({
  news: state.news
});

export default connect(
  mapStateToProps,
  null
)(CategorySourceSearch);
