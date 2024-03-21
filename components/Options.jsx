import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'


const Options = () => {
  return (

      <section class="features">
          <div className="feature-item">
              <h2>Your Live Inventory Counts</h2>
              <p>Track your inventory in real-time.</p>
              <div className="button">
                  <a href="/live_inventory" className="btn btn-success">Live Inventory</a>
              </div>
          </div>
          {/* <div className="feature-item">
              <h2>Required Inventory</h2>
              <p>Modify your required inventory amounts.</p>
              <div className="button">
                  <a href="/required_inventory" className="btn btn-success">Required Inventory</a>
              </div>
          </div> */}
          <div className="feature-item">
              <h2>Suggested Ordering</h2>
              <p>Receive smart suggestions for your inventory orders.</p>
              <div className="button">
                  <a href="/suggested_order" className="btn btn-success">Suggested Order</a>
              </div>
          </div>
          <div className="feature-item">
            <h2>Inventory History</h2>
            <p>View the historical inventory levels of your products.</p>
            <div className="button">
                <a href="/inventory_history" className="btn btn-success">View Inventory History</a>
            </div>
        </div>
          {/* <div className="feature-item">
              <h2>Statistics</h2>
              <p>Get detailed insights and analytics.</p>
              <div className="button">
                  <a href="/statistics" className="btn btn-success">Statistics</a>
              </div>
          </div> */}
      </section>

  )
}

export default Options