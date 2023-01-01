import React from 'react'
import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.error(error);

  return (
    <div id="error-page" className="flex flex-col  h-[100vh] justify-center items-center">
      <h1 className='bold text-5xl mb-[20px] text-red-500'>Oops!</h1>
      <p className='text-red-300'>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className='text-red-300'>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default Error