const Home = () => {
    return (
        <>
            <div className="min-h-screen flex justify-between items-center px-5 lg:px-24 py-5 shadow">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div className="flex flex-col justify-center items-center gap-3">
                        <p className="font-bold text-6xl text-center">
                            Every developer has a
                            tab open to <span className="text-blue-500">Stack Overflow</span>.
                        </p>
                        <p className="font-normal text-xl text-center">
                            For over 15 years we’ve been the Q&A platform of choice that millions of people visit every month to ask questions, learn, and share technical knowledge.
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <img src="https://cdn.sstatic.net/Img/home/illo-home-hero.png?v=4718e8f857c5" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home