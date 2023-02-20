import React from 'react';
import { Loader, Card, FormField } from '../components';
import { Helmet } from 'react-helmet';
import OG from '/assets/img/CRUL_SHOWCASE_OG.png';
const RenderCards = ({ data, title }) => {
    if(data?.length > 0) return data.map((post)=> <Card key={post._id} {...post} /> )
    return(
        <h2 className="mt-5 font-bold text-green_opaque text-sora tex-xl uppercase">{title}</h2>
    )
}
const Showcasw = () => {
    const [loading, setLoading] = React.useState(false);
    const [allPosts, setAllPosts] = React.useState(null);
    const [searchText, setSearchText] = React.useState('');
    const [searchedResults, setSearchedResults] = React.useState(null);
    const [searchTimeout, setSearchTimeout] = React.useState(null)
    React.useEffect(()=>{
        const fetchAllPosts = async () => {
            setLoading(true);
            try{
                const response = await fetch('https://crul.onrender.com/api/v1/post',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if(response.ok){
                    const result = await response.json();
                    setAllPosts(result.data.reverse());
                }
            } catch(Error){
                alert(Error);
                console.log(Error)
            } finally{
                setLoading(false);
            }
        }
        fetchAllPosts();
    }, [])

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout)
        setSearchText(e.target.value);
        setSearchTimeout(
            setTimeout(()=>{
                const searchResults = allPosts.filter((item)=> item.name.toLowerCase().includes(searchText.toLowerCase())|| item.prompt.toLowerCase().includes(searchText.toLowerCase()))
                setSearchedResults(searchResults);
            }, 500)
        )
    } 
    return(
        <section className="max-w-7xl mx-auto sm:px-20 px-6 text-slate font-poppins mb-10">
            <Helmet>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1"
                />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="description" content="Generate AI Image using CRUL"/>
                <title>Showcase - CRUL</title>
                <meta name="theme-color" content="#0a192f" />
                {/* <link rel="shortcut icon" href={faviconHref} sizes="any" /> */}
                <link rel="manifest" href="../../public/manifest.json" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="author" content="Emmanuel Omoiya"></meta>
                <meta name="robots" content="index,follow" />
                <meta
                    name="keywords"
                    content="AI Artificial Intelligence Emmanuel Omoiya Developer OpenAi DALL-E image generator Aniyikaye coding web-development server MERN mongodb expressjs reactjs"
                />

                {/* Og */}
                <meta property="og:title" content="ShowcasE - CRUL" />
                <meta property="og:description" content="Generate AI Image using CRUL"/>
                <meta property="og:site_name" content="CRUL" />
                <meta property="og:url" content="https://crul.vercel.app/" key="ogurl" />
                <meta property="og:image" content="https://crul.vercel.app/assets/img/CRUL_SHOWCASE_OG.png" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@Emmanuel_Omoiya" />
                <meta name="twitter:title" content="Showcase - CRUL" />
                <meta name="twitter:description" content="Generate AI Image using CRUL" />
                <meta name="twitter:image" content="https://crul.vercel.app/assets/img/CRUL_SHOWCASE_OG.png" />
                <meta name="twitter:image:alt" content="CRUL"></meta>
                <meta name="twitter:domain" content="https://crul.vercel.app/" />
            </Helmet>
            <div>
                <h1 className="font-extrabold text-light_slate text-[32px] font-poppins">The Community Showcase</h1>
                <p  className="mt-2 text-slate text-[16px] max-w=[500px] font-poppins">Browse through a collection of imaginative and visually stunning images generated by CRUL</p>
            </div>
            <div className="mt-8">
                <FormField 
                    LabelName="Search images"
                    type="text"
                    name="text"
                    placeholder="Search images"
                    value={searchText}
                    handleChange={handleSearchChange}
                />
            </div>
            <div className="mt-10">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />  
                    </div>
                ):
                (
                    <>
                        {searchText && (
                            <h2 className="font-medium text-slate text-[16px] mb-3 font-poppins">Showing results for <span className="text-lightest_slate">
                                {searchText}</span> </h2>
                        )}
                        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                            {
                                searchText ?(
                                    <RenderCards 
                                    data={searchedResults}
                                    title="No search results found"
                                    />
                                ) : (
                                    <RenderCards 
                                    data={allPosts}
                                    title="No posts found"
                                    />
                                )
                            }
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}
export default Showcasw