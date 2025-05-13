
import './App.css'
import { Button } from './components/button'
import { PlusIcon } from './Icons/plus'

function App() {

  return (
    <>
    <Button  StartIcon={<PlusIcon/>} size='md' variant='primary' text='Share'></Button>
    <Button size='md' variant='secondary' text='Add Content'></Button>
    </>
  )
}

export default App
