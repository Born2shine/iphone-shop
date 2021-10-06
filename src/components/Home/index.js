import { useGlobalContext } from "../../provider/context"
import { FiMenu } from "react-icons/fi"
import { FaShoppingCart } from "react-icons/fa"

const Home = () => {
    const { iphones } = useGlobalContext()
    // console.log(iphones)
    return (
        <section className="main">
            <header className="banner">
            <nav>
                <div className="menu"> <FiMenu/> </div>
                <div className="links">
                    <a href="#">Log in</a>
                    <a href="#" className="signup">Sign up</a>
                </div>
            </nav>
                <h1><FaShoppingCart/> TomShop</h1>
                <div className="content">
                    <h2 className="title">Mobile Phones & Tablets</h2>
                    <div className="search-form">
                        <input type="text" placeholder="Search by name, grade, and storageSize" />
                        <button className="btn">Search</button>
                    </div>
                </div>
            </header>

            <section className="main-content">
                <aside className="filter-wrapper">
                        <div className="filter">
                            <label>Price</label>
                            <input type="number" placeholder="Min"/>
                            <input type="number" placeholder="Max"/>
                            <button className="btn-filter">Filter</button>
                        </div>
                </aside>
                <aside className="iphones">
                   { iphones &&
                       iphones.map(({_id, name, imgUrl, lowestAsk}) => {

                        //    const { price, storageSize, carrier, grade } = lowestAsk
                           return (
                            <div key={_id} className="single-phone">
                                <div className="phone-img">
                                    <img src={imgUrl} alt={name} />
                                </div>
                                <div className="details">
                                    <p className="name"> { name } </p>
                                    <ul>
                                        <li className="size"> {lowestAsk && lowestAsk.storageSize} </li>
                                        <li className="price">&#8358;{lowestAsk && lowestAsk.price}</li>
                                    </ul>
                                    <span className="carrier"> {lowestAsk && lowestAsk.carrier}</span>
                                </div>
                               <div className="add-to-cart">
                                 <a href="#" className="add-btn">Add To Cart</a>
                               </div>
                            </div>
                           )
                       })
                   }
                </aside>
            </section>
           
        </section>
    )
}

export { Home }