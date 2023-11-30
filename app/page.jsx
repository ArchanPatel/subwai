import Options from "@components/Options";

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Hello,
        <br className='max-md:hidden' />
      {/* <span className='green_gradient text-center'> Automated Inventory</span> */}
      </h1>
      <p className='desc text-center'>
      Spectate your Subway Smart Shelf:
    </p>
    <div className="Home" style={{ marginTop: '80px' }}/>

    <Options />
    </section>
  )
}

export default Home;