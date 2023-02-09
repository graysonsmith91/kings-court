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

        <div className="posts">
            {
                categories.map(
                    (category) => {
                        return <>
                            <div className="post" onClick={() => navigate(`/${category.category}`)}>
                                <div className="category">{category.category}</div>
                            </div>
                        </>
                    }
                )
            }

        </div>
    </>

}