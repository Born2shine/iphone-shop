import { useState, useEffect } from "react"
import { useGlobalContext } from "../../provider/context"
import { FiMenu } from "react-icons/fi"
import loader from "../../assets/images/loader.gif"
// import { FaShoppingCart } from "react-icons/fa"

const Home = () => {
    const { iphones, filterData, handleChange, filterEmptyData, fetching } = useGlobalContext()
    const [availablePhone, setAvailablePhone] = useState(iphones)
    const [filtering, setFiltering] = useState(false)
    const [sorting, setSorting] = useState(false)
    const [sortData, setSortData] = useState('')
    
    const filterByPrice = () => {
        setSorting(true)
        setFiltering(true)
    }

    const handleSubmit = () => {
        let newData = []
        let sortArr = sortData.split(',')
        const IPHONES = filterEmptyData()
        IPHONES.map((d) => {
            for (let i = 0; i < sortArr.length; i++) {
                if(d.name.toLowerCase().includes(sortArr[i].toLowerCase())){
                    newData.push(d)
                } 
                else if(d.lowestAsk.grade.toLowerCase() == sortArr[i].toLowerCase()){
                    newData.push(d)
                }else if(d.lowestAsk.storageSize.toLowerCase() == sortArr[i].toLowerCase()){
                    newData.push(d)
                }               
            }
            // return d
        })
        setSortData('')
        setAvailablePhone(newData)
    }

    useEffect(() => {
        if (iphones) {
            const newData = filterEmptyData()
            setAvailablePhone(newData)
        }
        
    }, [iphones])

    useEffect(() => {
        if(filtering){
            let data = filterEmptyData().filter(f => f.lowestAsk.price >= filterData.min)
            if(filterData.max){
                data = data.filter(f => f.lowestAsk.price <= filterData.max)
            }
            console.log(data)
            setAvailablePhone(data)
            setFiltering(false)
            setSorting(false)
        }
    }, [filtering])

    return (
        <section className="main">
            <header className="banner">
            <nav>
                <div className="menu"> 
                <span className="logo">LOGO</span>
                <span className="logo-icon"> <FiMenu/> </span> 
                 </div>
                <div className="links">
                    <a href="#a">Log in</a>
                    <a href="#a" className="signup">Sign up</a>
                </div>
            </nav>
                {/* <h1><FaShoppingCart/> TomShop</h1> */}
                <div className="content">
                    <h2 className="title">Mobile Phones &#38; Tablets</h2>
                    <div className="search-form">
                        <input type="text" 
                        value={sortData}
                        onChange={(e) => setSortData(e.target.value)} 
                        placeholder="Search by name, grade, and storageSize (e.g iPhone XR, b2, 64gB)" />
                        <button onClick={handleSubmit} className="btn">Search</button>
                    </div>
                </div>
            </header>

            <section className="main-content">
                <aside className="filter-wrapper">
                        <div className="filter">
                            <label>Price</label>
                            <input type="number" 
                                name="min" 
                                value={filterData.min} 
                                onChange={(e) => handleChange(e)} 
                                placeholder="Min"
                            />
                            <input type="number" 
                                name="max" value={filterData.max} 
                                onChange={(e) => handleChange(e)} 
                                placeholder="Max"
                            />
                            <button onClick={filterByPrice} className="btn-filter">Filter</button>
                        </div>
                </aside>
                {
                    (fetching || sorting) && (
                        <div className="loader">
                            <img src={loader} alt="loader" />
                        </div>
                    )
                }
                <aside className="iphones">
                   { !fetching && availablePhone &&
                       availablePhone.map(({_id, name, imgUrl, quantity, lowestAsk}) => {

                        //    const { price, storageSize, carrier, grade } = lowestAsk
                           return (
                            <div key={_id} className="single-phone">
                                <div className="phone-img">
                                    <img src={imgUrl} alt={name} />
                                </div>
                                <div className="details">
                                    <p className="name"> { name }  </p>
                                    <ul>
                                        <li className="size"> {lowestAsk && lowestAsk.storageSize} </li>
                                        <li className="price">&#36;{lowestAsk && lowestAsk.price}</li>
                                    </ul>
                                    <span className="carrier"> {lowestAsk && lowestAsk.carrier}</span>
                                </div>
                               <div className="add-to-cart">
                                 <a href="#a" className="add-btn">Add To Cart</a>
                               </div>
                            </div>
                           )
                       })
                   }

                {
                    !fetching && (availablePhone.length === 0) && (
                        <aside className="no-record">
                            No Record Found
                        </aside>
                    )
                }
                </aside>
               
            </section>
           
        </section>
    )
}

export { Home }