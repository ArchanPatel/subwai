import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'


const Options = () => {
  return (
    <div class="button-container">

    <div class="button">
      <Link href='/live_inventory' className='btn btn-success'>Live Inventory</Link>
    </div>
    <div class="button">
      <Link href='/suggested_order'className='btn btn-success'>Suggested Order</Link>
    </div>
    <div class="button">
      <Link href='/statistics' className='btn btn-success'>Statistics</Link>
    </div>
    
  </div>
  

  )
}

export default Options