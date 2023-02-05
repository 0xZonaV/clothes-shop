import './category-item.styles.scss';
import {useNavigate} from "react-router-dom";
import {categoriesType} from "../categories-container/categories-container.component";
import {FC, useCallback} from "react";

type CategoryItemProps = {
    category: categoriesType;
}

const CategoryItemComponent: FC<CategoryItemProps> = ({category}) => {

    const {imageUrl, routeUrl, title} = category;

    const navigate = useNavigate();

    const onNavigateHandler = useCallback(
        () => navigate(routeUrl)
        ,[]
    );

    return(
        <div className='category-container' onClick={onNavigateHandler}>
            <div className='background-image' style={{backgroundImage: `url(${imageUrl})`}}/>
            <div className='category-body-container'>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default CategoryItemComponent;