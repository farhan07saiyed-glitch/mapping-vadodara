import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../utils/helpers';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <div className="container section empty">
      <p className="eyebrow">404</p>
      <h1>This street isn&rsquo;t on our map.</h1>
      <p>The page you wanted doesn&rsquo;t exist.</p>
      <Link to="/" className="btn btn-dark">Back home</Link>
    </div>
  );
}
