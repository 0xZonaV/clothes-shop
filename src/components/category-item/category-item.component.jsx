import './category-item.styles.scss';
import {useNavigate} from "react-router-dom";

const CategoryItemComponent = ({category: {imageUrl, title, routeUrl}}) => {
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(routeUrl);

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