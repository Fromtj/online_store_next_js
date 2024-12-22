import logo from '@/assets/images/logo.png'
import Image from 'next/image'

export default function Footer() {
    return(<section className="w-[100%] bg-[#1C2536]">
    <footer className="max-w-6xl m-auto flex items-start py-[30px]">
        <div>
            <Image className='w-[100px]' src={logo} />
        </div>
        <div></div>
        <div></div>
        <div></div>
    </footer>
    </section>)
}