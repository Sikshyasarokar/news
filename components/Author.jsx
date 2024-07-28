import React from 'react'
import Image from 'next/image'

const Author = ({ author }) => {
  return (
    <div className='text-center mt-20 mb-8 p-12 relative rounded-lg
    bg-black bg-opacity-20'>
      <div className='absolute left-0 right-0 -top-14'>

      </div>
      <Image src={author.photo.url} unoptimized alt={author.name} height={100} width={100}
      className='mx-auto align-middle rounded-full' />
      <h3 className='text-white my-4 text-xl font-bold'>
        {author.name}
        <p className='text-white text-lg'>{author.bio}</p>
      </h3>
    </div>
  )
}

export default Author
