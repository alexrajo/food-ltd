export default function DocumentationComponent() {
  return (
    <p className='mb-4 p-10'>
      <h1 className='my-4 text-4xl font-bold'>
        Welcome to the documentation page!
      </h1>
      <p className='mb-4'>
        This page is created for reviewing purposes only. The same content can
        be found in the projects main README.md file. The content is almost
        exactly the same, because these documentation pages are created by
        parsing the readme file, and turning it into something you can view
        here.
      </p>
      <p className='mb-4'>Select any subsection you wish to read more about.</p>
    </p>
  )
}
