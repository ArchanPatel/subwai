import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'


const Options = () => {
  return (
   
    <section class="features">
        <div class="feature-item">
            <h2>Your Live Inventory Counts</h2>
            <p>Track your inventory in real-time.</p>
            <div class="button">
                <a href="/live_inventory" class="btn btn-success">Live Inventory</a>
            </div>
        </div>
        <div class="feature-item">
            <h2>Suggested Ordering</h2>
            <p>Receive smart suggestions for your inventory orders.</p>
            <div class="button">
                <a href="/suggested_order" class="btn btn-success">Suggested Order</a>
            </div>
        </div>
        <div class="feature-item">
            <h2>Statistics</h2>
            <p>Get detailed insights and analytics.</p>
            <div class="button">
                <a href="/statistics" class="btn btn-success">Statistics</a>
            </div>
        </div>
    </section>

  )
}

export default Options