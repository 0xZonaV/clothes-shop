import './category-preview.style.scss';
import ItemCard from "../item-card/item-card.component";

const CategoryPreview = ({title, products}) => {
  return(
      <div className='category-preview-container'>
          <h2>
              <span className='title'>{title.toUpperCase()}</span>
          </h2>

          <div className='preview'>
              {
                  products
                      .filter((_, index) => index < 4)
                      .map((product) =>
                      <ItemCard key={product.id} item={product}/>)
              }
          </div>
      </div>
  )

}

export default CategoryPreview;