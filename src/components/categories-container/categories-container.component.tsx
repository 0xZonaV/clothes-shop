import './categories-container.styles.scss';
import CategoryItemComponent from "../category-item/category-item.component";
import {FC} from "react";

export type categoriesType = {
    id: number;
    title: string;
    imageUrl: string;
    routeUrl: string;
}

const CategoriesContainerComponent: FC = () => {

    const categories: categoriesType[] = [
        {
            id: 1,
            title: "Hats",
            imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
            routeUrl: "shop/hats"
        },
        {
            id: 2,
            title: "Jackets",
            imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
            routeUrl: "shop/jackets"
        },
        {
            id: 3,
            title: "Sneakers",
            imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
            routeUrl: "shop/sneakers"
        },
        {
            id: 4,
            title: "Womens",
            imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
            routeUrl: "shop/womens"
        },
        {
            id: 5,
            title: "Mens",
            imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
            routeUrl: "shop/mens"
        }
    ]

    return(
        <div className='categories-container'>
            {categories.map((category) => (
                <CategoryItemComponent key={category.id} category={category}/>
            ))}
        </div>
    )
}

export default CategoriesContainerComponent;