import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>
        {isRouteErrorResponse(error)
          ? 'Page Not Found'
          : 'Sorry, an unexpected error has occurred.'}
      </p>
    </div>
  );
}
