import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const CategoriesList = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/categories`)
                .then(res => res.json())
                .then((categoriesArray) => {
                    setCategories(categoriesArray)
                })
        },
        []
    )

    return <>

        <div>
            <h1 className="forums_header">Community Forums</h1>
        </div>
        <div className="posts">
            {
                categories.map(
                    (category) => {
                        return (
                        <div key={category.id} className="post" onClick={() => navigate(`/${category.category}`)}>

                            <div className="category">
                                <h1 className="">{category.category}</h1>
                            </div>
                            <div className="category_description">{category.description}</div>
                        </div>
                        )
                    }
                )
            }

        </div>
    </>

}