
import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './components/Icons/Plusicon'
import { ShareIcon } from './components/Icons/shareicon'

function App() {

  return (
    <>
      <div>
        <Button varient='primary' text='Add Content' startIcon={<PlusIcon/>}></Button>
        <Button varient='secondary' text='Share' startIcon={<ShareIcon/>}></Button>
      </div>
    </>
  )
}

export default App
