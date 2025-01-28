import { useEffect, useState } from 'react';
import './template.css'

const WordPressPage = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://public-api.wordpress.com/wp/v2/sites/rabin99.wordpress.com/pages/19')
      .then((response) => response.json())
      .then((data) => {
        setPageData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading page data: {error.message}</div>;
  }

  return (
    <div>
      <h1>{pageData.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
    </div>
  );
};

export default WordPressPage;
