

const dummy = (blogs) => {
  return 1
}
  

const totalLikes = (blogs) =>{
  const total = blogs.reduce(function(prevValue, currentValue){
    return prevValue + currentValue.likes
  }, 0)
  console.log(total)
  return total
  
}


const favoriteBlog = (blogs) =>{
  const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  delete favorite._id
  delete favorite.__v
  
  return favorite
}

/*const mostBlogs = (blogs) =>{

  
}
*/


module.exports = {
  dummy, totalLikes, favoriteBlog
}