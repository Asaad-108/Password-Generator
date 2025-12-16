import { useState , useCallback , useEffect , useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow,setNumAllow] = useState(false)
  const [charAllow,setCharAllow] = useState(false)
  const [password,setPassword] = useState("");
  const passwordRef=useRef(null);
  const copyPassword = useCallback(
    () => {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password);
    },
    [password],
  )
  
  const passwordGenerator = useCallback(
    () => {
      let pass = '';
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      if(numAllow){
        str+='0123456789'
      }
      if(charAllow){
        str+='!@#$%^&*()_-=+'
      }
      for (let i = 0; i < length; i++) {
       let i = Math.floor(Math.random()*str.length+1);
       pass += str.charAt(i); 
      }
      setPassword(pass);
      },
    [length,numAllow,charAllow,setPassword],
  )
  useEffect(()=>{
    passwordGenerator()
  },[length,charAllow,numAllow,passwordGenerator])
  return (
  <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 bg-gray-500 text-orange-500 text-3xl text-center'>
      Password Generator
      <div className='flex shadow-xl rounded-lg overflow-hidden'>
        <input type="text"
        value={password}
        readOnly
        ref={passwordRef}
        placeholder='Password'
        className='outline-none text-xl py-2 px-4 bg-white mx-5 my-4 mr-0 w-full rounded-lg' />
        <button className='bg-orange-500 cursor-pointer text-white rounded-lg outline-none shrink-0 py-2 px-4 my-4 text-xl' onClick={copyPassword}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2 py-4'>
        <div className='flex items-center gap-x-1 '>
                    <input type="range" 
            min={8}
            max={50}
            value={length}
            onChange={(e)=>{
              setLength(e.target.value)
            }}
            className='cursor-pointer'
          />
          <label htmlFor=""> Length : {length}</label>
        </div>
              <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultValue={numAllow}
            className='cursor-pointer'
            onChange={()=>{setNumAllow((prev)=>!prev)}} />
            <label htmlFor="" className=''>Numbers</label>
      </div>
                    <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultValue={charAllow}
            className='cursor-pointer'
            onChange={()=>{setCharAllow((prev)=>!prev)}} />
            <label htmlFor="" className=''>Characters</label>
      </div>
      </div>
    </div>
    </>
  )
}

export default App
