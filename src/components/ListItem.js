import "./styles/ListItem.css"
export default function ListItem({user}) {
    return(
    <div className="container">
              <div
                className="image"
                style={{ 
                  backgroundImage: `url(${user.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="content">
                <h1>{`${user.prefix} ${user.name} ${user.lastName}`}</h1>
                <p>{user.title}</p>
              </div>
            </div>
)
}