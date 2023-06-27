import Input from "@/components/Input"
import { useCallback, useState } from "react"
import axios from "axios"

const Auth = () =>{
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [variant, setVariant] = useState('login')
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant)=>currentVariant === 'login' ? 'register' : 'login')
    },[])

    const register = useCallback(async ()=>{
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            })
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password])

    return(
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">{variant === 'login' ? 'Sign in' : 'Register'}</h2>
                        <div className="flex felx-col gap-4">
                            {variant === 'register' && (
                            <Input label="username" onChange={(e: any) => setName(e.target.value)}  id="name" value={name} />
                            )}
                            <Input label="email" onChange={(e: any) => setEmail(e.target.value)}  id="email"  type="email" value={email} />
                            <Input label="password" onChange={(e: any) => setPassword(e.target.value)}  id="password"  type="password" value={password} />
                        </div>
                        <button onClick={register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ?  'Pertama kali make ?' : 'Sudah Punya Akun ?'} 
                            <span onClick={toggleVariant} className="text-white mt-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Buat Akun Dolo' : 'Langsung Login'} 
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Auth