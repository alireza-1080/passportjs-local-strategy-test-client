import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='w-full p-6 flex gap-6 justify-center'>
        <Link href={'/'}><Button variant={'destructive'}>Home</Button></Link>
        <Link href={'/login'}><Button>Login</Button></Link>
        <Link href={'/register'}><Button variant={"outline"}>Register</Button></Link>
    </div>
  )
}

export default Header