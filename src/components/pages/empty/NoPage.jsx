import React from "react"

const NoPage = ({ t }) => (
  <React.Fragment>
    <main className="no-page-main h-screen flex flex-col items-center justify-center bg-green-100 p-8">
      <article className="animate__animated animate__fadeInUpBig font-serif text-green-900">
        <h1 className="text-7xl leading-snug"><strong>404</strong></h1>
        <h3>Not Found</h3>
        <br />
        <p>Page not found</p>
      </article>
    </main>
    <footer className="fixed bottom-0 w-full"></footer>
  </React.Fragment>
)

export default NoPage