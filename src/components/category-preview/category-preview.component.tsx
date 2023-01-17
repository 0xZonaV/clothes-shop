import './category-preview.style.scss';
import ItemCard from "../item-card/item-card.component";
import {Link} from "react-router-dom";
import {FC} from "react";
import {CategoryItem} from "../../store/category/category-types";

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({title, products}) => {
  return(
      <div className='category-preview-container'>
          <h2>
              <Link to={`/shop/${title}`} >
                  <span className='title'>{title.toUpperCase()}</span>
              </Link>
          </h2>

          <div className='preview'>
              {
                  products
                      .filter((_, index) => index < 4)
                      .map((product) =>
                      <ItemCard key={product.id} cartItem={product}/>)
              }
          </div>
      </div>
  )

}

export default CategoryPreview;