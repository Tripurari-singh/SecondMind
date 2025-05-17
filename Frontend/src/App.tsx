
import './App.css'
import { Button } from './components/Button'
import { Card } from './components/card'
import { PlusIcon } from './components/Icons/Plusicon'
import { ShareIcon } from './components/Icons/shareicon'

function App() {

  return ( 
    <>
      <div>
        <Button varient='primary' text='Add Content' startIcon={<PlusIcon/>}></Button>
        <Button varient='secondary' text='Share Brain' startIcon={<ShareIcon/>}></Button>
           <div>
      <Card
        type="youtube"
        link="https://youtu.be/dW9ljF7q6wo"
        title={"YouTube"}
      />

      <Card
        type="Linkdin"
        link="https://www.linkedin.com/embed/feed/update/urn:li:share:7310210242946981890"
        title={"Linkdin Post"}
      />
    </div>
      </div>
      
    </>
  )
}

export default App
